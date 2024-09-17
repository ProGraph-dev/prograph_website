import '../../app/globals.css';
import classes from './style.module.scss';
import cn from "classnames";
import SignInForm from "@/components/organisms/SignIn/Form/Form";

export default function SignIn() {
    return (
        <section className={cn(classes.SignIn, 'container')}>
            <SignInForm />
        </section>
    );
}
