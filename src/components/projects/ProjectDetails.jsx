import React, { useContext, useEffect } from 'react';
import { projects } from '../../config/projects';
import LottieCarousel from '../../components/common/LottieCarousel';
import ImageCarousel from '../../components/common/ImageCarousel';
import Terminal from '../../components/common/Terminal';
import { useTerminal } from '../../hooks/useTerminal';
import { ThemeContext } from '../../context/ThemeContext';
import { images } from '../../config/images';

const ProjectDetails = ({ projectId }) => {
  const project = projects[projectId];
  const { animatedLines, isAnalyzing, handleAnalyze, cleanupTerminal } = useTerminal();
  const { darkMode } = useContext(ThemeContext);
  
  const handleProjectAnalyze = () => {
    handleAnalyze(projectId);
  };
  
  useEffect(() => {
    cleanupTerminal();
  }, [projectId]);

  if (!project) return null;

  return (
    <div className="project-details">
      <div className="project-header">
        <h3>{project.title}</h3>
        {projectId === 'AiQArt' && (
          <a 
            href="https://www.producthunt.com/products/aiqart-by-lockchain/launches/aiqart-by-lockchain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="product-hunt-badge"
            style={{ textDecoration: 'none', borderBottom: 'none' }}
          >
            <img 
              src={darkMode 
                ? images.productHuntLight 
                : images.productHuntDark} 
              alt="Product Hunt #11 Product of the Day" 
              style={{ borderBottom: 'none', boxShadow: 'none' }}
            />
          </a>
        )}
      </div>
      <p className="project-subtitle">{project.subtitle}</p>
      <p><strong>Role:</strong> {project.role}</p>
      <p><strong>Website:</strong> <a href={project.website} target="_blank" rel="noopener noreferrer">{project.website}</a></p>
      <p><strong>Platform:</strong> {project.platform}</p>
      <p><strong>Stack:</strong> {project.stack}</p>
      <p><strong>Backend:</strong> {project.backend}</p>
      
      <div className="cool-features">
        <p><strong>Cool Stuff:</strong></p>
        <ul>
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {projectId !== 'SolMate' && (
        <>
          <h4 className="animations-title">
            {projectId === 'AiQArt' ? 'Featured QR Art Samples' : 'Featured App Animations'}
          </h4>
          
          {projectId === 'AiQArt' ? (
            <ImageCarousel projectId={projectId} />
          ) : (
            <LottieCarousel />
          )}
        </>
      )}

      <div className="buttons-container">
        {projectId === 'AiQArt' ? (
          <a 
            href="https://www.lockchain.ca/ai"
            target="_blank" 
            rel="noopener noreferrer"
            className="try-free-btn"
          >
            <span>▶️ Try for Free</span>
          </a>
        ) : projectId === 'SolMate' ? (
          <a 
            href={project.telegramLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="try-free-btn"
          >
            <img 
              src={images.telegramLogo} 
              alt="Telegram Logo" 
              className="telegram-logo"
            />
            <span>Try Now</span>
          </a>
        ) : project.playStoreLink && (
          <a 
            href={project.playStoreLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="store-button"
          >
            <img 
              src={darkMode 
                ? images.googleLogo 
                : images.googleButton} 
              alt="Get it on Google Play" 
            />
          </a>
        )}
        <button onClick={handleProjectAnalyze} className="scan-btn" disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : '🔍 Analyze Codebase'}
        </button>
      </div>

                <Terminal lines={animatedLines} isAnalyzing={isAnalyzing} projectId={projectId} />
    </div>
  );
};

export default ProjectDetails;
