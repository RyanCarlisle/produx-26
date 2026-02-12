import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Users, User, Rocket, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { validateEmail, validateTeamRequirements, validateTeamMember, validatePhone } from '../utils/validations';
import CustomAlert from './CustomAlert';

export default function RegisterModal({ isOpen, onClose, selectedEvent }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    eventType: selectedEvent || '',
    teamName: '',
    email: ''
  });
  
  const [teamMembers, setTeamMembers] = useState([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '', type: 'error' });

  useEffect(() => {
    if (selectedEvent) {
      setFormData(prev => ({ ...prev, eventType: selectedEvent }));
    }
  }, [selectedEvent, isOpen]);

  // Reset team members when event type changes
  useEffect(() => {
      setTeamMembers([]);
  }, [formData.eventType]);

  const eventOptions = [
    "TechVentures",
    "Precise Prompt",
    "Figma Forge",
    "Boardroom Battleground",
    "bITeWars",
    "Product Pioneers"
  ];

  const teamEvents = ["Boardroom Battleground", "bITeWars"];
  const isTeamEvent = teamEvents.includes(formData.eventType);
  const isBoardroomBattleground = formData.eventType === "Boardroom Battleground";
  
  // Logic for max team size
  // Boardroom Battleground: Mandatorily 3 (User + 2 Members) -> Total 3
  // bITeWars: Upto 3 (User + 0-2 Members) -> Total 1-3
  const isBoardroom = formData.eventType === "Boardroom Battleground";
  const maxAdditionalMembers = 2; // Total team size 3 means 2 extra members

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addMember = () => {
    if (teamMembers.length < maxAdditionalMembers) {
        setTeamMembers([...teamMembers, { name: '', email: '', phone: '' }]);
    }
  };

  const removeMember = (index) => {
    const newMembers = [...teamMembers];
    newMembers.splice(index, 1);
    setTeamMembers(newMembers);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...teamMembers];
    newMembers[index][field] = value;
    setTeamMembers(newMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        console.error("ReCAPTCHA hook not ready");
        setAlertConfig({ isOpen: true, message: "Security service is initializing. Please wait a moment and try again.", type: 'error' });
        setIsSubmitting(false);
        return;
      }

      const token = await executeRecaptcha('registration_submit');
      if (!token) {
        setAlertConfig({ isOpen: true, message: "Security check failed. Please refresh and try again.", type: 'error' });
        setIsSubmitting(false);
        return;
      }
      
      // Validate Logic (Basic)
      if (isTeamEvent && !formData.teamName) {
        setAlertConfig({ isOpen: true, message: "Team Name is required for this event.", type: 'error' });
        setIsSubmitting(false);
        return;
      }
      
      // Email & Domain Validation
      const emailValidation = validateEmail(formData.email, formData.eventType);
      if (!emailValidation.isValid) {
        setAlertConfig({ isOpen: true, message: emailValidation.error, type: 'error' });
        setIsSubmitting(false);
        return;
      }
      
      // Phone Validation
      const phoneValidation = validatePhone(formData.mobileNumber);
      if (!phoneValidation.isValid) {
        setAlertConfig({ isOpen: true, message: phoneValidation.error, type: 'error' });
        setIsSubmitting(false);
        return;
      }

      // Validate Team Requirements
      const teamReqValidation = validateTeamRequirements(isBoardroom, teamMembers);
      if (!teamReqValidation.isValid) {
          setAlertConfig({ isOpen: true, message: teamReqValidation.error, type: 'error' });
          setIsSubmitting(false);
          return;
      }

      // Validate team member emails
      if (isTeamEvent) {
         for (let i = 0; i < teamMembers.length; i++) {
             const memberValidation = validateTeamMember(teamMembers[i], i, formData.eventType);
             if (!memberValidation.isValid) {
                 setAlertConfig({ isOpen: true, message: memberValidation.error, type: 'error' });
                 setIsSubmitting(false);
                 return;
             }
         }
      }

      // Safe Data Construction
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        eventType: formData.eventType,
        email: formData.email,
        timestamp: new Date().toISOString()
      };

      if (isTeamEvent) {
        submissionData.teamName = formData.teamName;
        // Flatten team members into member2, member3 etc for backward compatibility/structure consistency
        teamMembers.forEach((member, index) => {
            const memberNum = index + 2;
            submissionData[`member${memberNum}Name`] = member.name;
            submissionData[`member${memberNum}Email`] = member.email;
            submissionData[`member${memberNum}Phone`] = member.phone;
        });
      }

      // Push to Firebase
      const registrationsRef = ref(db, 'registrations');
      await push(registrationsRef, submissionData);

      setIsSuccess(true);
      setIsSubmitting(false);

    } catch (error) {
      console.error("Error submitting registration:", error);
      setAlertConfig({ isOpen: true, message: "Something went wrong. Please try again.", type: 'error' });
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setTimeout(() => {
        setIsSuccess(false);
         setFormData({
            firstName: '',
            lastName: '',
            mobileNumber: '',
            eventType: '',
            teamName: '',
            email: ''
        });
        setTeamMembers([]);
    }, 500);
  };

  
  // if (!isOpen) return null; // MOVED TO OUTER COMPONENT

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
            className="relative bg-[#050505] border-2 border-brand-red/50 w-full max-w-2xl rounded-3xl shadow-[0_0_50px_rgba(194,0,35,0.3)] max-h-[90vh] flex flex-col overflow-hidden transition-all duration-300"
          >
             <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-brand-orange transition-colors z-30"
            >
              <X size={24} />
            </button> 

            <div className={`w-full h-full relative z-10 ${isSuccess ? 'flex items-center justify-center p-6 md:p-10' : 'overflow-y-auto overflow-x-hidden custom-scrollbar p-5 md:p-10'}`}>
            {/* Form Content */}             {isSuccess ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 flex flex-col items-center justify-center text-center w-full"
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-brand-red to-brand-orange flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,102,0,0.5)] shrink-0 mt-4 md:mt-0">
                        <CheckCircle size={32} className="text-white md:w-10 md:h-10" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white font-tech tracking-widest">
                        REGISTRATION COMPLETE
                    </h2>
                    <p className="text-xl text-brand-yellow font-bold mb-2 font-mono">
                        {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-white/60 mb-8 max-w-xs mx-auto">
                        Your spot for <span className="text-brand-orange">{formData.eventType}</span> has been confirmed.
                    </p>
                    <button 
                        onClick={handleCloseModal}
                        className="px-8 py-3 bg-white/10 border border-white/20 hover:border-brand-orange hover:bg-brand-orange hover:text-black rounded text-white font-mono uppercase tracking-widest text-sm transition-all duration-300"
                    >
                        Close
                    </button>
                </motion.div>
             ) : (             <div className="relative z-10">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-1 pr-10">
                    Mission Registration
                </h2>
                <p className="text-white mb-6 md:mb-8 text-base md:text-lg">Secure your spot in the next era of growth.</p>

                <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                   {/* Event Selection */}
                   <div className="space-y-1">
                      <label className="text-sm font-mono text-white uppercase tracking-widest pl-1">Target Mission (Event) <span className="text-brand-red">*</span></label>
                      <div className="relative">
                        <select 
                            required
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            style={{ colorScheme: 'dark' }}
                            className="w-full bg-white/5 border border-brand-red/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all appearance-none cursor-pointer validated-input"
                        >
                            <option value="" disabled className="bg-[#050505] text-white">Select an Event</option>
                            {eventOptions.map(evt => <option key={evt} value={evt} className="bg-[#050505] text-white hover:bg-brand-orange hover:text-black">{evt}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={18} />
                      </div>
                   </div>

                   {/* Personal Info Grid */}
                   {!isBoardroomBattleground && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-sm font-mono text-white uppercase tracking-widest pl-1">First Name <span className="text-brand-red">*</span></label>
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
                        <label className="text-sm font-mono text-white uppercase tracking-widest pl-1">Last Name <span className="text-brand-red">*</span></label>
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
                   )}

                   {/* Standard Contact Info */}
                   {!isBoardroomBattleground && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="space-y-1">
                          <label className="text-xs font-mono text-white uppercase tracking-widest pl-1">Email <span className="text-brand-red">*</span></label>
                          <input 
                              required 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-brand-red/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all placeholder:text-white/30 validated-input" 
                              placeholder="neo@iimshillong.ac.in" 
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-xs font-mono text-white uppercase tracking-widest pl-1">Mobile (WhatsApp) <span className="text-brand-red">*</span></label>
                          <input 
                              required 
                              type="tel" 
                              name="mobileNumber"
                              value={formData.mobileNumber}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-brand-red/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all placeholder:text-white/30 validated-input" 
                              placeholder="+91 98765 43210" 
                          />
                       </div>
                   </div>
                   )}

                   {/* Conditional Team Fields */}
                   <AnimatePresence mode="popLayout">
                        {isTeamEvent && !isBoardroomBattleground && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-5 overflow-hidden"
                            >
                                <div className="p-5 border border-brand-red border-opacity-30 bg-brand-red bg-opacity-5 rounded-xl space-y-4">
                                    <div className="flex items-center gap-2 text-white mb-2">
                                        <Users size={16} />
                                        <span className="text-sm font-bold uppercase tracking-widest">Squad Details</span>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className="text-sm font-mono text-white uppercase tracking-widest pl-1">Team Name <span className="text-red-500">*</span></label>
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

                                    {/* Dynamic Members */}
                                    <AnimatePresence>
                                        {teamMembers.map((member, index) => (
                                            <motion.div 
                                                key={index}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="border-t border-white/10 pt-4"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-mono text-brand-orange uppercase">Member {index + 2}</span>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeMember(index)}
                                                        className="text-white/40 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="space-y-1">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Name"
                                                            value={member.name}
                                                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red border-opacity-50 transition-all" 
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <input 
                                                            type="email" 
                                                            placeholder="Email"
                                                            value={member.email}
                                                            onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red border-opacity-50 transition-all" 
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <input 
                                                            type="tel" 
                                                            placeholder="Phone"
                                                            value={member.phone}
                                                            onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red border-opacity-50 transition-all" 
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Add Button */}
                                    {teamMembers.length < maxAdditionalMembers && (
                                        <button
                                            type="button"
                                            onClick={addMember}
                                            className="w-full py-2 border-2 border-dashed border-white/20 hover:border-brand-orange/50 hover:bg-brand-orange/5 rounded-xl text-white/60 hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-wide"
                                        >
                                            <Plus size={16} />
                                            Add Team Member
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                   </AnimatePresence>
                   {/* Standard Contact Info Remove from here */}
                   
                   {!isBoardroomBattleground && (
                   <div className="pt-2 text-center">
                      <p className="text-[8px] text-white/30 max-w-xs mx-auto leading-relaxed">
                          This site is protected by reCAPTCHA and the Google{' '}
                          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-brand-orange hover:underline">Privacy Policy</a> and{' '}
                          <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="text-brand-orange hover:underline">Terms of Service</a> apply.
                      </p>
                   </div>
                   )}

                   <div className="pt-2">
                      {isBoardroomBattleground ? (
                        <a 
                          href="https://unstop.com/quiz/boardroom-battleground-iim-shillong-1640805"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-4 border border-brand-orange text-white bg-transparent rounded-full font-bold tracking-widest md:tracking-[0.2em] uppercase hover:bg-brand-orange hover:text-black transition-all transform hover:scale-105 group relative"
                        >
                          <span className="flex items-center justify-center gap-2 whitespace-nowrap text-xs md:text-base">
                            REGISTER ON UNSTOP
                          </span>
                          <Rocket size={18} className="group-hover:rotate-12 transition-transform" />
                        </a>
                      ) : (
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-4 border border-brand-orange text-white bg-transparent rounded-full font-bold tracking-widest md:tracking-[0.2em] uppercase hover:bg-brand-orange hover:text-black transition-all transform hover:scale-105 group relative disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="flex items-center justify-center gap-2 whitespace-nowrap text-xs md:text-base">
                             {isSubmitting ? 'INITIATING...' : 'INITIATE REGISTRATION'}
                          </span>
                        </button>
                      )}
                   </div>
                </form>
             </div>
             )}
             </div>
             
             {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/15 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[120px] -ml-20 -mb-20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ffd700]/5 rounded-full blur-[80px] pointer-events-none" />
          </motion.div>
          
          <CustomAlert 
            isOpen={alertConfig.isOpen}
            message={alertConfig.message}
            type={alertConfig.type}
            onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
          />
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
