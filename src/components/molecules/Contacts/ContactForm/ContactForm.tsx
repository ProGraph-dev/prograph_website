import classes from './style.module.scss';
import {useFormik} from "formik";
import InputMask from 'react-input-mask';
import * as yup from "yup";
import cn from "classnames";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";

export interface IContactForm {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    message: string;
}

export interface IContactFormProps {
    submitted?: (form: IContactForm) => void
}

export default function ContactForm({submitted}: IContactFormProps) {
    const formik = useFormik<IContactForm>({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            message: ''
        },
        onSubmit: (values) => {
            // Some action goes here
            if (submitted) {
                submitted(values)
            }
        },
        validateOnBlur: true,
        validateOnMount: false,
        validateOnChange: false,
        validationSchema: yup.object({
            first_name: yup.string().required(),
            last_name: yup.string().required(),
            email: yup
                .string()
                .email('Must be a valid email')
                .required('Email is required'),

            phone: yup.string().matches(/[+]374\d{8}/i),
            message: yup.string()
        }),
    });

    return <form className={classes.ContactForm} onSubmit={formik.submitForm}>
        <div className={classes.ContactForm__row}>
            <label
                className={classes.ContactForm__field}
            >
                <span className={classes.ContactForm__label}>
                    First Name
                </span>
                <div
                    className={classes.ContactForm__input_field}
                >
                    <input
                        type="text"
                        name="first_name"
                        className={classes.ContactForm__input}
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={'Your First Name'}
                    />
                    <span className={classes.ContactForm__input_bg}></span>
                </div>
            </label>

            <label
                className={classes.ContactForm__field}
            >
                <span className={classes.ContactForm__label}>
                    Last Name
                </span>
                <div
                    className={classes.ContactForm__input_field}
                >
                    <input
                        type="text"
                        name="last_name"
                        className={classes.ContactForm__input}
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={'Your Last Name'}
                    />
                    <span className={classes.ContactForm__input_bg}></span>
                </div>
            </label>
        </div>

        <label
            className={classes.ContactForm__field}
        >
            <span className={classes.ContactForm__label}>
                Email
            </span>
            <div
                className={classes.ContactForm__input_field}
            >
                <input
                    type="email"
                    name="email"
                    className={classes.ContactForm__input}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={'Youremail@gmail.com'}
                />
                <span className={classes.ContactForm__input_bg}></span>
            </div>
        </label>

        <label
            className={classes.ContactForm__field}
        >
            <span className={classes.ContactForm__label}>
                Phone
            </span>
            <div
                className={classes.ContactForm__input_field}
            >
                <InputMask
                    mask="+374 99 99 99 99"
                    name="phone_number"
                    className={classes.ContactForm__input}
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={'+374 00 00 00 00'}
                />
                <span className={classes.ContactForm__input_bg}></span>
            </div>
        </label>

        <label
            className={classes.ContactForm__field}
        >
            <span className={classes.ContactForm__label}>
                Message
            </span>
            <div
                className={cn(classes.ContactForm__input_field, classes.ContactForm__input_field_textarea)}
            >
                <textarea
                    className={cn(classes.ContactForm__input, classes.ContactForm__textarea)}
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={'Type your message here...'}
                    rows={4}
                >
                    {formik.values.message}
                </textarea>
                <span className={classes.ContactForm__input_bg}></span>
            </div>
        </label>
        <Button className={classes.ContactForm__submit} theme={ButtonThemes.PRIMARY}>
            Send Message
        </Button>
    </form>
}
