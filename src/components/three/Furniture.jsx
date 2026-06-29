import React from 'react';

export default function Furniture({ type, position, rotation }) {
  const props = { position, rotation };

  switch (type) {
    case 'sofa':
      return (
        <group {...props}>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[1.6, 0.3, 0.7]} />
            <meshStandardMaterial color="#2a3a5a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.15, 0.35]}>
            <boxGeometry args={[1.6, 0.2, 0.1]} />
            <meshStandardMaterial color="#1a2a4a" roughness={0.8} />
          </mesh>
          <mesh position={[-0.75, 0.45, 0]}>
            <boxGeometry args={[0.15, 0.4, 0.7]} />
            <meshStandardMaterial color="#2a3a5a" roughness={0.8} />
          </mesh>
          <mesh position={[0.75, 0.45, 0]}>
            <boxGeometry args={[0.15, 0.4, 0.7]} />
            <meshStandardMaterial color="#2a3a5a" roughness={0.8} />
          </mesh>
        </group>
      );
    case 'tv':
      return (
        <group {...props}>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[1.3, 0.75, 0.04]} />
            <meshStandardMaterial color="#08080f" emissive="#1a2a4e" emissiveIntensity={0.6} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.1, 0.5, 0.3]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
          </mesh>
        </group>
      );
    case 'coffeeTable':
      return (
        <group {...props}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.9, 0.04, 0.55]} />
            <meshStandardMaterial color="#3a3a4e" roughness={0.3} metalness={0.4} />
          </mesh>
          {[[-0.4, -0.22], [0.4, -0.22], [-0.4, 0.22], [0.4, 0.22]].map((p, i) => (
            <mesh key={i} position={[p[0], 0.1, p[1]]}>
              <boxGeometry args={[0.04, 0.2, 0.04]} />
              <meshStandardMaterial color="#2a2a3e" />
            </mesh>
          ))}
        </group>
      );
    case 'counter':
      return (
        <group {...props}>
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[2, 0.9, 0.5]} />
            <meshStandardMaterial color="#2a2a3e" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.92, 0]}>
            <boxGeometry args={[2.1, 0.06, 0.55]} />
            <meshStandardMaterial color="#4a4a6e" roughness={0.2} metalness={0.6} />
          </mesh>
        </group>
      );
    case 'island':
      return (
        <group {...props}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.3, 0.8, 0.6]} />
            <meshStandardMaterial color="#3a3a4e" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.82, 0]}>
            <boxGeometry args={[1.4, 0.04, 0.7]} />
            <meshStandardMaterial color="#5a5a7e" roughness={0.2} metalness={0.5} />
          </mesh>
        </group>
      );
    case 'car':
      return (
        <group {...props}>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[1, 0.35, 2]} />
            <meshStandardMaterial color="#6a1a2a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.55, -0.1]}>
            <boxGeometry args={[0.85, 0.28, 1]} />
            <meshStandardMaterial color="#5a1a2a" roughness={0.2} metalness={0.8} />
          </mesh>
          {[[-0.5, 0.1, 0.65], [0.5, 0.1, 0.65], [-0.5, 0.1, -0.65], [0.5, 0.1, -0.65]].map((p, i) => (
            <mesh key={i} position={[p[0], p[1], p[2]]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
              <meshStandardMaterial color="#0a0a0a" />
            </mesh>
          ))}
        </group>
      );
    case 'bed':
      return (
        <group {...props}>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[1.5, 0.3, 2]} />
            <meshStandardMaterial color="#3a4a6a" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.45, -0.7]}>
            <boxGeometry args={[1.4, 0.08, 0.5]} />
            <meshStandardMaterial color="#5a6a8a" roughness={0.7} />
          </mesh>
          <mesh position={[-0.35, 0.43, -0.6]}>
            <boxGeometry args={[0.5, 0.1, 0.3]} />
            <meshStandardMaterial color="#e0e0e8" roughness={0.5} />
          </mesh>
          <mesh position={[0.35, 0.43, -0.6]}>
            <boxGeometry args={[0.5, 0.1, 0.3]} />
            <meshStandardMaterial color="#e0e0e8" roughness={0.5} />
          </mesh>
        </group>
      );
    case 'nightstand':
      return (
        <group {...props}>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.4, 0.5, 0.4]} />
            <meshStandardMaterial color="#3a3a4e" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.52, 0]}>
            <boxGeometry args={[0.42, 0.02, 0.42]} />
            <meshStandardMaterial color="#4a4a5e" roughness={0.3} />
          </mesh>
        </group>
      );
    case 'toilet':
      return (
        <group {...props}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.15, 0.18, 0.4, 16]} />
            <meshStandardMaterial color="#d8d8e0" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.45, -0.15]}>
            <boxGeometry args={[0.32, 0.35, 0.05]} />
            <meshStandardMaterial color="#c8c8d0" roughness={0.2} />
          </mesh>
        </group>
      );
    case 'sink':
      return (
        <group {...props}>
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.6, 0.7, 0.4]} />
            <meshStandardMaterial color="#3a3a4e" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.71, 0]}>
            <boxGeometry args={[0.65, 0.04, 0.45]} />
            <meshStandardMaterial color="#5a5a7e" roughness={0.1} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.73, 0]}>
            <boxGeometry args={[0.35, 0.02, 0.2]} />
            <meshStandardMaterial color="#0a0a0f" roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      );
    default:
      return null;
  }
}