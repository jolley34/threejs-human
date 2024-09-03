import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import Model from "./model"; // Ensure this path is correct

const Scene: React.FC = () => {
  const [height, setHeight] = useState<number>(180);
  const [chestWidth, setChestWidth] = useState<number>(96.52); // Default chest width in cm
  const [waistWidth, setWaistWidth] = useState<number>(80); // Default waist width in cm
  const [hipWidth, setHipWidth] = useState<number>(91); // Default hip width in cm

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    if (newHeight >= 150 && newHeight <= 220) {
      setHeight(newHeight);
    }
  };

  const handleChestWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChestWidth = Number(e.target.value);
    if (newChestWidth >= 70 && newChestWidth <= 120) {
      setChestWidth(newChestWidth);
    }
  };

  const handleHipWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHipWidth = Number(e.target.value);
    if (newHipWidth >= 90 && newHipWidth <= 120) {
      setHipWidth(newHipWidth);
    }
  };

  const handleWaistWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWaistWidth = Number(e.target.value);
    if (newWaistWidth >= 60 && newWaistWidth <= 200) {
      setWaistWidth(newWaistWidth);
    }
  };

  return (
    <>
      <Canvas
        style={{ height: "100dvh", width: "100dvw", background: "#e8f4f8" }} // Set background color to black
        camera={{ position: [0, 1, 5], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<span>Loading...</span>}>
          <Model
            height={height}
            chestWidth={chestWidth}
            waistWidth={waistWidth}
            hipWidth={hipWidth}
          />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          target={[0, 0.8, 0]}
          minDistance={1.6}
          maxDistance={3}
          minPolarAngle={0.5}
          maxPolarAngle={1.5}
        />
        <mesh rotation-x={-Math.PI / 2}>
          <circleGeometry args={[5, 32]} />
          <meshStandardMaterial color="#343434" />
        </mesh>
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#fff",
        }}
      >
        <label style={{ color: "black" }}>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={handleHeightChange}
            min="150"
            max="220"
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label style={{ color: "black" }}>
          Chest Width (cm):
          <input
            type="number"
            value={chestWidth}
            onChange={handleChestWidthChange}
            min="70"
            max="120"
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label style={{ color: "black" }}>
          Waist Width (cm):
          <input
            type="number"
            value={waistWidth}
            onChange={handleWaistWidthChange}
            min="60"
            max="200"
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label style={{ color: "black" }}>
          Hip Width (cm):
          <input
            type="number"
            value={hipWidth} // Fixed here
            onChange={handleHipWidthChange} // Fixed here
            min="90" // Adjusted minimum value to match the allowed range
            max="120"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
    </>
  );
};

export default Scene;
