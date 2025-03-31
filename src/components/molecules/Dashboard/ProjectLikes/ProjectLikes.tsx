import Image from 'next/image';
import classes from './style.module.scss';

interface ProjectLike {
  id: number;
  title: string;
  image: string;
  views: number;
  likes: number;
}

interface ProjectLikesProps {
  likes: ProjectLike[];
}

export default function ProjectLikes({ likes }: ProjectLikesProps) {
  return (
    <div className={classes.projectLikes}>
      <h2 className={classes.projectLikes__title}>Likes</h2>
      
      <div className={classes.projectLikes__grid}>
        {likes.map(project => (
          <div key={project.id} className={classes.projectLikes__item}>
            <div className={classes.projectLikes__imageWrapper}>
              <Image 
                src={project.image} 
                alt={project.title} 
                width={300} 
                height={180} 
                className={classes.projectLikes__image}
              />
            </div>
            <div className={classes.projectLikes__info}>
              <h3 className={classes.projectLikes__projectTitle}>{project.title}</h3>
              <div className={classes.projectLikes__stats}>
                <div className={classes.projectLikes__stat}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{project.views}</span>
                </div>
                <div className={classes.projectLikes__stat}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{project.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}