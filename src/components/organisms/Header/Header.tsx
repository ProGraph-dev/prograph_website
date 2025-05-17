'use client';

import Link from 'next/link';
import classes from './style.module.scss';
import cn from 'classnames';
import {BrandLogo} from "@/components/atoms/Icons/BrandLogo";
import {Navigation} from "@/components/molecules/Navigation/Navigation";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import LanguageSwitcher from "@/components/atoms/LanguageSwitcher/LanguageSwitcher";
import {ThemeSwitcher} from "@/components/atoms/ThemeSwitcher/ThemeSwitcher";
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

export default function Header({locale}: {locale: "en" | "ru" | "hy"}) {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
    <header className={cn(classes.header)}>
        <div className={cn('container', classes.header__container)}>
            <Link href='/'>
                <BrandLogo locale={locale} />
            </Link>

            <div className={classes.header__navigation}>
                <Navigation />
            </div>

            <div className={classes.header__actions}>

                <LanguageSwitcher locale={locale} />
                <ThemeSwitcher />
                <Link href={'/sign-up'}>
                    <Button theme={ButtonThemes.PRIMARY}>
                        {mounted ? t('header.sign-up') : ''}
                    </Button>
                </Link>
                <Link href={'/sign-in'}>
                    <Button theme={ButtonThemes.SECONDARY}>
                        {mounted ? t('header.sign-in') : ''}
                    </Button>
                </Link>
            </div>
        </div>
    </header>
);
}