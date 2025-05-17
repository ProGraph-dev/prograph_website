'use client';

import { useEffect, useState } from 'react';
import classes from './style.module.scss';
import cn from 'classnames';
import HorizontalTitle from '@/components/atoms/HorizontalTitle/HorizontalTitle';
import { achievementService } from '@/services/achievement';
import AboutUsCounter from '@/components/atoms/AboutUs/AboutUsCounter/AboutUsCounter';
import AboutUsDivider from '@/components/atoms/AboutUs/AboutUsDivider/AboutUsDivider';
import { useTranslation } from 'next-i18next';


export default function AboutUs() {
    const { t } = useTranslation('home');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    interface AchievementCounts {
        projects: number;
        hours: number;
        websites: number;
    }

    const [achievements, setAchievements] = useState<AchievementCounts>({
        projects: 0,
        hours: 0,
        websites: 0
    });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const { list } = await achievementService.getMany({ skip: 0, take: 10, is_active: true });
                
                const achievementData = list.reduce((acc: AchievementCounts, item) => {
                    if (item.title.toLowerCase().includes('project')) acc.projects = item.count;
                    if (item.title.toLowerCase().includes('hours')) acc.hours = item.count;
                    if (item.title.toLowerCase().includes('website')) acc.websites = item.count;
                    return acc;
                }, { projects: 0, hours: 0, websites: 0 });

                setAchievements(achievementData);
                setError(null);
            } catch (error) {
                console.error('Error fetching achievements:', error);
                setError('Failed to load achievements');
            }
        };

        fetchAchievements();
    }, []);

    return (
        <div className={cn(classes.AboutUs)}>
            <HorizontalTitle title={mounted ? t('about.title') : 'About Us'} />
            <div className={cn(classes.AboutUs__container)}>
                    {error ? (
                    <div className={classes.error}>{error}</div>
                ) : (
                    <>
                        <AboutUsCounter label={mounted ? t('about.project') : 'Project'} count={achievements.projects} />
                        <AboutUsDivider />
                        <AboutUsCounter label={mounted ? t('about.working-hours') : 'Working hours'} count={achievements.hours} />
                        <AboutUsDivider />
                        <AboutUsCounter label={mounted ? t('about.websites') : 'Website'} count={achievements.websites} />
                    </>
                )}
            </div>
        </div>
    )
}
