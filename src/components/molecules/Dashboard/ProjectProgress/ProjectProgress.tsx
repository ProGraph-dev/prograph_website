import { useEffect, useRef } from 'react';
import classes from './style.module.scss';

interface Step {
  name: string;
  completed: boolean;
}

interface ProjectProgressProps {
  title: string;
  projectName: string;
  currentStep: number;
  steps: Step[];
}

export default function ProjectProgress({ title, projectName, currentStep, steps }: ProjectProgressProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation class after component mounts
    const timer = setTimeout(() => {
      if (timelineRef.current) {
        timelineRef.current.classList.add(classes.projectProgress__timeline_animated);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.projectProgress}>
      <h2 className={classes.projectProgress__title}>{title}</h2>
      <h3 className={classes.projectProgress__projectName}>{projectName}</h3>
      
      <div className={classes.projectProgress__timeline} ref={timelineRef}>
        <div className={classes.projectProgress__line}>
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`${classes.projectProgress__lineSegment} ${
                index < currentStep ? classes.projectProgress__lineSegment_completed : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            ></div>
          ))}
        </div>
        
        <div className={classes.projectProgress__steps}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`${classes.projectProgress__step} ${
                index < currentStep ? classes.projectProgress__step_completed : ''
              } ${index === currentStep - 1 ? classes.projectProgress__step_current : ''}`}
            >
              <div className={classes.projectProgress__dot}></div>
              <div className={classes.projectProgress__stepName}>{step.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}