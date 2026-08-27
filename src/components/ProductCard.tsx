import React, { useState, useRef } from 'react';
import { Plus, Check, ShoppingBag, Minus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';

interface ProductCardProps {
  item: MenuItem;
  quantityInCart: number;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });

    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos({ x: 0.5, y: 0.5 });
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      id={`product-card-${item.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 900,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 24,
        mass: 0.8,
      }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-xl bg-gradient-to-b from-[#241510]/85 via-[#0c0806] to-[#050504] border flex flex-col justify-between overflow-hidden transition-colors duration-300 ${
        isHovered
          ? 'border-[#0B3024] shadow-[0_16px_36px_-8px_rgba(11,48,36,0.6)]'
          : 'border-[#3A2117]/60 shadow-[0_8px_24px_rgba(0,0,0,0.6)]'
      }`}
    >
      {/* Specular Light Reflection on 3D hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(232,216,195,0.4), transparent 80%)`,
          }}
        />
      )}

      {/* Top Image Container */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-[#050504]">
        <motion.img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover object-center"
          animate={{
            scale: isHovered ? 1.08 : 1,
            filter: isHovered ? 'brightness(1.06)' : 'brightness(0.98)',
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Ambient Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050504] via-transparent to-black/40 pointer-events-none" />

        {/* Category & Special Tags */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#050504]/80 text-[#E8D8C3] border border-[#3A2117] backdrop-blur-md shadow-sm">
            {item.category}
          </span>
          {item.featured && (
            <motion.span
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#0B3024]/90 text-[#E8D8C3] border border-[#123F2E] backdrop-blur-md shadow-sm flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#E8D8C3]" />
              <span>Special</span>
            </motion.span>
          )}
        </div>

        {/* Price Badge with Floating Glow */}
        <motion.div
          animate={{ scale: isHovered ? 1.04 : 1 }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#050504]/90 border border-[#0B3024] backdrop-blur-md flex items-center gap-1 shadow-lg z-10"
        >
          <span className="text-xs text-[#A89A8C]">₹</span>
          <span className="font-heading text-base font-bold text-[#E8D8C3]">
            {item.price.toFixed(2)}
          </span>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              id={`product-name-${item.id}`}
              className="font-heading text-lg font-bold text-[#F5F2EC] group-hover:text-[#E8D8C3] transition-colors leading-snug"
            >
              {item.name}
            </h3>
          </div>

          {item.description && (
            <p className="text-xs text-[#A89A8C] leading-relaxed line-clamp-2 mb-4 font-normal">
              {item.description}
            </p>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded bg-[#241510] text-[#A89A8C] border border-[#3A2117]/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-[#241510] flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-wider uppercase text-[#A89A8C]">Price</span>
            <span className="font-heading text-lg font-bold text-[#E8D8C3]">
              ₹{item.price.toFixed(2)}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {quantityInCart > 0 ? (
              <motion.div
                key="qty-controls"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                id={`product-qty-controls-${item.id}`}
                className="flex items-center gap-2 bg-[#0B3024] border border-[#123F2E] rounded-lg p-1 shadow-md shadow-[#0B3024]/40"
              >
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  id={`product-qty-decrease-${item.id}`}
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-7 h-7 rounded-md bg-[#050504]/60 hover:bg-[#050504] text-[#E8D8C3] flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </motion.button>
                <motion.span
                  key={quantityInCart}
                  initial={{ scale: 1.3, color: '#FFFFFF' }}
                  animate={{ scale: 1, color: '#E8D8C3' }}
                  className="text-xs font-bold px-1 min-w-[18px] text-center"
                >
                  {quantityInCart}
                </motion.span>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  id={`product-qty-increase-${item.id}`}
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-7 h-7 rounded-md bg-[#123F2E] hover:bg-[#18533d] text-[#E8D8C3] flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                key="add-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                id={`product-add-btn-${item.id}`}
                onClick={() => onAddToCart(item)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] border border-[#123F2E] hover:border-[#E8D8C3]/50 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#0B3024]/20 group-hover:shadow-[0_0_16px_rgba(11,48,36,0.6)] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

