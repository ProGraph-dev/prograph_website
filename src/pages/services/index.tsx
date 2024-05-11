import {NextPageContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Services() {
    return <>
        <h1>Test page!!!</h1>
    </>
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