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
import { useState } from 'react';
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
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
                .required('Name is required')
                .min(2, 'Name must be at least 2 characters'),
            email: yup
                .string()
                .email('Must be a valid email')
                .required('Email is required'),
            password: yup.string()
                .min(
                    8,
                    'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
                )
                .minLowercase(1, 'password must contain at least 1 lower case letter')
                .minUppercase(1, 'password must contain at least 1 upper case letter')
                .minNumbers(1, 'password must contain at least 1 number')
                .minSymbols(1, 'password must contain at least 1 special character')
                .required('Password is required'),
            confirmPassword: yup.string()
                .oneOf([yup.ref('password')], 'Passwords must match')
                .required('Please confirm your password')
        })
    });

    return (
        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }} className={classes.Form}>
            <h1 className={classes.Form__title}>Sign up</h1>
            <Input
                id={'email'}
                name={'email'}
                type={'email'}
                label={'Email'}
                value={formik.values.email}
                onChange={formik.handleChange}
                required={true}
            />
            <Input
                id={'password_confirmation'}
                name={'password_confirmation'}
                type={'password'}
                label={'Confirm Password'}
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
                {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>

            {/* <div className={classes.Form__social}>
                <h5 className={classes.Form__socialTitle}>or sign in with</h5>
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
                <span>Already have an account?</span>
                <Link className={classes.Form__forgetLink} href={'/sign-in'}>Sing in</Link>
            </div>
        </form>
    );
}