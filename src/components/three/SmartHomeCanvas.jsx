import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import HouseStructure from './HouseStructure';
import RoomContent from './RoomContent';
import CameraController from './CameraController';

export default function SmartHomeCanvas({
  autoRotate = false,
  interactive = true,
  rooms,
  selectedRoom,
  onSelectRoom,
}) {
  return (
    <Canvas
      camera={{ position: [0, 5, 14], fov: 45 }}
      gl={{ antialias: true, alpha: true, toneMappingExposure: 1.2, toneMapping: THREE.ACESFilmicToneMapping }}
      dpr={[1, 2]}
      onPointerMissed={() => interactive && onSelectRoom?.(null)}
    >
      <color attach="background" args={['#07070D']} />
      <fog attach="fog" args={['#07070D', 22, 42]} />

      <ambientLight intensity={0.15} color="#4a4a7e" />
      <hemisphereLight args={['#2a2a5e', '#050508', 0.3]} />
      <directionalLight position={[8, 15, 8]} intensity={0.2} color="#8090C0" />

      <Suspense fallback={null}>
        <HouseStructure />
        {rooms && (
          <RoomContent
            rooms={rooms}
            selectedRoom={selectedRoom}
            onSelect={interactive ? onSelectRoom : null}
          />
        )}
        <CameraController
          autoRotate={autoRotate}
          selectedRoom={selectedRoom}
          rooms={rooms}
        />
      </Suspense>
    </Canvas>
  );
}