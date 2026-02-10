import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import NetworkBackground from './NetworkBackground';

const events2026 = [
  { title: 'BOARDROOM BATTLEGROUND', date: 'FEB 16-22', category: 'MANAGEMENT', color: '#c20023' },
  { title: 'TECH BRIDGE', date: 'FEB 16-22', category: 'WORKSHOP', color: '#EA912D' },
  { title: 'PRECISE PROMPT', date: 'FEB 17', category: 'WORKSHOP', color: '#FFD700' },
  { title: 'bITeWARS', date: 'FEB 18', category: 'ENGAGEMENT', color: '#c20023' },
  { title: 'FIGMAFORGE', date: 'FEB 18-19', category: 'DESIGN', color: '#EA912D' },
  { title: 'VIRTUSPHERE', date: 'FEB 20', category: 'EXPERIENCE', color: '#FFD700' },
  { title: 'TECHVENTURES', date: 'FEB 21', category: 'STARTUP', color: '#c20023' },
  { title: 'bITeCAST', date: 'FEB 22', category: 'TALK SHOW', color: '#EA912D' },
  { title: 'PRODUCT PIONEERS', date: 'FEB 22', category: 'SPEAKER SESSION', color: '#FFD700' },
];

export default function AboutPage() {
  const stats = [
    { value: '1000+', label: 'Registrations' },
    { value: '100K+', label: 'Digital Impressions' },
    { value: '42.8%', label: 'YoY Growth' },
  ];

  const highlights = [
    'CXO-style business simulations',
    'Live speaker podcasts & career insights',
    'Hands-on product & analytics workshops',
    'Immersive tech experiences (VR, Drones)',
    'Cross-functional BizTech collaboration',
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      <div className="fixed inset-0 z-0">
        <NetworkBackground />
      </div>

      {/* Content wrapper with higher z-index */}
      <div className="relative z-10">
        {/* Spacing below navbar */}
        <div className="h-32 md:h-40"></div>

        {/* ──────────── ABOUT + STATS SIDE BY SIDE ──────────── */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-24 md:gap-16 items-start">
          {/* What is ProdUX */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-10 h-[3px] bg-orange-500 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold font-tech mb-6">What is ProdUX?</h2>
            <p className="text-lg md:text-xl leading-relaxed text-white/70">
              <span className="text-orange-400 font-medium">ProdUX</span> is the flagship Business & Technology Fest by{' '}
              <span className="text-white font-medium">bITeSys, IIM Shillong</span> — a platform at the intersection of technology, strategy, and innovation. Over the years it has grown into a premier event, uniting students, industry leaders, and entrepreneurs to discuss emerging trends, tackle real-world challenges, and shape the future of business and technology.
            </p>
          </motion.div>

          {/* Stats Boxes */}
          <motion.div
            className="grid grid-cols-1 gap-4 pt-8 md:pt-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02] hover:border-orange-500/30 transition-all duration-300"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono text-orange-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  </div>
                  <p className="text-4xl md:text-5xl font-bold text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────── PHOTO + TEXT BLOCKS ──────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28 space-y-24 md:space-y-32">

        {/* Block 1 — ProdUX'25 */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1"
          >
            <p className="text-xs font-mono tracking-[0.3em] text-orange-400 uppercase mb-3">Revisiting</p>
            <h3 className="text-3xl md:text-4xl font-bold font-tech mb-5">ProdUX'25</h3>
            <p className="text-base md:text-lg leading-relaxed text-white/60">
              Themed <span className="text-white italic">"Business Beyond Boundaries"</span>, ProdUX 2025 explored how AI, IoT, and blockchain are reshaping industries — through panel discussions, business simulations, workshops, and venture clashes. It featured a <span className="text-orange-400">bITeCast session</span> with Mr. Arun Sreelalan Iyer from Quantrium and <span className="text-orange-400">Product Pioneers</span> with Mr. Vinod Kumar Subramaniam from Google.
            </p>
          </motion.div>
          <motion.div
            className="order-1 md:order-2 rounded-xl overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <img src="/images/past_event/img6.jpeg" alt="ProdUX'25" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Block 2 — ProdUX'26 */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            className="rounded-xl overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <img src="/images/event_banners/produx.png" alt="ProdUX'26" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-mono tracking-[0.3em] text-orange-400 uppercase mb-3">Coming Up</p>
            <h3 className="text-3xl md:text-4xl font-bold font-tech mb-3">ProdUX'26</h3>
            <p className="text-xl italic text-orange-400 mb-5">"Designing the Next Era of Growth"</p>
            <p className="text-base md:text-lg leading-relaxed text-white/60 mb-6">
              Exploring how modern organisations design sustainable growth through data-led decision-making, customer-centric product thinking, and agile execution.
            </p>
            <ul className="space-y-2">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-white/70 text-sm md:text-base"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ──────────── EVENTS MARQUEE ──────────── */}
      <Link to="/events" className="block py-8 overflow-hidden bg-white/[0.15] hover:bg-white/[0.2] transition-all cursor-pointer relative">
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/30"></div>
        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/30"></div>
        
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...events2026, ...events2026].map((ev, i) => (
            <span
              key={i}
              className="text-base md:text-lg font-mono font-semibold text-white/50 tracking-wider"
            >
              {ev.title}
            </span>
          ))}
        </motion.div>
      </Link>

      {/* ──────────── PARTNERS ──────────── */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono tracking-[0.3em] text-orange-400 uppercase mb-3">Collaborations</p>
          <h2 className="text-4xl md:text-5xl font-bold font-tech mb-12">
            Our{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #EA912D 0%, #FFD700 50%, #c20023 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Partners
            </span>
          </h2>
          <div className="flex justify-center">
            <a
              href="https://www.cesim.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-8 max-w-xs w-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(234,145,45,0.15)]"
            >
              <p className="text-xs font-mono text-[#0a0a0a]/50 uppercase tracking-widest mb-4">Business Partner</p>
              <img src="/images/sponsors/cesim.png" alt="Cesim" className="w-full h-auto object-contain" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ──────────── CTA ──────────── */}
      <section className="border-t border-white/10 py-20 md:py-28 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-tech mb-6">Ready to be part of it?</h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">16 – 22 February 2026 &bull; IIM Shillong</p>
          <div className="flex flex-row justify-center gap-4">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/50 text-white font-bold text-sm tracking-wider uppercase hover:bg-orange-500/10 transition-colors"
            >
              Explore Events <ArrowRight size={16} />
            </Link>
            <Link
              to="/showcase"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              View Showcase <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
      </div>
    </div>
  );
}
