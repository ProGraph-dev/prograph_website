import '../../app/globals.css';
import classes from './style.module.scss';
import SignUpForm from "@/components/organisms/SignUp/Form/Form";
import cn from "classnames";

export default function SignUp() {
    return (
        <section className={cn(classes.SignUp, 'container')}>
            <SignUpForm />
        </section>
    );
}