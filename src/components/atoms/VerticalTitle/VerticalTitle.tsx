import classes from './style.module.scss';
import cn from "classnames";

export interface IVerticalTitleProps {
    title: string;
    position?: "left" | "right";
}

export default function VerticalTitle({title, position='right'}: IVerticalTitleProps) {
    return (
        <div className={cn(classes.verticalTitle, position=== 'left' ? classes.verticalTitle__left : null)}>
            <div className={classes.verticalTitle__container}>
                <h3 className={classes.verticalTitle__label}>
                    {title}
                    <span className={cn(classes.verticalTitle__line, classes.verticalTitle__line_start)}></span>
                    <span className={cn(classes.verticalTitle__line, classes.verticalTitle__line_end)}></span>
                </h3>
            </div>
        </div>
    )
}