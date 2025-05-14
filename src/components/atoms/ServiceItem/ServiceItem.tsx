import classes from './style.module.scss';
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@/components/atoms/Icons/HeartIcon";
import EyeIcon from "@/components/atoms/Icons/EyeIcon";

export interface IServiceItemProps {
    title: string;
    type: string;
    id: number;
    image: string;
    likes: number;
    views: number;
}

export default function ServiceItem({title, type, likes, views, image, id}: IServiceItemProps) {
    return <Link className={cn(classes.ServiceItem)} href={'/services/'+id}>
        <div className={cn(classes.ServiceItem__container)}>
            <div className={cn(classes['ServiceItem__image-keeper'])}>
                <Image className={cn(classes.ServiceItem__image)} src={image} alt={title} width={492} height={330}/>
            </div>
            <div className={cn(classes['ServiceItem__title-keeper'])}>
                <h4 className={cn(classes.ServiceItem__title)}>
                    {title}
                </h4>
            </div>
            <div className={cn(classes.ServiceItem__info)}>
                <span className={cn(classes.ServiceItem__type)}>
                    {type}
                </span>
                <div className={cn(classes.ServiceItem__counts)}>
                    <div>
                        <HeartIcon />
                        <span>{likes}</span>
                    </div>
                    <div>
                        <EyeIcon />
                        <span>{views}</span>
                    </div>
                </div>
            </div>
            <article
                className={cn(classes.ServiceItem__description)}
            >
            </article>
        </div>
    </Link>
}