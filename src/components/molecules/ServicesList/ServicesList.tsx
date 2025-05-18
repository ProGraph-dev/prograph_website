import VerticalTitle from '@/components/atoms/VerticalTitle/VerticalTitle';
import classes from './style.module.scss';
import cn from "classnames";
import {useCallback, useEffect, useState, useRef} from "react";
import FilterRow from "@/components/molecules/FilterRow/FilterRow";
import ServicesFilterForm from "@/components/molecules/ServicesFilterForm/ServicesFilterForm";
import ServicesItem from "@/components/atoms/ServicesItem/ServicesItem";
import { IService, serviceService } from '@/services/serviceService';

export interface IServicesListProps {
    initialServices?: IService[];
}

interface FilterValues {
    category?: string;
    title?: string;
}

export default function ServicesList({ initialServices = [] }: IServicesListProps) {
    const [view, setView] = useState<"grid"|"list">("grid");
    const [services, setServices] = useState<IService[]>(initialServices);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterValues>({});
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef(null);

    useEffect(() => {
        setServices(initialServices);
    }, [initialServices]);

    // const fetchServices = useCallback(async (newFilters?: FilterValues) => {
    //     if (loading) return;
    //
    //     setLoading(true);
    //     try {
    //         const response = await serviceService.getMany({
    //             skip: page * 10,
    //             take: 10,
    //             ...filters,
    //             ...newFilters
    //         });
    //
    //         if (newFilters) {
    //             setServices(response.list);
    //             setPage(1);
    //         } else {
    //             setServices(prev => Array.isArray(prev) ? [...prev, ...response.list] : response.list);
    //             setPage(prev => prev + 1);
    //         }
    //
    //         setHasMore(response.list?.length === 10);
    //         setError(null);
    //     } catch (error) {
    //         console.error('Error loading services:', error);
    //         setError('Failed to load services');
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [loading, page, filters]);

    // useEffect(() => {
    //     if (initialServices.length === 0) {
    //         setServices([]);
    //         setHasMore(false);
    //     } else {
    //         setServices(initialServices);
    //         fetchServices();
    //     }
    // }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    // fetchServices();
                }
            },
            { threshold: 0.5 }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading]);

    const applyFilters = (values: FilterValues) => {
        setFilters(values);
        // fetchServices(values);
    }

    const applySearch = (phrase: string) => {
        const newFilters = { ...filters, title: phrase || undefined };
        setFilters(newFilters);
        // fetchServices(newFilters);
    }

    return (
        <div className={cn('container', classes.ServicesList)}>
            <div className={classes.ServicesList__filter}>
                <FilterRow onSearch={applySearch} viewToggled={setView} filtersForm={
                    <ServicesFilterForm onSubmit={applyFilters} />
                } />
            </div>
            <div className={view === 'grid' ? classes.ServicesList__grid : classes.ServicesList__list}>
                <VerticalTitle title={'Services'} position={"left"} />
                {error ? (
                    <div className={classes.error}>{error}</div>
                ) : (
                    <>
                        {services?.map((service) => (
                            <ServicesItem
                                key={service.id}
                                view={view}
                                slug={service.slug}
                                title={service.title}
                                description={service.description}
                            />
                        ))}
                        {loading && <div className={classes.loading}>Loading...</div>}
                        {!loading && !hasMore && services?.length > 0 && <div className={classes.noMore}>No more services</div>}
                        {!loading && services?.length === 0 && <div className={classes.noData}>No services found</div>}
                        <div ref={loader} style={{ height: '20px' }} />
                    </>
                )}
            </div>
        </div>
    )
}
