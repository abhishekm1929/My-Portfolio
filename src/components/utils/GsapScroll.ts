import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  let monitor: THREE.Mesh | null = null;
  const plane = character?.getObjectByName("Plane004");
  plane?.children.forEach((childNode: THREE.Object3D) => {
    const child = childNode as THREE.Mesh;
    const material = child.material as THREE.MeshStandardMaterial;
    if (material) {
      material.transparent = true;
      material.opacity = 0;
      if (material.name === "Material.027") {
        monitor = child;
        material.color.set("#FFFFFF");
      }
    }
  });

  const screenLight = character?.getObjectByName("screenlight") as THREE.Mesh | undefined;
  if (screenLight) {
    const material = screenLight.material as THREE.MeshStandardMaterial;
    if (material) {
      material.transparent = true;
      material.opacity = 0;
      material.emissive.set("#FF3B94");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(material, {
        emissiveIntensity: () => intensity * 10 + 2,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
    }
  }

  const neckBone = character?.getObjectByName("spine005");
  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.6, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-32%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0.2, duration: 0.8 }, 0);

      tl2
        .to(
          camera.position,
          { z: 70, y: 8, duration: 6, delay: 1, ease: "power2.inOut" },
          0
        )
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-35%", delay: 1, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.85, x: 0.1, delay: 2, duration: 3 }, 0)
        .to(neckBone!.rotation, { x: 0.5, delay: 1.5, duration: 3 }, 0);

      const animMonitor = monitor as THREE.Mesh | null;
      if (animMonitor) {
        tl2
          .to(animMonitor.material, { opacity: 1, duration: 1, delay: 2.5 }, 0)
          .fromTo(
            animMonitor.position,
            { y: -8, z: 2 },
            { y: 0, z: 0, delay: 1, duration: 3 },
            0
          );
      }
      if (screenLight) {
        tl2.to(screenLight.material, { opacity: 1, duration: 1, delay: 3 }, 0);
      }

      tl3
        .fromTo(
          ".character-model",
          { opacity: 1 },
          { opacity: 0, duration: 3, delay: 1 },
          0
        )
        .to(character.rotation, { x: -0.02, duration: 2, delay: 1 }, 0);
    }
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 75%",
      end: "bottom center",
      scrub: false,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { height: "0%" },
      { height: "100%", duration: 1, ease: "power2.out" },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" },
      0
    );
}

