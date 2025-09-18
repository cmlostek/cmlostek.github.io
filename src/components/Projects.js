import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Restaurant Ordering API",
      description: "Collaborative project with a group of friends to create a restaurant ordering API. We used React for the frontend and Python for the backend. This project was a part of my Software Engineering class at UNC Charlotte. We used Agile methodologies to develop the project.",
      technologies: ["React", "Node.js", "MySQL", "Python"],
      github: "https://github.com/cmlostek/itsc3155_GroupProject",
      demo: "#",
      website: "#"
    },
    {
      id: 2,
      title: "MC1R Gene Research Project",
      description: "Research project on the MC1R gene and its role in the pigmentation of Chiroptera coat colors. This project was a part of my Bioinformatics Masters at UNC Charlotte. I used tools such as tblastx to search for the gene in the genome of Chiroptera. Now we are working towards extracting the gene from the genome and using geneus to align them against a known gene.",
      technologies: ["Bash", "HPC", "BLAST", "Geneus"],
      github: "#",
      demo: "#",
      website: "https://www.yohelab.net/"
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
                <a href={project.website} className="project-link" target="_blank" rel="noopener noreferrer">
                  Website
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
