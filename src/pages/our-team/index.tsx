import '../../app/globals.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import PageTransparentHero from '@/components/molecules/PageTransparentHero/PageTransparentHero';
import List from "@/components/molecules/OurTeam/List/List";
import {ITeamItem} from "@/components/molecules/OurTeam/Item/Item";
import {SSRConfig} from "next-i18next";

export interface IOurTeamProps {
    team: ITeamItem[];
}

export default function OurTeam({team}: IOurTeamProps) {
    return <section>
        <PageTransparentHero titleBold={true} subtitleLarge={true} title={'About company'} subtitle={'At ProGraph, we specialize in branding, web technologies, and digital marketing to help you stand out in a crowded marketplace. Our services include SEO-optimized websites, targeted advertising campaigns (PPC, SMM), and high-quality content strategies to engage your audience.'} />
        <PageTransparentHero title={'Our Team'} />
        <List data={team} />
    </section>
}

export const getServerSideProps = (async (context) => {
    const {locale = 'en'} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            team: [
                {
                    name: 'Name Surname',
                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    image: 'https://source.unsplash.com/random/293x288?sig=1'
                },
                {
                    name: 'Name Surname',
                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    image: 'https://source.unsplash.com/random/293x288?sig=2'
                },
                {
                    name: 'Name Surname',
                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    image: 'https://source.unsplash.com/random/293x288?sig=3'
                },
                {
                    name: 'Name Surname',
                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    image: 'https://source.unsplash.com/random/293x288?sig=4'
                },
                {
                    name: 'Name Surname',
                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    image: 'https://source.unsplash.com/random/293x288?sig=5'
                },
                {
                    name: 'Name Surname',
                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    image: 'https://source.unsplash.com/random/293x288?sig=6'
                },
                {
                    name: 'Name Surname',
                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    image: 'https://source.unsplash.com/random/293x288?sig=7'
                },
                {
                    name: 'Name Surname',
                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    image: 'https://source.unsplash.com/random/293x288?sig=8'
                }
            ]
        },
    };
}) satisfies GetServerSideProps<IOurTeamProps | SSRConfig>;
