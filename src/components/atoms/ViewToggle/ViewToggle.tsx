import {useEffect, useState} from "react";
import classes from './style.module.scss';
import GridViewIcon from "@/components/atoms/Icons/GridViewIcon";
import ListViewIcon from "@/components/atoms/Icons/ListViewIcon";
import cn from "classnames";

export interface ViewToggleProps {
    defaultValue: "grid"|"list",
    onChange?: (value: "grid"|"list") => void,
}

export default function ViewToggle({defaultValue, onChange}: ViewToggleProps) {
    const [view, setView] = useState(defaultValue);
    
    useEffect(() => {
        if (onChange) onChange(view)
    }, [onChange, view])

    return (
        <div className={classes.ViewToggle}>
            <div
                onClick={() => setView('grid')}
                className={cn(classes.ViewToggle__item, view === 'grid' ? classes.ViewToggle__item_active : null)}
            >
                <GridViewIcon />
            </div>
            <div className={classes.ViewToggle__divider} />
            <div
                onClick={() => setView('list')}
                className={cn(classes.ViewToggle__item, view === 'list' ? classes.ViewToggle__item_active : null)}
            >
                <ListViewIcon />
            </div>
        </div>
    )
}
