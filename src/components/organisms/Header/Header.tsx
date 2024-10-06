import Link from 'next/link';
import classes from './style.module.scss';
import cn from 'classnames';
import {BrandLogo} from "@/components/atoms/Icons/BrandLogo";
import {Navigation} from "@/components/molecules/Navigation/Navigation";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import LanguageSwitcher from "@/components/atoms/LanguageSwitcher/LanguageSwitcher";
import {ThemeSwitcher} from "@/components/atoms/ThemeSwitcher/ThemeSwitcher";

export default function Header({locale}: {locale: string}) {

    return (
    <header className={cn(classes.header)}>
        <div className={cn('container', classes.header__container)}>
            <Link href='/'>
                <BrandLogo />
            </Link>

            <div className={classes.header__navigation}>
                <Navigation />
            </div>

            <div className={classes.header__actions}>

                <LanguageSwitcher locale={locale} />
                <ThemeSwitcher />
                <Link href={'/sign-up'}>
                    <Button theme={ButtonThemes.PRIMARY}>
                        Sign up
                    </Button>
                </Link>
                <Link href={'/sign-in'}>
                    <Button theme={ButtonThemes.SECONDARY}>
                        Sign in
                    </Button>
                </Link>
            </div>
        </div>
    </header>
);
}