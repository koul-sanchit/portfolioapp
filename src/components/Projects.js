import React, { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  // Sample projects - replace with your own
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      shortDescription: 'A full-stack e-commerce solution with React and Node.js',
      fullDescription: 'This project is a complete e-commerce platform built with React for the frontend and Node.js/Express for the backend. It features user authentication, product catalog, shopping cart, payment integration with Stripe, and an admin dashboard for product management.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API'],
      image: '/project1.jpg',
      link: 'https://github.com/yourusername/project1',
      liveDemo: 'https://project1-demo.com'
    },
    {
      id: 2,
      title: 'Task Management App',
      shortDescription: 'A drag-and-drop task management application',
      fullDescription: 'A responsive task management application that allows users to organize their tasks using a Kanban-style board. Features include drag-and-drop functionality, task prioritization, due dates, labels, and team collaboration capabilities.',
      technologies: ['React', 'TypeScript', 'react-beautiful-dnd', 'Firebase', 'Material UI'],
      image: '/project2.jpg',
      link: 'https://github.com/yourusername/project2',
      liveDemo: 'https://project2-demo.com'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      shortDescription: 'Real-time weather forecasting with interactive maps',
      fullDescription: 'An interactive weather dashboard that provides real-time weather information and forecasts for locations worldwide. The app features interactive maps, graphical data representation, severe weather alerts, and location-based suggestions.',
      technologies: ['React', 'Chart.js', 'OpenWeather API', 'Mapbox', 'CSS Grid'],
      image: '/project3.jpg',
      link: 'https://github.com/yourusername/project3',
      liveDemo: 'https://project3-demo.com'
    }
  ];

  const toggleProject = (id) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card ${expandedProject === project.id ? 'expanded' : ''}`}
              onClick={() => toggleProject(project.id)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <span>View Details</span>
                </div>
              </div>
              
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="project-short-desc">{project.shortDescription}</p>
                
                <div className={`project-details ${expandedProject === project.id ? 'show' : ''}`}>
                  <p className="project-full-desc">{project.fullDescription}</p>
                  
                  <div className="project-tech">
                    <h4>Technologies:</h4>
                    <ul>
                      {project.technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="project-links">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <button>Source Code</button>
                    </a>
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <button>Live Demo</button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;