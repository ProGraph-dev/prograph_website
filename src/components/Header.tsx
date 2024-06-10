import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import {useTranslation} from "next-i18next";
import {ThemeSwitcher} from "@/components/ThemeSwitcher";

export default function Header({locale}: {locale: string}) {
    const { t } = useTranslation();

    return (
    <header>
        <div>
            <Link href='/'>
                <h2>
                    {t('test')}
                </h2>
            </Link>

            <LanguageSwitcher locale={locale} />

            <ThemeSwitcher />
        </div>
    </header>
);
}