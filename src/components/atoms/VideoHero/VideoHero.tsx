import { useState, useEffect, useRef } from 'react';
import classes from './style.module.scss';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();
  
  // Determine video source based on theme
  const getVideoSource = () => {
    if (theme === 'dark') {
      // Add _dark suffix before the file extension
      const lastDotIndex = videoSrc.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        return videoSrc.substring(0, lastDotIndex) + '_dark' + videoSrc.substring(lastDotIndex);
      }
    }
    return videoSrc;
  };

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
  
  // Reset video state when theme changes
  useEffect(() => {
    setHasPlayed(false);
    setIsLoading(true);
  }, [theme]);

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
        <source src={getVideoSource()} type="video/mp4" />
        {altText}
      </video>
      
      {/* Overlay to prevent interactions */}
      <div className={classes.VideoHero__overlay} aria-hidden="true"></div>
    </div>
  );
}