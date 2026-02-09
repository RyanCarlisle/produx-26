import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'EVENTS', href: '/events' },
    { label: 'TEAM', href: '/team' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4">
        <div className="flex items-center justify-between border border-white/10 rounded-full px-6 py-3 backdrop-blur-sm bg-black/20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-4 z-50 text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
               <div className="bg-white rounded-full flex items-center justify-center p-1 w-12 h-12 md:w-14 md:h-14 overflow-hidden">
                  <img src="/logo/IIMS_Logo.png" alt="IIM Shillong" className="h-full w-full object-contain" />
               </div>
               <div className="w-[1px] h-6 bg-white/30"></div>
               <div className="flex items-center gap-2">
                  <img src="/logo/produx_logo.svg" alt="ProdUX" className="h-8 md:h-10 w-auto object-contain" />
                  <span className="font-bold text-lg md:text-xl tracking-wide hidden md:block">ProdUX</span>
               </div>
            </motion.div>
          </Link>

          {/* Desktop Nav - Only visible on non-home pages */}
          <motion.div
            className={`hidden ${isHomePage ? '' : 'lg:flex'} items-center gap-4`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {menuItems.slice(1).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-base font-medium text-white/70 hover:text-black transition-all px-4 py-2 rounded-full hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>

          {/* CTA Button - Only visible on non-home pages */}
          <motion.button
            onClick={() => setIsRegisterOpen(true)}
            className={`hidden ${isHomePage ? '' : 'md:flex'} items-center gap-2 px-6 py-2.5 border border-brand-orange text-white bg-transparent rounded-full font-bold tracking-[0.2em] uppercase hover:bg-brand-orange hover:text-black transition-all transform hover:scale-105 group relative`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            REGISTER NOW
          </motion.button>

          {/* Mobile Menu Button - Visible on Mobile AND Desktop if Home Page */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${isHomePage ? 'flex' : 'md:hidden'} z-50 flex flex-col gap-1.5 p-2 cursor-pointer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="w-8 h-0.5 bg-white block"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0,
              }}
            />
            <motion.span
              className="w-8 h-0.5 bg-white block"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-8 h-0.5 bg-white block"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8 : 0,
              }}
            />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col items-center gap-8">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={linkVariants}
                  custom={i}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                   <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl md:text-5xl font-bold hover:text-brand-orange transition-colors cursor-pointer text-white tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                onClick={() => {
                  setIsRegisterOpen(true);
                  setIsMenuOpen(false);
                }}
                className="mt-8 px-8 py-3 bg-brand-red text-white rounded-full text-lg font-medium hover:bg-white hover:text-black transition-colors"
                variants={linkVariants}
                custom={menuItems.length}
                initial="closed"
                animate="open"
                exit="closed"
              >
                REGISTER NOW
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
}
