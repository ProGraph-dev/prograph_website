import { useState } from 'react';
import cn from 'classnames';
import classes from './style.module.scss';
import ProjectGridItem from '@/components/atoms/Projects/GridItem/GridItem';
import FilterRow from '../FilterRow/FilterRow';
import ProjectsFilterForm from '@/components/atoms/Projects/InlineFilter/InlineFilter';
import { IProduct } from '@/services/productService';

interface IProjectsGridProps {
  projects: (IProduct)[];
  showFilters?: boolean;
}

export default function ProjectsGrid({ projects, showFilters = false }: IProjectsGridProps) {
  const [filteredProjects, setFilteredProjects] = useState<(IProduct)[]>(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearch = (phrase: string) => {
    setSearchTerm(phrase);
    if (!phrase) {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(phrase.toLowerCase())
      // project.author.toLowerCase().includes(phrase.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleViewToggle = (view: "grid" | "list") => {
    setViewMode(view);
  };

  const applyFilters = (values: string) => {
    console.log('Filter values:', values);
    setFilteredProjects(projects);
  };

  return (
    <div className={classes.ProjectsGrid}>
      {showFilters && 
      <div className={classes.ProjectsGrid__header}>
        <FilterRow
          onSearch={handleSearch}
          viewToggled={handleViewToggle}
          filtersForm={<ProjectsFilterForm
            onChange={applyFilters} />}
        />
      </div>
      }
      <div className={cn(
        classes.ProjectsGrid__content,
        viewMode === "list" && classes.ProjectsGrid__content_list
      )}>
        {filteredProjects.map(project => (
          <ProjectGridItem 
            key={project.id}
            {...project}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
}