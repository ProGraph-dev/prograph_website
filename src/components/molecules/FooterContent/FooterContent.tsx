'use client';

import classes from './style.module.scss';
import cn from "classnames";
import Link from "next/link";
import {BrandLogo} from "@/components/atoms/Icons/BrandLogo";
import NewsletterForm from "@/components/molecules/NewsletterForm/NewsletterForm";
import FooterSocial from "@/components/molecules/FooterSocial/FooterSocial";
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

export default function FooterContent({locale}: {locale: 'en' | 'ru' | 'hy'}) {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <div className={cn('container', classes.FooterContent)}>
            <Link href="/">
                <BrandLogo locale={locale} />
            </Link>
            <FooterSocial />
            <NewsletterForm submitted={() => {}} />
        </div>
    )
}
