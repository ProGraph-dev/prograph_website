import classes from './style.module.scss';
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import {EmailIcon} from "@/components/atoms/Icons/Contacts/EmailIcon";
import {PhoneIcon} from "@/components/atoms/Icons/Contacts/PhoneIcon";

export default function ContactInfo() {
    return <div className={classes.ContactInfo}>
        <h1 className={classes.ContactInfo__title}>Contact Us</h1>
        <h5 className={classes.ContactInfo__subtitle}>Any question? We would be <br/> happy to help you!</h5>
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
