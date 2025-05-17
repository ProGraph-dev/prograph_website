'use client';

import Link from "next/link"
import classes from './style.module.scss';
import NavLink from "@/components/atoms/NavLink/NavLink";
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

export const Navigation = () => {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    // @ts-ignore
    return <nav className={classes.links} style={{"--items": "4"}}>
        <NavLink href="/" activeClassName={classes.link_active} className={classes.link}>
            {mounted ? t('header.home') : ''}
        </NavLink>
        <NavLink href="/services" activeClassName={classes.link_active} className={classes.link}>
            {mounted ? t('header.services') : ''}
        </NavLink>
        <NavLink href="/our-team" activeClassName={classes.link_active} className={classes.link}>
            {mounted ? t('header.company') : ''}
        </NavLink>
        <NavLink href="/contacts" activeClassName={classes.link_active} className={classes.link}>
            {mounted ? t('header.contacts') : ''}
        </NavLink>
        <span className={classes.line}></span>
    </nav>
}