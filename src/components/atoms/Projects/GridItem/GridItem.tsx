import HeartIcon from "@/components/atoms/Icons/HeartIcon";
import classes from "./style.module.scss";
import Image from "next/image";
import EyeIcon from "../../Icons/EyeIcon";
import Link from "next/link";

export default function ProjectsGridItem() {
    return (
        <Link href={'/projects'} className={classes.GridItem}>
            <Image className={classes.GridItem__image} src="" alt=""/>
            <div className={classes.GridItem__info}>
                <h4 className={classes.GridItem__title}>Aesthetic Jewelry</h4>
                <div className={classes.GridItem__authorKeeper}>
                    <span className={classes.GridItem__author}>
                        Name surname
                    </span>
                    <div className={classes.GridItem__countInfoList}>
                        <div className={classes.GridItem__countInfo}>
                            <HeartIcon color={'white'} />
                            50
                        </div>
                        <div className={classes.GridItem__countInfo}>
                            <EyeIcon color={'white'} />
                            50
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}