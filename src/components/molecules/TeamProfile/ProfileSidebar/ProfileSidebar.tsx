import classes from './style.module.scss';
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import Image from "next/image";
import cn from "classnames";
import {useTheme} from "next-themes";
import { motion } from 'framer-motion';

export interface IProfileProps {
    id: number;
    name: string;
    image: string;
    position: string;
    resume_path: string;
    views: number;
    appreciations: number;
    followers: number;
}

export default function ProfileSidebar({id, name, image, position, resume_path, views, appreciations, followers}: IProfileProps) {
    const {theme} = useTheme();

    return <motion.div
        key={"profile-sidebar-" + id}
        initial={{opacity: 0, transform: 'translateX(-500px) rotate(-160deg)'}}
        animate={{opacity: 1, transform: 'translateX(0) rotate(0)'}}
        transition={{
            duration: 0.45,
            ease: 'easeIn',
        }}
        className={cn(classes.ProfileSidebar, theme === 'dark' ? classes.ProfileSidebar_dark : null)}
    >
        <div className={classes.ProfileSidebar__container}>
            <Image width={190} height={198} className={classes.ProfileSidebar__image} src={image} alt={name}/>
            <h1 className={classes.ProfileSidebar__name}>{name}</h1>
            <h5 className={classes.ProfileSidebar__position}>{position}</h5>
            <Button className={cn(classes.ProfileSidebar__action, classes.ProfileSidebar__action_follow)}
                    theme={ButtonThemes.SECONDARY}>Following</Button>
            <Button className={classes.ProfileSidebar__action} theme={ButtonThemes.PRIMARY}>Message</Button>
            <div className={classes.ProfileSidebar__property_keeper}>
                <span className={classes.ProfileSidebar__property}>CV</span>
                <a className={cn(classes.ProfileSidebar__value, classes.ProfileSidebar__value_link)} href={resume_path} target="_blank">Download</a>
            </div>
            <div className={classes.ProfileSidebar__property_keeper}>
                <span className={classes.ProfileSidebar__property}>Project Views</span>
                <span className={classes.ProfileSidebar__value}>{views}</span>
            </div>
            <div className={classes.ProfileSidebar__property_keeper}>
                <span className={classes.ProfileSidebar__property}>Appreciations</span>
                <span className={classes.ProfileSidebar__value}>{appreciations}</span>
            </div>
            <div className={classes.ProfileSidebar__property_keeper}>
                <span className={classes.ProfileSidebar__property}>Followers</span>
                <span className={classes.ProfileSidebar__value}>{followers}</span>
            </div>
        </div>
    </motion.div>
}
