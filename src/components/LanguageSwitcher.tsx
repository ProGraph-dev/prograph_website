import {useRouter} from "next/router";

export default function LanguageSwitcher() {
    const router = useRouter();

    return (<div>
        <select onChange={(e) =>
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