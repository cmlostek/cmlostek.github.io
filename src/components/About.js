import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              Hello! I'm Cole Mlostek, a graduate of the University of North Carolina at Charlotte. I received my Bachelor's degree in Computer Science in May 2025 with a concentration in Bioinformatics.
              I am currently also a Master's student in Computer Science at the University of North Carolina at Charlotte. I am interested in software development, machine learning, and bioinformatics.
              I also do research in the field of bioinformatics, specifically in the area of genomics, by looking at the Melanocorotin 1 receptor gene and its role in the pigmentation of Chiroptera coat colors. 
              This research is overseen and mentored by Dr. Laurel Yohe, a professor in the Department of Bioinformatics and Genomics.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open source projects, or enjoying the great outdoors. I also enjoy playing video games, reading, and spending time with my family and friends.
            </p>
            <div className="skills">
              <h3>Skills & Technologies</h3>
              <div className="skills-grid">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">R</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">bash</span>
                <span className="skill-tag">HPC Cluster Resources</span>
                <span className="skill-tag">Linux</span>
              </div>
            </div>
          </div>
          <div className="about-image">
              <img 
                src="/pfp.jpeg" 
                alt="Cole Mlostek" 
                className="profile-image"
                onLoad={() => console.log('Image loaded successfully')}
                onError={(e) => console.log('Image failed to load:', e)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
