import React from 'react';
import * as THREE from 'three';

function GlassWall({ position, args }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color="#2a2a5e"
        transparent
        opacity={0.1}
        roughness={0.1}
        metalness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function HouseStructure() {
  const wallH = 1.4;
  const wallY1 = wallH / 2;
  const wallY2 = 3 + wallH / 2;

  return (
    <group>
      {/* Floor 1 slab */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[12, 0.08, 6]} />
        <meshStandardMaterial color="#12122a" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Floor 2 slab */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[12, 0.08, 6]} />
        <meshStandardMaterial color="#12122a" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 6.15, 0]}>
        <boxGeometry args={[12.4, 0.12, 6.4]} />
        <meshStandardMaterial color="#08080f" roughness={0.9} />
      </mesh>

      {/* Floor 1 walls */}
      <GlassWall position={[-6, wallY1, 0]} args={[0.06, wallH, 6]} />
      <GlassWall position={[6, wallY1, 0]} args={[0.06, wallH, 6]} />
      <GlassWall position={[0, wallY1, -3]} args={[12, wallH, 0.06]} />
      <GlassWall position={[0, wallY1, 3]} args={[12, wallH, 0.06]} />
      <GlassWall position={[-1, wallY1, 0]} args={[0.06, wallH, 6]} />
      <GlassWall position={[3, wallY1, 0]} args={[0.06, wallH, 6]} />

      {/* Floor 2 walls */}
      <GlassWall position={[-6, wallY2, 0]} args={[0.06, wallH, 6]} />
      <GlassWall position={[6, wallY2, 0]} args={[0.06, wallH, 6]} />
      <GlassWall position={[0, wallY2, -3]} args={[12, wallH, 0.06]} />
      <GlassWall position={[0, wallY2, 3]} args={[12, wallH, 0.06]} />
      <GlassWall position={[0, wallY2, 0]} args={[0.06, wallH, 6]} />

      {/* Corner pillars */}
      {[
        [-6, -3], [6, -3], [-6, 3], [6, 3],
      ].map((pos, i) => (
        <mesh key={i} position={[pos[0], 3, pos[1]]}>
          <boxGeometry args={[0.18, 6, 0.18]} />
          <meshStandardMaterial color="#0a0a18" roughness={0.3} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}