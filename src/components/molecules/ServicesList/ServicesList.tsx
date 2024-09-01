import VerticalTitle from '@/components/atoms/VerticalTitle/VerticalTitle';
import classes from './style.module.scss';
import cn from "classnames";
import {useState} from "react";
import FilterRow from "@/components/molecules/FilterRow/FilterRow";
import ServicesFilterForm from "@/components/molecules/ServicesFilterForm/ServicesFilterForm";
import ServicesItem from "@/components/atoms/ServicesItem/ServicesItem";

export interface ServicesListProps {}

export default function ServicesList({}: ServicesListProps) {
    const [view, setView] = useState<"grid"|"list">("grid");

    const applyFilters = (values: Record<string, any>) => {}
    const applySearch = (phrase: string) => {}

    return (
        <div className={cn('container', classes.ServicesList)}>
            <div className={classes.ServicesList__filter}>
                <FilterRow onSearch={applySearch} viewToggled={setView} filtersForm={
                    <ServicesFilterForm onSubmit={applyFilters} />
                } />
            </div>
            <div className={view === 'grid' ? classes.ServicesList__grid : classes.ServicesList__list}>
                <VerticalTitle title={'Services'} position={"left"} />
                <ServicesItem view={view} slug={'graphic-design'} title={'Graphic Design'} description={'Here, you can find an image converter for your needs, for example, a PDF to image converter.'} />
                <ServicesItem view={view} slug={'graphic-design'} title={'Graphic Design'} description={'Here, you can find an image converter for your needs, for example, a PDF to image converter.'} />
                <ServicesItem view={view} slug={'graphic-design'} title={'Graphic Design'} description={'Here, you can find an image converter for your needs, for example, a PDF to image converter.'} />
                <ServicesItem view={view} slug={'graphic-design'} title={'Graphic Design'} description={'Here, you can find an image converter for your needs, for example, a PDF to image converter.'} />
                <ServicesItem view={view} slug={'graphic-design'} title={'Graphic Design'} description={'Here, you can find an image converter for your needs, for example, a PDF to image converter.'} />
                <ServicesItem view={view} slug={'graphic-design'} title={'Graphic Design'} description={'Here, you can find an image converter for your needs, for example, a PDF to image converter.'} />
            </div>
        </div>
    )
}
