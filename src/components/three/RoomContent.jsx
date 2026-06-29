import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Furniture from './Furniture';

function RoomLight({ light, position }) {
  const intensity = light.on ? (light.brightness / 100) * 12 : 0;

  return (
    <group position={position}>
      <pointLight
        intensity={intensity}
        color={light.color}
        distance={8}
        decay={2}
      />
      {/* Bulb */}
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={light.color}
          emissive={light.color}
          emissiveIntensity={light.on ? 5 : 0}
          toneMapped={false}
        />
      </mesh>
      {/* Fixture */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
      </mesh>
    </group>
  );
}

function ACUnit({ ac, position }) {
  const ventRef = useRef();

  useFrame(() => {
    if (ventRef.current && ac?.on) {
      ventRef.current.position.z = 0.08 + Math.sin(Date.now() * 0.005) * 0.015;
    }
  });

  if (!ac) return null;

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.8, 0.22, 0.15]} />
        <meshStandardMaterial
          color="#e8e8f0"
          roughness={0.3}
          emissive={ac.on ? '#5CE1E6' : '#000'}
          emissiveIntensity={ac.on ? 0.3 : 0}
        />
      </mesh>
      {ac.on && (
        <>
          <mesh ref={ventRef} position={[0, -0.12, 0.08]}>
            <boxGeometry args={[0.6, 0.02, 0.02]} />
            <meshStandardMaterial
              color="#5CE1E6"
              emissive="#5CE1E6"
              emissiveIntensity={4}
              toneMapped={false}
            />
          </mesh>
          <pointLight position={[0, -0.5, 0.3]} intensity={0.4} color="#5CE1E6" distance={3} decay={2} />
        </>
      )}
    </group>
  );
}

function SecurityCamera({ camera, position }) {
  if (!camera) return null;

  return (
    <group position={position} rotation={[0, (camera.angle * Math.PI) / 180, 0]}>
      <mesh>
        <cylinderGeometry args={[0.03, 0.03, 0.06]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.07, 0]}>
        <boxGeometry args={[0.07, 0.05, 0.1]} />
        <meshStandardMaterial color="#2a2a3e" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.07, 0.06]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial
          color="#0a0a0f"
          emissive={camera.online ? '#4CAF50' : '#333'}
          emissiveIntensity={camera.online ? 1.5 : 0}
          metalness={0.8}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.03, -0.04, 0.04]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial
          color={camera.online ? '#4CAF50' : '#333'}
          emissive={camera.online ? '#4CAF50' : '#000'}
          emissiveIntensity={camera.online ? 4 : 0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function RoomFloor({ room, isSelected, onSelect }) {
  const [cx, cy, cz] = room.center;
  const [w, , d] = room.size;

  return (
    <mesh
      position={[cx, cy + 0.05, cz]}
      onClick={onSelect ? (e) => { e.stopPropagation(); onSelect(); } : undefined}
      onPointerOver={onSelect ? () => { document.body.style.cursor = 'pointer'; } : undefined}
      onPointerOut={onSelect ? () => { document.body.style.cursor = 'default'; } : undefined}
    >
      <boxGeometry args={[w - 0.1, 0.02, d - 0.1]} />
      <meshStandardMaterial
        color={isSelected ? '#1a2a4e' : '#0f0f22'}
        emissive={isSelected ? '#5CE1E6' : '#000'}
        emissiveIntensity={isSelected ? 0.2 : 0}
        roughness={0.4}
        metalness={0.3}
      />
    </mesh>
  );
}

export default function RoomContent({ rooms, selectedRoom, onSelect }) {
  return (
    <group>
      {Object.entries(rooms).map(([roomId, room]) => {
        const [cx, cy, cz] = room.center;
        const [w, h, d] = room.size;
        const isSelected = selectedRoom === roomId;

        const lightPositions = room.lights.map((_, i) => {
          const total = room.lights.length;
          const offset = total > 1 ? (i - (total - 1) / 2) * (w / total) : 0;
          return [cx + offset, cy + h - 0.12, cz];
        });

        const acPosition = [cx, cy + h - 0.15, cz - d / 2 + 0.1];
        const cameraPosition = [cx - w / 2 + 0.15, cy + h - 0.2, cz - d / 2 + 0.15];

        return (
          <group key={roomId}>
            <RoomFloor
              room={room}
              isSelected={isSelected}
              onSelect={onSelect ? () => onSelect(roomId) : null}
            />

            {room.lights.map((light, i) => (
              <RoomLight key={light.id} light={light} position={lightPositions[i]} />
            ))}

            {room.ac && <ACUnit ac={room.ac} position={acPosition} />}

            {room.camera && (
              <SecurityCamera camera={room.camera} position={cameraPosition} />
            )}

            {room.furniture?.map((f, i) => (
              <Furniture
                key={i}
                type={f.type}
                position={[
                  room.center[0] + f.position[0],
                  room.center[1] + f.position[1],
                  room.center[2] + f.position[2],
                ]}
                rotation={f.rotation || [0, 0, 0]}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
}