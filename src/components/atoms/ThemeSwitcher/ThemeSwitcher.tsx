// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import React, {useEffect, useMemo, useState} from "react";
import {motion, MotionProps, Variants} from "framer-motion";
import styles from "@/components/atoms/ThemeSwitcher/style.module.scss";
import {useDetectClickOutside} from "react-detect-click-outside";
import {LightIcon} from "@/components/atoms/Icons/LightIcon";
import {DarkIcon} from "@/components/atoms/Icons/DarkIcon";

const menu = {
    closed: {
        scale: 0,
        originX: "100%",
        originY: "0",
        transition: {
            type: "ease-out",
            duration: 0.15,
            delay: 0.15
        },
    },
    open: {
        scale: 1,
        originX: "100%",
        originY: "0",
        transition: {
            type: "ease-in",
            duration: 0.2,
            delayChildren: 0.15,
            staggerChildren: 0.05,
        },
    },
} satisfies Variants;

const item = {
    variants: {
        closed: { x: -16, opacity: 0 },
        open: { x: 0, opacity: 1 },
    },
    transition: { opacity: { duration: 0.2 } },
} satisfies MotionProps;

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const ref = useDetectClickOutside(
        {onTriggered: () => toggleThemeDropdown(false)}
    );

    const [isListOpened, setIsListOpened] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleThemeDropdown = (newVal: boolean) => {
        setIsListOpened(newVal);
    }

    const themes = useMemo(() => {
        return [
            {
                title: 'Light Mode',
                value: 'light',
                icon: LightIcon
            },
            {
                title: 'Dark Mode',
                value: 'dark',
                icon: DarkIcon
            },
        ]
    }, [])

    if(!mounted) return null

    return (
        <div className={styles.theme} ref={ref}>
            <button onClick={() => setTheme(themes.find(themeItem => themeItem.value !== theme)!.value)} className={styles.theme__icon}>
                {themes.find(themeItem => themeItem.value !== theme)!.icon()}
            </button>
        </div>
    )
}