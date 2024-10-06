import classes from './style.module.scss';
import {ChangeEventHandler} from "react";
import CheckmarkIcon from "@/components/atoms/Icons/CheckmarkIcon";

export interface IInputProps {
    name?: string;
    id?: string;
    label?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>,
    value?: boolean;
    required?: boolean;
}

export default function Checkbox({id, label, onChange, value, required}: IInputProps) {
    return <label className={classes.Checkbox}>
        <input className={classes.Checkbox__field} type="checkbox" onChange={onChange} id={id} checked={value} required={required} />
        <div className={classes.Checkbox__circle}>
            <div className={classes.Checkbox__circleIcon}>
                <CheckmarkIcon />
            </div>
        </div>
        <span className={classes.Checkbox__label}>{label}</span>
    </label>
}
