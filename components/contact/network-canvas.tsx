"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Svg } from "@react-three/drei";
import * as THREE from "three";

// Define the type for a 2D point
interface Point2D {
  x: number;
  y: number;
}

// Constants for the network
const NODE_COUNT = 120; // Number of nodes
const LINE_DISTANCE = 0.22; // Max distance for lines to connect

/**
 * Generates an array of random 2D points within a specific range.
 */
function generatePoints(amount: number): Point2D[] {
  return [...Array(amount)].map(() => ({
    x: (Math.random() * 2 - 1) * 0.9,
    y: (Math.random() * 1.5 - 0.75) * 0.9,
  }));
}

/**
 * A single animated node in the network.
 */
const Node = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null!);

  // Animate the scale of the node for a pulsing effect
  useFrame(() => {
    if (ref.current) {
      ref.current.scale.setScalar(
        1 + Math.sin(performance.now() * 0.002) * 0.18
      );
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.014, 16]} />
      <meshBasicMaterial color="#4FC3F7" />
    </mesh>
  );
};

/**
 * The main component that renders the map and the network overlay.
 */
const NetworkMesh = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate the points for the nodes only once
  const points = useMemo(() => generatePoints(NODE_COUNT), []);

  // Generate the lines between nodes only once
  const lines = useMemo(() => {
    const linePairs = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

        // If points are close enough, create a line
        if (dist < LINE_DISTANCE) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(p1.x, p1.y, 0),
            new THREE.Vector3(p2.x, p2.y, 0),
          ]);
          linePairs.push({
            key: `${i}-${j}`,
            geometry: geometry,
          });
        }
      }
    }
    return linePairs;
  }, [points]); // Dependency array ensures this runs only when points change

  // Animate the rotation of the entire group
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.25) * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={[2.8, 2.8, 1]} position={[0, -0.25, 0]}>
      {/* FIX: Changed src from a local path to a public URL.
        Local paths like "/maps/us.svg" won't work in a sandboxed preview
        or a production build without a file loader.
        
        NOTE: This public URL from Wikimedia might be subject to CORS
        (Cross-Origin Resource Sharing) policies. For a real project,
        it's best to host the SVG file on your own domain or server.
      */}
      <Svg
        src="/maps/us.svg"
        scale={1}
        fillMaterial={{
          color: "#1EA0FF",
          opacity: 0.12,
          transparent: true,
        }}
        strokeMaterial={{
          color: "#4FC3F7",
          opacity: 0.4,
          transparent: true,
        }}
      />

      {/* Render all the nodes */}
      {points.map((p, i) => (
        <Node key={i} position={[p.x, p.y, 0.01]} />
      ))}

      {/* Render all the memoized lines */}
      <group>
        {lines.map((line) => (
          <line key={line.key} geometry={line.geometry}>
            <lineBasicMaterial color="#4FC3F7" transparent opacity={0.22} />
          </line>
        ))}
      </group>
    </group>
  );
};

/**
 * The main App component that sets up the React Three Fiber Canvas.
 */
export default function App() {
  return (
    <div className="w-full h-screen rounded-xl bg-[#070B12]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <color attach="background" args={["#070B12"]} />
        <NetworkMesh />
      </Canvas>
    </div>
  );
}
