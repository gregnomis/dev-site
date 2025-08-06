import './App.css';
import './mobile.css';
import { useState, useEffect, useRef, useContext } from 'react';
import { images } from './config/images';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProjectCard from './components/projects/ProjectCard';
import ProjectDetails from './components/projects/ProjectDetails';
import { useTypewriter } from './hooks/useTypewriter';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import { optimizeForMobile, isRunningAsPWA, isMobileDevice } from './utils/mobileUtils';

function AppContent() {
  const [expandedProject, setExpandedProject] = useState(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const typedText = useTypewriter('Full-Stack Developer', 800);
  const hasLoggedEasterEgg = useRef(false);
  const { darkMode } = useContext(ThemeContext);

  const handleProjectClick = (project) => {
    setExpandedProject((prev) => prev === project ? null : project);
    
    // If in portrait mode and we're expanding a project, scroll to it after render
    if (isPortrait && expandedProject !== project) {
      setTimeout(() => {
        const projectElement = document.getElementById(`project-${project}`);
        if (projectElement) {
          projectElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };
  
  // Check orientation and update when it changes
  const updateOrientation = () => {
    setIsPortrait(window.matchMedia("(orientation: portrait)").matches && isMobileDevice());
  };

  useEffect(() => {
    if (!hasLoggedEasterEgg.current) {
      console.log('%c👋 Hello fellow developer!', `
        font-size: 24px;
        font-weight: bold;
        color: #3498db;
        padding: 8px 0;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
      `);
      console.log('%cThanks for checking out my portfolio! Feel free to explore the code.', 'font-size: 14px; color: #666;');
      hasLoggedEasterEgg.current = true;
    }
    
    optimizeForMobile();
    
    // Initial orientation check
    updateOrientation();
    
    // Add event listener for orientation changes
    window.addEventListener('resize', updateOrientation);
    
    if (isRunningAsPWA()) {
      console.log('Running as installed PWA');
    }
    
    return () => {
      window.removeEventListener('resize', updateOrientation);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="title-section">
            <h2 className="name">Greg Simon</h2>
            <p className="subtitle">
              <span className="bracket-left">{'{'}</span>
              <span className="typing-text">{typedText}</span>
              <span className="bracket-right">{'}'}</span>
            </p>
          </div>

          <div className="video-wrapper">
            <video
              className="intro-video"
              src={darkMode ? images.videos.devsiteBlack : images.videos.devsiteWhite}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          <h3 className="projects-title">My Projects</h3>

          <div className="projects">
            {['LockChain', 'AiQArt', 'SolMate'].map(projectId => (
              <div id={`project-${projectId}`} key={projectId} className="project-container">
                <ProjectCard
                  projectId={projectId}
                  onClick={handleProjectClick}
                  isSelected={expandedProject === projectId}
                />
                {/* If in portrait mode and this project is expanded, show details right below it */}
                {isPortrait && expandedProject === projectId && (
                  <div className="mobile-project-details-container">
                    <div className="mobile-details-close" onClick={() => setExpandedProject(null)}>
                      &times;
                    </div>
                    <ProjectDetails projectId={expandedProject} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* In landscape or desktop, show details after all cards as before */}
          {expandedProject && !isPortrait && (
            <ProjectDetails projectId={expandedProject} />
          )}
          
          <section className="about-section" id="about">
            <h3 className="about-title">About Me</h3>
            <div className="about-content">
              <div className="about-text">
                <p>
                  I'm Greg Simon, a passionate Full-Stack Developer based in Toronto, Canada with expertise in mobile, web, and blockchain technologies. 
                  I specialize in building innovative solutions that bridge the gap between cutting-edge technology and practical applications.
                </p>
                <p>
                  My technical skills include proficiency in JavaScript, TypeScript, React, Node.js, Python, Kotlin for Android, 
                  and blockchain development on Bitcoin and Solana. Always eager to learn new languages and stay updated with the latest trends in web3, AI, and mobile development.
                </p>
                <p>
                  I'm driven by creating products that solve real-world problems, with a focus on security, user experience, and scalable architecture. 
                  Whether it's developing a blockchain-based authentication system, an AI-powered QR code generator, or a web3 integrated Telegram bot, 
                  I enjoy tackling challenges across the full development stack.
                </p>
              </div>
              <div className="skills-container">
                <h4>Skills & Expertise</h4>
                <div className="skills-list">
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Firebase</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Kotlin</span>
                  <span className="skill-tag">Blockchain</span>
                  <span className="skill-tag">Mobile Dev</span>
                  <span className="skill-tag">Web3</span>
                  <span className="skill-tag">API Design</span>
                  <span className="skill-tag">Cloud Services</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
