import '../../app/globals.css';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetServerSideProps} from 'next';
import PageTransparentHero from '@/components/molecules/PageTransparentHero/PageTransparentHero';
import List from "@/components/molecules/OurTeam/List/List";
import {ITeamItem} from "@/components/molecules/OurTeam/Item/Item";
import {SSRConfig, useTranslation} from "next-i18next";
import ImageViewer360 from '@/components/atoms/ImageViewer360/ImageViewer360';
import VerticalTitle from '@/components/atoms/VerticalTitle/VerticalTitle';
import {employeeService} from '@/services/employeeService';
import {useState, useEffect} from 'react';

export interface IOurTeamProps {
    initialTeam: ITeamItem[];
}

export default function OurTeam({initialTeam}: IOurTeamProps) {
    const { t } = useTranslation('about');

    const [team, setTeam] = useState<ITeamItem[]>(initialTeam);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchTeam = async () => {
            if (initialTeam.length > 0) return;

            setLoading(true);
            try {
                const response = await employeeService.getMany();
                const formattedTeam = response.list.map(employee => ({
                    id: employee.id || -1,
                    name: employee.name || 'Team Member',
                    description: employee.description || 'Team member description',
                    image: employee.photo?.startsWith('/') ? employee.photo : `/${employee.photo}` || 'https://source.unsplash.com/random/293x288?sig=1'
                }));
                setTeam(formattedTeam);
                setError(null);
            } catch (error) {
                console.error('Error loading team:', error);
                setError('Failed to load team members');
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, [initialTeam]);

    // Only render translated content after client-side hydration
    const heroTitle = mounted ? t('hero.title') : '';
    const heroDescription = mounted ? t('hero.description') : '';
    const ourTeamTitle = mounted ? t('our-team') : '';
    const virtualOfficeTitle = mounted ? t('virtual-office') : '';
    
    return <section>
        <PageTransparentHero 
            titleBold={true} 
            subtitleLarge={true} 
            title={heroTitle}
            subtitle={heroDescription}
        />
        <PageTransparentHero title={ourTeamTitle}/>
        <List data={team}/>
        <div className='container'>
            <ImageViewer360
                imageUrl="/images/office-360.jpg"
            />
            <VerticalTitle title={virtualOfficeTitle} position={"right"}/>
        </div>
    </section>
}

export const getServerSideProps = (async (context) => {
    const {locale = 'en'} = context;

    try {
        const response = await employeeService.getMany();
        const formattedTeam = response.list.filter(el => el.ISO.toLowerCase() === locale)
            .map(employee => {
                let name = '';
                if ([15, 17, 19].includes(employee.id)) {
                    if (locale === 'en') {
                        name = 'Tamara Melikyan';
                    } else if (locale === 'ru') {
                        name = 'Тамара Меликйан';
                    } else {
                        name = 'Թամարա Մելիքյան'
                    }
                } else if ([30, 31, 32].includes(employee.id)) {
                    if (locale === 'en') {
                        name = 'Anna Sargsyan';
                    } else if (locale === 'ru') {
                        name = 'Анна Саргсян';
                    } else {
                        name = 'Աննա Սարգսյան'
                    }
                } else if ([33, 34, 35].includes(employee.id)) {
                    if (locale === 'en') {
                        name = 'Mariam Hovhannisyan';
                    } else if (locale === 'ru') {
                        name = 'Мариям Оганнисян';
                    } else {
                        name = 'Մարիամ Հովհաննիսյան'
                    }
                } else if ([36, 37, 38].includes(employee.id)) {
                    if (locale === 'en') {
                        name = 'Svetlana Melikyan';
                    } else if (locale === 'ru') {
                        name = 'Светлана Меликян';
                    } else {
                        name = 'Սվետլանա Մելիքյան'
                    }
                }

                return {
                    id: employee.id || -1,
                    name: name || 'Team Member',
                    description: employee.description.replaceAll('\\n', '<br/>') || 'Team member description',
                    image: process.env.API_BASE_URL + (employee.photo?.startsWith('/') ? employee.photo : `/${employee.photo}`)
                }
            })
            .sort((a, b) => a.id - b.id);

        return {
            props: {
                ...(await serverSideTranslations(locale, ['common', 'about'])),
                initialTeam: formattedTeam || []
            },
        };
    } catch (error) {
        return {
            props: {
                ...(await serverSideTranslations(locale, ['common', 'about'])),
                initialTeam: [
                    // Fallback data in case of API failure
                    {
                        name: 'Loading...',
                        description: 'Please wait while we fetch team information.',
                        image: 'https://source.unsplash.com/random/293x288?sig=1'
                    }
                ]
            },
        };
    }
}) satisfies GetServerSideProps<IOurTeamProps | SSRConfig>;
