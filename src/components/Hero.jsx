import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D Scene Component
function Scene() {
  const meshRef = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.2,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouse.x * 0.2,
        0.05
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#c20023" intensity={2} />
      <pointLight position={[10, -10, 5]} color="#ff6600" intensity={1} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={meshRef}>
          {/* Main abstract shape */}
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.5, 1]} />
            <MeshDistortMaterial
              color="#331019"
              roughness={0.1}
              metalness={0.8}
              distort={0.3}
              speed={2}
            />
          </mesh>

          {/* Orbiting rings */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2.2, 0.02, 16, 100]} />
            <meshStandardMaterial color="#c20023" emissive="#c20023" emissiveIntensity={0.5} />
          </mesh>

          <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
            <torusGeometry args={[2.5, 0.015, 16, 100]} />
            <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
          </mesh>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.sin(i * 0.5) * 3,
                Math.cos(i * 0.7) * 3,
                Math.sin(i * 0.3) * 3,
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#c20023' : '#ff6600'}
                emissive={i % 2 === 0 ? '#c20023' : '#ff6600'}
                emissiveIntensity={2}
              />
            </mesh>
          ))}
        </group>
      </Float>

      <Environment preset="night" />
    </>
  );
}

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date('February 16, 2026 12:00:00').getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="flex gap-4 md:gap-8 mt-8">
            {Object.keys(timeLeft).map((interval) => (
                <div key={interval} className="flex flex-col items-center">
                    <span className="text-3xl md:text-5xl font-bold font-mono text-brand-orange">
                        {timeLeft[interval] || '0'}
                    </span>
                    <span className="text-xs md:text-sm text-white/50 uppercase tracking-widest mt-2">{interval}</span>
                </div>
            ))}
        </div>
    );
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ y, opacity }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl leading-tight font-tech tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Welcome to{' '}
          <span className="gradient-text">ProdUX, 2026</span>
        </motion.h1>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 flex flex-col items-center gap-2"
        >
            <p className="text-3xl md:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-2">
                Designing the Next Era of Growth
            </p>
            <p className="text-lg md:text-xl text-white/60 font-mono tracking-widest uppercase mt-4">
                16th to 22nd February, 2026
            </p>
        </motion.div>
        
        <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 1.1 }}
        >
            <CountdownTimer />
        </motion.div>
      </motion.div>
    </section>
  );
}
