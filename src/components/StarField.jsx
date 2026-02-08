import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarField() {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 100;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  // Create circular texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
        // New Movement: Tilted rotation for a more dynamic "orbiting" feel
        ref.current.rotation.x -= delta * 0.01; 
        ref.current.rotation.y -= delta * 0.03; 
        
        // Gentle oscillation on Y axis to simulate floating
        ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.2} 
        color="white" 
        map={texture} 
        transparent 
        opacity={0.8} 
        sizeAttenuation 
        alphaTest={0.1} 
      />
    </points>
  );
}
