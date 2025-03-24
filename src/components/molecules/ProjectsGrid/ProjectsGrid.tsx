import { useState } from 'react';
import cn from 'classnames';
import classes from './style.module.scss';
import { IProject } from '@/pages/projects';
import ProjectGridItem from '@/components/atoms/Projects/GridItem/GridItem';
import FilterRow from '@/components/molecules/FilterRow/FilterRow';
import ProjectsFilterForm from '@/components/atoms/Projects/InlineFilter/InlineFilter';

interface IProjectsGridProps {
  projects: IProject[];
}

export default function ProjectsGrid({ projects=[] }: IProjectsGridProps) {
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearch = (phrase: string) => {
    setSearchTerm(phrase);
    if (!phrase) {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(phrase.toLowerCase()) ||
      project.author.toLowerCase().includes(phrase.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleViewToggle = (view: "grid" | "list") => {
    setViewMode(view);
  };

  const applyFilters = (values: Record<string, any>) => {
    // In a real application, you would implement filtering logic here
    console.log('Filter values:', values);
    // For now, we'll just use the mock data
    setFilteredProjects(projects);
  };

  return (
    <div className={cn('container', classes.ProjectsGrid)}>
      <div className={classes.ProjectsGrid__filter}>
        <FilterRow 
          onSearch={handleSearch} 
          viewToggled={handleViewToggle}
          filtersForm={<ProjectsFilterForm onSubmit={applyFilters} />} 
        />
      </div>
      <div className={cn(
        classes.ProjectsGrid__content,
        viewMode === "list" ? classes.ProjectsGrid__content_list : null
      )}>
        {filteredProjects.map(project => (
          <ProjectGridItem 
            key={project.id}
            id={project.id}
            title={project.title}
            image={project.image}
            author={project.author}
            likes={project.likes}
            views={project.views}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
}