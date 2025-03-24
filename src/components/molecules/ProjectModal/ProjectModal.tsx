// Add this import at the top if you don't have it already
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import classes from './style.module.scss';
import cn from 'classnames';
import HeartIcon from '@/components/atoms/Icons/HeartIcon';
import EyeIcon from '@/components/atoms/Icons/EyeIcon';
import { Button, ButtonThemes } from '@/components/atoms/Button/Button';
import CloseIcon from '@/components/atoms/Icons/CloseIcon';

// Animation variants for the modal
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

// Animation variants for the overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export interface IProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    image: string;
    author: string;
    likes: number;
    views: number;
    description?: string;
    content?: string;
    images?: string[];
  };
}

export default function ProjectModal({ isOpen, onClose, project }: IProjectModalProps) {
  const [isAtTop, setIsAtTop] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle scroll events to detect if we're at the top
  const handleScroll = () => {
    if (contentRef.current) {
      setIsAtTop(contentRef.current.scrollTop < 50);
    }
  };

  // Add/remove scroll event listener
  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => {
        contentElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isOpen]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={classes.ProjectModal__overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <div className={classes.ProjectModal}>
            <motion.div
              className={classes.ProjectModal__container}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button 
                className={classes.ProjectModal__close} 
                onClick={onClose}
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>
              
              <div 
                className={cn(
                  classes.ProjectModal__content,
                  isAtTop ? classes.ProjectModal__content_top : classes.ProjectModal__content_scrolled
                )}
                ref={contentRef}
              >
                <div className={classes.ProjectModal__header}>
                  <h2 className={classes.ProjectModal__title}>{project.title}</h2>
                  <div className={classes.ProjectModal__meta}>
                    <div className={classes.ProjectModal__author}>
                      By <span>{project.author}</span>
                    </div>
                    <div className={classes.ProjectModal__stats}>
                      <div className={classes.ProjectModal__stat}>
                        <HeartIcon color="var(--primary)" />
                        <span>{project.likes}</span>
                      </div>
                      <div className={classes.ProjectModal__stat}>
                        <EyeIcon color="var(--primary)" />
                        <span>{project.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={classes.ProjectModal__gallery}>
                  {project.images && project.images.length > 0 ? (
                    project.images.map((img, index) => (
                      <div key={index} className={classes.ProjectModal__imageContainer}>
                        <Image
                          src={img}
                          alt={`${project.title} - image ${index + 1}`}
                          width={800}
                          height={600}
                          className={classes.ProjectModal__image}
                          layout="responsive"
                        />
                      </div>
                    ))
                  ) : (
                    <div className={classes.ProjectModal__imageContainer}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={600}
                        className={classes.ProjectModal__image}
                        layout="responsive"
                      />
                    </div>
                  )}
                </div>

                <div className={classes.ProjectModal__description}>
                  <h3>Project Description</h3>
                  <p>{project.description || "No description available."}</p>
                </div>

                {project.content && (
                  <div className={classes.ProjectModal__content_text}>
                    <h3>Project Details</h3>
                    <p>{project.content}</p>
                  </div>
                )}

                <div className={classes.ProjectModal__actions}>
                  <Button theme={ButtonThemes.PRIMARY}>
                    Contact Author
                  </Button>
                  <Button theme={ButtonThemes.SECONDARY}>
                    Download Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}