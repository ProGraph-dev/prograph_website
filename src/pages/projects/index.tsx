import '../../app/globals.css';
import {NextPageContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import ProjectsGrid from "@/components/molecules/ProjectsGrid/ProjectsGrid";
import {useState, useEffect, useCallback, useRef} from 'react';
import cn from 'classnames';
import {IProduct, productService} from '@/services/productService';
import {useTranslation} from "next-i18next";

const defaultProjects: Record<string, IProduct[]> = {
    'en':[
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
            id: 4,
            title: 'Website',
            url: '/images/static/products/4.jpg',
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
        {
            id: 8,
            title: 'Banner',
            url: '/images/static/products/8.jpg',
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
            id: 12,
            title: 'Posts',
            url: '/images/static/products/12.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 13,
            title: 'Website',
            url: '/images/static/products/13.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 14,
            title: 'Banner',
            url: '/images/static/products/14.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 15,
            title: 'Poster',
            url: '/images/static/products/15.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 16,
            title: 'Mobile Apps',
            url: '/images/static/products/16.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 17,
            title: 'Banner',
            url: '/images/static/products/17.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 18,
            title: 'Car',
            url: '/images/static/products/18.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 19,
            title: 'Banner',
            url: '/images/static/products/19.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
        {
            id: 20,
            title: 'Car',
            url: '/images/static/products/20.jpg',
            ISO: 'EN',
            price: 0,
            productTypeId: 1
        },
    ],
    'ru': [
        {
            "id": 1,
            "title": "Визитка",
            "url": "/images/static/products/1.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 2,
            "title": "Интерьер",
            "url": "/images/static/products/2.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 3,
            "title": "Посты",
            "url": "/images/static/products/3.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 4,
            "title": "Веб-сайт",
            "url": "/images/static/products/4.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 5,
            "title": "Баннер",
            "url": "/images/static/products/5.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 6,
            "title": "Постер",
            "url": "/images/static/products/6.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 7,
            "title": "Мобильные приложения",
            "url": "/images/static/products/7.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 8,
            "title": "Баннер",
            "url": "/images/static/products/8.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 9,
            "title": "Автомобиль",
            "url": "/images/static/products/9.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 10,
            "title": "Визитка",
            "url": "/images/static/products/10.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 11,
            "title": "Интерьер",
            "url": "/images/static/products/11.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 12,
            "title": "Посты",
            "url": "/images/static/products/12.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 13,
            "title": "Веб-сайт",
            "url": "/images/static/products/13.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 14,
            "title": "Баннер",
            "url": "/images/static/products/14.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 15,
            "title": "Постер",
            "url": "/images/static/products/15.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 16,
            "title": "Мобильные приложения",
            "url": "/images/static/products/16.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 17,
            "title": "Баннер",
            "url": "/images/static/products/17.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 18,
            "title": "Автомобиль",
            "url": "/images/static/products/18.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 19,
            "title": "Баннер",
            "url": "/images/static/products/19.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 20,
            "title": "Автомобиль",
            "url": "/images/static/products/20.jpg",
            "ISO": "RU",
            "price": 0,
            "productTypeId": 1
        }
    ],
    "hy": [
        {
            "id": 1,
            "title": "Այցեքարտ",
            "url": "/images/static/products/1.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 2,
            "title": "Ինտերիեր",
            "url": "/images/static/products/2.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 3,
            "title": "Հրապարակումներ",
            "url": "/images/static/products/3.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 4,
            "title": "Վեբկայք",
            "url": "/images/static/products/4.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 5,
            "title": "Բաններ",
            "url": "/images/static/products/5.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 6,
            "title": "Պաստառ",
            "url": "/images/static/products/6.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 7,
            "title": "Բջջային հավելվածներ",
            "url": "/images/static/products/7.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 8,
            "title": "Բաններ",
            "url": "/images/static/products/8.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 9,
            "title": "Ավտոմեքենա",
            "url": "/images/static/products/9.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 10,
            "title": "Այցեքարտ",
            "url": "/images/static/products/10.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 11,
            "title": "Ինտերիեր",
            "url": "/images/static/products/11.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 12,
            "title": "Հրապարակումներ",
            "url": "/images/static/products/12.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 13,
            "title": "Վեբկայք",
            "url": "/images/static/products/13.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 14,
            "title": "Բաններ",
            "url": "/images/static/products/14.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 15,
            "title": "Պաստառ",
            "url": "/images/static/products/15.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 16,
            "title": "Բջջային հավելվածներ",
            "url": "/images/static/products/16.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 17,
            "title": "Բաններ",
            "url": "/images/static/products/17.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 18,
            "title": "Ավտոմեքենա",
            "url": "/images/static/products/18.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 19,
            "title": "Բաններ",
            "url": "/images/static/products/19.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        },
        {
            "id": 20,
            "title": "Ավտոմեքենա",
            "url": "/images/static/products/20.jpg",
            "ISO": "HY",
            "price": 0,
            "productTypeId": 1
        }
    ]
}

export default function Projects({_nextI18Next}: { _nextI18Next: any }) {
    const locale = _nextI18Next?.initialLocale ?? 'en';
    const [projects, setProjects] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const loader = useRef(null);
    const [mounted, setMounted] = useState(false);
    
    // Ensure translations are only rendered after client-side hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setProjects(defaultProjects[locale])
    }, [locale]);

    // const loadProjects = useCallback(async () => {
    //   if (loading || !hasMore) return;
    //
    //   setLoading(true);
    //   try {
    //     const response = await productService.getProducts(page * 20, 20);
    //     if (response.items.length === 0) {
    //       setHasMore(false);
    //     } else {
    //       setProjects(prev => [...prev, ...response.items]);
    //       setPage(prev => prev + 1);
    //     }
    //   } catch (error) {
    //     console.error('Error loading projects:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }, [loading, hasMore, page]);

    useEffect(() => {
        // loadProjects();
    }, []);

    // useEffect(() => {
    //   const observer = new IntersectionObserver(
    //     entries => {
    //       if (entries[0].isIntersecting) {
    //         loadProjects();
    //       }
    //     },
    //     { threshold: 1.0 }
    //   );
    //
    //   if (loader.current) {
    //     observer.observe(loader.current);
    //   }
    //
    //   return () => observer.disconnect();
    // }, [loadProjects]);

    return (
        <section className={cn('container')}>
            <ProjectsGrid projects={projects} showFilters/>
        </section>
    );
}

export const getServerSideProps = async (context: NextPageContext) => {
    const {locale = 'en'} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'products'])),
        },
    };
};