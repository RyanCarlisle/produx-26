import { motion } from 'framer-motion';
import StarBackground from './StarBackground';

const sponsors = [];

export default function SponsorsPage() {
    return (
        <div className="min-h-screen pt-20 px-6 md:px-12 bg-[#0a0a0a] text-white relative">
            <StarBackground />
            <div className="max-w-7xl mx-auto py-20 relative z-10">
                <motion.h1 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6 font-tech tracking-widest"
                >
                    OUR <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-2">PARTNERS</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400 mb-16 max-w-2xl"
                >
                    Powered by the entities building the infrastructure of tomorrow.
                </motion.p>
                
                {/* Business Partner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-16"
                >
                    <h2 className="text-xl md:text-2xl font-mono text-brand-orange mb-6 tracking-widest uppercase">Business Partner</h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-sm hover:bg-white/10 transition-colors flex items-center justify-center bg-white">
                        <img src="/images/sponsors/cesim.png" alt="Cesim" className="w-full h-auto object-contain" />
                    </div>
                </motion.div>

                {/* Removed other cards */}
            </div>
        </div>
    );
}
