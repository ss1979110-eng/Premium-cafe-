import React, { useState, useMemo } from 'react';
import {
  Coffee,
  Flame,
  Search,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Phone,
  CheckCircle2,
  ChevronDown,
  UtensilsCrossed,
  HeartHandshake,
  Sun,
  Moon,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Hero3DCanvas } from './components/3d/Hero3DCanvas';
import { Chai3DScene } from './components/3d/Chai3DScene';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { GalleryLightbox } from './components/GalleryLightbox';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MENU_ITEMS, BUSINESS_INFO } from './data/menu';
import { MenuItem, CartItem, CategoryType } from './types';

export default function App() {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3D Scene Ambiance & Brightness state
  const [brightnessPreset, setBrightnessPreset] = useState<'vibrant' | 'balanced' | 'moody'>('balanced');

  // Menu filter and search state

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Helper to get item count in cart
  const getItemQuantity = (itemId: string): number => {
    const item = cart.find((ci) => ci.item.id === itemId);
    return item ? item.quantity : 0;
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Filtered menu items
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Tea items for dedicated Chai section
  const teaItems = MENU_ITEMS.filter((item) => item.category === 'TEA');

  // Coffee items for dedicated Coffee section
  const coffeeItems = MENU_ITEMS.filter((item) => item.category === 'COFFEE');

  const categories: CategoryType[] = [
    'ALL',
    'NOODLES',
    'SHAKE',
    'CHINESE',
    'MOCKTAILS',
    'TEA',
    'COFFEE',
  ];

  return (
    <div className="min-h-screen bg-[#050504] text-[#F5F2EC] relative selection:bg-[#0B3024] selection:text-[#E8D8C3]">
      {/* 1. STICKY NAVBAR */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. CINEMATIC 3D HERO SECTION - MATCHING REFERENCE IMAGE */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-between pt-16 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050504]"
      >
        {/* Fullscreen 3D WebGL Canvas with flying 3D Cutting Chai, Cold Frappe & floating coffee beans */}
        <Hero3DCanvas brightnessPreset={brightnessPreset} />

        {/* Ambient Dark Vignette & Glow Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050504]/70 via-transparent to-[#050504]/90 pointer-events-none z-1" />
        <div className="absolute inset-0 bg-vignette opacity-80 pointer-events-none z-1" />

        {/* Top Floating Bar: Brand Status & Next Navigation Button */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto pt-2">
          {/* Subtle live ambiance status badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#140e0b]/80 border border-[#3A2117] backdrop-blur-md text-[11px] font-semibold text-[#E8D8C3] uppercase tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#0B3024] animate-ping" />
            <span className="hidden sm:inline">3D Flying Coffee & Chai Scene</span>
            <span className="sm:hidden">Live 3D Brew</span>
          </div>

          {/* Reference Image "Next >" Quick Explore Button */}
          <div className="flex items-center gap-3">
            {/* Lighting presets toggle (Compact) */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-[#140e0b]/80 border border-[#3A2117]/80 rounded-full backdrop-blur-md">
              <button
                type="button"
                onClick={() => setBrightnessPreset('vibrant')}
                className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  brightnessPreset === 'vibrant' ? 'bg-[#E8D8C3] text-[#140E0B]' : 'text-[#A89A8C]'
                }`}
                title="Vibrant Lighting"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setBrightnessPreset('balanced')}
                className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  brightnessPreset === 'balanced' ? 'bg-[#0B3024] text-[#E8D8C3]' : 'text-[#A89A8C]'
                }`}
                title="Balanced Lighting"
              >
                <Zap className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setBrightnessPreset('moody')}
                className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  brightnessPreset === 'moody' ? 'bg-[#3A2117] text-[#E8D8C3]' : 'text-[#A89A8C]'
                }`}
                title="Moody Lighting"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* "Next >" Pill Button Matching User Image */}
            <motion.a
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              href="#menu"
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-white hover:bg-[#E8D8C3] text-[#050504] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-black/60 cursor-pointer border border-white/90"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </motion.a>
          </div>
        </div>

        {/* Top Hero Brand Header (Matching exact typography from uploaded image) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center pointer-events-auto my-auto pt-1 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center select-none"
          >
            {/* COFFEE */}
            <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.14em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#d9944d] via-[#b36c2e] to-[#7a3e14] drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] leading-none filter drop-shadow-[0_2px_4px_rgba(255,200,140,0.25)]">
              COFFEE
            </h1>

            {/* N */}
            <span className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#d48b3c] my-0.5 sm:my-1 tracking-widest drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)]">
              N
            </span>

            {/* CUE */}
            <h2 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#d9944d] via-[#b36c2e] to-[#6e3711] drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] leading-none filter drop-shadow-[0_2px_4px_rgba(255,200,140,0.25)]">
              CUE
            </h2>
          </motion.div>
        </div>

        {/* Bottom Area: EXPLORE MENU Button & Professional Cafe Details */}
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center space-y-4 pointer-events-auto pb-3">
          {/* Prominent EXPLORE MENU Button (Matching User Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              id="hero-explore-menu-btn"
              href="#menu"
              className="inline-block px-10 sm:px-16 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-[#F5EAD9] text-[#050504] text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-[0.16em] transition-all shadow-[0_15px_45px_rgba(0,0,0,0.85)] border-2 border-white/90 cursor-pointer"
            >
              EXPLORE MENU
            </motion.a>
          </motion.div>

          {/* Professional, Eloquent Cafe Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="space-y-2.5 px-2"
          >
            <p className="text-xs sm:text-sm md:text-base font-semibold text-[#E8D8C3] tracking-wide uppercase">
              Artisanal Brews • Royal Indian Chai • Wood-Fired Delicacies • Handcrafted Shakes
            </p>

            <p className="text-[11px] sm:text-xs text-[#A89A8C] leading-relaxed max-w-2xl mx-auto">
              Crafted with heartfelt passion, freshly ground single-origin Arabica beans, and hand-crushed whole spices. Step in for authentic flavours, soothing sips, and a warm, modern café experience in Jaipur.
            </p>

            {/* Quick Informational Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-0.5 text-[10px] sm:text-[11px] text-[#C4B3A3]">
              <span className="px-3 py-1 rounded-full bg-[#1A100B]/90 border border-[#3A2117] flex items-center gap-1.5 shadow-md">
                📍 Behind The Coronation, Airport Rd (Near Subodh Girls College)
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1A100B]/90 border border-[#3A2117] flex items-center gap-1.5 shadow-md">
                ⏰ Open Daily: 10:00 AM – 11:00 PM
              </span>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-3 py-1 rounded-full bg-[#0B3024]/90 border border-[#123F2E] text-[#E8D8C3] font-semibold flex items-center gap-1.5 hover:bg-[#123F2E] transition-colors shadow-md"
              >
                <Phone className="w-3 h-3 text-[#E8D8C3]" />
                <span>Call: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 text-[#A89A8C] pointer-events-none opacity-50">
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#E8D8C3]" />
        </div>
      </section>

      {/* 3. BRAND INTRODUCTION / ABOUT SECTION */}
      <section id="about" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#050504] via-[#241510]/50 to-[#050504] border-y border-[#3A2117]/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Content Description */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#E8D8C3] font-bold">
                  About Coffee N Cue
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F2EC] leading-tight">
                  Chai Culture Meets Modern Café Craft
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#A89A8C] leading-relaxed">
                Located behind The Coronation on Prabhudayal Marg near SS Jain Subodh Girls College, we serve freshly prepared sips and savoury delights crafted with care.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-xl bg-[#241510] border border-[#3A2117]"
                >
                  <h4 className="font-heading text-lg font-bold text-[#E8D8C3]">Chai & Coffee</h4>
                  <p className="text-xs text-[#A89A8C] mt-1">
                    Special Kadak Tea from ₹15.20 to rich Butter Hot Coffee & Iced Blends.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-xl bg-[#241510] border border-[#3A2117]"
                >
                  <h4 className="font-heading text-lg font-bold text-[#E8D8C3]">Chinese Favourites</h4>
                  <p className="text-xs text-[#A89A8C] mt-1">
                    Steamed & Fried Momos, Hakka Noodles, Manchurian & Chilli Paneer.
                  </p>
                </motion.div>
              </div>

              <div className="pt-1 flex items-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href="#menu"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] text-xs font-bold uppercase tracking-wider transition-colors border border-[#123F2E] cursor-pointer"
                >
                  <span>View All 36 Menu Items</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Right: Premium Curated Image with 3D Depth Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#0B3024] shadow-2xl bg-[#241510] group">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
                  alt="Coffee N Cue Ambiance"
                  className="w-full h-[360px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050504] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#050504]/90 border border-[#3A2117] backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8D8C3]">
                      Coffee N Cue Experience
                    </span>
                    <h3 className="font-heading text-sm font-bold text-[#F5F2EC]">
                      Prabhudayal Marg, Airport Rd
                    </h3>
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="p-2.5 rounded-lg bg-[#0B3024] text-[#E8D8C3] hover:bg-[#123F2E] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CHAI 3D CINEMATIC SECTION */}
      <section id="chai" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#050504] relative overflow-hidden border-b border-[#241510]">
        <div className="absolute inset-0 bg-chai-glow pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* 3D Chai Scene Canvas (Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#241510]/80 via-[#050504] to-[#050504] border border-[#3A2117] p-2 relative shadow-2xl">
                <Chai3DScene />
                <div className="text-center pb-3">
                  <span className="text-[11px] uppercase tracking-widest text-[#A89A8C] font-semibold flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B3024] animate-ping inline-block" />
                    <span>Live 3D Pizza Showcase — Wood-Fired Oven, Rising Steam & Spice Motion</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Chai Content & Menu List (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 order-1 lg:order-2 space-y-5"
            >
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241510] border border-[#0B3024] text-[11px] font-bold text-[#E8D8C3] uppercase tracking-widest">
                  <Flame className="w-3 h-3 text-[#0B3024]" />
                  <span>Indian Chai Culture</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F2EC]">
                  A CUP FULL OF COMFORT.
                </h2>
                <p className="text-xs sm:text-sm text-[#A89A8C] leading-relaxed">
                  Slow-brewed aromatic tea with crushed ginger, whole green cardamom, and fresh Assam leaves for the ultimate soothing sip.
                </p>
              </div>

              {/* Tea Menu Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {teaItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    className="p-3.5 rounded-xl bg-[#241510]/60 border border-[#3A2117] hover:border-[#0B3024] transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="font-heading text-sm font-bold text-[#F5F2EC] group-hover:text-[#E8D8C3] transition-colors">
                        {item.name}
                      </h4>
                      <span className="font-heading text-xs font-bold text-[#E8D8C3]">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      id={`chai-add-${item.id}`}
                      onClick={() => handleAddToCart(item)}
                      className="px-3 py-1.5 rounded-md bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#123F2E] cursor-pointer"
                    >
                      {getItemQuantity(item.id) > 0 ? `In Cart (${getItemQuantity(item.id)})` : 'Add'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. COFFEE 3D CINEMATIC SECTION */}
      <section id="coffee" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#050504] relative overflow-hidden border-b border-[#241510]">
        <div className="absolute inset-0 bg-coffee-glow pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Coffee Content & Menu List (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241510] border border-[#0B3024] text-[11px] font-bold text-[#E8D8C3] uppercase tracking-widest">
                  <Coffee className="w-3 h-3 text-[#0B3024]" />
                  <span>Artisanal Coffee Bar</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F2EC]">
                  CRAFTED FOR COFFEE MOMENTS.
                </h2>
                <p className="text-xs sm:text-sm text-[#A89A8C] leading-relaxed">
                  Dark-roasted beans extracted to velvety perfection. Enjoy classic hot coffee, butter coffee, bold espresso, rich hot chocolate, and thick cold coffees topped with ice cream.
                </p>
              </div>

              {/* Coffee Menu Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {coffeeItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    className="p-3.5 rounded-xl bg-[#241510]/60 border border-[#3A2117] hover:border-[#0B3024] transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <h4 className="font-heading text-sm font-bold text-[#F5F2EC] group-hover:text-[#E8D8C3] transition-colors truncate">
                        {item.name}
                      </h4>
                      <span className="font-heading text-xs font-bold text-[#E8D8C3]">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      id={`coffee-add-${item.id}`}
                      onClick={() => handleAddToCart(item)}
                      className="px-3 py-1.5 rounded-md bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#123F2E] shrink-0 cursor-pointer"
                    >
                      {getItemQuantity(item.id) > 0 ? `In Cart (${getItemQuantity(item.id)})` : 'Add'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Artisanal Coffee Photography Showcase (Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-lg rounded-2xl overflow-hidden bg-[#241510] border border-[#3A2117] shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
                  alt="Freshly Roasted Coffee & Latte Art"
                  className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050504] via-[#050504]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#050504]/90 border border-[#3A2117] backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8D8C3]">
                      Fresh Arabica Roast
                    </span>
                    <h4 className="font-heading text-base font-bold text-[#F5F2EC]">
                      Hand-Pulled Espresso & Blends
                    </h4>
                  </div>
                  <a
                    href="#menu"
                    onClick={() => setSelectedCategory('COFFEE')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    View Menu
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CHINESE FOOD CINEMATIC SECTION */}
      <section id="chinese" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#050504] relative border-b border-[#241510]">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto space-y-2"
          >
            <span className="text-xs uppercase tracking-widest text-[#E8D8C3] font-bold">
              Wok-Tossed & Steamed Delicacies
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F2EC]">
              BOLD FLAVOURS. FRESHLY SERVED.
            </h2>
            <p className="text-xs sm:text-sm text-[#A89A8C] leading-relaxed">
              MOMOS + NOODLES + CHILLI PANEER. Wok-fired Indo-Chinese delicacies made with crisp vegetables, fragrant garlic, and authentic spices.
            </p>
          </motion.div>

          {/* Feature Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Momos Feature */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden bg-[#241510] border border-[#3A2117] hover:border-[#0B3024] transition-all group flex flex-col justify-between"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
                  alt="Steam Momos"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241510] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#050504]/90 text-[#E8D8C3] border border-[#0B3024]">
                  Steam • Fried • Chilli
                </span>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="font-heading text-xl font-bold text-[#F5F2EC]">
                  Artisanal Momos
                </h3>
                <p className="text-xs text-[#A89A8C] leading-relaxed">
                  Steamed hot dumplings, crispy fried momos, and wok-tossed spicy chilli momos served with fiery homemade chutney.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#3A2117]/60">
                  <span className="text-xs font-bold text-[#E8D8C3]">From ₹60.00</span>
                  <a
                    href="#menu"
                    onClick={() => setSelectedCategory('CHINESE')}
                    className="text-xs uppercase tracking-wider font-semibold text-[#E8D8C3] hover:text-white flex items-center gap-1"
                  >
                    <span>View items</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Noodles Feature */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden bg-[#241510] border border-[#3A2117] hover:border-[#0B3024] transition-all group flex flex-col justify-between"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80"
                  alt="Hakka Noodles"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241510] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#050504]/90 text-[#E8D8C3] border border-[#0B3024]">
                  Veg • Hakka • Schezwan
                </span>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="font-heading text-xl font-bold text-[#F5F2EC]">
                  Wok-Tossed Noodles
                </h3>
                <p className="text-xs text-[#A89A8C] leading-relaxed">
                  Stir-fried noodles with crunchy bell peppers, shredded cabbage, spring onions, and sizzling schezwan seasonings.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#3A2117]/60">
                  <span className="text-xs font-bold text-[#E8D8C3]">From ₹70.00</span>
                  <a
                    href="#menu"
                    onClick={() => setSelectedCategory('NOODLES')}
                    className="text-xs uppercase tracking-wider font-semibold text-[#E8D8C3] hover:text-white flex items-center gap-1"
                  >
                    <span>View items</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Chilli Paneer & Starters Feature */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden bg-[#241510] border border-[#3A2117] hover:border-[#0B3024] transition-all group flex flex-col justify-between"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80"
                  alt="Chilli Paneer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241510] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#050504]/90 text-[#E8D8C3] border border-[#0B3024]">
                  Chilli Paneer • Manchurian
                </span>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="font-heading text-xl font-bold text-[#F5F2EC]">
                  Paneer & Crispy Appetizers
                </h3>
                <p className="text-xs text-[#A89A8C] leading-relaxed">
                  Dry and gravy Chilli Paneer, Honey Chilli Potato, crunchy Spring Rolls, and savoury Veg Manchurian.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#3A2117]/60">
                  <span className="text-xs font-bold text-[#E8D8C3]">From ₹80.00</span>
                  <a
                    href="#menu"
                    onClick={() => setSelectedCategory('CHINESE')}
                    className="text-xs uppercase tracking-wider font-semibold text-[#E8D8C3] hover:text-white flex items-center gap-1"
                  >
                    <span>View items</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. SHAKES & MOCKTAILS EXPERIENCE */}
      <section id="drinks" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#050504] relative border-b border-[#241510]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Artisanal Shakes & Coolers Photography */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-lg rounded-2xl overflow-hidden bg-[#241510] border border-[#3A2117] shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80"
                  alt="Refreshing Mocktails and Milkshakes"
                  className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050504] via-[#050504]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#050504]/90 border border-[#3A2117] backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8D8C3]">
                      Ice Cold & Refreshing
                    </span>
                    <h4 className="font-heading text-base font-bold text-[#F5F2EC]">
                      Thick Shakes & Sparkling Mojitos
                    </h4>
                  </div>
                  <a
                    href="#menu"
                    onClick={() => setSelectedCategory('SHAKE')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    View Menu
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: Drinks Description & Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="space-y-2.5">
                <span className="text-xs uppercase tracking-widest text-[#E8D8C3] font-bold">
                  Thick Shakes & Sparkling Coolers
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F2EC]">
                  Pure Refreshment in Every Glass.
                </h2>
                <p className="text-xs sm:text-sm text-[#A89A8C] leading-relaxed">
                  Rich, indulgent milkshakes blended with fresh banana, mango, chocolate, Oreo, and royal paan essence. Paired with sparkling Mint Mojito, Watermelon, Blue Legoon, Bubblegum, and spiced Chilli Guava mocktails.
                </p>
              </div>

              {/* Quick highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#241510]/60 border border-[#3A2117]">
                  <h4 className="font-heading text-sm font-bold text-[#E8D8C3]">Shakes Selection</h4>
                  <p className="text-[11px] text-[#A89A8C] mt-1">
                    Banana, Vanilla, Mango, Chocolate, Oreo, Paan, Green Apple
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#241510]/60 border border-[#3A2117]">
                  <h4 className="font-heading text-sm font-bold text-[#E8D8C3]">Mocktails Selection</h4>
                  <p className="text-[11px] text-[#A89A8C] mt-1">
                    Fresh Lemonade, Mint Mojito, Virgin Mojito, Watermelon, Blue Legoon, Bubblegum, Chilli Guava
                  </p>
                </div>
              </div>

              <div className="pt-1 flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href="#menu"
                  onClick={() => setSelectedCategory('SHAKE')}
                  className="px-5 py-2.5 rounded-lg bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] text-xs font-bold uppercase tracking-wider transition-colors border border-[#123F2E] cursor-pointer"
                >
                  Explore Shakes
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href="#menu"
                  onClick={() => setSelectedCategory('MOCKTAILS')}
                  className="px-5 py-2.5 rounded-lg bg-[#241510] hover:bg-[#3A2117] text-[#E8D8C3] text-xs font-bold uppercase tracking-wider transition-colors border border-[#3A2117] cursor-pointer"
                >
                  Explore Mocktails
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE US */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#050504] relative border-b border-[#241510]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto mb-8 space-y-2"
          >
            <span className="text-xs uppercase tracking-widest text-[#E8D8C3] font-bold">
              The Café Experience
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F2EC]">
              Why You’ll Love Visiting
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#241510] to-[#050504] border border-[#3A2117] space-y-3 hover:border-[#0B3024] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B3024] border border-[#123F2E] flex items-center justify-center text-[#E8D8C3]">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#F5F2EC]">
                CHAI & COFFEE
              </h3>
              <p className="text-xs text-[#A89A8C] leading-relaxed">
                Authentic slow-simmered special spiced tea and freshly brewed espresso, butter coffee, and iced specialties.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#241510] to-[#050504] border border-[#3A2117] space-y-3 hover:border-[#0B3024] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B3024] border border-[#123F2E] flex items-center justify-center text-[#E8D8C3]">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#F5F2EC]">
                CHINESE FAVOURITES
              </h3>
              <p className="text-xs text-[#A89A8C] leading-relaxed">
                Freshly tossed hakka noodles, steamed & chilli momos, crispy honey chilli potato, and savoury chilli paneer.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#241510] to-[#050504] border border-[#3A2117] space-y-3 hover:border-[#0B3024] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B3024] border border-[#123F2E] flex items-center justify-center text-[#E8D8C3]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#F5F2EC]">
                SHAKES & MOCKTAILS
              </h3>
              <p className="text-xs text-[#A89A8C] leading-relaxed">
                Luscious thick milkshakes and fizzy refreshing mocktails like Mint Mojito, Blue Legoon, and Chilli Guava.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -6 }}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#241510] to-[#050504] border border-[#3A2117] space-y-3 hover:border-[#0B3024] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B3024] border border-[#123F2E] flex items-center justify-center text-[#E8D8C3]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#F5F2EC]">
                VARIETY FOR EVERY MOOD
              </h3>
              <p className="text-xs text-[#A89A8C] leading-relaxed">
                36 distinct handcrafted items crafted with honest pricing from ₹15.20 to ₹140.00 in a warm ambient space.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. MAIN INTERACTIVE MENU */}
      <section id="menu" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#050504] relative">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Menu Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto space-y-2"
          >
            <span className="text-xs uppercase tracking-widest text-[#E8D8C3] font-bold">
              Complete Interactive Menu
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F2EC]">
              Discover Our Menu
            </h2>
            <p className="text-xs sm:text-sm text-[#A89A8C] leading-relaxed">
              Explore all 36 items. Filter by category, search your favourites, and add directly to your order.
            </p>
          </motion.div>

          {/* Search Bar & Category Filter Bar */}
          <div className="space-y-6">
            {/* Search Input Box */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89A8C]" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chai, coffee, momos, noodles, shakes..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#241510] border border-[#3A2117] focus:border-[#0B3024] focus:ring-1 focus:ring-[#0B3024] text-[#F5F2EC] placeholder-[#A89A8C] text-sm outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#A89A8C] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    id={`menu-filter-btn-${cat.toLowerCase()}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#0B3024] text-[#E8D8C3] border border-[#123F2E] shadow-lg shadow-[#0B3024]/40 scale-105'
                        : 'bg-[#241510]/80 text-[#F5F2EC]/80 border border-[#3A2117] hover:border-[#0B3024] hover:bg-[#241510]'
                    }`}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Status & Count */}
          <div className="flex items-center justify-between text-xs text-[#A89A8C] border-b border-[#241510] pb-3">
            <span>
              Showing {filteredMenuItems.length} {filteredMenuItems.length === 1 ? 'product' : 'products'}
              {selectedCategory !== 'ALL' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {totalCartCount > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-[#E8D8C3] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#0B3024]" />
                <span>{totalCartCount} in cart (View)</span>
              </button>
            )}
          </div>

          {/* Product Cards Grid */}
          {filteredMenuItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center space-y-4"
            >
              <p className="text-[#A89A8C] text-sm">
                No menu items found matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="px-4 py-2 rounded-lg bg-[#0B3024] text-[#E8D8C3] text-xs font-semibold cursor-pointer"
              >
                Reset Search Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredMenuItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    quantityInCart={getItemQuantity(item.id)}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* 10. FOOD GALLERY & LIGHTBOX */}
      <GalleryLightbox />

      {/* 11. LOCATION SECTION */}
      <LocationSection />

      {/* 12. FOOTER */}
      <Footer />

      {/* 13. SHOPPING CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 14. FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp
        onOpenCart={() => setIsCartOpen(true)}
        hasItemsInCart={cart.length > 0}
      />
    </div>
  );
}

