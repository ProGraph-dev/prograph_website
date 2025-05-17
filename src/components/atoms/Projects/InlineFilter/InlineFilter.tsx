'use client';

import classes from './style.module.scss';
import cn from "classnames";
import {useState, useEffect} from "react";
import { useTranslation } from 'next-i18next';

interface IProjectsInlineFilterProps {
    onChange?: (filter: string) => unknown
}

export default function ProjectsInlineFilter({onChange}: IProjectsInlineFilterProps) {
    const { t } = useTranslation('home');
    const [active, setActive] = useState<string>('all');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={classes.InlineFilter}>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'all' ? classes.InlineFilter__link_active : null
                )
            }>
                {mounted ? t('projects.filters.all', 'All') : 'All'}
            </a>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'poster' ? classes.InlineFilter__link_active : null
                )
            }>
                {mounted ? t('projects.filters.poster', 'Poster') : 'Poster'}
            </a>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'visit-card' ? classes.InlineFilter__link_active : null
                )
            }>
                {mounted ? t('projects.filters.visit-card', 'Visit card') : 'Visit card'}
            </a>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'web-site' ? classes.InlineFilter__link_active : null
                )
            }>
                {mounted ? t('projects.filters.web-site', 'Web site') : 'Web site'}
            </a>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'home-design' ? classes.InlineFilter__link_active : null
                )
            }>
                {mounted ? t('projects.filters.home-design', 'Home design') : 'Home design'}
            </a>
        </div>
    )
}

