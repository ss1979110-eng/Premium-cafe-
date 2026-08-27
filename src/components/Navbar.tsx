import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data/menu';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Chai', href: '#chai' },
    { name: 'Coffee', href: '#coffee' },
    { name: 'Chinese', href: '#chinese' },
    { name: 'Shakes', href: '#drinks' },
    { name: 'Mocktails', href: '#drinks' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        id="main-navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl shadow-black/80'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity / Logo */}
          <a
            id="nav-brand-link"
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-[#241510] border border-[#0B3024] flex items-center justify-center text-[#E8D8C3] group-hover:border-[#123F2E] group-hover:bg-[#3A2117] transition-all duration-300 shadow-md shadow-[#050504]"
            >
              <Coffee className="w-5 h-5 text-[#E8D8C3]" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-[#F5F2EC] group-hover:text-[#E8D8C3] transition-colors">
                CAFÉ JAIPUR
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#A89A8C]">
                Prabhudayal Marg • Airport Rd
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-medium tracking-wide text-[#F5F2EC]/80 hover:text-[#E8D8C3] hover:drop-shadow-[0_0_8px_rgba(232,216,195,0.4)] transition-all duration-200"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Action Buttons: Cart & Order CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone Quick Dial */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id="nav-phone-btn"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#E8D8C3] bg-[#241510]/80 border border-[#3A2117] hover:border-[#0B3024] hover:bg-[#3A2117] rounded-md transition-all duration-200"
              title="Call Café Jaipur"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8D8C3]" />
              <span>{BUSINESS_INFO.phone}</span>
            </motion.a>

            {/* Cart Icon Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-md bg-[#241510] border border-[#0B3024] hover:border-[#123F2E] hover:bg-[#3A2117] text-[#E8D8C3] transition-all duration-200 focus:outline-none cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  id="nav-cart-badge"
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#123F2E] border border-[#E8D8C3] text-[11px] font-bold text-[#E8D8C3] flex items-center justify-center shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* ORDER NOW Primary Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id="nav-order-now-btn"
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-widest font-semibold text-[#E8D8C3] bg-[#0B3024] hover:bg-[#123F2E] border border-[#123F2E] hover:border-[#E8D8C3]/40 rounded-md transition-all duration-300 shadow-lg shadow-[#0B3024]/30"
            >
              ORDER NOW
            </motion.a>

            {/* Mobile Hamburger Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-md bg-[#241510] border border-[#3A2117] text-[#E8D8C3] hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-backdrop"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between border-b border-[#241510] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#241510] border border-[#0B3024] flex items-center justify-center text-[#E8D8C3]">
                  <Coffee className="w-5 h-5" />
                </div>
                <span className="font-heading text-xl font-bold text-[#F5F2EC]">CAFÉ JAIPUR</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                id="mobile-drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md bg-[#241510] text-[#E8D8C3] hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="flex flex-col gap-4 py-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  id={`mobile-nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-heading tracking-wide text-[#F5F2EC] hover:text-[#E8D8C3] transition-colors py-1.5 border-b border-[#241510]/50"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-[#241510]">
              <a
                id="mobile-drawer-call-btn"
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#241510] border border-[#3A2117] rounded-md text-[#E8D8C3] text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                Call {BUSINESS_INFO.phone}
              </a>
              <a
                id="mobile-drawer-order-btn"
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#0B3024] hover:bg-[#123F2E] border border-[#123F2E] rounded-md text-[#E8D8C3] font-semibold text-sm tracking-wider uppercase"
              >
                Explore Menu & Order
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

