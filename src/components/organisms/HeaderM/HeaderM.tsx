import { useState } from 'react';
import Link from 'next/link';
import classes from './style.module.scss';
import cn from 'classnames';
import {BrandLogo} from "@/components/atoms/Icons/BrandLogo";
import {Navigation} from "@/components/molecules/Navigation/Navigation";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import LanguageSwitcher from "@/components/atoms/LanguageSwitcher/LanguageSwitcher";
import {ThemeSwitcher} from "@/components/atoms/ThemeSwitcher/ThemeSwitcher";
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderM({locale}: {locale: string}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Prevent body scroll when menu is open
    if (typeof window !== 'undefined') {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    return (
        <header className={cn(classes.header)}>
            <div className={cn('container', classes.header__container)}>
                <Link href='/'>
                    <BrandLogo />
                </Link>

                <button 
                    className={cn(
                        classes.header__mobileMenuButton,
                        { [classes.header__mobileMenuButton_active]: mobileMenuOpen }
                    )}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            <motion.div 
                                className={classes.header__overlay}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={toggleMobileMenu}
                            />
                            <motion.div
                                className={classes.header__mobileMenu}
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'tween', duration: 0.3 }}
                            >
                                <div className={classes.header__mobileMenuContent}>
                                    <div className={classes.header__mobileNavigation}>
                                        <Navigation />
                                    </div>
                                    
                                    <div className={classes.header__mobileActions}>
                                        <div className={classes.header__mobileActionsRow}>
                                            <LanguageSwitcher locale={locale} />
                                            <ThemeSwitcher />
                                        </div>
                                        <Link href={'/sign-up'} className={classes.header__mobileButton}>
                                            <Button theme={ButtonThemes.PRIMARY} className={classes.header__fullWidthButton}>
                                                Sign up
                                            </Button>
                                        </Link>
                                        <Link href={'/sign-in'} className={classes.header__mobileButton}>
                                            <Button theme={ButtonThemes.SECONDARY} className={classes.header__fullWidthButton}>
                                                Sign in
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}