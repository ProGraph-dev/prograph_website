import classes from './style.module.scss';
import SearchIcon from "@/components/atoms/Icons/SearchIcon";
import {useEffect, useState} from "react";
import useDebounce from "@/components/hooks/useDebounce";

export interface SearchInputProps {
    onChange?: (expression: string) => void
}

export default function SearchInput({onChange} : SearchInputProps) {
    const [searchPhrase, setSearchPhrase] = useState<string>('');
    const debouncedSearchTerm = useDebounce<string>(searchPhrase, 500);

    useEffect(() => {
        if (onChange) {
            onChange(debouncedSearchTerm)
        }
    }, [debouncedSearchTerm, onChange])

    return <div className={classes.SearchInput}>
        <div className={classes.SearchInput__icon}>
            <SearchIcon />
        </div>
        <input type="text" placeholder={"Search necessary..."} className={classes.SearchInput__field} value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} />
    </div>
}