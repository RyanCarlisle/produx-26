import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Clock, MapPin, ChevronRight, Terminal, Calendar, Share2 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RegisterModal from "./RegisterModal";
import NetworkBackground from "./NetworkBackground";

// --- DATA ---
const eventsData = [
  {
    id: 1,
    day: "FEB 16-22",
    date: "16-22 FEB",
    title: "BOARDROOM BATTLEGROUND",
    time: "ALL WEEK",
    location: "Campus / Online",
    description: "An immersive CXO-level simulation, where participants navigate real-world business challenges, make critical decisions, and compete for market leadership. Participants take on CXO roles, solving business challenges in a simulated environment.",
    image: "/images/event_banners/boardroom_battleground.png",
    category: "MANAGEMENT"
  },
  {
    id: 2,
    day: "FEB 16-22",
    date: "16-22 FEB",
    title: "TECH BRIDGE",
    time: "To be announced soon",
    location: "Campus",
    description: "Digital Enablement Workshop conducted by the IT & Infrastructure Committee to enhance digital proficiency among IIM Shillong staff. A specialized workshop empowering administrative and internal staff with digital tools and automation techniques for enhanced efficiency.",
    image: "/images/event_banners/tech_bridge.png",
    category: "WORKSHOP"
  },
  {
    id: 3,
    day: "FEB 17",
    date: "17 FEB",
    title: "PRECISE PROMPT",
    time: "04:00 PM - 07:00 PM",
    location: "Campus / Online",
    description: "A Prompt Engineering Workshop allowing participants to master the art of communicating with AI models effectively.",
    image: "/images/event_banners/precise_prompt.png",
    category: "WORKSHOP"
  },
  {
    id: 4,
    day: "FEB 18",
    date: "18 FEB",
    title: "bITeWARS",
    time: "02:00 PM - 04:00 PM",
    location: "Campus",
    description: "A fun engagement event among IIM Shillong students designed to test wit, strategy, and teamwork.",
    image: "/images/event_banners/bitewars.png",
    category: "ENGAGEMENT"
  },
  {
    id: 5,
    day: "FEB 18-19",
    date: "18-19 FEB",
    title: "FIGMAFORGE",
    time: "06:30 PM - 09:00 PM",
    location: "Campus / Online",
    description: "A UI/UX Workshop focused on designing user-centric interfaces and mastering Figma tools.",
    image: "/images/event_banners/figma_forge.png",
    category: "DESIGN"
  },
  {
    id: 6,
    day: "FEB 20",
    date: "20 FEB",
    title: "VIRTUOSPHERE",
    time: "11:00 AM ONWARDS",
    location: "NAB",
    description: "An engaging Virtual Reality experience for the IIM Shillong community, offering participants a first-hand look at cutting-edge immersive technology.",
    image: "/images/event_banners/virtuosphere.png",
    category: "EXPERIENCE"
  },
  {
    id: 7,
    day: "FEB 21",
    date: "21 FEB",
    title: "TECHVENTURES",
    time: "10:00 AM - 04:00 PM",
    location: "Auditorium",
    description: "An investor-led hands-on workshop to articulate students with pitching and building business models for tech startups. The event aims to strengthen participants’ ability to pitch technology products with clarity and confidence, while building understanding of business models and investor expectations.",
    image: "/images/event_banners/tech_ventures.png",
    category: "STARTUP"
  },
  {
    id: 8,
    day: "FEB 22",
    date: "22 FEB",
    title: "bITeCAST",
    time: "10:00 AM - 12:00 PM",
    location: "Auditorium",
    description: "A dynamic, podcast-style discussion with industry leaders, exploring the intersection of technology, business strategy, and innovation.",
    image: "/images/event_banners/bitecast.png",
    category: "TALK SHOW"
  },
  {
    id: 9,
    day: "FEB 18",
    date: "18 FEB",
    title: "PRODUCT PIONEERS",
    time: "To be announced",
    location: "Campus",
    description: "A premier product management competition challenging participants to design innovative solutions for real-world problems. Show off your product thinking and strategy.",
    image: "/images/event_banners/produx.png",
    category: "COMPETITION"
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
  const [isInView, setIsInView] = useState(false);
  const noRegisterList = ["TECH BRIDGE", "VIRTUSOPHERE", "bITeCAST"];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center w-full pl-8 md:pl-0 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Date/Time Node (Mobile Only) */}
      <div className="md:hidden flex items-center gap-2 text-brand-orange font-mono text-sm px-4 py-1 border border-brand-orange/30 rounded bg-brand-orange/5 mb-4">
        <Calendar size={14} />
        {event.date}
      </div>

      {/* Center Node / Dot (Desktop Absolute) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-20">
         {/* The Node Dot */}
         <div className={`w-4 h-4 rounded-full border-2 border-brand-orange relative z-10 transition-all duration-500 ${
           isInView ? 'bg-brand-orange scale-125 shadow-[0_0_20px_#ff6600,0_0_40px_#ff6600]' : 'bg-black shadow-none'
         }`}>
            {isInView && <div className="absolute inset-0 rounded-full bg-brand-orange animate-ping opacity-40" />}
         </div>
      </div>

      {/* Connector Line Logic - Horizontal lines from center to content */}
      <div className={`hidden md:block absolute top-1/2 h-[1px] bg-brand-orange/30 z-0 ${isEven ? 'right-1/2 w-[8%] mr-4' : 'left-1/2 w-[8%] ml-4'}`} />

      {/* Image Side */}
      <div className={`w-full md:w-1/2 group relative ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          {/* Tech Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-orange/50 z-20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-orange/50 z-20" />
          
          <div className="aspect-video overflow-hidden border-2 border-transparent group-hover:border-brand-orange transition-all duration-300">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.style.display = 'block';
                e.target.style.backgroundColor = '#1a1a1a';
              }}
            />
          </div>

        </div>
      </div>

      {/* Content Side */}
      <div className={`w-full md:w-1/2 text-center ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
        <div className="space-y-4">
            <div className={`flex items-center gap-3 text-brand-orange font-mono text-sm tracking-widest ${isEven ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}>
                <span>{event.category}</span>
                <span className="w-4 h-[2px] bg-brand-orange" />
                <span>{event.day}</span>
            </div>

            <h3 className="text-3xl md:text-5xl font-bold font-pixel uppercase leading-none">
                <GlitchText text={event.title} />
            </h3>

            <div className={`flex flex-wrap gap-4 text-sm font-mono text-gray-400 ${isEven ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}>
                <span className="flex items-center gap-2 text-brand-orange"><Clock size={14} /> {event.time}</span>
                <span className="flex items-center gap-2 text-brand-orange"><MapPin size={14} /> {event.location}</span>
            </div>

            {/* DESCRIPTION TEXT FIX: Use text-right for right-aligned items (isEven=true) and text-left for left-aligned items (isEven=false). 
                Keep justify-center for mobile. 
                Previously it forced auto margins which caused the "move too much to left" issue. 
                Now we explicitly align text. 
            */}
            <p className={`text-gray-400 font-light text-sm max-w-md ${isEven ? 'md:ml-auto md:text-right' : 'md:mr-auto md:text-left'} mx-auto text-center`}>
                {event.description}
            </p>

            {!noRegisterList.includes(event.title) && (
              event.title === "BOARDROOM BATTLEGROUND" ? (
                <a 
                  href="https://unstop.com/quiz/boardroom-battleground-iim-shillong-1640805"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 transition-all duration-300 rounded font-mono text-sm tracking-widest uppercase mt-4 ${isEven ? 'ml-auto' : 'mr-auto'}`}
                >
                  <span className="font-bold">REGISTER</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-brand-orange" />
                </a>
              ) : (
                <button 
                  onClick={() => onRegister(event.title)}
                  className={`group inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 transition-all duration-300 rounded font-mono text-sm tracking-widest uppercase mt-4 ${isEven ? 'ml-auto' : 'mr-auto'}`}
                >
                  <span className="font-bold">REGISTER</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-brand-orange" />
                </button>
              )
            )}
        </div>
      </div>

    </motion.div>
  );
};

export default function Events() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
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
            <NetworkBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-40 pb-20 text-center px-4">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-tech tracking-widest">
                    EVENT <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-2">TIMELINE</span>
                </h1>
                <p className="text-xl text-white/50 max-w-2xl mx-auto">
                    The path to the next era of growth...
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
                        onRegister={(title) => {
                            setSelectedEvent(title);
                            setRegisterOpen(true);
                        }}
                    />
                ))}
            </div>

            {/* End Node */}
            <div className="relative mt-24 flex justify-center">
                 <button 
                    onClick={() => {
                        setSelectedEvent(null);
                        setRegisterOpen(true);
                    }}
                    className="bg-black/80 backdrop-blur border border-white/20 px-8 py-4 rounded-full font-mono text-sm tracking-[0.3em] flex items-center gap-3 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all cursor-pointer group"
                 >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse group-hover:bg-orange-500" />
                    <span className="font-bold">Register Now!</span>
                 </button>
            </div>

        </div>

        <Footer />
        <RegisterModal 
            isOpen={registerOpen} 
            onClose={() => setRegisterOpen(false)} 
            selectedEvent={selectedEvent}
        />
    </div>
  );
}
