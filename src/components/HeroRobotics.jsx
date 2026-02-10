import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import RegisterModal from './RegisterModal';

// 3D Robotic Arm
function RoboticArm() {
  const group = useRef();
  const arm1 = useRef();
  const arm2 = useRef();
  const claw1 = useRef();
  const claw2 = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (group.current) {
      group.current.rotation.y = Math.sin(time * 0.3) * 0.3;
    }
    
    if (arm1.current) {
      arm1.current.rotation.z = Math.sin(time * 0.5) * 0.4;
    }
    
    if (arm2.current) {
      arm2.current.rotation.z = Math.sin(time * 0.5 + 1) * 0.4;
    }

    if (claw1.current && claw2.current) {
      const clawMovement = Math.sin(time * 2) * 0.2 + 0.2;
      claw1.current.rotation.z = clawMovement;
      claw2.current.rotation.z = -clawMovement;
    }
  });

  return (
    <group ref={group} position={[2, 0, 0]}>
      {/* Base */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.5, 32]} />
        <meshStandardMaterial color="#EA912D" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Joint 1 */}
      <mesh position={[0, -1.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#c20023" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Arm segment 1 */}
      <group ref={arm1} position={[0, -1.5, 0]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.3, 2, 0.3]} />
          <meshStandardMaterial color="#2C2C2C" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Glowing strips */}
        <mesh position={[0.16, 1, 0]}>
          <boxGeometry args={[0.05, 1.8, 0.32]} />
          <meshStandardMaterial 
            color="#EA912D" 
            emissive="#EA912D" 
            emissiveIntensity={2}
            metalness={0.5}
          />
        </mesh>

        {/* Joint 2 */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#c20023" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Arm segment 2 */}
        <group ref={arm2} position={[0, 2, 0]}>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.25, 1.6, 0.25]} />
            <meshStandardMaterial color="#2C2C2C" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Glowing strip 2 */}
          <mesh position={[0.13, 0.8, 0]}>
            <boxGeometry args={[0.04, 1.4, 0.27]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={2}
            />
          </mesh>

          {/* End effector base */}
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.3, 0.2, 0.3, 32]} />
            <meshStandardMaterial color="#EA912D" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Claw 1 */}
          <group ref={claw1} position={[-0.15, 1.8, 0]}>
            <mesh position={[0, 0.3, 0]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.1, 0.6, 0.15]} />
              <meshStandardMaterial color="#c20023" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>

          {/* Claw 2 */}
          <group ref={claw2} position={[0.15, 1.8, 0]}>
            <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.1, 0.6, 0.15]} />
              <meshStandardMaterial color="#c20023" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Ambient particles */}
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const radius = 3 + Math.random();
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.random() * 4 - 2,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color="#EA912D"
              emissive="#EA912D"
              emissiveIntensity={3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Circuit board pattern background
function CircuitPattern() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 0 100 L 50 100 L 50 50 L 100 50" stroke="#EA912D" strokeWidth="2" fill="none" />
            <path d="M 100 50 L 150 50 L 150 100 L 200 100" stroke="#EA912D" strokeWidth="2" fill="none" />
            <path d="M 100 150 L 100 100" stroke="#FFD700" strokeWidth="2" fill="none" />
            <path d="M 50 100 L 50 150" stroke="#c20023" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="4" fill="#EA912D" />
            <circle cx="100" cy="50" r="4" fill="#FFD700" />
            <circle cx="150" cy="100" r="4" fill="#c20023" />
            <circle cx="50" cy="150" r="4" fill="#EA912D" />
            <rect x="95" y="95" width="10" height="10" fill="#c20023" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
}

// Binary rain effect
function BinaryRain() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const columnCount = Math.floor(window.innerWidth / 20);
    const cols = Array.from({ length: columnCount }, (_, i) => ({
      id: i,
      offset: Math.random() * 100,
      speed: 20 + Math.random() * 30
    }));
    setColumns(cols);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute top-0 text-orange-500/40 font-mono text-xs"
          style={{ left: `${(col.id / columns.length) * 100}%` }}
          initial={{ y: -100 - col.offset }}
          animate={{ y: '100vh' }}
          transition={{
            duration: col.speed,
            repeat: Infinity,
            ease: 'linear',
            delay: col.offset / 100
          }}
        >
          {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('\n')}
        </motion.div>
      ))}
    </div>
  );
}

