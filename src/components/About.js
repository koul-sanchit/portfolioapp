import React from 'react';
import './About.css';

const About = () => {
  // Function to render skill stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>
      );
    }
    return stars;
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="image-text-container">
            <div className="about-text">
              <p>
                Hello! I'm a passionate developer with expertise in modern web technologies. <br></br>
                I enjoy building responsive, user-friendly applications that solve real-world problems.
              </p>
              <p>
                With a background in [Your Background], I specialize in [Your Skills/Specialization]. 
                I'm constantly learning and exploring new technologies to stay at the forefront of web development.
              </p>
              <p>
                When I'm not coding, you can find me playing chess, reading novels or solving math puzzles. <br></br>
                I believe in continuous learning and growth, both professionally and personally.
              </p>
            </div>
            
            <div className="about-image">
              <div className="image-container">
                <img src="/Sanchit.jpg" alt="Sanchit" />
              </div>
            </div>
          </div>
          
          <div className="skills-highlights-container">
            <div className="resume-highlights">
              <h3>Highlights</h3>
              
              <div className="highlight-category">
                <h4>Education</h4>
                <div className="highlight-item">
                  <p>BTech in Electrical Engineering <br></br> Indian Institute of Technology, Kharagpur (2022)</p>
                </div>
              </div>
              
              <div className="highlight-category">
                <h4>Experience</h4>
                <div className="highlight-item">
                  <p>Advanced Software Engineer - Honeywell (2024-Present)</p>
                  <p>Software Engineer II - Honeywell (2022-2024)</p>
                </div>
              </div>
            </div>
            
            <div className="skills">
              <h3>Technical Skills</h3>
              
              <div className="skill-category">
                <h4>Languages</h4>
                <ul className="skills-list">
                  <li>
                    C# <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    Python <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                  <li>
                    JavaScript <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                  <li>
                    TypeScript <div className="skill-rating">{renderStars(3)}</div>
                  </li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Frameworks</h4>
                <ul className="skills-list">
                  <li>
                    .NET <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    Entity Framework <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                  <li>
                    FastAPI <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                  <li>
                    Django <div className="skill-rating">{renderStars(3)}</div>
                  </li>
                  <li>
                    React <div className="skill-rating">{renderStars(3)}</div>
                  </li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Patterns & Architectures</h4>
                <ul className="skills-list">
                  <li>
                    MVC <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    Razor Pages <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                  <li>
                    RESTful APIs <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Operating Systems</h4>
                <ul className="skills-list">
                  <li>
                    Windows <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    Linux <div className="skill-rating">{renderStars(3)}</div>
                  </li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Tools & Others</h4>
                <ul className="skills-list">
                  <li>
                    Git/GitHub <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                  <li>
                    SQL <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                  <li>
                    Docker <div className="skill-rating">{renderStars(3)}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;