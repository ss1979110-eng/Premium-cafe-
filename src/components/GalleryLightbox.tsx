import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data/menu';

export const GalleryLightbox: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleOpen = (idx: number) => setSelectedIdx(idx);
  const handleClose = () => setSelectedIdx(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050504] relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-chai-glow pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs uppercase tracking-widest text-[#A89A8C] font-semibold">
            Visual Ambiance & Culinary Craft
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F2EC]">
            A Feast for the Senses
          </h2>
          <p className="text-sm text-[#A89A8C] leading-relaxed">
            From steaming kulhad chai and frothy espresso to sizzling Indo-Chinese delights and vibrant mocktails.
          </p>
        </motion.div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[240px]">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              id={`gallery-item-${idx}`}
              onClick={() => handleOpen(idx)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-xl bg-[#241510] border border-[#3A2117]/60 cursor-pointer ${item.span} transition-colors duration-300 hover:border-[#0B3024] hover:shadow-[0_12px_32px_rgba(11,48,36,0.4)]`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
              />

              {/* Dark Green Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050504] via-[#0B3024]/40 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Information & Expand Icon */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none">
                <div className="self-end">
                  <div className="w-8 h-8 rounded-full bg-[#050504]/70 border border-[#0B3024] backdrop-blur-md flex items-center justify-center text-[#E8D8C3] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8D8C3] bg-[#0B3024]/80 px-2 py-0.5 rounded border border-[#123F2E] inline-block mb-1.5 backdrop-blur-sm">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-[#F5F2EC] group-hover:text-[#E8D8C3] transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            id="gallery-lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              id="lightbox-close-btn"
              onClick={handleClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-[#241510] border border-[#3A2117] text-[#E8D8C3] hover:text-white hover:bg-[#3A2117] transition-colors z-50 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation Prev */}
            <motion.button
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
              id="lightbox-prev-btn"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#241510]/80 hover:bg-[#3A2117] border border-[#3A2117] text-[#E8D8C3] transition-colors z-50 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Navigation Next */}
            <motion.button
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
              id="lightbox-next-btn"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#241510]/80 hover:bg-[#3A2117] border border-[#3A2117] text-[#E8D8C3] transition-colors z-50 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Main Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[85vh] bg-[#241510] border border-[#0B3024] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="relative flex-1 bg-[#050504] overflow-hidden flex items-center justify-center max-h-[70vh]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedIdx}
                    src={GALLERY_ITEMS[selectedIdx].image}
                    alt={GALLERY_ITEMS[selectedIdx].title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-contain max-h-[68vh]"
                  />
                </AnimatePresence>
              </div>

              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#241510] to-[#050504] border-t border-[#3A2117] flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#A89A8C] font-semibold">
                    {GALLERY_ITEMS[selectedIdx].category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#F5F2EC]">
                    {GALLERY_ITEMS[selectedIdx].title}
                  </h3>
                </div>

                <a
                  href="#menu"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-lg bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] text-xs font-semibold uppercase tracking-wider transition-colors border border-[#123F2E]"
                >
                  Order from Menu
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

