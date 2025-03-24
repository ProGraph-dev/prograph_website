import { useState } from "react";
import HeartIcon from "@/components/atoms/Icons/HeartIcon";
import classes from "./style.module.scss";
import Image from "next/image";
import EyeIcon from "../../Icons/EyeIcon";
import cn from "classnames";
import ProjectModal from "@/components/molecules/ProjectModal/ProjectModal";

interface IProjectGridItemProps {
  id?: string;
  title?: string;
  image?: string;
  author?: string;
  likes?: number;
  views?: number;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Mock project data with additional fields for the modal
  const projectData = {
    id,
    title,
    image,
    author,
    likes,
    views,
    description: "This is a detailed description of the project. It showcases the creative process and the final result of the work.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    images: [
      image,
      "https://source.unsplash.com/random/800x600?sig=1",
      "https://source.unsplash.com/random/800x600?sig=2",
    ]
  };

  return (
    <>
      <div 
        onClick={openModal}
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
      </div>

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        project={projectData}
      />
    </>
  );
}