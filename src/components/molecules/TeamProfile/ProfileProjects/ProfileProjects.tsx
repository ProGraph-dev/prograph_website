import classes from './style.module.scss';
import {useTheme} from "next-themes";
import cn from "classnames";
import ProjectsGridItem from "@/components/atoms/Projects/GridItem/GridItem";

export interface ProfileProjectsProps {
    projects: {
        id: number;
        name: string;
        likes: number;
        views: number;
        image: string;
    }[]
}

export default function ProfileProjects({ projects }: ProfileProjectsProps) {
    const {theme} = useTheme();

    return <div className={classes.ProfileProjects}>
        <h2 className={cn(classes.ProfileProjects__title, theme === 'dark' ? classes.ProfileProjects__title_dark : null)}>Work</h2>
        <div className={classes.ProfileProjects__separator} />
        <div className={classes.ProfileProjects__list}>
            <ProjectsGridItem />
            <ProjectsGridItem />
            <ProjectsGridItem />
            <ProjectsGridItem />
            <ProjectsGridItem />
            <ProjectsGridItem />
            <ProjectsGridItem />
            <ProjectsGridItem />
            <ProjectsGridItem />
            <ProjectsGridItem />
        </div>
    </div>
}
