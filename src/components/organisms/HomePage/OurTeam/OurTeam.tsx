import HorizontalTitle from "@/components/atoms/HorizontalTitle/HorizontalTitle";
import OurTeamList from "@/components/molecules/OurTeamList/OurTeamList";
import {OurTeamItemProps} from "@/components/atoms/OurTeamItem/OurTeamItem";
import classes from './style.module.scss';


export default function OurTeam({team}: {team: OurTeamItemProps[]}) {
    return (
        <div className={classes.OurTeam}>
            <HorizontalTitle title="Our Team" />
            <OurTeamList list={team} />
        </div>
    )
}