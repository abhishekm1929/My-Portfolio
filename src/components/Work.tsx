import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    function getTranslateX() {
      const workFlex = document.querySelector(".work-flex") as HTMLElement | null;
      const workContainer = document.querySelector(".work-container") as HTMLElement | null;
      if (workFlex && workContainer) {
        return Math.max(0, workFlex.scrollWidth - workContainer.clientWidth + 140);
      }
      return 0;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX() + 400}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
      duration: 1,
    });
    // Comfortable hold at the end before unpinning
    timeline.to({}, { duration: 0.35 });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              title: "PulseDesk SaaS",
              category: "Help Desk SaaS (Forge 2 Finalist)",
              tools: "Laravel, React.js, MySQL, LLMs, RAG, GitHub Actions",
              img: "/images/pulsedesk.png",
              link: "https://pulse-desk-multi-tenant-saa-s-git-main-forge21.vercel.app",
            },
            {
              title: "KIM AI Voice Agent",
              category: "AI Voice Assistant",
              tools: "Python, Gemini AI, React.js, Node.js, Express, MongoDB",
              img: "/images/kim-voice.jpg",
              link: "https://kimai-1.onrender.com",
            },
            {
              title: "Walmart Sparkathon WebXR",
              category: "AR/VR Spatial Web App",
              tools: "WebXR, JavaScript, React.js, 3D Interactive UI",
              img: "/images/walmart-webxr.jpg",
              link: "https://amangpt2005.github.io/MindOS",
            },
            {
              title: "Albert AI Companion",
              category: "Interactive 3D MERN Assistant",
              tools: "React.js, Three.js, Node.js, Express, MongoDB, Mistral AI, Tavily",
              img: "/images/albert-ai.png",
              link: "https://albert-ai-chatbot-vntr.vercel.app/",
            },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools & Stack</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.img} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
