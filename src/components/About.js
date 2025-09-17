import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              Hello! I'm Cole Mlostek, a passionate software developer with a love for 
              creating innovative solutions and solving complex problems. I enjoy working 
              with modern technologies and building applications that make a difference.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open source projects, or enjoying the great outdoors.
            </p>
            <div className="skills">
              <h3>Skills & Technologies</h3>
              <div className="skills-grid">
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">AWS</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <span>Your Photo Here</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
