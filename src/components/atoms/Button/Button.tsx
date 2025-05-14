import cn from "classnames";
import classes from './style.module.scss'
import React from "react";

export enum ButtonThemes {
    PRIMARY,
    SECONDARY,
    TRANSPARENT
}

export interface IButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label?: string;
    children: React.ReactNode;
    className?: string;
    theme?: ButtonThemes;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export const Button = ({onClick, label, children, className, theme = ButtonThemes.TRANSPARENT, disabled = false, type = 'button'}: IButtonProps) => {
    const getThemeClass = (): string => {
        switch (theme) {
            case ButtonThemes.PRIMARY:
                return classes.button__primary
            case ButtonThemes.SECONDARY:
                return classes.button__secondary
            default:
                return classes.button__transparent
        }
    }

    return <button 
        type={type}
        className={cn(classes.button, getThemeClass(), className)} 
        onClick={disabled ? undefined : (onClick ?? undefined)}
        disabled={disabled}
        style={disabled ? { opacity: 0.7, cursor: 'not-allowed' } : undefined}
    >
        {label ?? children}
    </button>
}