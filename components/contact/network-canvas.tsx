"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

/* ----------------------------------------------------------
   CONSTANTS — MAP & ARC CONSTRAINTS
---------------------------------------------------------- */
const GEOJSON_URL =
  "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json";

const ARC_BASE_Z = 2.2; // always above state meshes
const MIN_ARC_HEIGHT = 6; // minimum arc lift
const MAX_ARC_HEIGHT = 18; // max clamp so arcs never escape map

/* ----------------------------------------------------------
   CONTINUOUS DOTTED FLOW SHADER (NOT DASHED)
---------------------------------------------------------- */
const StripeDotShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#6366f1") },
    uSpeed: { value: 0.4 },
    uOpacity: { value: 1.0 },
    uPhase: { value: Math.random() * 10.0 },
  },
  vertexShader: `
    varying float vProgress;
    void main() {
      vProgress = uv.x;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uSpeed;
    uniform float uOpacity;
    uniform float uPhase;
    uniform vec3 uColor;
    varying float vProgress;

    void main() {
      float spacing = 26.0;
      float dotSize = 0.18;

      float flow = uTime * uSpeed + uPhase;
      float pattern = fract(vProgress * spacing - flow);

      float dot =
        smoothstep(dotSize, dotSize + 0.04, pattern) *
        smoothstep(1.0 - dotSize, 1.0 - dotSize - 0.04, pattern);

      float edgeFade =
        smoothstep(0.0, 0.1, vProgress) *
        smoothstep(1.0, 0.9, vProgress);

      if (dot < 0.15) discard;

      gl_FragColor = vec4(uColor, dot * edgeFade * uOpacity);
    }
  `,
};

/* ----------------------------------------------------------
   STATE MESH
---------------------------------------------------------- */
function State3D({ shapes }: { shapes: THREE.Shape[] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const borders = useMemo(
    () =>
      shapes.map((shape) =>
        shape.getPoints(50).map((p) => new THREE.Vector3(p.x, p.y, 1.02)),
      ),
    [shapes],
  );

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      hovered ? 2 : 0,
      0.1,
    );

    (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(
      new THREE.Color(hovered ? "#4f46e5" : "#f1f5f9"),
      0.1,
    );
  });

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={meshRef}>
        <extrudeGeometry
          args={[
            shapes,
            {
              depth: 1,
              bevelEnabled: true,
              bevelThickness: 0.05,
              bevelSize: 0.02,
              bevelSegments: 2,
            },
          ]}
        />
        <meshStandardMaterial roughness={0.7} metalness={0.1} />
      </mesh>

      {borders.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color="#cbd5e1"
          lineWidth={0.5}
          transparent
          opacity={0.5}
        />
      ))}
    </group>
  );
}

/* ----------------------------------------------------------
   ANIMATED ARC (ALWAYS ABOVE MAP)
---------------------------------------------------------- */
function AnimatedDottedArc({
  points,
  lifetime,
  onExpire,
}: {
  points: THREE.Vector3[];
  lifetime: number;
  onExpire: () => void;
}) {
  const matRef = useRef<any>(null);
  const born = useRef(performance.now());
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const speed = useMemo(() => 0.25 + Math.random() * 0.35, []);
  const phase = useMemo(() => Math.random() * 20, []);

  useFrame((state) => {
    if (!matRef.current) return;

    const t = (performance.now() - born.current) / 1000;
    const fadeIn = Math.min(t / 0.6, 1);
    const fadeOut = Math.min((lifetime - t) / 0.8, 1);

    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    matRef.current.uniforms.uSpeed.value = speed;
    matRef.current.uniforms.uPhase.value = phase;
    matRef.current.uniforms.uOpacity.value = Math.min(fadeIn, fadeOut);

    if (t > lifetime) onExpire();
  });

  return (
    <mesh>
      <tubeGeometry args={[curve, 120, 0.04, 8, false]} />
      <shaderMaterial
        ref={matRef}
        args={[StripeDotShader]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ----------------------------------------------------------
   RESPONSIVE CAMERA
---------------------------------------------------------- */
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    if (size.width < 640) {
      camera.position.set(0, -12, 95);
      camera.fov = 40;
    } else if (size.width < 1024) {
      camera.position.set(0, -14, 85);
      camera.fov = 37;
    } else {
      camera.position.set(0, -15, 80);
      camera.fov = 35;
    }

    camera.updateProjectionMatrix();
  }, [size, camera]);

  return null;
}

