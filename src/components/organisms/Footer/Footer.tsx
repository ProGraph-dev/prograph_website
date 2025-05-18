'use client';

import classes from './style.module.scss';
import SubFooter from "@/components/atoms/Footer/SubFooter/SubFooter";
import FooterContent from "@/components/molecules/FooterContent/FooterContent";

export default function Footer({locale}: {locale: 'en' | 'ru' | 'hy'}) {
    return (
        <footer className={classes.Footer}>
            <FooterContent locale={locale} />
            <div className={classes.Footer__divider}></div>
            <SubFooter />
        </footer>
    )
}