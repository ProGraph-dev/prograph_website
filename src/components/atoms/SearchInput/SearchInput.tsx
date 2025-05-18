import classes from './style.module.scss';
import SearchIcon from "@/components/atoms/Icons/SearchIcon";
import {useEffect, useState} from "react";
import useDebounce from "@/components/hooks/useDebounce";
import {useTranslation} from "next-i18next";

export interface ISearchInputProps {
    onChange?: (expression: string) => void
}

export default function SearchInput({onChange} : ISearchInputProps) {
    const [searchPhrase, setSearchPhrase] = useState<string>('');
    const debouncedSearchTerm = useDebounce<string>(searchPhrase, 500);

    const { t } = useTranslation('common');

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (onChange) {
            onChange(debouncedSearchTerm)
        }
    }, [debouncedSearchTerm])

    return <div className={classes.SearchInput}>
        <div className={classes.SearchInput__icon}>
            <SearchIcon />
        </div>
        <input type="text" placeholder={mounted ? t('filters.search') : ''} className={classes.SearchInput__field} value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} />
    </div>
}