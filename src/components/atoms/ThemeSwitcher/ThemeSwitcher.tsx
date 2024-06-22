// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import colors from '../../../app/variables/colors.css'

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return (
        <div style={{ color: colors.white}}>
            The current theme is: {theme}
            <button onClick={() => setTheme('default')}>System default</button>
            <button onClick={() => setTheme('light')}>Light Mode</button>
            <button onClick={() => setTheme('dark')}>Dark Mode</button>
        </div>
    )
};