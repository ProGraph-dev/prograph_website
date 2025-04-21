import classes from './style.module.scss';
import cn from 'classnames';

export interface IPageTransparentHeroParams {
    title: string;
    subtitle?: string;
    titleBold?: boolean;
    subtitleLarge?: boolean;
}

export default function PageTransparentHero({title, subtitle, subtitleLarge=false, titleBold = false}: IPageTransparentHeroParams) {
    return (
        <div className={classes.PageTransparentHero}>
            <div className="container container_content">
                <h1 className={cn(classes.PageTransparentHero__title, titleBold ? classes.PageTransparentHero__title_bold : null)}>
                    {title}
                </h1>
                {subtitle && (
                    <h2 className={cn(classes.PageTransparentHero__subtitle, subtitleLarge ? classes.PageTransparentHero__subtitle_large : null)}>
                        {subtitle}
                    </h2>
                )}
            </div>
        </div>
    )
}
