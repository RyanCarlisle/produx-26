import { motion } from 'framer-motion';
import NetworkBackground from './NetworkBackground';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-6 md:px-12 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </div>
      
      <div className="max-w-7xl mx-auto py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 font-tech tracking-widest"
        >
          ABOUT <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-2">THE EVENT</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
            >
                   <div className="h-1 w-20 bg-brand-orange mb-8"></div>
                
                {/* Section 1: About ProdUX */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">About ProdUX</h3>
                  <p className="text-lg font-light leading-relaxed text-white text-justify">
                    <span className="text-brand-orange font-medium">ProdUX</span>, the flagship Business and Technology Fest by <span className="text-white font-medium">bITeSys, IIM Shillong</span>, started as a platform to explore the intersection of technology, strategy, and innovation. Over the years, it has evolved into a <span className="text-brand-orange">premier event</span>, bringing together students, industry experts, and entrepreneurs to discuss emerging trends, tackle real-world challenges, and shape the future of business and technology.
                  </p>
                </div>

                {/* Section 2: Revisiting ProdUX'25 */}
                <div>
                   <h3 className="text-2xl font-bold text-white mb-2">Revisiting ProdUX'25</h3>
                   <p className="text-lg font-light leading-relaxed text-white text-justify">
                     <span className="text-brand-orange font-medium">ProdUX 2025</span>, themed “Business Beyond Boundaries” explored how emerging technologies such as <span className="text-white font-normal">AI, IoT, and blockchain</span> were reshaping industries through panel discussions, business simulations, workshops, and venture clashes, equipping participants with practical insights to drive innovation in the digital age. The event also featured the <span className="text-brand-orange">bITeCast session</span> with <span className="text-white font-medium">Mr. Arun Sreelalan Iyer</span>, Head of Product Management at Quantrium, who discussed the intersection of technology, strategy, and product innovation, along with <span className="text-brand-orange">Product Pioneers</span>, where <span className="text-white font-medium">Mr.Vinod Kumar Subramaniam</span>, Senior Product Manager at Google, shared insights on entering product management, career growth, and industry best practices.
                   </p>
                </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
            >
               {/* Section 3: Next Up */}
               <div className="border border-brand-red/20 rounded-2xl p-8 bg-brand-red/5 backdrop-blur-sm">
                   <h3 className="text-2xl font-bold text-white mb-4">Next Up: ProdUX'26</h3>
                   <p className="text-xl italic text-brand-orange mb-4">"Designing the Next Era of Growth"</p>
                   <p className="text-base text-white mb-6 leading-relaxed text-justify">
                     <span className="text-brand-orange font-medium">ProdUX'26</span> will explore how modern organizations design sustainable growth through <span className="text-white font-normal">data-led decision-making</span>, customer-centric product thinking, and agile execution. It equips participants with industry-relevant frameworks, practical exposure, and <span className="text-white font-normal">cross-functional skills</span>.
                   </p>
                   
                   <h4 className="font-bold text-white mb-3">What to Expect</h4>
                   <ul className="text-sm space-y-2 text-white list-disc list-inside">
                        <li>CXO-style business simulations</li>
                        <li>Live speaker podcasts and career insights</li>
                        <li>Hands-on workshops focused on product & analytics</li>
                        <li>Immersive technology experiences (VR, Drones)</li>
                        <li>Collaboration at the intersection of BizTech</li>
                   </ul>
               </div>

               {/* PAST STATISTICS */}
               <div className="pt-12">
                  <div>
                      <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-2 from-brand-red to-brand-orange mb-2">PAST STATISTICS</h4>
                      <div className="h-0.5 w-16 bg-gradient-to-r from-brand-red to-brand-orange mb-8"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="p-10 min-h-[200px] flex flex-col items-center justify-center text-center bg-brand-red/5 border border-brand-red/20 rounded-xl hover:border-brand-red/40 transition-colors">
                          <p className="text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-lg pb-1">1000+</p>
                          <p className="text-sm font-mono text-brand-orange uppercase tracking-widest">Registrations</p>
                      </div>

                      <div className="p-10 min-h-[200px] flex flex-col items-center justify-center text-center bg-brand-red/5 border border-brand-red/20 rounded-xl hover:border-brand-orange/40 transition-colors">
                          <p className="text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-lg pb-1">100K+</p>
                          <p className="text-sm font-mono text-brand-orange uppercase tracking-widest">Digital Impressions</p>
                      </div>

                      <div className="p-10 min-h-[200px] flex flex-col items-center justify-center text-center bg-brand-red/5 border border-brand-red/20 rounded-xl hover:border-brand-orange/40 transition-colors">
                          <p className="text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-lg pb-1">42.8%</p>
                          <p className="text-sm font-mono text-brand-red uppercase tracking-widest">YoY Growth</p>
                      </div>
                  </div>
               </div>
            </motion.div>
        </div>

        {/* --- SPONSORS SECTION MERGED --- */}
        <div className="mt-40 border-t border-white/10 pt-20">
             <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl md:text-5xl font-bold mb-12 font-tech tracking-widest text-center"
             >
                 OUR <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)]">PARTNERS</span>
             </motion.h2>

             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
             >
                <h3 className="text-xl md:text-2xl font-mono text-brand-orange mb-8 tracking-widest uppercase">Business Partner</h3>
                <a 
                    href="https://www.cesim.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-8 max-w-sm w-full hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] block z-50 relative cursor-pointer"
                >
                    <img src="/images/sponsors/cesim.png" alt="Cesim" className="w-full h-auto object-contain" />
                </a>
             </motion.div>
        </div>

      </div>
    </div>
  );
}
