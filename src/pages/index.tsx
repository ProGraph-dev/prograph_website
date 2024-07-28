import '../app/globals.css'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps, NextPageContext} from "next";
import Hero from "@/components/organisms/HomePage/Hero/Hero";
import cn from "classnames";
import OurTeam from "@/components/organisms/HomePage/OurTeam/OurTeam";
import {OurTeamList} from "@/components/molecules/OurTeamList/OurTeamList";
import AboutUs from "@/components/organisms/HomePage/AboutUs/AboutUs";
import Projects from "@/components/organisms/HomePage/Projects/Projects";

export interface HomePageSSRProps {
    props: HomePageProps
}

export interface HomePageProps {
    links: Record<string, string>,
    ourTeam: OurTeamList
    _nextI18Next?: {} | undefined,
}

// `data` is returned from getServerSideProps and is
// available as a component prop here.
export default function Home({links, ourTeam}: HomePageProps) {
    return (
        <div>
            <Hero socialLinks={links}/>
            <OurTeam team={ourTeam}/>
            <AboutUs />
            <Projects />
        </div>
    );
}

export const getServerSideProps = (async (context) => {
    const {locale = 'en'} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            links: {
                'linked-in': 'https://www.linkedin.com/',
                'instagram': 'https://www.instagram.com/',
                'facebook': 'https://www.facebook.com/',
                'gmail': 'https://www.gmail.com.com/',
            },
            ourTeam: [
                {
                    id: '1',
                    image: "https://source.unsplash.com/random/352x368?sig=1",
                    name: "Name Surname",
                    profession: "Profession"
                },
                {
                    id: '2',
                    image: "https://source.unsplash.com/random/352x368?sig=2",
                    name: "Name Surname",
                    profession: "Profession"
                },
                {
                    id: '3',
                    image: "https://source.unsplash.com/random/352x368?sig=3",
                    name: "Name Surname",
                    profession: "Profession"
                },
                {
                    id: '4',
                    image: "https://source.unsplash.com/random/352x368?sig=4",
                    name: "Name Surname",
                    profession: "Profession"
                }
            ]
        },
    };
}) satisfies GetServerSideProps<HomePageSSRProps>;
