import classes from './style.module.scss';
import CountUp from "react-countup";

export interface AboutUsCounterProps {
    label: string;
    count: number
}

export default function AboutUsCounter({label, count}: AboutUsCounterProps) {
    return (
        <div className={classes.AboutUsCounter}>
            <span className={classes.AboutUsCounter__count}>
                <CountUp  end={count} enableScrollSpy={true} scrollSpyOnce={true} start={0} />
            </span>
            <span className={classes.AboutUsCounter__label}>
                {label}
            </span>
        </div>
    )
}
