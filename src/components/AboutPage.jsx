import { motion } from 'framer-motion';
import StarBackground from './StarBackground';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-6 md:px-12 bg-[#0a0a0a] text-white overflow-hidden relative">
      <StarBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-red/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 font-tech tracking-widest"
        >
          ABOUT <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#c20023,#ff6600,#fffb00)] drop-shadow-lg pb-2">US</span>
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
                  <p className="text-lg font-light leading-relaxed text-white">
                    ProdUX, the flagship Business and Technology Fest by bITeSys, IIM Shillong, started as a platform to explore the intersection of technology, strategy, and innovation. Over the years, it has evolved into a premier event, bringing together students, industry experts, and entrepreneurs to discuss emerging trends, tackle real-world challenges, and shape the future of business and technology.
                  </p>
                </div>

                {/* Section 2: Revisiting ProdUX'25 */}
                <div>
                   <h3 className="text-2xl font-bold text-white mb-2">Revisiting ProdUX'25</h3>
                   <p className="text-lg font-light leading-relaxed text-white">
                     ProdUX 2025 featured challenging quizzes, expert talks, case competitions and workshops. Industry leaders like Pamit D Anand (Magicbricks) and Ashish Gambhir (BharatPe) shared insights on product management and Generative AI. Munwar Khan (UX Design Leader) and Soni Shaw (PhonePe) explored UX design and product discovery, fostering strategic thinking and innovation.
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
                   <p className="text-base text-white mb-6 leading-relaxed">
                     ProdUX'26 will explore how modern organizations design sustainable growth through data-led decision-making, customer-centric product thinking, and agile execution. It equips participants with industry-relevant frameworks, practical exposure, and cross-functional skills.
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
      </div>
    </div>
  );
}
