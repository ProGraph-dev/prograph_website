import Link from "next/link"
import classes from './style.module.scss';
import NavLink from "@/components/atoms/NavLink/NavLink";

export const Navigation = () => {
    // @ts-ignore
    return <nav className={classes.links} style={{"--items": "4"}}>
        <NavLink href="/" activeClassName={classes.link_active} className={classes.link}>
            Home
        </NavLink>
        <NavLink href="/services" activeClassName={classes.link_active} className={classes.link}>
            Services
        </NavLink>
        <NavLink href="/our-team" activeClassName={classes.link_active} className={classes.link}>
            Our Team
        </NavLink>
        <NavLink href="/contacts" activeClassName={classes.link_active} className={classes.link}>
            Contacts
        </NavLink>
        <span className={classes.line}></span>
    </nav>
}