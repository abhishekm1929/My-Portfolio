import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const containers = containerRef.current;
    if (ScrollTrigger.isTouch) {
      containers.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containers.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <h2 className="what-section-title">
        Core <span>Specialization</span>
      </h2>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>BACKEND & AI</h3>
              <h4>Core Specialization</h4>
              <p>
                Developing backend AI services, LLM/RAG pipelines, REST APIs, and multi-tenant SaaS platforms using Python, Flask, Node.js, and Express.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">Flask</div>
                <div className="what-tags">LLM Integration</div>
                <div className="what-tags">RAG Pipelines</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Express.js</div>
                <div className="what-tags">Laravel</div>
                <div className="what-tags">REST APIs</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">MongoDB</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">Vercel</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AGENT & CS CORE</h3>
              <h4>System & Engineering</h4>
              <p>
                Orchestrating AI agents with OpenClaw, prompt engineering, CI/CD automation, systemd debugging, and algorithmic problem-solving.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">AI Agents</div>
                <div className="what-tags">Prompt Engineering</div>
                <div className="what-tags">Data Structures</div>
                <div className="what-tags">Algorithms</div>
                <div className="what-tags">C++</div>
                <div className="what-tags">GitHub Actions</div>
                <div className="what-tags">Systemd</div>
                <div className="what-tags">JWT Auth</div>
                <div className="what-tags">DBMS</div>
                <div className="what-tags">OOP</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
