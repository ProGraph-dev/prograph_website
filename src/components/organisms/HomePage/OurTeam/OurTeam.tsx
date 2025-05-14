import HorizontalTitle from "@/components/atoms/HorizontalTitle/HorizontalTitle";
import OurTeamList from "@/components/molecules/OurTeamList/OurTeamList";
import {IOurTeamItemProps} from "@/components/atoms/OurTeamItem/OurTeamItem";
import Team360Section from "@/components/molecules/Team360Section/Team360Section";
import classes from './style.module.scss';
import ImageViewer360 from "@/components/atoms/ImageViewer360/ImageViewer360";


export default function OurTeam({team}: {team: IOurTeamItemProps[]}) {
    return (
        <div className={classes.OurTeam}>
            <HorizontalTitle title="Our Team" />
            <OurTeamList list={team} />
        </div>
    )
}