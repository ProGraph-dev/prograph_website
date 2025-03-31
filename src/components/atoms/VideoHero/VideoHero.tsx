import { useState, useEffect, useRef } from 'react';
import classes from './style.module.scss';

interface VideoHeroProps {
  videoSrc: string;
  posterSrc: string;
  altText?: string;
}

export default function VideoHero({ videoSrc, posterSrc, altText = 'Prograph company video' }: VideoHeroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    // Handle video loaded
    const handleVideoLoaded = () => {
      setIsLoading(false);
    };
    
    // Handle video ended
    const handleVideoEnded = () => {
      setHasPlayed(true);
      if (videoElement) {
        videoElement.currentTime = videoElement.duration - 0.1; // Set to last frame
      }
    };
    
    // Create intersection observer to play video when in viewport
    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && !hasPlayed && videoElement) {
        videoElement.play().catch(error => {
          console.error("Video play failed:", error);
          setHasPlayed(true); // Treat as played if autoplay fails
        });
      }
    }, { threshold: 0.5 });
    
    // Start observing the video element
    if (videoElement) {
      observerRef.current.observe(videoElement);
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
      videoElement.addEventListener('ended', handleVideoEnded);
    }
    
    // Cleanup
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
        videoElement.removeEventListener('ended', handleVideoEnded);
      }
      
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasPlayed]);

  return (
    <div className={classes.VideoHero}>
      {isLoading && (
        <div className={classes.VideoHero__loader}>
          <div className={classes.VideoHero__spinner}></div>
        </div>
      )}
      
      <video 
        ref={videoRef}
        className={classes.VideoHero__video}
        poster={posterSrc}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={videoSrc} type="video/mp4" />
        {altText}
      </video>
      
      {/* Overlay to prevent interactions */}
      <div className={classes.VideoHero__overlay} aria-hidden="true"></div>
    </div>
  );
}