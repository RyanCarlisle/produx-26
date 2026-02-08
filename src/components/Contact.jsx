import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      className="py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f1a]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#6320ee] text-sm tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-6">
            Is your big idea
            <br />
            ready to go{' '}
            <span className="gradient-text">wild?</span>
          </h2>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a
            href="mailto:hello@lusion.co"
            className="inline-flex items-center gap-4 text-2xl md:text-4xl font-bold hover:text-[#6320ee] transition-colors group"
          >
            Let's work together!
            <motion.span
              className="inline-block"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>

        {/* Additional Text */}
        <motion.p
          className="mt-8 text-white/50 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Step into a new world and let your imagination run wild.
          We're here to bring your vision to life.
        </motion.p>

        {/* Email Links */}
        <motion.div
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <p className="text-white/40 text-sm mb-2">General enquiries</p>
            <a
              href="mailto:hello@lusion.co"
              className="text-lg hover:text-[#6320ee] transition-colors"
            >
              hello@lusion.co
            </a>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/20" />
          <div className="text-center">
            <p className="text-white/40 text-sm mb-2">New business</p>
            <a
              href="mailto:business@lusion.co"
              className="text-lg hover:text-[#6320ee] transition-colors"
            >
              business@lusion.co
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
