import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import styles from './style.module.scss';
import React, {useState, useTransition} from "react";
import Image from 'next/image'
import {useDetectClickOutside} from "react-detect-click-outside";
import {motion, MotionProps, Variants} from 'framer-motion';

export interface LanguageSwitcherProps {
    locale: string
}

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

export default function LanguageSwitcher({locale}: LanguageSwitcherProps) {
    const router = useRouter();
    const t = useTranslation()
    const ref = useDetectClickOutside(
        {onTriggered: () => toggleLanguageDropdown(false)}
    );
    const [activeLanguage, setActiveLanguage] = useState<string>(locale);
    const [isListOpened, setIsListOpened] = useState<boolean>(false);

    const listOfLanguages = [
        {
            title: 'English',
            flag: '/images/flags/states.png',
            value: 'en'
        },
        {
            title: 'Русский',
            flag: '/images/flags/russia.png',
            value: 'ru'
        },
        {
            title: 'Հայերեն',
            flag: '/images/flags/armenia.png',
            value: 'hy'
        }
    ];

    const handleLanguageChange = (lang: string) => {
        router.push(
            {
                pathname: router.pathname,
                query: router.query,
            },
            undefined,
            {locale: lang}
        )
        setActiveLanguage(lang);
    }

    const toggleLanguageDropdown = (newVal: boolean) => {
        setIsListOpened(newVal);
    }

    return (
        <div className={styles.flag} ref={ref}>
            <button onClick={() => toggleLanguageDropdown(true)} className={styles.flag__icon}>
                <Image width={24} height={15} src={listOfLanguages.find(lang => lang.value === activeLanguage)!.flag}
                       alt={""}/>
            </button>
            <motion.div
                animate={isListOpened ? "open" : "closed"}
                initial="closed"
                exit="closed"
                variants={menu}
                className={styles.flag__list}>
                {
                    listOfLanguages.map((lang) => (
                        <motion.div
                            {...item}
                            className={styles['flag__list-item']}
                            key={lang.value}
                            onClick={() => handleLanguageChange(lang.value)}
                        >
                            <Image width={24} height={15} className={styles['flag__list-icon']}
                                   src={lang.flag} alt={lang.title}/>
                            <span>{lang.title}</span>
                        </motion.div>
                    ))
                }
            </motion.div>
        </div>
    );
}