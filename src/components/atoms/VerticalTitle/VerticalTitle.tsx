import classes from './style.module.scss';
import cn from "classnames";

export default function VerticalTitle({title}: {title: string}) {
    return (
        <div className={classes.verticalTitle}>
            <h3 className={classes.verticalTitle__label}>
                {title}
                <span className={cn(classes.verticalTitle__line, classes.verticalTitle__line_start)}></span>
                <span className={cn(classes.verticalTitle__line, classes.verticalTitle__line_end)}></span>
            </h3>
        </div>
    )
}