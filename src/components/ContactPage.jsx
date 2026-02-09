import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import StarBackground from './StarBackground';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 px-6 md:px-12 bg-[#0a0a0a] text-white relative flex flex-col items-center justify-center">
        <StarBackground />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-brand-orange/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-7xl w-full py-20 relative z-10 flex flex-col items-center">
            
            <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold mb-12 font-tech tracking-widest text-center"
            >
                INITIATE <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-2">CONTACT</span>
            </motion.h1>

            <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.2 }}
                 className="w-full space-y-8"
            >
                {/* Contact Info Cards Grid */}
                <div className="grid lg:grid-cols-3 gap-8 w-full">
                    {/* Address Card */}
                    <div className="bg-brand-red/5 border border-brand-red/20 p-10 rounded-3xl flex flex-col items-center text-center gap-6 hover:bg-brand-red/10 transition-colors h-full justify-between group">
                        <div className="p-5 bg-brand-orange/20 rounded-full text-brand-orange group-hover:scale-110 transition-transform duration-300">
                             <MapPin size={40} />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold font-mono mb-4 text-white tracking-wide">OPERATIONAL BASE</h3>
                            <p className="text-white/80 text-lg leading-relaxed">
                                IIM Shillong, Umsawli,<br/>
                                Meghalaya - 793018, India
                            </p>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-brand-red/5 border border-brand-red/20 p-10 rounded-3xl flex flex-col items-center text-center gap-6 hover:bg-brand-red/10 transition-colors h-full justify-between group">
                        <div className="p-5 bg-brand-orange/20 rounded-full text-brand-orange group-hover:scale-110 transition-transform duration-300">
                             <Phone size={40} />
                        </div>
                        <div className="w-full flex-1 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold font-mono mb-8 text-white tracking-wide">SECURE LINES</h3>
                            <div className="flex flex-col xl:flex-row gap-4 justify-center items-center w-full">
                                <div className="flex flex-col items-center">
                                    <p className="text-brand-orange/80 text-xs font-semibold tracking-wider mb-2 uppercase">Event Coordinator</p>
                                    <p className="text-white font-medium mb-1 text-sm">Bhuswarna Kashyap</p>
                                    <a href="tel:+917086345149" className="text-base font-bold tracking-widest hover:text-brand-orange transition-colors whitespace-nowrap">
                                        +91 70863 45149
                                    </a>
                                </div>
                                <div className="hidden xl:block w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2"></div>
                                <div className="flex flex-col items-center">
                                    <p className="text-brand-orange/80 text-xs font-semibold tracking-wider mb-2 uppercase">Event Coordinator</p>
                                    <p className="text-white font-medium mb-1 text-sm">Nityansh Garg</p>
                                    <a href="tel:+919406608047" className="text-base font-bold tracking-widest hover:text-brand-orange transition-colors whitespace-nowrap">
                                        +91 94066 08047
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Email Card */}
                     <div className="bg-brand-red/5 border border-brand-red/20 p-10 rounded-3xl flex flex-col items-center text-center gap-6 hover:bg-brand-red/10 transition-colors h-full justify-between group">
                        <div className="p-5 bg-brand-orange/20 rounded-full text-brand-orange group-hover:scale-110 transition-transform duration-300">
                             <Mail size={40} />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold font-mono mb-4 text-white tracking-wide">DIGITAL COMM</h3>
                            <p className="text-white/60 text-base mb-2 uppercase tracking-widest">General Inquiries</p>
                            <a href="mailto:bitesys@iimshillong.ac.in" className="text-base md:text-lg font-bold tracking-wider hover:text-brand-orange transition-colors whitespace-nowrap">
                                bitesys@iimshillong.ac.in
                            </a>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="w-full h-80 md:h-96 rounded-3xl overflow-hidden border border-brand-red/20 shadow-2xl shadow-brand-red/10 grayscale hover:grayscale-0 transition-all duration-500">
                    <iframe 
                        src="https://maps.google.com/maps?q=25.61557266074214,91.95492836984748&z=15&output=embed" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="IIM Shillong Map"
                    ></iframe>
                </div>
            </motion.div>
        </div>

    </div>
  );
}
