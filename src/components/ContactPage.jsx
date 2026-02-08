import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import StarBackground from './StarBackground';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 px-6 md:px-12 bg-[#0a0a0a] text-white relative flex flex-col items-center justify-center">
        <StarBackground />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-brand-orange/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-6xl w-full py-20 relative z-10 grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Form */}
            <div>
                <motion.h1 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6 font-tech tracking-widest"
                >
                    INITIATE <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-2">CONTACT</span>
                </motion.h1>

                <motion.form 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 backdrop-blur-md bg-brand-red/5 p-8 rounded-3xl border border-brand-red/20 shadow-2xl shadow-brand-red/10"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-white uppercase tracking-widest">Identifier / Name</label>
                            <input type="text" className="w-full bg-black/50 border border-brand-red/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/5 transition-all placeholder:text-white/30" placeholder="ENTER NAME" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-white uppercase tracking-widest">Frequency / Email</label>
                            <input type="email" className="w-full bg-black/50 border border-brand-red/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/5 transition-all placeholder:text-white/30" placeholder="ENTER EMAIL" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-white uppercase tracking-widest">Transmission / Message</label>
                        <textarea rows="4" className="w-full bg-black/50 border border-brand-red/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-orange focus:bg-white/5 transition-all placeholder:text-white/30" placeholder="TYPE MESSAGE..."></textarea>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 border border-brand-orange text-white bg-transparent rounded-lg font-bold tracking-[0.2em] uppercase hover:bg-brand-orange hover:text-black transition-all"
                    >
                        Transmit Data
                    </motion.button>
                </motion.form>
            </div>

            {/* Right Column: Info & Map */}
            <motion.div
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.4 }}
                 className="space-y-8"
            >
                {/* Contact Info Cards */}
                <div className="grid gap-6">
                    {/* Address Card */}
                    <div className="bg-brand-red/5 border border-brand-red/20 p-6 rounded-2xl flex items-start gap-4">
                        <div className="p-3 bg-brand-orange/20 rounded-lg text-brand-orange">
                             <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold font-mono mb-2 text-white">OPERATIONAL BASE</h3>
                            <p className="text-white text-sm leading-relaxed">
                                IIM Shillong, Umsawli,<br/>
                                Meghalaya - 793018<br/>
                                India
                            </p>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-brand-red/5 border border-brand-red/20 p-6 rounded-2xl flex items-start gap-4">
                        <div className="p-3 bg-brand-orange/20 rounded-lg text-brand-orange">
                             <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold font-mono mb-2 text-white">SECURE LINE</h3>
                            <p className="text-white text-sm mb-1">Available for urgent transmissions</p>
                            <a href="tel:+919876543210" className="text-xl font-bold tracking-wider hover:text-brand-orange transition-colors">
                                +91 98765 43210
                            </a>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden border border-brand-red/20 shadow-2xl shadow-brand-red/10 grayscale hover:grayscale-0 transition-all duration-500">
                    <iframe 
                        src="https://maps.google.com/maps?q=25.61557266074214,91.95492836984748&z=15&output=embed" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </motion.div>
        </div>

    </div>
  );
}
