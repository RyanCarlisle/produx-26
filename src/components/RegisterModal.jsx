import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Users, User, Rocket } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export default function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    eventType: '',
    teamName: '',
    member2Name: '',
    member2Email: '',
    member3Name: '',
    member3Email: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventOptions = [
    "Tech Ventures",
    "Prompt Engineering Workshop",
    "Figma Workshop",
    "Boardroom Battleground",
    "bITeWars"
  ];

  const teamEvents = ["Boardroom Battleground", "bITeWars"];
  const isTeamEvent = teamEvents.includes(formData.eventType);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate Logic (Basic)
      if (isTeamEvent && !formData.teamName) {
        alert("Team Name is required for this event.");
        setIsSubmitting(false);
        return;
      }

      // Safe Data Construction
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        eventType: formData.eventType,
        email: formData.email,
        timestamp: new Date().toISOString()
      };

      if (isTeamEvent) {
        submissionData.teamName = formData.teamName;
        submissionData.member2Name = formData.member2Name;
        submissionData.member2Email = formData.member2Email;
        submissionData.member3Name = formData.member3Name;
        submissionData.member3Email = formData.member3Email;
      }

      // Push to Firebase
      const registrationsRef = ref(db, 'registrations');
      await push(registrationsRef, submissionData);

      alert("Registration Successful!");
      onClose();
      // Reset Form
      setFormData({
        firstName: '',
        lastName: '',
        eventType: '',
        teamName: '',
        member2Name: '',
        member2Email: '',
        member3Name: '',
        member3Email: '',
        email: ''
      });

    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Registration failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans">
           {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative bg-[#050505] border-2 border-brand-red/50 w-full max-w-2xl rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(194,0,35,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto"
          >
             <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-brand-orange transition-colors z-20"
            >
              <X size={24} />
            </button> 

            {/* Form Content */}
             <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-1">
                    Mission Registration
                </h2>
                <p className="text-[#ffb300]/80 mb-8">Secure your spot in the next era of growth.</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                   {/* Personal Info Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-[#ffd700] uppercase tracking-widest pl-1">First Name <span className="text-brand-red">*</span></label>
                        <input 
                            required 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-brand-red/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all placeholder:text-white/30 validated-input" 
                            placeholder="Neo" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-[#ffd700] uppercase tracking-widest pl-1">Last Name <span className="text-brand-red">*</span></label>
                        <input 
                            required 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-brand-red/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all placeholder:text-white/30 validated-input" 
                            placeholder="Anderson" 
                        />
                      </div>
                   </div>
                   
                   {/* Event Selection */}
                   <div className="space-y-1">
                      <label className="text-xs font-mono text-[#ffd700] uppercase tracking-widest pl-1">Target Mission (Event) <span className="text-brand-red">*</span></label>
                      <div className="relative">
                        <select 
                            required
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-brand-red/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all appearance-none cursor-pointer validated-input"
                        >
                            <option value="" disabled className="bg-[#2d1018]">Select an Event</option>
                            {eventOptions.map(evt => <option key={evt} value={evt} className="bg-[#2d1018]">{evt}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={18} />
                      </div>
                   </div>

                   {/* Conditional Team Fields */}
                   <AnimatePresence mode="popLayout">
                        {isTeamEvent && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-5 overflow-hidden"
                            >
                                <div className="p-5 border border-brand-red border-opacity-30 bg-brand-red bg-opacity-5 rounded-xl space-y-4">
                                    <div className="flex items-center gap-2 text-brand-red mb-2">
                                        <Users size={16} />
                                        <span className="text-xs font-bold uppercase tracking-widest">Squad Details</span>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-brand-red uppercase tracking-widest pl-1">Team Name <span className="text-red-500">*</span></label>
                                        <input 
                                            required 
                                            type="text" 
                                            name="teamName"
                                            value={formData.teamName}
                                            onChange={handleChange}
                                            className="w-full bg-black/20 border border-brand-red border-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red border-opacity-50 transition-all validated-input" 
                                            placeholder="The Avengers" 
                                        />
                                    </div>

                                    {/* Member 2 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-mono text-gray-500 uppercase pl-1">Member 2 Name (Optional)</label>
                                            <input 
                                                type="text" 
                                                name="member2Name"
                                                value={formData.member2Name}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red border-opacity-50 transition-all" 
                                            />
                                        </div>
                                         <div className="space-y-1">
                                            <label className="text-xs font-mono text-gray-500 uppercase pl-1">Member 2 Email</label>
                                            <input 
                                                type="email" 
                                                name="member2Email"
                                                value={formData.member2Email}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red border-opacity-50 transition-all" 
                                            />
                                        </div>
                                    </div>

                                    {/* Member 3 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-mono text-gray-500 uppercase pl-1">Member 3 Name (Optional)</label>
                                            <input 
                                                type="text" 
                                                name="member3Name"
                                                value={formData.member3Name}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red border-opacity-50 transition-all" 
                                            />
                                        </div>
                                         <div className="space-y-1">
                                            <label className="text-xs font-mono text-gray-500 uppercase pl-1">Member 3 Email</label>
                                            <input 
                                                type="email" 
                                                name="member3Email"
                                                value={formData.member3Email}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red border-opacity-50 transition-all" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                   </AnimatePresence>
                   
                   {/* Standard Contact Info */}
                   <div className="space-y-1">
                      <label className="text-xs font-mono text-[#ffd700] uppercase tracking-widest pl-1">Comms (Email) <span className="text-brand-red">*</span></label>
                      <input 
                          required 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-brand-red/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all placeholder:text-white/30 validated-input" 
                          placeholder="neo@matrix.com" 
                      />
                   </div>
                   
                   <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-brand-orange text-white bg-transparent rounded-full font-bold tracking-[0.2em] uppercase hover:bg-brand-orange hover:text-black transition-all transform hover:scale-105 group relative disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          <span className="flex items-center justify-center gap-2">
                             {isSubmitting ? 'INITIATING...' : 'INITIATE REGISTRATION'}
                          </span>
                      </button>
                   </div>
                </form>
             </div>
             
             {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/15 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[120px] -ml-20 -mb-20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ffd700]/5 rounded-full blur-[80px] pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
