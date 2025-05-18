import classes from './style.module.scss';
import cn from "classnames";
import ProjectsInlineFilter from "@/components/atoms/Projects/InlineFilter/InlineFilter";
import ProjectsGrid from "@/components/molecules/ProjectsGrid/ProjectsGrid";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import Link from "next/link";
import VerticalTitle from "@/components/atoms/VerticalTitle/VerticalTitle";
import { useEffect, useState } from 'react';
import { productService, IProduct } from '@/services/productService';
import { useTranslation } from 'next-i18next';

const defaultProducts: Record<string, IProduct[]> = {
    en: [
        {
            id: 1,
            title: 'Visit Card',
            url: '/images/static/products/1.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 2,
            title: 'Interier',
            url: '/images/static/products/2.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 3,
            title: 'Posts',
            url: '/images/static/products/3.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 9,
            title: 'Car',
            url: '/images/static/products/9.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 10,
            title: 'Visit Card',
            url: '/images/static/products/10.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 11,
            title: 'Interier',
            url: '/images/static/products/11.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 5,
            title: 'Banner',
            url: '/images/static/products/5.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 6,
            title: 'Poster',
            url: '/images/static/products/6.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 7,
            title: 'Mobile Apps',
            url: '/images/static/products/7.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
    ],
    ru: [
        {
            id: 1,
            title: 'Визитка',
            url: '/images/static/products/1.jpg',
            ISO: 'RU',
            price: 0,
            productTypeId: 1
        },
        {
            id: 2,
            title: 'Интерьер',
            url: '/images/static/products/2.jpg',
            ISO: 'RU',
            price: 0,
            productTypeId: 1
        },
        {
            id: 3,
            title: 'Публикации',
            url: '/images/static/products/3.jpg',
            ISO: 'RU',
            price: 0,
            productTypeId: 1
        },
        {
            id: 9,
            title: 'Автомобиль',
            url: '/images/static/products/9.jpg',
            ISO: 'RU',
            price: 0,
            productTypeId: 1
        },
        {
            id: 10,
            title: 'Визитка',
            url: '/images/static/products/10.jpg',
            ISO: 'RU',
            price: 0,
            productTypeId: 1
        },
        {
            id: 11,
            title: 'Интерьер',
            url: '/images/static/products/11.jpg',
            ISO: 'RU',
            price: 0,
            productTypeId: 1
        },
        {
            id: 5,
            title: 'Баннер',
            url: '/images/static/products/5.jpg',
            ISO: 'RU',
            price: 0,
            productTypeId: 1
        },
        {
            id: 6,
            title: 'Плакат',
            url: '/images/static/products/6.jpg',
            ISO: 'RU',
            price: 0,
            productTypeId: 1
        },
        {
            id: 7,
            title: 'Мобильные приложения',
            url: '/images/static/products/7.jpg',
            ISO: 'RU',
            price: 0,
            productTypeId: 1
        }
    ],
    hy: [
        {
            id: 1,
            title: 'Այցեքարտ',
            url: '/images/static/products/1.jpg',
            ISO: 'HY',
            price: 0,
            productTypeId: 1
        },
        {
            id: 2,
            title: 'Ինտերիեր',
            url: '/images/static/products/2.jpg',
            ISO: 'HY',
            price: 0,
            productTypeId: 1
        },
        {
            id: 3,
            title: 'Հրապարակումներ',
            url: '/images/static/products/3.jpg',
            ISO: 'HY',
            price: 0,
            productTypeId: 1
        },
        {
            id: 9,
            title: 'Ավտոմեքենա',
            url: '/images/static/products/9.jpg',
            ISO: 'HY',
            price: 0,
            productTypeId: 1
        },
        {
            id: 10,
            title: 'Այցեքարտ',
            url: '/images/static/products/10.jpg',
            ISO: 'HY',
            price: 0,
            productTypeId: 1
        },
        {
            id: 11,
            title: 'Ինտերիեր',
            url: '/images/static/products/11.jpg',
            ISO: 'HY',
            price: 0,
            productTypeId: 1
        },
        {
            id: 5,
            title: 'Բաններ',
            url: '/images/static/products/5.jpg',
            ISO: 'HY',
            price: 0,
            productTypeId: 1
        },
        {
            id: 6,
            title: 'Պաստառ',
            url: '/images/static/products/6.jpg',
            ISO: 'HY',
            price: 0,
            productTypeId: 1
        },
        {
            id: 7,
            title: 'Բջջային հավելվածներ',
            url: '/images/static/products/7.jpg',
            ISO: 'HY',
            price: 0,
            productTypeId: 1
        }
    ]

}

export default function Projects({locale}: {locale: 'en'|'ru'|'hy'}) {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // const fetchProducts = async () => {
        //     setLoading(true);
        //     try {
        //         const response = await productService.getProducts();
        //         setProducts(response.items);
        //     } catch (error) {
        //         console.error('Error fetching products:', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        //
        // fetchProducts();

        setProducts(defaultProducts[locale]);
    }, [locale]);

    const updateProjectsList = (filter: string) => {
        // Filter implementation can be added here
    }

    return (
        <div className={cn('container', classes.Projects)}>
            {/* <VerticalTitle title={'Projects'} /> */}
            <ProjectsInlineFilter onChange={updateProjectsList} />
            <ProjectsGrid projects={products} isHomePage={true} />
            <Link href={'/projects'} className={classes.Projects__seeAll}>
                <Button label={mounted ? t('projects.see-all') : ''} theme={ButtonThemes.PRIMARY}>
                    {mounted ? t('projects.see-all') : ''}
                </Button>
            </Link>
        </div>
    )
}
