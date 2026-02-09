import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleNetwork() {
  const whiteParticlesRef = useRef();
  const orangeParticlesRef = useRef();
  const whiteLinesRef = useRef();
  const orangeLinesRef = useRef();

  // Generate particles with sparse orange ones
  const particles = useMemo(() => {
    const particleCount = 105;
    const temp = [];
    
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
        isOrange: Math.random() < 0.08 // 8% chance to be orange
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    // Animate particles
    particles.forEach((particle) => {
      particle.position.add(particle.velocity);

      // Boundary checks
      if (Math.abs(particle.position.x) > 7.5) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 5) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 2.5) particle.velocity.z *= -1;
    });

    // Update particle positions separately for white and orange
    const whiteParticles = particles.filter(p => !p.isOrange);
    const orangeParticles = particles.filter(p => p.isOrange);

    if (whiteParticlesRef.current) {
      const positions = whiteParticlesRef.current.geometry.attributes.position.array;
      whiteParticles.forEach((particle, i) => {
        positions[i * 3] = particle.position.x;
        positions[i * 3 + 1] = particle.position.y;
        positions[i * 3 + 2] = particle.position.z;
      });
      whiteParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (orangeParticlesRef.current) {
      const positions = orangeParticlesRef.current.geometry.attributes.position.array;
      orangeParticles.forEach((particle, i) => {
        positions[i * 3] = particle.position.x;
        positions[i * 3 + 1] = particle.position.y;
        positions[i * 3 + 2] = particle.position.z;
      });
      orangeParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update lines between nearby particles
    const whiteLinePositions = [];
    const orangeLinePositions = [];
    const maxDistance = 2.1;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = particles[i].position.distanceTo(particles[j].position);
        
        if (distance < maxDistance) {
          const lineData = [
            particles[i].position.x,
            particles[i].position.y,
            particles[i].position.z,
            particles[j].position.x,
            particles[j].position.y,
            particles[j].position.z
          ];

          // If either particle is orange, make the line orange
          if (particles[i].isOrange || particles[j].isOrange) {
            orangeLinePositions.push(...lineData);
          } else {
            whiteLinePositions.push(...lineData);
          }
        }
      }
    }

    if (whiteLinesRef.current) {
      whiteLinesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(whiteLinePositions, 3)
      );
    }

    if (orangeLinesRef.current) {
      orangeLinesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(orangeLinePositions, 3)
      );
    }
  });

  // Initial particle positions for geometry
  const { whitePositions, orangePositions } = useMemo(() => {
    const whiteParticles = particles.filter(p => !p.isOrange);
    const orangeParticles = particles.filter(p => p.isOrange);

    const whitePos = new Float32Array(whiteParticles.length * 3);
    whiteParticles.forEach((particle, i) => {
      whitePos[i * 3] = particle.position.x;
      whitePos[i * 3 + 1] = particle.position.y;
      whitePos[i * 3 + 2] = particle.position.z;
    });

    const orangePos = new Float32Array(orangeParticles.length * 3);
    orangeParticles.forEach((particle, i) => {
      orangePos[i * 3] = particle.position.x;
      orangePos[i * 3 + 1] = particle.position.y;
      orangePos[i * 3 + 2] = particle.position.z;
    });

    return { whitePositions: whitePos, orangePositions: orangePos };
  }, [particles]);

  return (
    <>
      {/* White Particles */}
      <points ref={whiteParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={whitePositions.length / 3}
            array={whitePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      {/* Orange Particles */}
      <points ref={orangeParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={orangePositions.length / 3}
            array={orangePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#ff6600"
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      {/* White Connection Lines */}
      <lineSegments ref={whiteLinesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
      </lineSegments>

      {/* Orange Connection Lines */}
      <lineSegments ref={orangeLinesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#ff6600" opacity={0.3} transparent />
      </lineSegments>
    </>
  );
}

export default function NetworkBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
