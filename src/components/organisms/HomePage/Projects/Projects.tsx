import classes from "./style.module.scss";
import cn from "classnames";
import ProjectsInlineFilter from "@/components/atoms/Projects/InlineFilter/InlineFilter";
import ProjectsGrid from "@/components/molecules/ProjectsGrid/ProjectsGrid";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import Link from "next/link";
import VerticalTitle from "@/components/atoms/VerticalTitle/VerticalTitle";
import { useEffect, useState } from 'react';
import { productService, IProduct } from '@/services/productService';

export default function Projects() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await productService.getProducts();
                setProducts(response.items);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const updateProjectsList = (filter: string) => {
        // Filter implementation can be added here
    }

    return (
        <div className={cn('container', classes.Projects)}>
            {/* <VerticalTitle title={'Projects'} /> */}
            <ProjectsInlineFilter onChange={updateProjectsList} />
            <ProjectsGrid projects={products} />
            <Link href={'/projects'} className={classes.Projects__seeAll}>
                <Button label={'See All'} theme={ButtonThemes.PRIMARY}>
                    See all
                </Button>
            </Link>
        </div>
    )
}
