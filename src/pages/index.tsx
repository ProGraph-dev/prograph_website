import Head from 'next/head';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {NextPageContext} from "next";

// `data` is returned from getServerSideProps and is
// available as a component prop here.
export default function Home({ data }: { data: any[] }) {
    return (
        <div>
            <Head>
                <title>i18n News Reader</title>
            </Head>

            <div>
                {data.map((news, index) => (
                    <div key={index}>
                        <p>{news.date}</p>

                        <h3>{news.title}</h3>

                        <p>{news.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const getServerSideProps = async (context: NextPageContext) => {
    const { locale = 'en' } = context;

    return {
        props: {
            // Spread the returned object into our `props` to expose
            // them to our component during SSR.
            ...(await serverSideTranslations(locale, ['common'])),
            data: []
        },
    };
};