import '../../../app/globals.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import ProfileSidebar from "@/components/molecules/TeamProfile/ProfileSidebar/ProfileSidebar";
import classes from './style.module.scss'
import cn from "classnames";
import ProfileProjects, {
    ProfileProjectsProps
} from "@/components/molecules/TeamProfile/ProfileProjects/ProfileProjects";

export interface TeamProfileProps {
    data: {
        id: number;
        name: string;
        image: string;
        position: string;
        resume_path: string;
        views: number;
        appreciations: number;
        followers: number;
    } & ProfileProjectsProps
}

export default function TeamProfile({data}: TeamProfileProps) {
    return <section className={cn('container', classes.PageContainer)}>
        <ProfileSidebar {...data} />
        <ProfileProjects projects={data.projects} />
    </section>
}

export const getServerSideProps = (async (context) => {
    const {locale = 'en'} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: {
                id: 1,
                name: 'Name surname',
                image: 'https://source.unsplash.com/random/190x198?sig=1',
                position: 'Graphic and UI/UX Designer',
                resume_path: '/file.pdf',
                views: 1000,
                appreciations: 5623,
                followers: 45212,
                projects: [
                    {
                        id: 1,
                        name: 'Logo for coffee company',
                        likes: 50,
                        views: 50,
                        image: 'https://source.unsplash.com/random/496x306?sig=1',
                    }
                ]
            }
        },
    };
}) satisfies GetServerSideProps<TeamProfileProps>;
