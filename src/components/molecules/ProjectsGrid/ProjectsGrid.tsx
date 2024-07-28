import GridItem from '@/components/atoms/Projects/GridItem/GridItem';
import classes from './style.module.scss';

export default function ProjectsGrid() {
    return (
        <div className={classes.ProjectsGrid}>
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
        </div>
    )
}