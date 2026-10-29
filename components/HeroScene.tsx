"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

const NODES = [
  { label: "AI", pos: [1.9, 1.1, 0.4] as [number, number, number], color: "#4a9eff" },
  { label: "BACKEND", pos: [-1.9, 1.0, -0.5] as [number, number, number], color: "#00e5c7" },
  { label: "CLOUD", pos: [-1.7, -1.2, 0.6] as [number, number, number], color: "#4a9eff" },
  { label: "MOBILE", pos: [1.8, -1.1, -0.3] as [number, number, number], color: "#00e5c7" },
];

// Self-drawn canvas texture — no network font fetch, works fully offline.
function makeLabelSprite(text: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = "600 30px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#f2f4f7";
    ctx.fillText(text, 128, 34);
  }
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.5, 0.38, 1);
  return sprite;
}

function Node({ pos, color, label, t0 }: { pos: [number, number, number]; color: string; label: string; t0: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const sprite = useMemo(() => makeLabelSprite(label), [label]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 1.4 + t0) * 0.14;
    mesh.current.scale.setScalar(s);
  });

  return (
    <group position={pos}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <primitive object={sprite} position={[0, 0.34, 0]} />
    </group>
  );
}

function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x += delta * 0.12;
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.42, 1]} />
      <meshBasicMaterial color="#4a9eff" wireframe />
    </mesh>
  );
}

function Particles() {
  const positions = useMemo(() => {
    const count = 90;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.02} transparent opacity={0.25} />
    </points>
  );
}

function Scene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <>
      <Core />
      {NODES.map((n, i) => (
        <Node key={n.label} pos={n.pos} color={n.color} label={n.label} t0={i} />
      ))}
      {NODES.map((n) => (
        <Line
          key={`line-${n.label}`}
          points={[
            [0, 0, 0],
            n.pos,
          ]}
          color="#f2f4f7"
          transparent
          opacity={0.3}
          lineWidth={1}
        />
      ))}
      <Particles />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduceMotion}
        autoRotateSpeed={1.1}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

export default function HeroScene() {
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true }}>
      <color attach="background" args={["#0d1013"]} />
      <Scene reduceMotion={reduceMotion} />
    </Canvas>
  );
}
