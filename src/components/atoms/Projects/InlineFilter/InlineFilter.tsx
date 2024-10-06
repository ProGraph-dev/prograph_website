import classes from './style.module.scss';
import cn from "classnames";
import {useState} from "react";

interface IProjectsInlineFilterProps {
    onChange?: (filter: string) => unknown
}

export default function ProjectsInlineFilter({}: IProjectsInlineFilterProps) {
    const [active, setActive] = useState<string>('all');

    return (
        <div className={classes.InlineFilter}>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'all' ? classes.InlineFilter__link_active : null
                )
            }>
                All
            </a>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'poster' ? classes.InlineFilter__link_active : null
                )
            }>
                Poster
            </a>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'visit-card' ? classes.InlineFilter__link_active : null
                )
            }>
                Visit card
            </a>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'web-site' ? classes.InlineFilter__link_active : null
                )
            }>
                Web site
            </a>
            <a
                className={
                cn(
                    classes.InlineFilter__link,
                    active === 'home-design' ? classes.InlineFilter__link_active : null
                )
            }>
                Home design
            </a>
        </div>
    )
}

