import React from 'react';
import './Projects.css';
import { FishSvg, JellyfishSvg } from './SeaCreatures';

const projects = [
  {
    id: 1,
    title: 'Restaurant Ordering API',
    description:
      'Collaborative project to build a full-stack restaurant ordering system. Built with React on the frontend and Python/Node.js on the backend, backed by MySQL. Developed using Agile methodologies as part of Software Engineering at UNCC.',
    technologies: ['React', 'Node.js', 'MySQL', 'Python'],
    github: 'https://github.com/cmlostek/itsc3155_GroupProject',
  },
  {
    id: 2,
    title: 'CLIB',
    description:
      'Personal book library and review archive. Browse and track books, write reviews, and manage a reading collection. Built with React and Vite, backed by Supabase.',
    technologies: ['React', 'Vite', 'Supabase'],
    website: 'https://cmlostek.github.io/clib/',
  },
  {
    id: 3,
    title: 'MC1R Gene Research',
    description:
      'Bioinformatics research on the MC1R gene and its role in bat (Chiroptera) coat pigmentation. Used tblastx to search genomic sequences, with ongoing work to extract and align the gene using Geneus against known reference sequences.',
    technologies: ['Bash', 'HPC', 'BLAST', 'Geneus'],
    website: 'https://www.yohelab.net/',
    },
    {
      id: 4,
      title: 'Grimoire',
      description:
        "This is a DND 5e Companion tool that is used to help DM's and Player's get the most out of their campaign. Offers a wide variety of tools like, initiative tracking, notes, DM recordings, maps, and even dice rolling.",
      technologies: ['TypeScript', 'CSS', 'SQL', 'React', 'Vite 8', 'Tailwind CSS', 'Zustand', 'Supabase', 'Supabase Auth', 'CodeMirror 6', 'react-markdown + remark-gfm', 'React Router 7', 'Lucide React', 'Vercel'],
      website: 'https://dnd.cmlostek.site/',
      github: 'https://github.com/cmlostek/dnd-gm'
    },
];

const Projects = () => {
  return (
    <section className="projects" id="projects">

      {/* ── Deep-sea / planetary decorations ── */}
      <div className="deep-decor" aria-hidden="true">
        {/* Large Neptune-like planet */}
        <div className="planet planet--neptune" />
        {/* Warm distant planet */}
        <div className="planet planet--amber" />
        {/* Tiny star cluster */}
        <div className="star-cluster star-cluster--1" />
        <div className="star-cluster star-cluster--2" />
        {/* Deep sea fish */}
        <div className="creature deep-fish deep-fish--1">
          <FishSvg />
        </div>
        <div className="creature deep-fish deep-fish--2">
          <FishSvg flipped />
        </div>
        {/* Bioluminescent jellyfish */}
        <div className="creature deep-jelly deep-jelly--1">
          <JellyfishSvg />
        </div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Portfolio</span>
          <h2>My Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

              <div className="project-card__tags">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-card__links">
                {project.github && (
                  <a
                    href={project.github}
                    className="project-link project-link--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="project-link project-link--outline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    className="project-link project-link--outline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
