import '../../app/globals.css';
import {NextPageContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import ContactInfo from "@/components/molecules/Contacts/ContactInfo/ContactInfo";
import cn from "classnames";
import classes from './style.module.scss';
import ContactForm from "@/components/molecules/Contacts/ContactForm/ContactForm";

export default function Contacts() {
    return <section className={cn(classes.PageContainer, "container")}>
        <ContactInfo />
        <ContactForm />
    </section>
}

export const getServerSideProps = async (context: NextPageContext) => {
    const { locale = 'en' } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: []
        },
    };
};
