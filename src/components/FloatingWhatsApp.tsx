import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data/menu';

interface FloatingWhatsAppProps {
  onOpenCart: () => void;
  hasItemsInCart: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenCart, hasItemsInCart }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (hasItemsInCart) {
      onOpenCart();
    } else {
      const msg = encodeURIComponent("Hello, I would like to place an order with Café Jaipur.");
      window.open(`https://wa.me/91${BUSINESS_INFO.phoneRaw}?text=${msg}`, '_blank');
    }
  };

  return (
    <motion.div
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            id="floating-whatsapp-tooltip"
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="px-3 py-1.5 rounded-lg bg-[#241510] text-[#E8D8C3] text-xs font-semibold border border-[#0B3024] shadow-xl pointer-events-none hidden sm:block backdrop-blur-md"
          >
            {hasItemsInCart ? 'Review Order & WhatsApp' : 'Order on WhatsApp'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        id="floating-whatsapp-btn"
        onClick={handleClick}
        aria-label="Order on WhatsApp"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.12, rotate: [0, -4, 4, 0] }}
        whileTap={{ scale: 0.92 }}
        className="relative group p-4 rounded-full bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] border border-[#123F2E] hover:border-[#E8D8C3]/50 shadow-[0_8px_28px_rgba(11,48,36,0.7)] hover:shadow-[0_12px_36px_rgba(18,63,46,0.9)] transition-colors focus:outline-none cursor-pointer"
      >
        <MessageCircle className="w-6 h-6 fill-current stroke-none" />

        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#0B3024]/40 animate-ping pointer-events-none" />
      </motion.button>
    </motion.div>
  );
};

