import classes from './style.module.scss';
import Image from "next/image";

export interface IOurTeamItemProps {
    id: string;
    image: string;
    name: string;
    profession: string;
}

export default function OurTeamItem({image, name, profession}: IOurTeamItemProps) {
    return (
        <div className={classes.OurTeamItem}>
            <Image className={classes.OurTeamItem__image} width={352} height={368} src={image} alt={name}/>
            <h5 className={classes.OurTeamItem__name}>
                {name}
            </h5>
            <h6 className={classes.OurTeamItem__profession}>
                {profession}
            </h6>
        </div>
    )
}