import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

export const CHARACTER_COLORS = {
  shirt: "#2563eb", // Rich Royal Tech Blue T-shirt
  pants: "#1e293b", // Deep slate / charcoal trousers
  shoes: "#18181b", // Modern stealth dark sneakers
  soles: "#f8fafc", // Clean white sneaker soles
  skin: "#f2c4a8",  // Natural warm human skin tone
};

const applyCharacterColors = (character: THREE.Object3D) => {
  const applyMeshColor = (
    name: string,
    color: string,
    roughness = 0.6,
    metalness = 0.0
  ) => {
    const mesh = character.getObjectByName(name) as THREE.Mesh | undefined;
    if (mesh && mesh.material) {
      const baseMat = Array.isArray(mesh.material)
        ? mesh.material[0]
        : mesh.material;
      const newMat = (baseMat as THREE.MeshStandardMaterial).clone();
      newMat.color.set(color);
      newMat.roughness = roughness;
      newMat.metalness = metalness;
      mesh.material = newMat;
    }
  };

  // T-Shirt (Matte cotton fabric)
  applyMeshColor("BODY.SHIRT", CHARACTER_COLORS.shirt, 0.82, 0.0);

  // Trousers / Pants (Denim texture)
  applyMeshColor("Pant", CHARACTER_COLORS.pants, 0.85, 0.02);

  // Sneakers & Soles
  applyMeshColor("Shoe", CHARACTER_COLORS.shoes, 0.45, 0.08);
  applyMeshColor("Sole", CHARACTER_COLORS.soles, 0.35, 0.0);

  // Human Skin (Face, Neck, Hands, Ears - soft natural skin diffusion)
  applyMeshColor("Plane.007", CHARACTER_COLORS.skin, 0.6, 0.0); // Face & Head
  applyMeshColor("Neck", CHARACTER_COLORS.skin, 0.6, 0.0);       // Neck
  applyMeshColor("Hand", CHARACTER_COLORS.skin, 0.6, 0.0);       // Hands & Fingers
  applyMeshColor("Ear.001", CHARACTER_COLORS.skin, 0.6, 0.0);    // Ears
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
