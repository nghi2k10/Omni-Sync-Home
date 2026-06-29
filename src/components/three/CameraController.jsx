import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';

export default function CameraController({ autoRotate = false, selectedRoom, rooms }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    const target = selectedRoom && rooms?.[selectedRoom]
      ? rooms[selectedRoom].cameraFocus
      : { position: [0, 5, 14], target: [0, 2, 0] };

    gsap.to(camera.position, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      duration: 1.2,
      ease: 'power3.inOut',
    });

    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: target.target[0],
        y: target.target[1],
        z: target.target[2],
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }
  }, [selectedRoom, rooms, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={5}
      maxDistance={25}
      maxPolarAngle={Math.PI / 2.1}
      autoRotate={autoRotate}
      autoRotateSpeed={0.4}
      enableDamping
      dampingFactor={0.08}
      target={[0, 2, 0]}
    />
  );
}