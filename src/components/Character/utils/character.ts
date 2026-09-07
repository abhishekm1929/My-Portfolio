import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

export const CHARACTER_COLORS = {
  shirt: "#2563eb", // Stylish royal blue hoodie / shirt
  pants: "#1e293b", // Dark slate / denim trousers
  shoes: "#18181b", // Modern dark sneakers
  soles: "#f8fafc", // White sneaker soles
  skin: "#dfa887",  // Natural warm skin tone
};

const applyCharacterColors = (character: THREE.Object3D) => {
  const applyMeshColor = (
    name: string,
    color: string,
    roughness = 0.6,
    metalness = 0.05
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

  // Clothes
  applyMeshColor("BODY.SHIRT", CHARACTER_COLORS.shirt, 0.7, 0.05);
  applyMeshColor("Pant", CHARACTER_COLORS.pants, 0.8, 0.05);
  applyMeshColor("Shoe", CHARACTER_COLORS.shoes, 0.5, 0.1);
  applyMeshColor("Sole", CHARACTER_COLORS.soles, 0.4, 0.0);

  // Skin (face, neck, hands, ears)
  applyMeshColor("Plane.007", CHARACTER_COLORS.skin, 0.6, 0.0);
  applyMeshColor("Neck", CHARACTER_COLORS.skin, 0.6, 0.0);
  applyMeshColor("Hand", CHARACTER_COLORS.skin, 0.6, 0.0);
  applyMeshColor("Ear.001", CHARACTER_COLORS.skin, 0.6, 0.0);
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
