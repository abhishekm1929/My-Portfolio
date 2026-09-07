import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const ToggleAction = "play none none none";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    const triggerElement =
      para.closest(
        ".about-section, .career-info-box, .what-box, .work-box, .section-container, .landing-section"
      ) || para;

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: triggerElement,
          toggleActions: ToggleAction,
          start: "top 85%",
        },
        duration: 0.8,
        ease: "power2.out",
        y: 0,
        stagger: 0.015,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });

    const triggerElement =
      title.closest(
        ".about-section, .career-info-box, .what-box, .work-box, .section-container, .landing-section"
      ) || title;

    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: triggerElement,
          toggleActions: ToggleAction,
          start: "top 85%",
        },
        duration: 0.7,
        ease: "power2.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
}

