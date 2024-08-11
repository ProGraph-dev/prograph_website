import {Formik} from "formik";
import classes from './style.module.scss';
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";

export interface ServicesFilterFormProps {
    onSubmit: (values: {category: string}) => void
}

export default function ServicesFilterForm({onSubmit}: ServicesFilterFormProps) {
    return <Formik onSubmit={onSubmit} initialValues={{category: ''}}>
        <div className={classes.ServicesFilterForm__container}>
            <select name="category" className={classes.ServicesFilterForm__field}>
                <option value="">All categories</option>
                <option value="category-1">Category 1</option>
                <option value="category-2">Category 2</option>
            </select>

            <Button theme={ButtonThemes.PRIMARY} className={classes.ServicesFilterForm__submit}>
                Apply
            </Button>
        </div>
    </Formik>
}