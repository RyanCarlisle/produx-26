import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#6320ee] text-sm tracking-widest uppercase">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 max-w-3xl">
            Beyond Visions Within Reach
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Main Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Lusion is a digital production studio that brings your ideas to
              life through visually captivating designs and interactive
              experiences. With our talented team, we push the boundaries by
              solving complex problems, delivering tailored solutions that
              exceed expectations and engage audiences.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 mt-8 text-[#6320ee] font-medium group"
              whileHover={{ x: 5 }}
            >
              Learn more about us
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right Column - Stats/Features */}
          <motion.div
            className="grid grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '10+', label: 'Years Experience' },
              { number: '30+', label: 'Team Members' },
              { number: '15+', label: 'Awards Won' },
            ].map((stat, index) => (
              <div key={index} className="border-l border-white/10 pl-6">
                <span className="text-4xl md:text-5xl font-bold gradient-text">
                  {stat.number}
                </span>
                <p className="text-white/50 mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Services */}
        <motion.div
          className="mt-24 pt-24 border-t border-white/10"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-sm text-white/50 tracking-widest uppercase mb-8">
            What We Do
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Web Development',
                description:
                  'Building performant, accessible, and beautiful web experiences using cutting-edge technologies.',
              },
              {
                title: '3D & WebGL',
                description:
                  'Creating immersive 3D experiences and interactive visualizations that captivate users.',
              },
              {
                title: 'Design & Branding',
                description:
                  'Crafting unique visual identities and user experiences that stand out from the crowd.',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <h4 className="text-xl font-semibold mb-3 group-hover:text-[#6320ee] transition-colors">
                  {service.title}
                </h4>
                <p className="text-white/50">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
