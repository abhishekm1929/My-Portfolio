import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xa855f7, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.5, 0.5, 2);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  // Vibrant Pink/Magenta Screen Point Light matching reference screenshot
  const pointLight = new THREE.PointLight(0xff3b94, 0, 100, 2);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Fill Light for rich character shadow details
  const fillLight = new THREE.DirectionalLight(0x38bdf8, 0);
  fillLight.position.set(3, -1, -2);
  scene.add(fillLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: THREE.Object3D | null) {
    const mesh = screenLight as THREE.Mesh | null;
    const material = mesh?.material as THREE.MeshStandardMaterial | undefined;
    if (material && material.opacity > 0.5) {
      pointLight.intensity = (material.emissiveIntensity ?? 1) * 25;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.85,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(fillLight, {
      intensity: 0.6,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
