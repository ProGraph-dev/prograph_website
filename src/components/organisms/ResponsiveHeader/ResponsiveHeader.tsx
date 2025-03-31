import { useState, useEffect } from 'react';
import Header from '@/components/organisms/Header/Header';
import HeaderM from '@/components/organisms/HeaderM/HeaderM';

interface ResponsiveHeaderProps {
  locale: string;
}

export default function ResponsiveHeader({ locale }: ResponsiveHeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  return isMobile ? <HeaderM locale={locale} /> : <Header locale={locale} />;
}