/* ----------------------------------------------------------
   GLOBAL MAP + CONSTRAINED RANDOM TRAFFIC
---------------------------------------------------------- */
function GlobalTrafficMap() {
  const [data, setData] = useState<any>(null);
  const [arcs, setArcs] = useState<THREE.Vector3[][]>([]);
  const { viewport } = useThree();

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((res) => res.json())
      .then(setData);
  }, []);

  const { states, centroids } = useMemo(() => {
    if (!data) return { states: [], centroids: [] };

    const states: any[] = [];
    const centroids: THREE.Vector3[] = [];

    data.features.forEach((f: any) => {
      if (["Alaska", "Hawaii", "Puerto Rico"].includes(f.properties.name))
        return;

      const shapes: THREE.Shape[] = [];

      const project = (coords: number[][]) => {
        const s = new THREE.Shape();
        coords.forEach(([lon, lat], i) => {
          const x = (lon + 96) * 1.5;
          const y = (lat - 38) * 1.8;
          i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
        });
        return s;
      };

      if (f.geometry.type === "Polygon") {
        shapes.push(project(f.geometry.coordinates[0]));
      } else {
        f.geometry.coordinates.forEach((poly: any) =>
          shapes.push(project(poly[0])),
        );
      }

      const box = new THREE.Box2();
      shapes[0].getPoints().forEach((p) => box.expandByPoint(p));
      const center = new THREE.Vector2();
      box.getCenter(center);

      centroids.push(new THREE.Vector3(center.x, center.y, ARC_BASE_Z));
      states.push({ shapes });
    });

    return { states, centroids };
  }, [data]);

  // ✅ CLAMPED ARC GENERATOR (KEY FIX)
  const makeCurve = () => {
    if (centroids.length < 2) return null;

    const a = centroids[Math.floor(Math.random() * centroids.length)];
    const b = centroids[Math.floor(Math.random() * centroids.length)];
    if (!a || !b || a === b) return null;

    const start = a.clone();
    const end = b.clone();

    const distance = start.distanceTo(end);
    const height = THREE.MathUtils.clamp(
      distance * 0.35,
      MIN_ARC_HEIGHT,
      MAX_ARC_HEIGHT,
    );

    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    mid.z = ARC_BASE_Z + height;

    return [start, mid, end];
  };

  useEffect(() => {
    if (!centroids.length) return;

    setArcs(
      Array.from({ length: 10 })
        .map(makeCurve)
        .filter(Boolean) as THREE.Vector3[][],
    );

    const interval = setInterval(() => {
      setArcs((prev) => {
        if (prev.length > 18) return prev;
        const next = makeCurve();
        return next ? [...prev, next] : prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [centroids]);

  const scale = Math.min(viewport.width / 80, 1);

  return (
    <Center>
      <group scale={scale} rotation={[-0.4, 0, 0]}>
        {states.map((s, i) => (
          <State3D key={i} shapes={s.shapes} />
        ))}

        {arcs.map((pts, i) => (
          <AnimatedDottedArc
            key={i}
            points={pts}
            lifetime={6 + Math.random() * 2}
            onExpire={() =>
              setArcs((prev) => prev.filter((_, idx) => idx !== i))
            }
          />
        ))}
      </group>
    </Center>
  );
}

/* ----------------------------------------------------------
   MAIN EXPORT
---------------------------------------------------------- */
export default function NetworkCanvas() {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio || 1, 2));
  }, []);

  return (
    <div className="h-full w-full rounded-xl border border-slate-100 bg-[#f8fafc]">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ResponsiveCamera />

        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 30]} intensity={1} color="#6366f1" />

        <GlobalTrafficMap />

        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3.2}
        />
      </Canvas>
    </div>
  );
}
