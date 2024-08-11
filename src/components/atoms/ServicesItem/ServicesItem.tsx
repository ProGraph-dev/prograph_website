import classes from './style.module.scss';
import cn from "classnames";
import Link from "next/link";

export interface ServicesItemProps {
    view: "list"|"grid";
    title: string;
    description: string;
    slug: string;
}

export default function ServicesItem({view, slug, title, description}: ServicesItemProps) {
    return <Link className={cn(classes.ServicesItem, view === 'list' ? classes.ServicesItem_list : null)} href={'/services/'+slug}>
        <div className={cn(classes.ServicesItem__container, view === 'list' ? classes.ServicesItem__container_list : null)}>
            <h4 className={cn(classes.ServicesItem__title, view === 'list' ? classes.ServicesItem__title_list : null)}>
                {title}
            </h4>
            <article
                className={cn(classes.ServicesItem__description, view === 'list' ? classes.ServicesItem__description_list : null)}
            >
                {description}
            </article>
        </div>
    </Link>
}