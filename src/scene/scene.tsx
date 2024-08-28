import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

// Komponent för att ladda och rendera modellen
const Model: React.FC = () => {
  const { scene } = useGLTF("./lowpoly-human-reff.glb"); // Sätt rätt sökväg till din GLB-fil

  return <primitive object={scene} scale={1} />;
};

// Huvudkomponent för scenen
const Scene: React.FC = () => {
  return (
    <Canvas
      style={{ height: "100dvh", width: "100dvw" }}
      camera={{ position: [0, 1, 5], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={<span>Loading...</span>}>
        <Model />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        target={[0, 1, 0]} // This makes the camera focus on the model's position
        minDistance={1.6} // Minimum zoom distance
        maxDistance={3} // Maximum zoom distance
        minPolarAngle={0.5} // Minimum vertical angle in radians (e.g., 0.5 rad = 28.6 degrees)
        maxPolarAngle={1.5} // Maximum vertical angle in radians (e.g., 1.5 rad = 85.9 degrees)
      />
      <mesh rotation-x={-Math.PI / 2}>
        <circleGeometry args={[5, 32]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>
    </Canvas>
  );
};

export default Scene;
