import { appWithTranslation } from 'next-i18next';
import Header from '@/components/organisms/Header/Header';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import '../app/globals.css'

function MyApp({ Component, pageProps }: {Component: React.ComponentType, pageProps: Record<string, any>}) {
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