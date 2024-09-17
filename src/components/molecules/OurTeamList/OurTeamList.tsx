import classes from './style.module.scss';
import OurTeamItem, {IOurTeamItemProps} from "@/components/atoms/OurTeamItem/OurTeamItem";
import cn from "classnames";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export interface IOurTeamListProps {
    list: IOurTeamItemProps[];
}

export default function OurTeamList({list}: IOurTeamListProps) {
    const theme = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(function() {
        setIsDark(theme.resolvedTheme === 'dark')
    }, [theme])

    return (
        <div className={cn(
            !isDark ? 'container' : undefined
        )}>
            <div className={cn(
                classes.OurTeamList,
                isDark ? classes.OurTeamList_dark : undefined,
                isDark ? 'container' : undefined,
            )}>
                {list.map((item) => (
                    <OurTeamItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}