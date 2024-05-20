import {useRouter} from "next/router";
import {useTransition} from "react";
import {useTranslation} from "next-i18next";

export default function LanguageSwitcher({locale}: {locale: string}) {
    const router = useRouter();
    const t = useTranslation()

    return (<div>
        <select
            value={locale}
            onChange={(e) =>
        router.push(
            {
                pathname: router.pathname,
                query: router.query,
            },
            undefined,
            { locale: e.target.value }
        )
    }>
        <option value='en'>English</option>
        <option value='ru'>Russian</option>
        <option value='hy'>Armenian</option>
    </select></div>);
}