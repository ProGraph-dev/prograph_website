'use client';

import classes from './style.module.scss';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

export default function SubFooter() {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={classes.SubFooter}>
            <span className={classes.SubFooter__copyright}>
                {mounted ? t('footer.copyright') : ''}
            </span>
        </div>
    )
}
