import React from 'react';
import { MapPin, Phone, MessageSquare, Navigation, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/menu';

export const LocationSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050504] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Factual Location & Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-gradient-to-b from-[#241510] to-[#050504] p-8 sm:p-10 rounded-2xl border border-[#3A2117]"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#A89A8C] font-semibold flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0B3024]" />
                Jaipur Destination
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F2EC]">
                Visit Us in Jaipur
              </h2>
              <p className="text-sm text-[#A89A8C] leading-relaxed">
                Conveniently situated near SS Jain Subodh Girls College on Airport Road, offering authentic hot sips and freshly tossed delights.
              </p>
            </div>

            {/* Address Card */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#050504]/60 border border-[#3A2117]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0B3024] border border-[#123F2E] flex items-center justify-center text-[#E8D8C3] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#E8D8C3] font-semibold mb-1">
                    Exact Location
                  </h4>
                  <p className="text-sm text-[#F5F2EC] leading-relaxed">
                    {BUSINESS_INFO.location}
                  </p>
                </div>
              </motion.div>

              {/* Phone / WhatsApp Card */}
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#050504]/60 border border-[#3A2117]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#241510] border border-[#3A2117] flex items-center justify-center text-[#E8D8C3] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#E8D8C3] font-semibold mb-1">
                    Direct Contact & WhatsApp
                  </h4>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-lg font-heading font-bold text-[#F5F2EC] hover:text-[#E8D8C3] transition-colors block"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="location-get-directions-btn"
                href={BUSINESS_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] border border-[#123F2E] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#0B3024]/30 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="location-whatsapp-btn"
                href={`https://wa.me/91${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello, I would like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#241510] hover:bg-[#3A2117] text-[#E8D8C3] border border-[#3A2117] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#E8D8C3]" />
                <span>WhatsApp Us</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: High-End Map Card & Landmarks */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden border border-[#3A2117] bg-[#241510]/50 relative min-h-[380px] sm:min-h-[440px]"
          >
            {/* Map Frame / Visual Preview */}
            <div className="relative flex-1 w-full h-full min-h-[300px] bg-[#050504] overflow-hidden">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14238.455648834927!2d75.7950!3d26.8390!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db60a880fffff%3A0x8e8334460f15c7e!2sSS%20Jain%20Subodh%20Girls%20College!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale invert opacity-75 hover:opacity-90 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Pin Overlay Badge */}
              <div className="absolute top-5 left-5 p-4 rounded-xl bg-[#050504]/90 border border-[#0B3024] backdrop-blur-md max-w-xs shadow-2xl">
                <div className="flex items-center gap-2 text-[#E8D8C3] mb-1">
                  <MapPin className="w-4 h-4 text-[#0B3024]" />
                  <span className="text-xs font-bold tracking-wider uppercase">Café Landmark</span>
                </div>
                <p className="text-xs text-[#F5F2EC] font-medium leading-snug">
                  Near SS Jain Subodh Girls College, Airport Rd, Jaipur
                </p>
              </div>
            </div>

            {/* Quick Landmarks Ribbon */}
            <div className="p-4 bg-[#050504] border-t border-[#3A2117] grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="p-2 rounded bg-[#241510]/60 border border-[#3A2117]/50">
                <span className="text-[10px] text-[#A89A8C] uppercase block">Landmark</span>
                <span className="text-xs font-semibold text-[#F5F2EC]">SS Jain Subodh College</span>
              </div>
              <div className="p-2 rounded bg-[#241510]/60 border border-[#3A2117]/50">
                <span className="text-[10px] text-[#A89A8C] uppercase block">Road</span>
                <span className="text-xs font-semibold text-[#F5F2EC]">Airport Road</span>
              </div>
              <div className="p-2 rounded bg-[#241510]/60 border border-[#3A2117]/50 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#A89A8C] uppercase block">Area</span>
                <span className="text-xs font-semibold text-[#F5F2EC]">Prabhudayal Marg</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

