import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "A brief description of your first project. Explain what it does and the technologies used.",
      technologies: ["React", "Node.js", "MongoDB"],
      github: "#",
      demo: "#"
    },
    {
      id: 2,
      title: "Project Two", 
      description: "Description of your second project. Highlight the key features and challenges solved.",
      technologies: ["Python", "Django", "PostgreSQL"],
      github: "#",
      demo: "#"
    },
    {
      id: 3,
      title: "Project Three",
      description: "Another project description. Showcase your versatility and problem-solving skills.",
      technologies: ["JavaScript", "Express", "MySQL"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
