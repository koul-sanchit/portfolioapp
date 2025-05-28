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
        <h2 className="section-title">About Me :)</h2>
        
        <div className="about-content">
          <div className="image-text-container">
            <div className="about-text">
              <p>
                👋 Hi, I'm Sanchit, a <b>Full Stack Software Developer</b> with a passion for building modern, robust and scalable applications.
                With hands-on expertise in technologies like <b>.NET, Django, FastAPI, and React</b>, I specialize in delivering end-to-end solutions.
              </p>
              <p>
                My recent work includes developing <b>GenAI</b> applications focused on code generation, browser automation, and report analysis using LangChain.
                I'm also well-versed in setting up CI/CD pipelines, working with Docker, and orchestrating services using Kubernetes.
              </p>
              <p>
                I thrive on exploring new technologies and continuously learning to stay ahead. <br></br>
                When I’m not coding, you’ll find me playing chess, reading novels, or watching <b>'The Office'</b>.
              </p>
            </div>
            
            <div className="about-image">
              <div className="image-container">
                <img src={`${process.env.PUBLIC_URL}/Sanchit1.jpeg`} alt="Sanchit" />
              </div>
            </div>
          </div>
          
          <div className="skills-highlights-container">
            <div className="resume-highlights">
              <h3>Highlights</h3>
              
              <div className="highlight-category">
                <h4>Education</h4>
                <div className="highlight-item">
                  <p>B.Tech in Electrical Engineering, IIT Kharagpur (2022) <span className="score" style={{ float: 'right' }}>8.4/10</span></p>
                </div>
                <div className="highlight-item">
                  <p>XII (CBSE), S.R. Public School (2017) <span className="score" style={{ float: 'right' }}>90.2%</span></p>
                </div>
                <div className="highlight-item">
                  <p>X (CBSE), SOS Hernamm Gmeiner School (2015) <span className="score" style={{ float: 'right' }}>10/10</span></p>
                </div>
              </div>
              
              <div className="highlight-category">
                <h4>Experience</h4>
                <div className="highlight-item">
                  <p>Advanced Software Engineer, <br></br><b>Honeywell</b> (Dec 2024 - Present)</p>
                  <ul>
                    <li>Integrated GenAI to existing platforms using LangChain to achieve project level code generation, coverity security fixes, no code browser automation, and report analysis.</li>
                    <li>Test Platform: Created a centeralized portal for devs & testers to onboard their containerized test automations and trigger, schedule and run tests in AKS on demand along with detailed AI generated report summary & analysis, thus helping in Cycle Time Reduction.</li>
                  </ul>
                </div>
                <div className="highlight-item">
                  <p>Software Engineer II, <br></br><b>Honeywell</b> (July 2022 - Dec 2024)</p>
                  <ul>
                    <li>AutoMate: A CI/CD portal for users to create their pipelines ensuring secure commit to release creation involving build, scans & deployment. Worked on developing the portal, supporting multiple migrations (BitBucket to GitHub, Bamboo to GitHub Actions, etc), access control, and build Bring Your Own Cluster (BYOC) utility.</li>
                    <li>API Automation Tool: Created a portal from scratch that takes swagger.json as input along with API tokens and request data for the available endpoints and generates a .Net Gherkins Test Project. Portal provides support to run and schedule the generated tests.</li>
                  </ul>
                </div>
                <div className="highlight-item">
                  <p>Software Engineering Intern, <br></br><b>Honeywell</b> (June - July 2021)</p>
                  <ul>
                    <li>Worked on the backend and database of a track and trace supply chain application. Built a GoLang microservice to handle client requests, exposing RESTful APIs for retrieving and storing data with support for flexible query filters. Focused on clean architecture, maintainable code, and proper error handling.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="skills">
              <h3>Technical Skills</h3>
              
              <div className="skill-category">
                <h4>Languages</h4>
                <ul className="skills-list">
                  <li>
                    C++, C#, Python <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    C, JavaScript, CSS, HTML <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                  <li>
                    Golang, Java, SQL <div className="skill-rating">{renderStars(3)}</div>
                  </li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Frameworks & Others</h4>
                <ul className="skills-list">
                  <li>
                    .NET (Entity, ASP, MVC, Razor) <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    Django, FastAPI <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    LangChain, MCP, GenAI <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    React.js, Next.js <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Operating Systems</h4>
                <ul className="skills-list">
                  <li>
                    Linux, MacOs, Windows <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Tools & Others</h4>
                <ul className="skills-list">
                  <li>
                    Git/GitHub, VS Code & Studio <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    BitBucket, Bamboo, Octopus Deploy <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    SonarQube, Coverity, Twistlock <div className="skill-rating">{renderStars(5)}</div>
                  </li>
                  <li>
                    Docker, Kubernetes, Ansible <div className="skill-rating">{renderStars(4)}</div>
                  </li>
                  <li>
                    MS Office, Ansible, Artifactory <div className="skill-rating">{renderStars(4)}</div>
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