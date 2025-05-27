import React, { useState } from 'react';
import './Resume.css';

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Path to your resume PDF - update this with your actual resume file
  const resumePath = "/your-resume.pdf";
  
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <section id="resume" className="resume-section">
      <div className="resume-container">
        <h2 className="section-title">Resume</h2>
        
        <div className="resume-content">
          <div className="resume-actions">
            <a 
              href={resumePath} 
              download="YourName_Resume.pdf"
              className="download-btn"
            >
              <i className="download-icon">⬇️</i> Download Resume
            </a>
          </div>
          
          <div className="resume-viewer">
            {isLoading && <div className="loading">Loading resume...</div>}
            
            <iframe 
              src={resumePath} 
              title="Resume Preview" 
              className="resume-frame"
              onLoad={handleLoad}
            />
          </div>
          
          <div className="resume-highlights">
            <h3>Highlights</h3>
            <ul>
              <li>
                <span className="highlight-title">Education</span>
                <p>Bachelor's Degree in Computer Science - University Name (Year)</p>
              </li>
              <li>
                <span className="highlight-title">Experience</span>
                <p>Senior Web Developer - Company Name (2020-Present)</p>
                <p>Frontend Developer - Previous Company (2017-2020)</p>
              </li>
              <li>
                <span className="highlight-title">Certifications</span>
                <p>AWS Certified Developer</p>
                <p>Google Professional Cloud Developer</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;