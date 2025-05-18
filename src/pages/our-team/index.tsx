import '../../app/globals.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import PageTransparentHero from '@/components/molecules/PageTransparentHero/PageTransparentHero';
import List from "@/components/molecules/OurTeam/List/List";
import { ITeamItem } from "@/components/molecules/OurTeam/Item/Item";
import { SSRConfig } from "next-i18next";
import ImageViewer360 from '@/components/atoms/ImageViewer360/ImageViewer360';
import VerticalTitle from '@/components/atoms/VerticalTitle/VerticalTitle';
import { employeeService } from '@/services/employeeService';
import { useState, useEffect } from 'react';

export interface IOurTeamProps {
    initialTeam: ITeamItem[];
}

export default function OurTeam({ initialTeam }: IOurTeamProps) {
    const [team, setTeam] = useState<ITeamItem[]>(initialTeam);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeam = async () => {
            if (initialTeam.length > 0) return;
            
            setLoading(true);
            try {
                const response = await employeeService.getMany();
                console.log(response.list[0])
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

    return <section>
        <PageTransparentHero titleBold={true} subtitleLarge={true} title={'About company'} subtitle={'At ProGraph, we specialize in branding, web technologies, and digital marketing to help you stand out in a crowded marketplace. Our services include SEO-optimized websites, targeted advertising campaigns (PPC, SMM), and high-quality content strategies to engage your audience.'} />
        <PageTransparentHero title={'Our Team'} />
        <List data={team} />
        <div className='container'>
            <ImageViewer360
                imageUrl="/images/office-360.jpg"
            />
            <VerticalTitle title={'Virtual Office'} position={"right"} />
        </div>
    </section>
}

export const getServerSideProps = (async (context) => {
    const { locale = 'en' } = context;

    try {
        const response = await employeeService.getMany();
        const formattedTeam = response.list.map(employee => ({
            id: employee.id || '',
            name: employee.name || 'Team Member',
            description: employee.description || 'Team member description',
            image: employee.photo?.startsWith('/') ? employee.photo : `/${employee.photo}` || 'https://source.unsplash.com/random/293x288?sig=1'
        }));

        return {
            props: {
                ...(await serverSideTranslations(locale, ['common'])),
                initialTeam: formattedTeam || []
        },
    };
    } catch (error) {
        return {
            props: {
                ...(await serverSideTranslations(locale, ['common'])),
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
