import classes from './style.module.scss';
import cn from "classnames";

export default function HorizontalTitle({title}: {title: string}) {
    return (
        <div className={classes.horizontalTitle}>
            <h3 className={classes.horizontalTitle__label}>
                {title}
                <span className={cn(classes.horizontalTitle__line, classes.horizontalTitle__line_start)}></span>
                <span className={cn(classes.horizontalTitle__line, classes.horizontalTitle__line_end)}></span>
            </h3>
        </div>
    )
}