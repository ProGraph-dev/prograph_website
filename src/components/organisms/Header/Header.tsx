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
import {HeaderChatIcon} from "@/components/atoms/Icons/HeaderChatIcon";
import {ProfileIcon} from "@/components/atoms/Icons/ProfileIcon";

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
                <Link href={'/chat'}>
                    <HeaderChatIcon />
                </Link>
                <Link href={'/dashboard'}>
                    <ProfileIcon />
                </Link>
                <LanguageSwitcher locale={locale} />
                <ThemeSwitcher />
            </div>
        </div>
    </header>
);
}