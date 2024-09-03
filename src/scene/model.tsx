import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

interface ModelProps {
  height: number;
  chestWidth: number;
  waistWidth: number;
  hipWidth: number;
}

const Model: React.FC<ModelProps> = ({
  height,
  chestWidth,
  waistWidth,
  hipWidth,
}) => {
  const { scene } = useGLTF("/base_mesh_low_poly_character.glb");

  // Default dimensions in cm
  const defaultHeight = 180;
  const defaultWaistWidth = 80;
  const defaultChestWidth = 96.52;
  const defaultHipWidth = 90;

  // Calculate scale factors
  const heightScaleFactor = height / defaultHeight;
  const chestScaleFactor = chestWidth / defaultChestWidth;
  const waistScaleFactor = waistWidth / defaultWaistWidth;
  const hipScaleFactor = hipWidth / defaultHipWidth;

  useEffect(() => {
    const adjustBodyPartWidth = (partName: string, scaleX: number) => {
      const part = scene.getObjectByName(partName);
      if (part) {
        // Apply scaling only on the x-axis for width adjustment
        part.scale.set(scaleX, part.scale.y, scaleX);
      }
    };

    // Adjust waist and hip width
    const waistPartName = "DEF-spine_56"; // Make sure this is the correct name
    const hipPartName = "spine_fk_138"; // Make sure this is the correct name
    const chestPartName = "MCH-spine002_328"; // Make sure this is the correct name
    const headPartName = "DEF-head_50"; // Make sure this is the correct name

    // Apply scale factors
    adjustBodyPartWidth(waistPartName, waistScaleFactor);
    adjustBodyPartWidth(hipPartName, hipScaleFactor);
    adjustBodyPartWidth(chestPartName, chestScaleFactor);

    // Calculate and apply the opposite scaling for head
    const oppositeScaleFactor = 1 / waistScaleFactor;
    adjustBodyPartWidth(headPartName, oppositeScaleFactor);

    // Optionally adjust height if required
    // scene.traverse((object) => {
    //   if (object.type === 'Mesh') {
    //     object.scale.y = heightScaleFactor;
    //   }
    // });
  }, [
    waistWidth,
    hipWidth,
    chestWidth,
    height,
    scene,
    waistScaleFactor,
    hipScaleFactor,
    chestScaleFactor,
  ]);

  // Extract and apply animations
  const { animations } = useGLTF("/base_mesh_low_poly_character.glb");
  const { ref, actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && actions.idle) {
      actions.idle.play();
    }
  }, [actions]);

  return <primitive ref={ref} object={scene} />;
};

export default Model;
