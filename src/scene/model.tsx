import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Model: React.FC<{
  scale: number;
  chestWidth: number;
  waistWidth: number;
  hipWidth: number;
  heightScaleFactor: number;
}> = ({ scale, chestWidth, waistWidth, hipWidth, heightScaleFactor }) => {
  const { scene } = useGLTF("./lowpoly-human-reff.glb");

  useEffect(() => {
    // Retrieve parts of the model
    const chest = scene.getObjectByName("Chest");
    const waist = scene.getObjectByName("Waist");
    const hips = scene.getObjectByName("Hips");

    // Adjust the width of each part
    const widthScale = 1; // No change in width
    if (chest) {
      chest.scale.set(chestWidth / 96.52, widthScale, widthScale); // Adjust chest width
    }
    if (waist) {
      waist.scale.set(waistWidth / 80, widthScale, widthScale); // Adjust waist width
    }
    if (hips) {
      hips.scale.set(hipWidth / 96.52, widthScale, widthScale); // Adjust hip width
    }

    // Apply overall height scaling
    scene.scale.set(scale, scale * heightScaleFactor, scale);
  }, [scale, chestWidth, waistWidth, hipWidth, heightScaleFactor, scene]);

  return <primitive object={scene} />;
};

export default Model;
