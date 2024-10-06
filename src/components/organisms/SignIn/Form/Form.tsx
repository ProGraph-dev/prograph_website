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
    const formik = useFormik<ISignInForm>({
        initialValues: {
            email: '',
            password: '',
            remember: false,
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
            password: yup.string()
                .min(
                    8,
                    'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
                )
                .minLowercase(1, 'password must contain at least 1 lower case letter')
                .minUppercase(1, 'password must contain at least 1 upper case letter')
                .minNumbers(1, 'password must contain at least 1 number')
                .minSymbols(1, 'password must contain at least 1 special character'),
            remember: yup
                .boolean(),
        })
    });

    return (
        <form onSubmit={formik.submitForm} className={classes.Form}>
            <h1 className={classes.Form__title}>Sign in</h1>
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
                id={'password'}
                name={'password'}
                type={'password'}
                label={'Password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                required={true}
            />
            <div className={classes.Form__rememberRow}>
                <Checkbox
                    id={'remember'}
                    name={'remember'}
                    label={'Remember me'}
                    value={formik.values.remember}
                    onChange={formik.handleChange}
                />
                <Link className={classes.Form__forgetLink} href={'/forget-password'}>Forget password?</Link>
            </div>

            <Button className={classes.Form__submit} theme={ButtonThemes.PRIMARY}>
                Sign in
            </Button>

            <div className={classes.Form__social}>
                <h5 className={classes.Form__socialTitle}>or sign in with</h5>
                <div className={classes.Form__socialList}>
                    <Link href={'https://facebook.com'} target={'_blank'} className={classes.Form__socialLink}>
                        <FacebookIcon />
                    </Link>
                    <Link href={'https://google.com'} target={'_blank'} className={classes.Form__socialLink}>
                        <GoogleIcon />
                    </Link>
                </div>
            </div>

            <div className={cn(classes.Form__rememberRow, classes.Form__rememberRow_small)}>
                <span>Don’t have an account?</span>
                <Link className={classes.Form__forgetLink} href={'/sign-up'}>Sing up</Link>
            </div>
        </form>
    )
}