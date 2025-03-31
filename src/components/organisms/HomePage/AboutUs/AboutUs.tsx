import classes from './style.module.scss';
import cn from "classnames";
import HorizontalTitle from "@/components/atoms/HorizontalTitle/HorizontalTitle";
import AboutUsCounter from "@/components/atoms/AboutUs/AboutUsCounter/AboutUsCounter";
import AboutUsDivider from "@/components/atoms/AboutUs/AboutUsDivider/AboutUsDivider";


export default function AboutUs() {
    return (
        <div className={cn(classes.AboutUs)}>
            <HorizontalTitle title={'About Us'} />
            <div className={cn(classes.AboutUs__container)}>
                <AboutUsCounter label={'Project'} count={777} />
                <AboutUsDivider />
                <AboutUsCounter label={'Working hours'} count={777} />
                <AboutUsDivider />
                <AboutUsCounter label={'Website'} count={777} />
            </div>
        </div>
    )
}
