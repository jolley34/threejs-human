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
        part.scale.set(scaleX, part.scale.y, scaleX);
      }
    };

    const waistPartName = "DEF-spine_56";
    const hipPartName = "spine_fk_138";
    const chestPartName = "MCH-spine002_328";
    const headPartName = "DEF-spine002_54";

    adjustBodyPartWidth(waistPartName, waistScaleFactor);
    adjustBodyPartWidth(hipPartName, hipScaleFactor);
    adjustBodyPartWidth(chestPartName, chestScaleFactor);
    scene.scale.set(1, heightScaleFactor, 1);

    const oppositeScaleFactor = 1 / waistScaleFactor;

    adjustBodyPartWidth(headPartName, oppositeScaleFactor);
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