// Mechanical countdown with gears
function MechanicalCountdown() {
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
    <div className="flex gap-2 md:gap-6 mt-6 md:mt-8 flex-wrap justify-center px-2">
      {Object.entries(timeLeft).map(([interval, value], index) => (
        <motion.div
          key={interval}
          className="relative"
          initial={{ opacity: 0, rotateX: 90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
        >
          {/* Gear decoration */}
          <motion.div
            className="absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-40 md:w-[30px] md:h-[30px]">
              <path d="M12 2L13.5 6.5L18 8L13.5 9.5L12 14L10.5 9.5L6 8L10.5 6.5L12 2Z" fill="#EA912D" />
              <circle cx="12" cy="12" r="3" fill="#0a0a0a" stroke="#EA912D" strokeWidth="1" />
            </svg>
          </motion.div>

          <div className="relative bg-gradient-to-br from-zinc-900 to-black border-2 border-orange-500/30 rounded-lg overflow-hidden p-3 md:p-6 min-w-[75px] md:min-w-[100px]">
            {/* Corner bolts */}
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-orange-500/50 border border-orange-600" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500/50 border border-orange-600" />
            <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-orange-500/50 border border-orange-600" />
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-orange-500/50 border border-orange-600" />

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"
              animate={{ y: [0, 80, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />

            <div className="relative flex flex-col items-center gap-1 md:gap-2">
              <motion.div
                className="relative text-3xl md:text-5xl font-bold font-mono tabular-nums text-white"
                key={value}
                initial={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.3 }}
                style={{
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)'
                }}
              >
                {String(value || '0').padStart(2, '0')}
              </motion.div>
              
              <div className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.2em] font-bold">
                {interval}
              </div>
            </div>

            {/* LED indicator */}
            <motion.div
              className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ boxShadow: '0 0 5px #22c55e' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Terminal-style text animation
function TerminalText({ children, delay = 0 }) {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = children;

  useEffect(() => {
    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [fullText, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="font-mono">
      {text}
      {text.length < fullText.length && showCursor && (
        <span className="text-orange-500">█</span>
      )}
    </span>
  );
}

// Holographic display effect
function HolographicDisplay({ children, delay = 0 }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="relative">
        {/* Main content */}
        <div className="relative z-10">{children}</div>
        
        {/* Hologram lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
              style={{ top: `${(i + 1) * 20}%` }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scaleX: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroRobotics() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
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
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40 z-10 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-4 md:px-6 text-center pt-12 md:pt-20 lg:pt-28"
        style={{ y, opacity }}
      >
        {/* Main Title */}
        <HolographicDisplay delay={0.3}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-tech tracking-wider mb-4">
            <motion.span
              className="inline-block text-white/70 mr-3 md:mr-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Welcome to
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, #EA912D 0%, #FFD700 50%, #c20023 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(234, 145, 45, 0.5))',
              }}
            >
              ProdUX
            </motion.span>
          </h1>
        </HolographicDisplay>

        {/* Year with robot mascot reference */}
        <motion.div
          className="flex items-center gap-3 md:gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-orange-500/50 flex items-center justify-center overflow-hidden bg-orange-500/10">
            <img src="/logo/produx_logo.svg" alt="Robot" className="w-full h-full object-contain" />
          </div>
          <span className="text-5xl md:text-7xl font-black font-tech text-white/80">
            <TerminalText delay={700}>2026</TerminalText>
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="max-w-xs md:max-w-3xl px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="inline-block border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-lg">
            <p className="text-base md:text-3xl font-tech font-semibold tracking-wide text-orange-400 mb-1 md:mb-2">
              Designing the Next Era of Growth
            </p>
            <p className="text-xs md:text-sm text-white/50 font-mono tracking-wider md:tracking-[0.3em] uppercase">
              [16.02.2026 — 22.02.2026]
            </p>
          </div>
        </motion.div>

        {/* Mechanical Countdown */}
        <MechanicalCountdown />

        {/* Action Buttons */}
        <motion.div
          className="flex flex-row items-center gap-3 md:gap-6 mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {/* Explore Events Button */}
          <Link to="/events">
            <motion.div
              className="group relative overflow-hidden px-4 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full border-2 border-orange-500/50 text-white font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05, borderColor: 'rgba(234, 145, 45, 1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Events</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </motion.div>
          </Link>

          {/* Register Now Button */}
          <motion.button
            onClick={() => setIsRegisterOpen(true)}
            className="group relative overflow-hidden px-4 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase shadow-[0_0_20px_rgba(234,145,45,0.4)] transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(234, 145, 45, 0.6), 0 0 60px rgba(234, 145, 45, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/30 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <Rocket size={16} className="group-hover:rotate-12 transition-transform" />
              <span>Register Now</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Tech specs bar */}
        <motion.div
          className="mt-4 md:mt-6 flex flex-wrap justify-center gap-3 md:gap-6 text-[10px] md:text-xs font-mono text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div>PROTOCOL: <span className="text-orange-500">ACTIVE</span></div>
          <div>VERSION: <span className="text-orange-500">2026.2</span></div>
          <div>MODE: <span className="text-orange-500">INNOVATION</span></div>
        </motion.div>
      </motion.div>

      {/* Bottom UI bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Register Modal */}
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </section>
  );
}
