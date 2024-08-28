import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Model: React.FC<{
  scale: number;
  chestWidth: number;
  waistWidth: number;
  hipWidth: number;
}> = ({ scale, chestWidth, waistWidth, hipWidth }) => {
  const { scene } = useGLTF("./lowpoly-human-reff.glb");

  useEffect(() => {
    // Retrieve parts of the model
    const chest = scene.getObjectByName("Chest");
    const waist = scene.getObjectByName("Waist");
    const hips = scene.getObjectByName("Hips");

    // Adjust the scale of each part
    if (chest) {
      chest.scale.set(chestWidth / 96.52, 1, 1); // Adjust chest width
    }
    if (waist) {
      waist.scale.set(waistWidth / 80, 1, 1); // Adjust waist width
    }
    if (hips) {
      hips.scale.set(hipWidth / 96.52, 1, 1); // Adjust hip width
    }

    // Apply overall scale
    scene.scale.set(scale, scale, scale);
  }, [scale, chestWidth, waistWidth, hipWidth, scene]);

  return <primitive object={scene} />;
};

export default Model;
