"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { SVGLoader } from "three-stdlib";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ----------------------------------------------------------
   Helpers
---------------------------------------------------------- */

function getCentroid(shape: THREE.Shape) {
  const pts = shape.getPoints(150);
  let x = 0, y = 0;
  pts.forEach((p) => {
    x += p.x;
    y += p.y;
  });
  return new THREE.Vector2(x / pts.length, y / pts.length);
}

function computeBounds(shapes: any[]) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  shapes.forEach(({ shape }) => {
    shape.getPoints(80).forEach((p: any) => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    });
  });
  const width = maxX - minX;
  const height = maxY - minY;
  const center = new THREE.Vector2(minX + width / 2, minY + height / 2);
  return { minX, maxX, minY, maxY, width, height, center };
}

function createArc(a: THREE.Vector2, b: THREE.Vector2) {
  const dist = a.distanceTo(b);
  const h = dist * 0.22;
  const mid = new THREE.Vector3((a.x + b.x) / 2, (a.y + b.y) / 2 + h, 0);
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(a.x, a.y, 0),
    mid,
    new THREE.Vector3(b.x, b.y, 0)
  );
  return curve.getPoints(80);
}

/* ----------------------------------------------------------
   Debug Info Component
---------------------------------------------------------- */
function DebugInfo({ info }: { info: string[] }) {
  return (
    <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-md z-10">
      <h3 className="font-bold mb-2 text-green-400">Debug Info:</h3>
      {info.map((line, i) => (
        <div key={i} className="mb-1">{line}</div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------
   MAIN MAP
---------------------------------------------------------- */

function USMap({ 
  boxHeight, 
  onDebugInfo 
}: { 
  boxHeight: number;
  onDebugInfo: (info: string[]) => void;
}) {
  const svg = useLoader(SVGLoader, "/maps/usa.svg");

  const shapes = useMemo(() => {
    const allShapes: any[] = [];
    const debugInfo: string[] = [];
    
    debugInfo.push(`✅ SVG loaded successfully`);
    debugInfo.push(`📊 Total paths: ${svg.paths.length}`);
    
    svg.paths.forEach((path, pathIndex) => {
      const fillColor = path.color?.getStyle() || "#193678";
      const pathShapes = SVGLoader.createShapes(path);
      const id = path.userData?.node?.getAttribute("id") || `state-${pathIndex}`;
      
      pathShapes.forEach((shape) => {
        allShapes.push({
          id,
          shape,
          centroid: getCentroid(shape),
          color: fillColor
        });
      });
    });

    debugInfo.push(`🗺️ Shapes created: ${allShapes.length}`);
    debugInfo.push(`🏷️ Sample IDs: ${allShapes.slice(0, 3).map(s => s.id).join(", ")}`);
    
    onDebugInfo(debugInfo);
    console.log("SVG Processing:", debugInfo);
    
    return allShapes;
  }, [svg, onDebugInfo]);

  const bounds = computeBounds(shapes);
  const scale = (boxHeight) / bounds.height; // Reduced scale for more margin
  const offsetX = -bounds.center.x * scale;
  const offsetY = -bounds.center.y * scale;

  const arcs = useMemo(() => {
    const cents = shapes.map((s) => s.centroid);
    const out: THREE.Vector3[][] = [];

    for (let i = 0; i < cents.length; i++) {
      for (let j = i + 1; j < cents.length; j++) {
        const d = cents[i].distanceTo(cents[j]);
        if (d > 50 && d < 300 && Math.random() < 0.12) {
          out.push(createArc(cents[i], cents[j]));
        }
      }
    }

    console.log(`✨ Generated ${out.length} network connections`);
    return out;
  }, [shapes]);

  return (
    <group scale={[scale, -scale, scale]} position={[offsetX, offsetY, 0]}>
      {shapes.map((s, i) => (
        <mesh key={`state-${i}`}>
          <shapeGeometry args={[s.shape]} />
          <meshBasicMaterial color="#1E78D6" side={THREE.DoubleSide} />
        </mesh>
      ))}
      {arcs.map((pts, i) => (
        <Line
          key={`arc-${i}`}
          points={pts}
          color="#4FC3F7"
          lineWidth={1.5}
          transparent
          opacity={0.65}
        />
      ))}
    </group>
  );
}

/* ----------------------------------------------------------
   PUBLIC COMPONENT WITH DEBUG
---------------------------------------------------------- */

export default function NetworkCanvasDebug() {
  const [debugInfo, setDebugInfo] = useState<string[]>([
    "⏳ Loading SVG..."
  ]);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative">
      <DebugInfo info={debugInfo} />
      
      {error && (
        <div className="absolute top-20 left-4 bg-red-900/90 text-white p-4 rounded-lg text-xs max-w-md z-10">
          <h3 className="font-bold mb-2">❌ Error:</h3>
          <div>{error}</div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 500], fov: 55 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true }}
        onCreated={() => {
          console.log("✅ Canvas created successfully");
          setDebugInfo(prev => [...prev, "✅ Canvas initialized"]);
        }}
        onError={(error) => {
          console.error("❌ Canvas error:", error);
          // setError(error.message);
        }}
      >
        <color attach="background" args={["#f8fafc"]} />
        <ambientLight intensity={1.2} />
        
        <React.Suspense fallback={null}>
          <USMap 
            boxHeight={300}
            onDebugInfo={(info) => {
              setDebugInfo(prev => [...prev, ...info]);
            }}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}