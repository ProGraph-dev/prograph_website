import '../../app/globals.css';
import {NextPageContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import PageHero from "@/components/molecules/PageHero/PageHero";
import ServicesList from "@/components/molecules/ServicesList/ServicesList";

export default function Services() {
    return <section>
        <PageHero title={'Our Services'} subtitle={'Find the service you need on our page'} />
        <ServicesList />
    </section>
}

export const getServerSideProps = async (context: NextPageContext) => {
    const { locale = 'en' } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: []
        },
    };
};