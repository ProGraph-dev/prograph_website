import classes from './style.module.scss';
import cn from "classnames";
import {motion} from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import {useTheme} from "next-themes";

export interface ITeamItem {
    id: number;
    name: string;
    description: string;
    image: string;
}

export default function Item({image, name, description, id}: ITeamItem) {
    const theme = useTheme();

    return <motion.div
        className={cn(classes.Item, theme.theme === 'dark' ? classes.Item__dark : null)}
        key={"our-team-item-" + id}
        initial={{opacity: 0, scaleY: 0, transformOrigin: 'bottom'}}
        animate={{opacity: 1, scaleY: 1, transformOrigin: 'bottom'}}
        transition={{
            duration: 0.2,
            ease: 'easeIn',
        }}
    >
        <Link className={cn(classes.Item__container)} href={'/our-team/' + id}>
            <Image width={293} height={288} className={cn(classes.Item__image)} src={image} alt={name}/>
            <div className={cn(classes.Item__block)}>
                <h4 className={classes.Item__name}>
                    {name}
                </h4>
                <article className={classes.Item__description}>
                    {description}
                </article>
            </div>
        </Link>
    </motion.div>
}
