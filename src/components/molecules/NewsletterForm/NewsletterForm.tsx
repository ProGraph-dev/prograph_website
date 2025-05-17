'use client';

import classes from './style.module.scss';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

interface INewsletterFormProps {
    submitted?: (formDate: unknown) => unknown
}

export default function NewsletterForm({submitted}: INewsletterFormProps) {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    const formik = useFormik({
        initialValues: {
            email: '',
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
            email: yup
                .string()
                .email('Must be a valid email')
                .required('Email is required'),
        }),
    });

    return (
        <form onSubmit={formik.submitForm} className={classes.NewsletterForm}>
            <label
                className={classes.NewsletterForm__label}
                htmlFor="email"
            >
                {mounted ? t('footer.newsletter.title') : ''}
            </label>
            <div className={classes.NewsletterForm__field}>
                <input
                    type="text"
                    name="email"
                    className={classes.NewsletterForm__input}
                    placeholder={mounted ? t('footer.newsletter.placeholder') : ''}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <Button theme={ButtonThemes.PRIMARY} className={classes.NewsletterForm__submit} type="submit">
                    {mounted ? t('footer.newsletter.button') : ''}
                </Button>
                {formik.errors.email && (
                    <div className={classes.NewsletterForm__error}>{formik.errors.email}</div>
                )}
            </div>
        </form>
    )
}