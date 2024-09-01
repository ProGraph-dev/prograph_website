import {ucWords} from "@/helpers/ucWords";
import FacebookIcon from "@/components/atoms/Icons/FacebookIcon";
import InstagramIcon from "@/components/atoms/Icons/InstagramIcon";
import LinkedInIcon from "@/components/atoms/Icons/LinkedInIcon";
import GmailIcon from "@/components/atoms/Icons/GmailIcon";
import classes from './style.module.scss';
import cn from "classnames";

export default function SocialLinks ({links}: { links: Record<string, string> }) {
    const formatPlatformNames = (platform: string) => {
        switch (platform) {
            case 'facebook':
                return FacebookIcon();
            case 'instagram':
                return InstagramIcon();
            case 'linked-in':
                return LinkedInIcon();
            case 'gmail':
                return GmailIcon();
        }
        return ucWords(platform.replace('-', ' '));
    }

    return (
        <div className={classes.socialLinks}>
            {Object.keys(links).map((platform: string) =>
                <a href={links[platform]} key={platform}>
                    {formatPlatformNames(platform)}
                </a>
            )}
            <div key={'social_links_start'} className={cn(classes.socialLinks__background, classes.socialLinks__background_start)}></div>
            <div key={'social_links_end'} className={cn(classes.socialLinks__background, classes.socialLinks__background_end)}></div>
        </div>
    )
}