import classes from './style.module.scss';
import Link from "next/link";
import FacebookIcon from "@/components/atoms/Icons/FooterSocials/FacebookIcon";
import LinkedInIcon from "@/components/atoms/Icons/FooterSocials/LinkedInIcon";
import InstagramIcon from "@/components/atoms/Icons/FooterSocials/InstagramIcon";
import GmailIcon from "@/components/atoms/Icons/FooterSocials/GmailIcon";

export default function FooterSocial() {
    return (
        <div className={classes.FooterSocial}>
            <div className={classes.FooterSocial__list}>
                <a className={classes.FooterSocial__link} href="https://instagram.com/@prograph" target="_blank">
                    <LinkedInIcon />
                </a>
                <a className={classes.FooterSocial__link} href="https://instagram.com/@prograph" target="_blank">
                    <InstagramIcon />
                </a>
                <a className={classes.FooterSocial__link} href="https://instagram.com/@prograph" target="_blank">
                    <FacebookIcon />
                </a>
                <a className={classes.FooterSocial__link} href="https://instagram.com/@prograph" target="_blank">
                    <GmailIcon />
                </a>
            </div>
            <Link href="/privacy-policy" className={classes.FooterSocial__privacy}>
                Privacy policy
            </Link>
        </div>
    )
}
