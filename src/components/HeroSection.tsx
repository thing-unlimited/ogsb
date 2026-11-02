import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Calendar, Utensils, Star, MapPin, Award, ChevronRight, Phone } from 'lucide-react';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onSelectMenuTab?: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Location & Status Metadata (Anti-Slop Zero-Pill) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>3877 Holland Rd, Suite 416</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>Virginia Beach, VA</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Open 7 Days from 11:00 AM</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.12] text-balance">
              The Coastal Feast of Virginia Beach. Fresh Seafood, Sushi & Live Grill.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Indulge in over 150+ daily culinary creations featuring fresh steamed Chesapeake blue crabs, Alaskan snow crab legs, shucked oysters, master hand-rolled sushi, and flaming teppanyaki hibachi cooked right before your eyes.
            </p>

            {/* Interactive Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenReservation}
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-lg shadow-lg shadow-cyan-950/40 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Reserve a Table</span>
                <ChevronRight className="w-4 h-4 text-slate-950 transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href="#menu"
                className="px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-2"
              >
                <Utensils className="w-4 h-4 text-cyan-400" />
                <span>Explore Buffet Menu</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="tabular-nums">{RESTAURANT_INFO.phone}</span>
              </a>
            </div>

            {/* Quantitative Proof Strip */}
            <div className="pt-6 border-t border-slate-900 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300">
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-lg font-display tabular-nums">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.95 / 5.0</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">1,280+ Guest Reviews</div>
              </div>

              <div>
                <div className="text-white font-bold text-lg font-display tabular-nums">
                  150+ Daily
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Buffet Stations & Rolls</div>
              </div>

              <div>
                <div className="text-white font-bold text-lg font-display tabular-nums">
                  Fresh Catch
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Blue Crabs & Snow Legs</div>
              </div>

              <div>
                <div className="text-white font-bold text-lg font-display tabular-nums">
                  $18.99+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">All-You-Can-Eat Lunch</div>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Restaurant Photography Bento (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            {/* Card 1: Real Storefront */}
            <div className="col-span-2 relative rounded-xl overflow-hidden border border-slate-800/80 group aspect-[16/9] bg-slate-900">
              <img
                src={RESTAURANT_INFO.photos.storefront}
                alt="Ocean Grill & Seafood Buffet Virginia Beach Storefront"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <div>
                  <p className="font-semibold text-white drop-shadow">Welcome to Ocean Grill</p>
                  <p className="text-[11px] text-slate-300">3877 Holland Rd, Suite 416</p>
                </div>
                <span className="text-[11px] font-medium text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                  Now Open Daily
                </span>
              </div>
            </div>

            {/* Card 2: Steamed Crabs */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800/80 group aspect-[4/3] bg-slate-900">
              <img
                src={RESTAURANT_INFO.photos.crabs}
                alt="Fresh Steamed Chesapeake Blue Crabs"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 text-xs">
                <p className="font-medium text-white drop-shadow">Steamed Blue Crabs</p>
                <p className="text-[10px] text-cyan-300">Steamed with Old Bay</p>
              </div>
            </div>

            {/* Card 3: Artisan Sushi Rolls */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800/80 group aspect-[4/3] bg-slate-900">
              <img
                src={RESTAURANT_INFO.photos.sushi}
                alt="Ocean Volcano Tobiko Sushi Roll"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 text-xs">
                <p className="font-medium text-white drop-shadow">Artisan Tobiko Sushi</p>
                <p className="text-[10px] text-cyan-300">Hand-Rolled Daily</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
