import { appWithTranslation } from 'next-i18next';
import Header from '../components/Header';
import {NextPageContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

// @ts-ignore
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />
            <main>
                <Component {...pageProps} />
            </main>
        </>
    );
}


export default appWithTranslation(MyApp);