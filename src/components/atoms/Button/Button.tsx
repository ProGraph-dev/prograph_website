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
    theme?: ButtonThemes
}

export const Button = ({onClick, label, children, className, theme = ButtonThemes.TRANSPARENT}: IButtonProps) => {
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

    return <button className={cn(classes.button, getThemeClass(), className)} onClick={onClick ?? undefined}>
        {label ?? children}
    </button>
}