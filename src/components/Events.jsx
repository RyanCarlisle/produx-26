import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Clock, MapPin, ChevronRight, Terminal, Calendar, Share2 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RegisterModal from "./RegisterModal";
import StarBackground from "./StarBackground";

// --- DATA ---
const eventsData = [
  {
    id: 201,
    day: "DAY 02",
    date: "DEC 02",
    title: "NEURAL NETWORKS",
    time: "10:00 AM",
    location: "Lab 4",
    description: "Deep dive into the architecture of artificial minds.",
    image: "/event_banners/2.png",
    category: "WORKSHOP"
  },
  {
    id: 202,
    day: "DAY 02",
    date: "DEC 02",
    title: "DEEP LEARNING",
    time: "02:00 PM",
    location: "Audit B",
    description: "Advanced algorithms and pattern recognition protocols.",
    image: "/event_banners/3.png",
    category: "SEMINAR"
  },
  {
    id: 301,
    day: "DAY 03",
    date: "DEC 03",
    title: "ROBOTIC ARMS",
    time: "09:00 AM",
    location: "Workshop A",
    description: "Hardware manipulation and kinaesthetic intelligence.",
    image: "/event_banners/5.png",
    category: "HARDWARE"
  },
  {
    id: 302,
    day: "DAY 03",
    date: "DEC 03",
    title: "DRONE RACING",
    time: "01:00 PM",
    location: "Arena",
    description: "High-velocity aerial maneuvers and collision avoidance.",
    image: "/event_banners/6.png",
    category: "COMPETITION"
  },
  {
    id: 303,
    day: "DAY 03",
    date: "DEC 03",
    title: "AI ETHICS",
    time: "04:00 PM",
    location: "Conf Room",
    description: "The moral implications of synthetic sentience.",
    image: "/event_banners/7.png",
    category: "PANEL"
  },
  {
    id: 401,
    day: "DAY 04",
    date: "DEC 04",
    title: "CLOSING CEREMONY",
    time: "06:00 PM",
    location: "Grand Hall",
    description: "System shutdown and awards distribution.",
    image: "/event_banners/8.png",
    category: "CEREMONY"
  }
];

// --- COMPONENTS ---

const GlitchText = ({ text, className }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#ff00ff] opacity-0 group-hover:opacity-70 group-hover:animate-pulse translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:animate-pulse -translate-x-[2px]">
        {text}
      </span>
    </div>
  );
};

const EventCard = ({ event, index, onRegister }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Date/Time Node (Mobile Only) */}
      <div className="md:hidden flex items-center gap-2 text-brand-orange font-mono text-sm px-4 py-1 border border-brand-orange/30 rounded bg-brand-orange/5">
        <Calendar size={14} />
        {event.date}
      </div>

      {/* Image Side */}
      <div className="w-full md:w-5/12 group relative">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          {/* Tech Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-orange/50 z-20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-orange/50 z-20" />
          
          <div className="aspect-video overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-[0.5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

        </div>
      </div>

      {/* Center Node (Desktop) */}
      <div className="hidden md:flex flex-col items-center justify-center w-2/12 relative h-full min-h-[100px]">
         {/* The Node Dot */}
         <div className="w-4 h-4 rounded-full bg-black border-2 border-brand-orange relative z-10 shadow-[0_0_15px_#ff6600]">
            <div className="absolute inset-0 bg-brand-orange animate-ping opacity-20" />
         </div>
         {/* Connecting Line from Dot to Content */}
         <div className={`absolute top-1/2 h-[1px] bg-brand-orange/30 w-full z-0 ${isEven ? 'right-1/2 origin-right' : 'left-1/2 origin-left'}`} />
      </div>

      {/* Content Side */}
      <div className={`w-full md:w-5/12 text-center ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div className="space-y-4">
            <div className={`flex items-center gap-3 text-brand-orange/60 font-mono text-xs tracking-widest ${isEven ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}>
                <span>{event.category}</span>
                <span className="w-4 h-[1px] bg-brand-orange/40" />
                <span>{event.day}</span>
            </div>

            <h3 className="text-3xl md:text-5xl font-bold font-pixel uppercase leading-none">
                <GlitchText text={event.title} />
            </h3>

            <div className={`flex flex-wrap gap-4 text-sm font-mono text-gray-400 ${isEven ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}>
                <span className="flex items-center gap-2 text-brand-orange"><Clock size={14} /> {event.time}</span>
                <span className="flex items-center gap-2 text-brand-orange"><MapPin size={14} /> {event.location}</span>
            </div>

            <p className="text-gray-400 font-light text-sm max-w-md mx-auto md:mx-0">
                {event.description}
            </p>

            <button 
                onClick={onRegister}
                className="group inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 transition-all duration-300 rounded font-mono text-xs tracking-widest uppercase mt-2"
            >
                <span>Initialize</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-orange" />
            </button>
        </div>
      </div>

    </motion.div>
  );
};

export default function Events() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-orange/30 overflow-hidden">
        <Navbar />
        
        {/* Fixed Backgrounds */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <StarBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-40 pb-20 text-center px-4">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl md:text-8xl font-black font-pixel text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-6">
                    MIND_MAP
                </h1>
                <p className="text-white/50 font-mono tracking-widest text-sm md:text-base max-w-xl mx-auto">
                    // TRAVERSING THE NEURAL NETWORK OF EVENTS
                </p>
            </motion.div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 pb-40">
            
            {/* Central Trunk Line (Desktop) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2">
                <motion.div 
                    style={{ scaleY: scaleY, transformOrigin: "top" }}
                    className="w-full h-full bg-gradient-to-b from-brand-orange via-purple-500 to-cyan-500 shadow-[0_0_20px_rgba(255,102,0,0.5)]"
                />
            </div>

            {/* Events List */}
            <div className="space-y-24">
                {eventsData.map((evt, idx) => (
                    <EventCard 
                        key={evt.id} 
                        event={evt} 
                        index={idx}
                        onRegister={() => setRegisterOpen(true)}
                    />
                ))}
            </div>

            {/* End Node */}
            <div className="relative mt-24 flex justify-center">
                 <div className="bg-black/80 backdrop-blur border border-white/20 px-8 py-4 rounded-full font-mono text-xs tracking-[0.3em] flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    END_OF_LINE
                 </div>
            </div>

        </div>

        <Footer />
        <RegisterModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />
    </div>
  );
}
