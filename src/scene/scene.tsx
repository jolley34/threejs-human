import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";

// Load and render the 3D model
const Model: React.FC<{ scale: number; widthScale: number }> = ({
  scale,
  widthScale,
}) => {
  const { scene } = useGLTF("./lowpoly-human-reff.glb");
  // Adjust the scale of the model to affect its width
  scene.scale.set(scale * widthScale, scale, scale);
  return <primitive object={scene} />;
};

// Main Scene component
const Scene: React.FC = () => {
  const [height, setHeight] = useState<number>(180); // Default height in cm
  const [chestWidth, setChestWidth] = useState<number>(96.52); // Default chest width in cm

  const modelOriginalHeight = 180; // Replace this with your model's original height in cm
  const modelOriginalChestWidth = 96.52; // Replace this with your model's original chest width in cm

  // Convert height in cm to scale factor
  const heightScaleFactor = height / modelOriginalHeight;
  // Convert chest width in cm to width scale factor
  const widthScaleFactor = chestWidth / modelOriginalChestWidth;

  // Handle height change with constraints
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    if (newHeight >= 150 && newHeight <= 220) {
      setHeight(newHeight);
    }
  };

  // Handle chest width change with constraints
  const handleChestWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChestWidth = Number(e.target.value);
    if (newChestWidth >= 70 && newChestWidth <= 120) {
      setChestWidth(newChestWidth);
    }
  };

  return (
    <>
      <Canvas
        style={{ height: "100dvh", width: "100dvw", background: "#000000" }} // Set background color to black
        camera={{ position: [0, 1, 5], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<span>Loading...</span>}>
          <Model scale={heightScaleFactor} widthScale={widthScaleFactor} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          target={[0, 1, 0]}
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

      {/* Input for height */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#fff",
        }}
      >
        <label>
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
        <label>
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
      </div>
    </>
  );
};

export default Scene;
