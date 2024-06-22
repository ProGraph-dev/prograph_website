import Link from 'next/link';
import {useTranslation} from "next-i18next";
import classes from './style.module.scss';
import cn from 'classnames';
import {BrandLogo} from "@/components/atoms/Icons/BrandLogo";
import {Navigation} from "@/components/molecules/Navigation/Navigation";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";

export default function Header({locale}: {locale: string}) {
    const { t } = useTranslation();

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
                <Button theme={ButtonThemes.PRIMARY}>
                    Sign up
                </Button>
                <Button theme={ButtonThemes.SECONDARY}>
                    Sign in
                </Button>
            </div>

            {/*<LanguageSwitcher locale={locale} />*/}

            {/*<ThemeSwitcher />*/}
        </div>
    </header>
);
}