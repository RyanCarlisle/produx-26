import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const timestamps = [
  { id: 1, label: "INITIATING", progress: 25 },
  { id: 2, label: "LOADING_ASSETS", progress: 50 },
  { id: 3, label: "CALIBRATING", progress: 75 },
  { id: 4, label: "READY", progress: 100 },
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setComplete(true), 2500); // 2sec extra + 0.5s buffer
          return 100;
        }
        // Non-linear progress for "stamping" feel
        const diff = 100 - prev;
        const jump = Math.ceil(diff / 10); 
        return prev + (jump > 0 ? jump : 1);
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#000] flex items-center justify-center overflow-hidden"
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
        {/* Central Counter */}
        <div className="relative z-10 font-['Space_Grotesk'] font-bold text-white flex flex-col items-center">
            <motion.div 
                className="text-8xl md:text-9xl tracking-tighter mix-blend-difference"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {progress}
                <span className="text-2xl md:text-4xl align-top opacity-50">%</span>
            </motion.div>
        </div>

        {/* Orbiting "Stamps" */}
        <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
                className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-white/10 rounded-full absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             />
             <motion.div 
                className="w-[400px] h-[400px] md:w-[650px] md:h-[650px] border border-white/5 rounded-full absolute"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             />

             {/* Milestones / Stamps */}
             {timestamps.map((stamp, index) => {
                 const angle = (index * 90) * (Math.PI / 180);
                 const radius = 180; // Distance from center
                 // Positioning based on angle is complex in CSS alone without calc
                 // Simpler: absolute positions at corners of a container
                 const isActive = progress >= stamp.progress;

                 return (
                     <motion.div
                        key={stamp.id}
                        className={`absolute flex flex-col items-center justify-center transition-all duration-500`}
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(${index * 90}deg) translate(0, -180px) rotate(-${index * 90}deg)`
                        }}
                     >
                         <motion.div 
                            className={`w-4 h-4 rounded-full mb-2 ${isActive ? 'bg-[#6320ee] shadow-[0_0_20px_#6320ee]' : 'bg-gray-800'}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: isActive ? 1.5 : 1 }}
                         />
                         <span className={`text-[10px] font-mono tracking-[0.2em] ${isActive ? 'text-white' : 'text-gray-700'}`}>
                             {stamp.label}
                         </span>
                     </motion.div>
                 )
             })}
        </div>

        {/* Zoom Out Reveal Effect (Reversed Scale Up of a "Hole" or simple fade out of loader) */}
        {/* User asked for "Zoom Out". If the Loader SCALES DOWN (0.5), it looks like it's going away. */}
        {/* Adjust exit animation in the parent motion.div */}
    </motion.div>
  );
}
