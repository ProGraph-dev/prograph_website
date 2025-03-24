import classes from './style.module.scss';

export interface IPageTransparentHeroParams {
    title: string;
    subtitle?: string;
}

export default function PageTransparentHero({title, subtitle}: IPageTransparentHeroParams) {
    return (
        <div className={classes.PageTransparentHero}>
            <div className="container">
                <h1 className={classes.PageTransparentHero__title}>
                    {title}
                </h1>
                {subtitle && (
                    <h2 className={classes.PageTransparentHero__subtitle}>
                        {subtitle}
                    </h2>
                )}
            </div>
        </div>
    )
}
