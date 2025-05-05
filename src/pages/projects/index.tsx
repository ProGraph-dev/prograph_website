import '../../app/globals.css';
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProjectsGrid from "@/components/molecules/ProjectsGrid/ProjectsGrid";
import { useState, useEffect, useCallback, useRef } from 'react';
import cn from 'classnames';
import { IProduct, productService } from '@/services/productService';

export default function Projects() {
  const [projects, setProjects] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loader = useRef(null);

  const loadProjects = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await productService.getProducts(page * 20, 20);
      if (response.items.length === 0) {
        setHasMore(false);
      } else {
        setProjects(prev => [...prev, ...response.items]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadProjects();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [loadProjects]);

  // In a real application, you would fetch data from an API
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await fetch('/api/projects');
  //       const data = await response.json();
  //       setProjects(data);
  //     } catch (error) {
  //       console.error('Error fetching projects:', error);
  //     }
  //   };
  //   
  //   fetchProjects();
  // }, []);

  return (
    <section className={cn('container')}>
      <ProjectsGrid projects={projects} showFilters />
    </section>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { locale = 'en' } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};