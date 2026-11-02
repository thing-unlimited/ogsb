import React from 'react';
import { Logo } from './Logo';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Clock, ArrowUp, Heart } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Virginia Beach's premier all-you-can-eat seafood, sushi bar, and live Mongolian hibachi buffet. Serving fresh local steamed blue crabs and premium oceanic specialties daily.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 rounded-lg text-xs font-semibold transition-colors"
              >
                Reserve Your Table
              </button>
            </div>
          </div>

          {/* Col 2: Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Restaurant Location
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{RESTAURANT_INFO.address.street}</p>
                  <p>{RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} {RESTAURANT_INFO.address.zip}</p>
                  <p className="text-slate-400">{RESTAURANT_INFO.address.shoppingCenter}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="text-white hover:text-cyan-400 transition-colors font-mono font-medium"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Buffet Hours */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Dining Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <p className="text-white font-medium">Monday – Thursday</p>
                <p className="text-slate-400">11:00 AM – 9:00 PM</p>
              </div>
              <div>
                <p className="text-white font-medium">Friday – Sunday</p>
                <p className="text-cyan-300 font-medium">11:00 AM – 10:00 PM</p>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Lunch ends at 3:30 PM Mon–Fri. Dinner buffet & weekend feast prices apply thereafter.
              </p>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Legal */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-cyan-400 transition-colors">
                  Digital Buffet Stations & Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cyan-400 transition-colors">
                  Ultra-HD Photo Gallery & Downloads
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-400 transition-colors">
                  Pricing & Senior Discounts
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-cyan-400 transition-colors">
                  Table Reservations & Waitlist
                </a>
              </li>
              <li>
                <a href="#rewards" className="hover:text-cyan-400 transition-colors">
                  Ocean Club Rewards (+100 Pts)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-cyan-400 transition-colors">
                  Diner Reviews & Ratings
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-cyan-400 transition-colors">
                  Location & Driving Map
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Ocean Grill & Seafood Buffet. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Virginia Beach, VA</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
