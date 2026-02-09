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
    image: "/event_banners/1.png",
    category: "MANAGEMENT"
  },
  {
    id: 2,
    day: "FEB 16-22",
    date: "16-22 FEB",
    title: "TECH BRIDGE",
    time: "ALL WEEK",
    location: "Campus",
    description: "Digital Enablement Workshop conducted by the IT & Infrastructure Committee to enhance digital proficiency among IIM Shillong staff. A specialized workshop empowering administrative and internal staff with digital tools and automation techniques for enhanced efficiency.",
    image: "/event_banners/2.png",
    category: "WORKSHOP"
  },
  {
    id: 3,
    day: "FEB 17",
    date: "17 FEB",
    title: "PRECISE PROMPT",
    time: "04:00 PM - 07:00 PM",
    location: "Lab",
    description: "A Prompt Engineering Workshop allowing participants to master the art of communicating with AI models effectively.",
    image: "/event_banners/3.png",
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
    image: "/event_banners/5.png",
    category: "ENGAGEMENT"
  },
  {
    id: 5,
    day: "FEB 18-19",
    date: "18-19 FEB",
    title: "FigmaForge",
    time: "07:00 PM - 09:00 PM",
    location: "Lab",
    description: "A UI/UX Workshop focused on designing user-centric interfaces and mastering Figma tools.",
    image: "/event_banners/6.png",
    category: "DESIGN"
  },
  {
    id: 6,
    day: "FEB 20",
    date: "20 FEB",
    title: "VIRTUSPHERE",
    time: "11:00 AM ONWARDS",
    location: "Atrium",
    description: "An engaging Virtual Reality experience for the IIM Shillong community, offering participants a first-hand look at cutting-edge immersive technology.",
    image: "/event_banners/7.png",
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
    image: "/event_banners/8.png",
    category: "STARTUP"
  },
  {
    id: 8,
    day: "FEB 22",
    date: "22 FEB",
    title: "bITeCAST",
    time: "10:00 AM - 12:00 PM",
    location: "Grand Hall",
    description: "A dynamic, podcast-style discussion with industry leaders, exploring the intersection of technology, business strategy, and innovation.",
    image: "/event_banners/1.png",
    category: "TALK SHOW"
  },
  {
    id: 9,
    day: "FEB 22",
    date: "22 FEB",
    title: "PRODUCT PIONEERS",
    time: "04:00 PM - 06:00 PM",
    location: "Auditorium",
    description: "An exclusive career insight session with a Senior Product Manager, providing insights on breaking into Product Management, career growth, and industry best practices.",
    image: "/event_banners/2.png",
    category: "SPEAKER SESSION"
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
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ margin: "-200px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
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
          
          <div className="aspect-video overflow-hidden border-2 border-transparent group-hover:border-brand-orange transition-all duration-300">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

      {/* Center Node (Desktop) */}
      <div className="hidden md:flex flex-col items-center justify-center w-2/12 relative h-full min-h-[100px]">
         {/* The Node Dot */}
         <div className={`w-4 h-4 rounded-full border-2 border-brand-orange relative z-10 transition-all duration-500 ${
           isInView ? 'bg-brand-orange scale-125 shadow-[0_0_20px_#ff6600,0_0_40px_#ff6600]' : 'bg-black shadow-none'
         }`}>
            {isInView && <div className="absolute inset-0 rounded-full bg-brand-orange animate-ping opacity-40" />}
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
                <span>Register</span>
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
                <h1 className="text-5xl md:text-8xl font-black font-pixel text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-6">
                    EVENT TIMELINE
                </h1>
                <p className="text-white/50 font-mono tracking-widest text-sm md:text-base max-w-xl mx-auto">
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
                        onRegister={() => setRegisterOpen(true)}
                    />
                ))}
            </div>

            {/* End Node */}
            <div className="relative mt-24 flex justify-center">
                 <div className="bg-black/80 backdrop-blur border border-white/20 px-8 py-4 rounded-full font-mono text-xs tracking-[0.3em] flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <b>Register Now!</b>
                 </div>
            </div>

        </div>

        <Footer />
        <RegisterModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />
    </div>
  );
}
