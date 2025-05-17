import classes from './style.module.scss';
import {useFormik} from "formik";
import * as yup from "yup";
import Input from "@/components/atoms/Formik/Input/Input";
import yup_password from 'yup-password';
import Checkbox from "@/components/atoms/Formik/Checkbox/Checkbox";
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

export interface ISignInForm {
    email: string;
    password: string;
    remember: boolean;
}

export interface ISignInFormParams {
    submitted?: (form: object) => void
}

export default function SignInForm({submitted}: ISignInFormParams) {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const formik = useFormik<ISignInForm>({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
        onSubmit: async (values) => {
            setError(null);
            setIsLoading(true);
            try {
                const response = await authService.login(values.email, values.password);
                authService.setToken(response.token);
                if (values.remember) {
                    // Additional remember me logic can be implemented here
                }
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
                .minSymbols(1, t('auth.validation.password-special')),
            remember: yup
                .boolean(),
        })
    });

    return (
        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }} className={classes.Form}>
            <h1 className={classes.Form__title}>{mounted ? t('auth.sign-in.title') : ''}</h1>
            <Input
                id={'email'}
                name={'email'}
                type={'email'}
                label={mounted ? t('auth.sign-in.email') : ''}
                value={formik.values.email}
                onChange={formik.handleChange}
                required={true}
            />
            <Input
                id={'password'}
                name={'password'}
                type={'password'}
                label={mounted ? t('auth.sign-in.password') : ''}
                value={formik.values.password}
                onChange={formik.handleChange}
                required={true}
            />
            <div className={classes.Form__rememberRow}>
                <Checkbox
                    id={'remember'}
                    name={'remember'}
                    label={mounted ? t('auth.sign-in.remember-me') : ''}
                    value={formik.values.remember}
                    onChange={formik.handleChange}
                />
                <Link className={classes.Form__forgetLink} href={'/forget-password'}>{mounted ? t('auth.sign-in.forget-password') : ''}</Link>
            </div>

            {error && <div className={classes.Form__error}>{error}</div>}
            <Button 
                type="submit"
                className={classes.Form__submit} 
                theme={ButtonThemes.PRIMARY} 
                disabled={isLoading}
            >
                {mounted ? (isLoading ? t('auth.sign-in.loading') : t('auth.sign-in.button')) : ''}
            </Button>

            {/* <div className={classes.Form__social}>
                <h5 className={classes.Form__socialTitle}>{mounted ? t('auth.sign-in.or-sign-in-with') : ''}</h5>
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
                <span>Don’t have an account?</span>
                <Link className={classes.Form__forgetLink} href={'/sign-up'}>Sing up</Link>
            </div>
        </form>
    )
}