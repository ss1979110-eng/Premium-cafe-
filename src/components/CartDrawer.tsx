import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { BUSINESS_INFO } from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const generateWhatsAppUrl = () => {
    if (items.length === 0) {
      const defaultMsg = encodeURIComponent("Hello, I would like to place an order with Café Jaipur.");
      return `https://wa.me/91${BUSINESS_INFO.phoneRaw}?text=${defaultMsg}`;
    }

    let message = `*☕ NEW ORDER - CAFÉ JAIPUR*\n`;
    message += `────────────────────────────\n`;
    items.forEach((cartItem, index) => {
      const lineTotal = (cartItem.item.price * cartItem.quantity).toFixed(2);
      message += `${index + 1}. *${cartItem.item.name}* x${cartItem.quantity} — ₹${lineTotal}\n`;
    });
    message += `────────────────────────────\n`;
    message += `*Total Amount:* ₹${subtotal.toFixed(2)}\n`;
    message += `*Total Items:* ${totalItemsCount}\n\n`;
    message += `*Delivery / Pickup Location:* ${BUSINESS_INFO.location}\n`;
    message += `\nHello, I would like to place this order with Café Jaipur. Please confirm preparation time.`;

    return `https://wa.me/91${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppCheckout = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0B3024', '#123F2E', '#E8D8C3', '#3A2117']
      });
    } catch {
      // safe fallback
    }

    const url = generateWhatsAppUrl();
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="cart-drawer-container"
          className="fixed inset-0 z-50 overflow-hidden flex justify-end"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Slide-in Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-gradient-to-b from-[#241510] via-[#080504] to-[#050504] border-l border-[#0B3024] shadow-2xl h-full flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#3A2117] flex items-center justify-between bg-[#050504]/70 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="w-9 h-9 rounded-lg bg-[#0B3024] border border-[#123F2E] flex items-center justify-center text-[#E8D8C3]"
                >
                  <ShoppingBag className="w-5 h-5" />
                </motion.div>
                <div>
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F5F2EC]">Your Order</h2>
                  <p className="text-xs text-[#A89A8C]">
                    {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    id="cart-clear-btn"
                    onClick={onClearCart}
                    className="text-xs text-[#A89A8C] hover:text-red-400 p-1.5 transition-colors"
                    title="Clear Cart"
                  >
                    Clear
                  </button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  id="cart-close-btn"
                  onClick={onClose}
                  className="p-2 rounded-lg bg-[#241510] hover:bg-[#3A2117] text-[#E8D8C3] transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Cart Item List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#241510] border border-[#3A2117] flex items-center justify-center text-[#A89A8C]">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-lg text-[#F5F2EC] font-bold">Your cart is empty</h3>
                    <p className="text-xs text-[#A89A8C] max-w-xs">
                      Discover our hot kadak chai, rich espresso, sizzling momos, shakes, and mocktails.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    id="cart-browse-menu-btn"
                    onClick={onClose}
                    className="mt-2 px-5 py-2.5 rounded-lg bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] text-xs font-semibold uppercase tracking-wider transition-colors border border-[#123F2E] cursor-pointer"
                  >
                    Explore Menu
                  </motion.button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {items.map((cartItem) => (
                    <motion.div
                      key={cartItem.item.id}
                      layout
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 50, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      id={`cart-item-${cartItem.item.id}`}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#241510]/60 border border-[#3A2117]/70 hover:border-[#0B3024] transition-colors"
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-16 h-16 rounded-lg object-cover bg-[#050504] border border-[#3A2117]"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-sm font-bold text-[#F5F2EC] truncate">
                          {cartItem.item.name}
                        </h4>
                        <span className="text-xs text-[#E8D8C3] font-semibold">
                          ₹{cartItem.item.price.toFixed(2)} each
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center bg-[#050504] border border-[#3A2117] rounded-md p-0.5">
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              id={`cart-item-minus-${cartItem.item.id}`}
                              onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#A89A8C] hover:text-[#E8D8C3] hover:bg-[#241510] transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </motion.button>
                            <span className="text-xs font-bold text-[#E8D8C3] px-2 min-w-[20px] text-center">
                              {cartItem.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              id={`cart-item-plus-${cartItem.item.id}`}
                              onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#A89A8C] hover:text-[#E8D8C3] hover:bg-[#241510] transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </motion.button>
                          </div>

                          <button
                            id={`cart-item-delete-${cartItem.item.id}`}
                            onClick={() => onRemoveItem(cartItem.item.id)}
                            className="p-1 text-[#A89A8C] hover:text-red-400 transition-colors ml-auto cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right pl-2">
                        <span className="font-heading text-sm font-bold text-[#E8D8C3]">
                          ₹{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 sm:p-6 border-t border-[#3A2117] bg-[#050504]/95 space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#A89A8C]">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#A89A8C]">
                    <span>Taxes & Café Packaging</span>
                    <span className="text-[#0B3024] font-semibold text-[11px] bg-[#0B3024]/20 px-2 py-0.5 rounded border border-[#0B3024]/40">
                      Included
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-[#241510]">
                    <span className="font-heading text-base font-bold text-[#F5F2EC]">Total</span>
                    <span className="font-heading text-xl font-bold text-[#E8D8C3]">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions: WhatsApp Ordering + Direct Phone */}
                <div className="space-y-2.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    id="cart-whatsapp-order-btn"
                    onClick={handleWhatsAppCheckout}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] border border-[#123F2E] font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-xl shadow-[#0B3024]/40 group cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#E8D8C3] group-hover:translate-x-1 transition-transform" />
                    <span>ORDER ON WHATSAPP</span>
                  </motion.button>

                  <div className="grid grid-cols-2 gap-2">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      id="cart-call-btn"
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#241510] hover:bg-[#3A2117] border border-[#3A2117] text-xs font-semibold text-[#F5F2EC] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#E8D8C3]" />
                      <span>Call {BUSINESS_INFO.phone}</span>
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      id="cart-directions-btn"
                      href={BUSINESS_INFO.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#241510] hover:bg-[#3A2117] border border-[#3A2117] text-xs font-semibold text-[#E8D8C3] transition-colors"
                    >
                      <span>Get Directions</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.a>
                  </div>
                </div>

                <p className="text-[10px] text-center text-[#A89A8C]/80">
                  Instant confirmation directly via WhatsApp on 91193 46060.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

