import classes from './style.module.scss';
import SubFooter from "@/components/atoms/Footer/SubFooter/SubFooter";
import FooterContent from "@/components/molecules/FooterContent/FooterContent";

export default function Footer() {
    return (
        <footer className={classes.Footer}>
            <FooterContent />
            <div className={classes.Footer__divider}></div>
            <SubFooter />
        </footer>
    )
}