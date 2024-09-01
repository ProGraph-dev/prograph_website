import classes from './style.module.scss';
import cn from "classnames";
import Link from "next/link";
import {BrandLogo} from "@/components/atoms/Icons/BrandLogo";
import NewsletterForm from "@/components/molecules/NewsletterForm/NewsletterForm";
import FooterSocial from "@/components/molecules/FooterSocial/FooterSocial";

export default function FooterContent() {
    return (
        <div className={cn('container', classes.FooterContent)}>
            <Link href="/">
                <BrandLogo />
            </Link>
            <FooterSocial />
            <NewsletterForm submitted={() => {}} />
        </div>
    )
}
