import classes from './style.module.scss';
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import FilterIcon from "@/components/atoms/Icons/FilterIcon";
import {useEffect, useState} from "react";
import cn from "classnames";
import {useTranslation} from "next-i18next";

export interface IFiltersButtonProps {
    filtersForm?: JSX.Element
}

export default function FiltersButton({filtersForm}: IFiltersButtonProps) {
    const [menuState, setMenuState] = useState<boolean>(false);

    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return <div className={classes.FiltersButton}>
        <Button className={classes.FiltersButton__button} theme={ButtonThemes.SECONDARY} onClick={() => setMenuState(!menuState)}>
            <FilterIcon />
            <span>{mounted ? t('filters.filters') : ''}</span>
        </Button>

        <div className={cn(classes.FiltersButton__menu, menuState ? classes.FiltersButton__menu_active : null)}>
            {filtersForm && (
                filtersForm
            )}
        </div>
    </div>
}
