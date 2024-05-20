import { appWithTranslation } from 'next-i18next';
import Header from '../components/Header';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {t} from "i18next";

// @ts-ignore
function MyApp({ Component, pageProps }) {
    const locale = pageProps._nextI18Next.initialLocale;

    return (
        <NextThemesProvider attribute="class" defaultTheme="default">
            <Header locale={locale} />
            <main>
                <Component {...pageProps} />
            </main>
        </NextThemesProvider>
    );
}


export default appWithTranslation(MyApp);