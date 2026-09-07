import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

export const CHARACTER_COLORS = {
  shirt: "colorful-gradient", // "colorful-gradient" for vibrant multi-color gradient, or any hex like "#ec4899"
  pants: "#1e293b", // Deep slate / charcoal trousers
  shoes: "#18181b", // Modern stealth dark sneakers
  soles: "#f8fafc", // Clean white sneaker soles
  skin: "#d8936e",  // Natural warm human skin tone (calibrated for ACESFilmic exposure)
};

/**
 * Creates a vibrant multi-color gradient texture for the t-shirt
 */
function createColorfulShirtTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0.0, "#8b5cf6"); // Electric Purple
    gradient.addColorStop(0.25, "#ec4899"); // Vibrant Pink
    gradient.addColorStop(0.5, "#f97316"); // Sunset Coral Orange
    gradient.addColorStop(0.75, "#06b6d4"); // Radiant Cyan
    gradient.addColorStop(1.0, "#3b82f6"); // Royal Blue

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

const applyCharacterColors = (character: THREE.Object3D) => {
  const applyAllMatches = (
    namePattern: string,
    color: string,
    roughness = 0.6,
    metalness = 0.0,
    map?: THREE.Texture
  ) => {
    const cleanPattern = namePattern.replace(/[._\s]/g, "").toLowerCase();
    character.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const cleanName = child.name.replace(/[._\s]/g, "").toLowerCase();
        if (cleanName === cleanPattern || cleanName.includes(cleanPattern)) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const baseMat = Array.isArray(mesh.material)
              ? mesh.material[0]
              : mesh.material;
            const newMat = (baseMat as THREE.MeshStandardMaterial).clone();
            newMat.color.set(color);
            if (map) {
              newMat.map = map;
            }
            newMat.roughness = roughness;
            newMat.metalness = metalness;
            newMat.needsUpdate = true;
            mesh.material = newMat;
          }
        }
      }
    });
  };

  // Colorful T-Shirt (Vibrant multi-color gradient)
  if (CHARACTER_COLORS.shirt === "colorful-gradient") {
    const shirtTexture = createColorfulShirtTexture();
    applyAllMatches("bodyshirt", "#ffffff", 0.75, 0.0, shirtTexture);
  } else {
    applyAllMatches("bodyshirt", CHARACTER_COLORS.shirt, 0.75, 0.0);
  }

  // Trousers / Pants
  applyAllMatches("pant", CHARACTER_COLORS.pants, 0.85, 0.02);

  // Sneakers & Soles
  applyAllMatches("shoe", CHARACTER_COLORS.shoes, 0.45, 0.08);
  applyAllMatches("sole", CHARACTER_COLORS.soles, 0.35, 0.0);

  // Natural Human Skin (Face, Neck, Hands, Ears)
  applyAllMatches("plane007", CHARACTER_COLORS.skin, 0.6, 0.0); // Face & Head
  applyAllMatches("neck", CHARACTER_COLORS.skin, 0.6, 0.0);     // Neck
  applyAllMatches("hand", CHARACTER_COLORS.skin, 0.6, 0.0);     // Hands & Fingers
  applyAllMatches("ear001", CHARACTER_COLORS.skin, 0.6, 0.0);   // Ears
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF | null> => {
    try {
      const encryptedBlob = await decryptFile(
        "/models/character.enc",
        "Character3D#@"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      return await new Promise<GLTF>((resolve, reject) => {
        loader.load(
          blobUrl,
          async (gltf) => {
            const character = gltf.scene;
            applyCharacterColors(character);
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: THREE.Object3D) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { loadCharacter };
};

export default setCharacter;
