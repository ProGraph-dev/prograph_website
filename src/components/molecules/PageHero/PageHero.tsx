import classes from './style.module.scss';

export interface IPageHeroParams {
    title: string;
    subtitle?: string;
}

export default function PageHero({title, subtitle}: IPageHeroParams) {
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
