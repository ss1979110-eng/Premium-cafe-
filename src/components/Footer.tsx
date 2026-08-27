import React from 'react';
import { Coffee, Phone, MapPin, MessageSquare, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menu';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuLinks = [
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
    <footer className="bg-[#050504] relative border-t-2 border-[#0B3024]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#123F2E] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#241510]">
          {/* Col 1: Brand / Concept */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#241510] border border-[#0B3024] flex items-center justify-center text-[#E8D8C3]">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-wider text-[#F5F2EC]">
                CAFÉ JAIPUR
              </span>
            </div>

            <p className="text-xs uppercase tracking-widest text-[#E8D8C3] font-semibold">
              Chai • Coffee • Chinese • Shakes • Mocktails
            </p>

            <p className="text-xs text-[#A89A8C] leading-relaxed max-w-sm">
              An interactive café experience celebrating authentic spiced chai, artisanal coffees, sizzling Indo-Chinese dishes, luscious shakes, and refreshing mocktails.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/91${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello, I would like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B3024] hover:bg-[#123F2E] text-[#E8D8C3] border border-[#123F2E] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Order: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation / Menu */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#E8D8C3] font-bold border-b border-[#3A2117] pb-2">
              MENU
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {menuLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-[#A89A8C] hover:text-[#E8D8C3] transition-colors py-1 block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#E8D8C3] font-bold border-b border-[#3A2117] pb-2">
              CONTACT & LOCATION
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 text-[#A89A8C]">
                <Phone className="w-4 h-4 text-[#0B3024] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#E8D8C3] font-medium block">CONTACT</span>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="hover:text-white transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#A89A8C]">
                <MapPin className="w-4 h-4 text-[#0B3024] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#E8D8C3] font-medium block">LOCATION</span>
                  <p className="leading-relaxed text-[#F5F2EC]">
                    {BUSINESS_INFO.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89A8C]">
          <p>
            © {new Date().getFullYear()} Café Jaipur. Behind The Coronation, Airport Rd, Jaipur.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#E8D8C3] hover:text-white transition-colors p-2 rounded bg-[#241510] border border-[#3A2117]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
