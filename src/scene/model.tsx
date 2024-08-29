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

  // Original model height used for scaling and positioning
  const modelOriginalHeight = 220;

  // Percentages of the height where chest, waist, and hips are located
  const chestHeightPercentage = 0.55;
  const waistHeightPercentage = 0.45;
  const hipHeightPercentage = 0.36;

  // Function to calculate the position based on height and percentage
  const calculatePosition = (height: number, percentage: number) => {
    return (height * percentage) / 100;
  };

  // Calculate the average width scale factor
  const averageWidthScale =
    (chestWidth / 96.52 + waistWidth / 80 + hipWidth / 96.52) / 3;

  // Calculate the scaled height of the model
  const scaledHeight = modelOriginalHeight * heightScaleFactor;

  // Calculate dynamic positions based on the scaled height
  const chestPosition = calculatePosition(scaledHeight, chestHeightPercentage);
  const waistPosition = calculatePosition(scaledHeight, waistHeightPercentage);
  const hipPosition = calculatePosition(scaledHeight, hipHeightPercentage);

  const boxHeight = 0.2 * heightScaleFactor;

  const chestBoxWidth = chestWidth / 96.52;
  const waistBoxWidth = waistWidth / 80;
  const hipBoxWidth = hipWidth / 96.52;

  useEffect(() => {
    // Apply scaling to the entire model
    scene.scale.set(
      scale * averageWidthScale,
      scale * heightScaleFactor,
      scale * averageWidthScale
    );
  }, [scale, chestWidth, waistWidth, hipWidth, heightScaleFactor, scene]);

  return (
    <>
      <primitive object={scene} />

      {/* Debug boxes */}
      <mesh
        position={[0, chestPosition, 0]}
        scale={[chestBoxWidth, boxHeight, 0.2]}
      >
        <boxGeometry />
        <meshStandardMaterial color="red" transparent opacity={0.5} />
      </mesh>
      <mesh
        position={[0, waistPosition, 0]}
        scale={[waistBoxWidth, boxHeight, 0.2]}
      >
        <boxGeometry />
        <meshStandardMaterial color="green" transparent opacity={0.5} />
      </mesh>
      <mesh
        position={[0, hipPosition, 0]}
        scale={[hipBoxWidth, boxHeight, 0.2]}
      >
        <boxGeometry />
        <meshStandardMaterial color="blue" transparent opacity={0.5} />
      </mesh>
    </>
  );
};

export default Model;
