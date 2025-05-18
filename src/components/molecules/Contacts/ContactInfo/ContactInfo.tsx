import classes from './style.module.scss';
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import {EmailIcon} from "@/components/atoms/Icons/Contacts/EmailIcon";
import {PhoneIcon} from "@/components/atoms/Icons/Contacts/PhoneIcon";
import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";

export default function ContactInfo() {
    const { t } = useTranslation('contacts');

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return <div className={classes.ContactInfo}>
        <h1 className={classes.ContactInfo__title}>{ mounted ? t('hero.title') : ''}</h1>
        <h5 className={classes.ContactInfo__subtitle}>{ mounted ? t('hero.description') : ''}</h5>
        <a href="tel:+37400000000" className={classes.ContactInfo__action}>
            <Button className={classes.ContactInfo__actionButton} theme={ButtonThemes.SECONDARY}>
                <PhoneIcon />
                <span>
                    +374 00 00 00 00
                </span>
            </Button>
        </a>
        <a href="mailto:ProGraph@gmail.com" className={classes.ContactInfo__action}>
            <Button className={classes.ContactInfo__actionButton} theme={ButtonThemes.PRIMARY}>
                <EmailIcon />
                <span>
                    ProGraph@gmail.com
                </span>
            </Button>
        </a>
    </div>
}
