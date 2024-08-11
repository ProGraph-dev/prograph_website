import classes from './style.module.scss';
import ViewToggle from "@/components/atoms/ViewToggle/ViewToggle";
import SearchInput from "@/components/atoms/SearchInput/SearchInput";
import FiltersButton from "@/components/molecules/FiltersButton/FiltersButton";

export interface FilterRowProps {
    viewToggled?: (view: "list"|"grid") => void,
    onSearch?: (searchPhrase: string) => void,
    defaultView?: "list"|"grid",
    filtersForm?: JSX.Element
}

export default function FilterRow({filtersForm, onSearch, viewToggled, defaultView='grid'}: FilterRowProps) {
    return (
        <div className={classes.FilterRow}>
            <SearchInput onChange={onSearch}/>
            <ViewToggle defaultValue={defaultView} onChange={viewToggled} />
            <FiltersButton filtersForm={filtersForm} />
        </div>
    )
}
