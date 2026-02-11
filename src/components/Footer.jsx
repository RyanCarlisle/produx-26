import { motion } from 'framer-motion';
import { Linkedin, Instagram, MapPin, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/company/bitesys', 
      icon: <Linkedin size={20} /> 
    },
    { 
      label: 'Instagram', 
      href: 'https://www.instagram.com/bitesys.iims/?hl=en', 
      icon: <Instagram size={20} /> 
    },
    { 
      label: 'Website', 
      href: 'https://www.iimshillong.ac.in/club-news-events/bitesys/', 
      icon: <Globe size={20} /> 
    },
  ];

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Showcase', href: '/showcase' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="py-16 px-6 md:px-12 lg:px-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap justify-between gap-12 lg:gap-8">
          {/* Brand */}
          <div className="w-full md:w-full lg:w-[45%]">
            <a
              href="#"
              className="inline-flex items-center gap-3"
            >
              <img src="/logo/produx_logo.svg" alt="ProdUX" className="h-12 w-auto object-contain" />
              <span className="font-bold text-2xl text-white">ProdUX</span>
            </a>
            <p className="mt-4 text-white/50 max-w-sm">
              The flagship event of bITeSys: The Business and Technology Club of IIM Shillong
            </p>
            <img src="/logo/bitesys_logo_sleek.png" alt="bITeSys" className="mt-3 h-20 w-auto" />
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-[45%] lg:w-[20%]">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Contact */}
          <div className="w-full md:w-[45%] lg:w-[25%]">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            <div className="space-y-4">
               <div className="flex items-start gap-3 text-white/40 text-sm">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <p>
                    IIM Shillong, Umsawli,<br />
                    Meghalaya - 793018
                  </p>
               </div>
               
               <a 
                 href="mailto:bitesys@iimshillong.ac.in" 
                 className="flex items-center gap-3 text-white/40 text-sm hover:text-white transition-colors"
               >
                  <Mail size={18} />
                  <span>bitesys@iimshillong.ac.in</span>
               </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 bITeSys IIM Shillong. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
                       <a 
                 href="https://www.iimshillong.ac.in/club-news-events/bitesys/" 
                 className="flex items-center gap-3 text-white/40 text-sm hover:text-white transition-colors"
               >
            Powered by bITeSys | The Business and Technology Club
          </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
