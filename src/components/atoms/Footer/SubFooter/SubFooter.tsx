import classes from './style.module.scss';

export default function SubFooter() {

    return (
        <div className={classes.SubFooter}>
            <span className={classes.SubFooter__copyright}>
                © {new Date().getFullYear()} ProGraph company: All rights reserved
            </span>
        </div>
    )
}
