import HeartIcon from "@/components/atoms/Icons/HeartIcon";
import classes from "./style.module.scss";
import Image from "next/image";
import EyeIcon from "../../Icons/EyeIcon";
import Link from "next/link";
import cn from "classnames";

interface IProjectGridItemProps {
  id: string;
  title: string;
  image: string;
  author: string;
  likes: number;
  views: number;
  viewMode?: "grid" | "list";
}

export default function ProjectsGridItem({
  id = "",
  title = "Aesthetic Jewelry",
  image = "https://source.unsplash.com/random/400x300",
  author = "Name surname",
  likes = 50,
  views = 50,
  viewMode = "grid"
}: IProjectGridItemProps) {
  return (
    <Link 
      href={`/projects/${id}`} 
      className={cn(
        classes.GridItem,
        viewMode === "list" ? classes.GridItem_list : null
      )}
    >
      <Image 
        className={classes.GridItem__image} 
        src={image} 
        alt={title}
        width={400}
        height={300}
      />
      <div className={classes.GridItem__info}>
        <h4 className={classes.GridItem__title}>{title}</h4>
        <div className={classes.GridItem__authorKeeper}>
          <span className={classes.GridItem__author}>
            {author}
          </span>
          <div className={classes.GridItem__countInfoList}>
            <div className={classes.GridItem__countInfo}>
              <HeartIcon color={'white'} />
              {likes}
            </div>
            <div className={classes.GridItem__countInfo}>
              <EyeIcon color={'white'} />
              {views}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}