import classes from './style.module.scss';
import {ChangeEventHandler, useState} from "react";
import InputEye from "@/components/atoms/Icons/InputEye";
import InputEyeClosed from '../../Icons/InputEyeClosed';

export interface IInputProps {
    type?: string;
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>,
    value?: string;
    required?: boolean;
}

export default function Input({type: typeParam, name, id, onChange, label, value, required}: IInputProps) {
    const [type, setType] = useState<string>(typeParam ?? 'text');
    return (
        <div className={classes.Input}>
            <input className={classes.Input__field} type={type} name={name} id={id} required={required} onChange={onChange} value={value}/>
            {
                label &&
                <label className={classes.Input__label}>{label}</label>
            }
            {
                typeParam === 'password' &&
                    <span className={classes.Input__eye} onClick={() => setType(type === 'password' ? 'text' : 'password')}>
                        {
                            type === 'password' ? <InputEye /> : <InputEyeClosed />
                        }
                    </span>
            }
        </div>
    )
}