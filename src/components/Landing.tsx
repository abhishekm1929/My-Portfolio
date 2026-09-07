import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I am</h2>
            <h1>
              Abhishek <span>Mishra</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Backend AI</h3>
            <h2>
              <div className="landing-h2-info">AI Agent Dev</div>
              <div className="landing-h2-info-1">RAG Pipelines</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
