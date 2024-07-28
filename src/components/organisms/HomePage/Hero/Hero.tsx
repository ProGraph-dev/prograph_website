import cn from "classnames";
import classes from './style.module.scss';
import {motion} from "framer-motion";
import {Button, ButtonThemes} from "@/components/atoms/Button/Button";
import SocialLinks from "@/components/molecules/SocialLinks/SocialLInks";

export default function Hero({socialLinks} : {socialLinks: Record<string, string>}) {
    return (
        <div className={'container'}>
            <motion.div
                key="hero"
                className={cn(classes.hero)}
                initial={{opacity: 0, scale: 0, origin: 'left'}}
                animate={{opacity: 1, scale: 1, origin: 'left'}}
                transition={{
                    duration: 0.2,
                    ease: 'easeIn',
                }}
            >
                <h2 className={classes.hero__title}>
                    <span className={classes['hero__title-part']}>
                        Let us take you to a new level and make your business
                    </span>
                    &nbsp;
                    <motion.span
                        key="compoetetive"
                        className={cn('text_primary', classes['hero__title-part'])}
                        initial={{opacity: 0, scale: 0.5}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        competitive.
                    </motion.span>
                </h2>
                <article className={cn(classes.hero__description)}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and
                    scrambled it to make a type specimen book.
                </article>
                <Button theme={ButtonThemes.PRIMARY} className={cn(classes.hero__button)}>
                    Learn more...
                </Button>
                <SocialLinks links={socialLinks}/>
            </motion.div>
        </div>
    )
}