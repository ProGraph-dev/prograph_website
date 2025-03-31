import '../../app/globals.css';
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProjectsGrid from "@/components/molecules/ProjectsGrid/ProjectsGrid";
import { useState } from 'react';
import cn from 'classnames';

export interface IProject {
  id: string;
  title: string;
  image: string;
  author: string;
  likes: number;
  views: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([
    {
      id: '1',
      title: 'Business Card Design',
      image: 'https://source.unsplash.com/random/400x300?sig=1',
      author: 'John Doe',
      likes: 45,
      views: 120
    },
    {
      id: '2',
      title: 'Mobile App UI',
      image: 'https://source.unsplash.com/random/400x300?sig=2',
      author: 'Jane Smith',
      likes: 32,
      views: 98
    },
    {
      id: '3',
      title: 'Kitchen Interior',
      image: 'https://source.unsplash.com/random/400x300?sig=3',
      author: 'Alex Johnson',
      likes: 67,
      views: 210
    },
    {
      id: '4',
      title: 'Car Photography',
      image: 'https://source.unsplash.com/random/400x300?sig=4',
      author: 'Sarah Williams',
      likes: 89,
      views: 345
    },
    {
      id: '5',
      title: 'Food Photography',
      image: 'https://source.unsplash.com/random/400x300?sig=5',
      author: 'Michael Brown',
      likes: 54,
      views: 178
    },
    {
      id: '6',
      title: 'Website Design',
      image: 'https://source.unsplash.com/random/400x300?sig=6',
      author: 'Emily Davis',
      likes: 41,
      views: 156
    },
    {
      id: '7',
      title: 'Logo Design',
      image: 'https://source.unsplash.com/random/400x300?sig=7',
      author: 'David Wilson',
      likes: 76,
      views: 230
    },
    {
      id: '8',
      title: 'Interior Design',
      image: 'https://source.unsplash.com/random/400x300?sig=8',
      author: 'Lisa Taylor',
      likes: 63,
      views: 189
    },
    {
      id: '9',
      title: 'Brochure Design',
      image: 'https://source.unsplash.com/random/400x300?sig=9',
      author: 'Robert Martin',
      likes: 38,
      views: 142
    },
    {
      id: '10',
      title: 'Product Photography',
      image: 'https://source.unsplash.com/random/400x300?sig=10',
      author: 'Jennifer Adams',
      likes: 52,
      views: 167
    },
    {
      id: '11',
      title: 'Brand Identity',
      image: 'https://source.unsplash.com/random/400x300?sig=11',
      author: 'Thomas Clark',
      likes: 47,
      views: 153
    },
    {
      id: '12',
      title: 'Architectural Visualization',
      image: 'https://source.unsplash.com/random/400x300?sig=12',
      author: 'Amanda Lewis',
      likes: 71,
      views: 219
    }
  ]);

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
      <ProjectsGrid projects={projects} />
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