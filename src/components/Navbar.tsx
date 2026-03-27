import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference"
    >
      <Link to="/" className="text-2xl font-bold tracking-tighter text-[#ccff00]">
        SPRDLX
      </Link>
      <div className="flex items-center gap-8 text-sm font-medium">
        <Link to="/portfolio" className="hover:opacity-70 transition-opacity italic text-zinc-300">Portfolio</Link>
        <Link to="/contact" className="group flex items-center gap-2 transition-opacity text-white">
          <span className="relative flex items-center justify-center w-6 h-6 border border-white/30 rounded-sm overflow-hidden">
            <svg className="transition-transform duration-300 ease-in-out group-hover:translate-x-6" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <svg className="absolute -translate-x-6 transition-transform duration-300 ease-in-out group-hover:translate-x-0" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
          <span className="italic font-serif text-lg">Contact</span>
        </Link>
      </div>
    </motion.nav>
  );
}
