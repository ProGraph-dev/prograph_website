import classes from './style.module.scss';

export interface PageHeroParams {
    title: string;
    subtitle?: string;
}

export default function PageHero({title, subtitle}: PageHeroParams) {
    return (
        <div className={classes.PageHero}>
            <div className="container">
                <h1 className={classes.PageHero__title}>
                    {title}
                </h1>
                {subtitle && (
                    <h2 className={classes.PageHero__subtitle}>
                        {subtitle}
                    </h2>
                )}
            </div>
        </div>
    )
}
