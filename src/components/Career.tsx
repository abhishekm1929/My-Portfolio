import "./styles/Career.css";
import { SiOracle, SiLeetcode, SiHackerrank, SiGooglecloud } from "react-icons/si";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Experience <span>&</span>
          <br /> Milestones
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Backend AI Engineer Intern</h4>
                <h5>FlyRank AI</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Developing backend AI services using Python and Flask, building REST APIs to support AI workflows, prompt engineering, and deploying production LLM features.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech CSE Undergraduate</h4>
                <h5>PSIT Kanpur</h5>
              </div>
              <h3>2027</h3>
            </div>
            <p>
              Pursuing B.Tech in Computer Science & Engineering (77.57% aggregate). Focused on DSA, OOP, Operating Systems, Networks, and Database Systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Forge 2 Hackathon Finalist</h4>
                <h5>Full-Stack Developer</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Built PulseDesk multi-tenant Help Desk SaaS platform with Laravel, React.js, MySQL, and automated LLM/RAG AI ticket triage with Slack integration.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Walmart Sparkathon Lead</h4>
                <h5>Front-End Developer</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Led AR/VR front-end application development using WebXR, coordinated team workflows, and delivered the final project demo.
            </p>
          </div>
        </div>

        <div className="career-achievements">
          <h3>
            Recognitions <span>&</span> Certifications
          </h3>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon oracle">
                <SiOracle />
              </div>
              <div className="achievement-details">
                <h4>Oracle Certified</h4>
                <p>Agentic AI Foundations Associate</p>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon leetcode">
                <SiLeetcode />
              </div>
              <div className="achievement-details">
                <h4>420+ Problems Solved</h4>
                <p>Data Structures & Algorithms on LeetCode</p>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon hackerrank">
                <SiHackerrank />
              </div>
              <div className="achievement-details">
                <h4>5★ C++ Programmer</h4>
                <p>HackerRank Competitive Programming</p>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon googlecloud">
                <SiGooglecloud />
              </div>
              <div className="achievement-details">
                <h4>Google Cloud Certified</h4>
                <p>Introduction to Generative AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
