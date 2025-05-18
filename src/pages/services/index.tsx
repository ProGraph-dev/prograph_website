import '../../app/globals.css';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import PageHero from '@/components/molecules/PageHero/PageHero';
import ServicesList from '@/components/molecules/ServicesList/ServicesList';
import Head from 'next/head';
import {IService, serviceService} from '@/services/serviceService';
import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";

interface ServicesPageProps {
    services?: IService[];
    _nextI18Next?: any;
}

const defaultServices: Record<string, IService[]> = {
    en: [
        {
            id: 1,
            title: 'Graphic Design',
            description: 'Here, you can find an image converter for your needs, for example, a PDF to image converter.',
            slug: 'graphic-design',
            ISO: ''
        },
        {
            id: 2,
            title: 'UI/UX',
            description: 'Here, you can find an image converter for your needs, for example, a PDF to image converter.',
            slug: 'ui-ux',
            ISO: ''
        },
        {
            id: 3,
            title: 'Programing',
            description: 'Here, you can find an image converter for your needs, for example, a PDF to image converter.',
            slug: 'programming',
            ISO: ''
        },
        {
            id: 4,
            title: ' 3D design',
            description: 'Here, you can find an image converter for your needs, for example, a PDF to image converter.',
            slug: '3d-design',
            ISO: ''
        },
        {
            id: 5,
            title: 'Branding',
            description: 'Here, you can find an image converter for your needs, for example, a PDF to image converter.',
            slug: 'branding',
            ISO: ''
        },
        {
            id: 6,
            title: 'Game art',
            description: 'Here, you can find an image converter for your needs, for example, a PDF to image converter.',
            slug: 'game-art',
            ISO: ''
        }
    ],
    ru: [
        {
            "id": 1,
            "title": "Графический дизайн",
            "description": "Здесь вы можете найти конвертер изображений для своих нужд, например, конвертер PDF в изображение.",
            "slug": "graphic-design",
            "ISO": ""
        },
        {
            "id": 2,
            "title": "UI/UX",
            "description": "Здесь вы можете найти конвертер изображений для своих нужд, например, конвертер PDF в изображение.",
            "slug": "ui-ux",
            "ISO": ""
        },
        {
            "id": 3,
            "title": "Программирование",
            "description": "Здесь вы можете найти конвертер изображений для своих нужд, например, конвертер PDF в изображение.",
            "slug": "programming",
            "ISO": ""
        },
        {
            "id": 4,
            "title": "3D-дизайн",
            "description": "Здесь вы можете найти конвертер изображений для своих нужд, например, конвертер PDF в изображение.",
            "slug": "3d-design",
            "ISO": ""
        },
        {
            "id": 5,
            "title": "Брендинг",
            "description": "Здесь вы можете найти конвертер изображений для своих нужд, например, конвертер PDF в изображение.",
            "slug": "branding",
            "ISO": ""
        },
        {
            "id": 6,
            "title": "Игровое искусство",
            "description": "Здесь вы можете найти конвертер изображений для своих нужд, например, конвертер PDF в изображение.",
            "slug": "game-art",
            "ISO": ""
        }
    ],
    hy: [
        {
            "id": 1,
            "title": "Գրաֆիկական դիզայն",
            "description": "Այստեղ դուք կարող եք գտնել պատկերափոխիչ՝ ձեր կարիքների համար, օրինակ՝ PDF-ից պատկերափոխիչ:",
            "slug": "graphic-design",
            "ISO": ""
        },
        {
            "id": 2,
            "title": "UI/UX",
            "description": "Այստեղ դուք կարող եք գտնել պատկերափոխիչ՝ ձեր կարիքների համար, օրինակ՝ PDF-ից պատկերափոխիչ:",
            "slug": "ui-ux",
            "ISO": ""
        },
        {
            "id": 3,
            "title": "Ծրագրավորում",
            "description": "Այստեղ դուք կարող եք գտնել պատկերափոխիչ՝ ձեր կարիքների համար, օրինակ՝ PDF-ից պատկերափոխիչ:",
            "slug": "programming",
            "ISO": ""
        },
        {
            "id": 4,
            "title": "3D դիզայն",
            "description": "Այստեղ դուք կարող եք գտնել պատկերափոխիչ՝ ձեր կարիքների համար, օրինակ՝ PDF-ից պատկերափոխիչ:",
            "slug": "3d-design",
            "ISO": ""
        },
        {
            "id": 5,
            "title": "Բրենդինգ",
            "description": "Այստեղ դուք կարող եք գտնել պատկերափոխիչ՝ ձեր կարիքների համար, օրինակ՝ PDF-ից պատկերափոխիչ:",
            "slug": "branding",
            "ISO": ""
        },
        {
            "id": 6,
            "title": "Խաղային արվեստ",
            "description": "Այստեղ դուք կարող եք գտնել պատկերափոխիչ՝ ձեր կարիքների համար, օրինակ՝ PDF-ից պատկերափոխիչ:",
            "slug": "game-art",
            "ISO": ""
        }
    ]
}

export default function Services({services, _nextI18Next}: ServicesPageProps) {
    const locale = _nextI18Next?.initialLocale ?? 'en';
    const { t } = useTranslation('services');
    const [list, setList] = useState<IService[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setList(defaultServices[locale])
    }, [locale]);
    
    // Only render translated content after client-side hydration
    const heroTitle = mounted ? t('hero.title') : '';
    const heroDescription = mounted ? t('hero.description') : '';

    return (
        <>
            <Head>
                <title>ProGraph - Services</title>
                <meta name="description" content="ProGraph services"/>
            </Head>
            <section>
                <PageHero title={heroTitle} subtitle={heroDescription}/>
                <ServicesList initialServices={list}/>
            </section>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({locale = 'en'}) => {
    try {
        // const response = await serviceService.getMany({
        //   skip: 0,
        //   take: 10
        // });

        // Ensure the response.list is an array and filter out any undefined or null values
        // const services = Array.isArray(response.list)
        //   ? response.list.filter(service => service !== null && service !== undefined)
        //   : [];
        const services = defaultServices;

        return {
            props: {
                services,
                ...(await serverSideTranslations(locale, ['common', 'services']))
            },
            revalidate: 60 // Revalidate every 60 seconds
        };
    } catch (error) {
        console.error('Error fetching services:', error);
        return {
            props: {
                services: defaultServices,
                ...(await serverSideTranslations(locale, ['common', 'services']))
            },
            revalidate: 60
        };
    }
}