import { appWithTranslation } from 'next-i18next';
import Header from '@/components/organisms/Header/Header';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {NextRouter} from "next/router";
import { motion } from 'framer-motion';
import Footer from "@/components/organisms/Footer/Footer";

function MyApp({ Component, router, pageProps }: {Component: React.ComponentType, router: NextRouter, pageProps: Record<string, any>}) {
    const locale = pageProps._nextI18Next?.initialLocale ?? 'en';

    return (
        <NextThemesProvider attribute="class" defaultTheme="default">
            <Header locale={locale} />
            <main>
                <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
                    pageInitial: {
                        opacity: 0
                    },
                    pageAnimate: {
                        opacity: 1
                    },
                }}>
                <Component {...pageProps} />
                </motion.div>
            </main>
            <Footer />
        </NextThemesProvider>
    );
}


export default appWithTranslation(MyApp);