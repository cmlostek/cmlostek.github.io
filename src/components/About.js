import React from 'react';
import './About.css';
import { FishSvg, JellyfishSvg, WhaleSvg } from './SeaCreatures';

const About = () => {
  const skills = [
    'Python', 'HTML / CSS', 'JavaScript', 'React',
    'Java', 'R', 'SQL', 'Bash',
    'Git', 'Linux', 'HPC Clusters', 'BLAST',
  ];

  return (
    <section className="about" id="about">

      {/* ── Decorative sea creatures ── */}
      <div className="ocean-creatures" aria-hidden="true">
        <div className="creature fish fish--1">
          <FishSvg />
        </div>
        <div className="creature fish fish--2">
          <FishSvg flipped />
        </div>
        <div className="creature fish fish--3">
          <FishSvg />
        </div>
        <div className="creature jellyfish jellyfish--1">
          <JellyfishSvg />
        </div>
        <div className="creature jellyfish jellyfish--2">
          <JellyfishSvg />
        </div>
        <div className="creature whale whale--1">
          <WhaleSvg />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <span className="section-eyebrow">About Me</span>
            <h2>Hey, I'm Cole</h2>
            <p>
              I'm a Computer Science graduate of the University of North Carolina at Charlotte
              (B.S., May 2025, Bioinformatics concentration) and currently pursuing my Master's
              in Computer Science at UNCC. My interests span software development, machine
              learning, and bioinformatics.
            </p>
            <p>
              My current research focuses on the <em>MC1R</em> gene and its role in the
              pigmentation of <em>Chiroptera</em> (bat) coat colors, mentored by
              Dr. Laurel Yohe in the Department of Bioinformatics and Genomics.
            </p>
            <p>
              Outside of work I enjoy exploring new technologies, open source, the great
              outdoors, video games, and spending time with family and friends.
            </p>

            <div className="skills">
              <h3>Skills &amp; Technologies</h3>
              <div className="skills-grid">
                {skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="about-image">
            <img
              src="/pfp.jpeg"
              alt="Cole Mlostek"
              className="profile-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
