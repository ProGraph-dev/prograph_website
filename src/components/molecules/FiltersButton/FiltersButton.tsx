import classes from './style.module.scss';
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import FilterIcon from "@/components/atoms/Icons/FilterIcon";
import {useState} from "react";
import cn from "classnames";

export interface FiltersButtonProps {
    filtersForm?: JSX.Element
}

export default function FiltersButton({filtersForm}: FiltersButtonProps) {
    const [menuState, setMenuState] = useState<boolean>(false);

    return <div className={classes.FiltersButton}>
        <Button className={classes.FiltersButton__button} theme={ButtonThemes.SECONDARY} onClick={() => setMenuState(!menuState)}>
            <FilterIcon />
            <span>Filters</span>
        </Button>

        <div className={cn(classes.FiltersButton__menu, menuState ? classes.FiltersButton__menu_active : null)}>
            {filtersForm && (
                filtersForm
            )}
        </div>
    </div>
}
