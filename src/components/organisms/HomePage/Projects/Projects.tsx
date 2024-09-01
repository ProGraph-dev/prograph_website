import classes from "./style.module.scss";
import cn from "classnames";
import ProjectsInlineFilter from "@/components/atoms/Projects/InlineFilter/InlineFilter";
import ProjectsGrid from "@/components/molecules/ProjectsGrid/ProjectsGrid";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import Link from "next/link";
import VerticalTitle from "@/components/atoms/VerticalTitle/VerticalTitle";

export default function Projects() {
    const updateProjectsList = (filter: string) => {

    }

    return (
        <div className={cn('container', classes.Projects)}>
            <VerticalTitle title={'Projects'} />
            <ProjectsInlineFilter onChange={updateProjectsList} />
            <ProjectsGrid />
            <Link href={'/projects'} className={classes.Projects__seeAll}>
                <Button label={'See All'} theme={ButtonThemes.PRIMARY}>
                    See all
                </Button>
            </Link>
        </div>
    )
}
