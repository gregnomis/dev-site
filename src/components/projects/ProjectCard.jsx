import { projects } from '../../config/projects';

const ProjectCard = ({ projectId, onClick, isSelected }) => {
  const project = projects[projectId];
  
  return (
    <div 
      className={`project-card ${isSelected ? 'selected' : ''}`} 
      onClick={() => onClick(projectId)}
    >
      <img src={project.logo} alt={project.title} />
    </div>
  );
};

export default ProjectCard;
