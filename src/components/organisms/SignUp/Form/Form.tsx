import classes from './style.module.scss';
import {useFormik} from "formik";
import * as yup from "yup";
import Input from "@/components/atoms/Formik/Input/Input";
import yup_password from 'yup-password';
import Link from "next/link";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import FacebookIcon from "@/components/atoms/Icons/SocialLogin/FacebookIcon";
import GoogleIcon from "@/components/atoms/Icons/SocialLogin/GoogleIcon";
import cn from "classnames";
import { useRouter } from 'next/router';
import { authService } from '@/services/authService';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
yup_password(yup);

export interface ISignUpForm {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ISignUpFormParams {
    submitted?: (form: object) => void
}

export default function SignUpForm({submitted}: ISignUpFormParams) {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const formik = useFormik<ISignUpForm>({
        initialValues: {
            full_name: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        onSubmit: async (values) => {
            setError(null);
            setIsLoading(true);
            try {
                const response = await authService.register(values.email, values.password);
                authService.setToken(response.token);
                router.push('/dashboard');
                if (submitted) {
                    submitted(values);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        },
        validateOnBlur: true,
        validateOnMount: false,
        validateOnChange: false,
        validationSchema: yup.object({
            name: yup
                .string()
                .required(t('auth.validation.name-required'))
                .min(2, t('auth.validation.name-min-length')),
            email: yup
                .string()
                .email(t('auth.validation.email-invalid'))
                .required(t('auth.validation.email-required')),
            password: yup.string()
                .min(
                    8,
                    t('auth.validation.password-requirements')
                )
                .minLowercase(1, t('auth.validation.password-lowercase'))
                .minUppercase(1, t('auth.validation.password-uppercase'))
                .minNumbers(1, t('auth.validation.password-number'))
                .minSymbols(1, t('auth.validation.password-special'))
                .required(t('auth.validation.password-required')),
            confirmPassword: yup.string()
                .oneOf([yup.ref('password')], t('auth.validation.password-match'))
                .required(t('auth.validation.confirm-password-required'))
        })
    });

    return (
        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }} className={classes.Form}>
            <h1 className={classes.Form__title}>{mounted ? t('auth.sign-up.title') : ''}</h1>
            <Input
                id={'email'}
                name={'email'}
                type={'email'}
                label={mounted ? t('auth.sign-up.email') : ''}
                value={formik.values.email}
                onChange={formik.handleChange}
                required={true}
            />
            <Input
                id={'password_confirmation'}
                name={'password_confirmation'}
                type={'password'}
                label={mounted ? t('auth.sign-up.confirm-password') : ''}
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                required={true}
            />

            {error && <div className={classes.Form__error}>{error}</div>}
            <Button 
                type="submit"
                className={classes.Form__submit} 
                theme={ButtonThemes.PRIMARY}
                disabled={isLoading}
            >
                {mounted ? (isLoading ? t('auth.sign-up.loading') : t('auth.sign-up.button')) : ''}
            </Button>

            {/* <div className={classes.Form__social}>
                <h5 className={classes.Form__socialTitle}>{mounted ? t('auth.sign-up.or-sign-in-with') : ''}</h5>
                <div className={classes.Form__socialList}>
                    <Link href={'https://facebook.com'} target={'_blank'} className={classes.Form__socialLink}>
                        <FacebookIcon />
                    </Link>
                    <Link href={'https://google.com'} target={'_blank'} className={classes.Form__socialLink}>
                        <GoogleIcon />
                    </Link>
                </div>
            </div> */}

            <div className={cn(classes.Form__rememberRow, classes.Form__rememberRow_small)}>
                <span>{mounted ? t('auth.sign-up.already-have-account') : ''}</span>
                <Link className={classes.Form__forgetLink} href={'/sign-in'}>{mounted ? t('auth.sign-up.sign-in-link') : ''}</Link>
            </div>
        </form>
    );
}