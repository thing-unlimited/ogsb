import React from 'react';
import { BUFFET_PRICING, RESTAURANT_INFO } from '../data/restaurantData';
import { Clock, CheckCircle2, Calendar, Phone, Sparkles, Users } from 'lucide-react';

interface PricingSectionProps {
  onOpenReservation: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="pricing" className="py-20 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400">
            <span>Virginia Beach All-You-Can-Eat</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Freshness</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Transparent Buffet Pricing & Dining Hours
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every buffet ticket includes unlimited trips to all active hot bars, cold sushi counter, carving stations, salad bar, carved fruits, and dessert fountain.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {BUFFET_PRICING.map((tier, idx) => {
            const isFeatured = idx === 2; // Weekend Extravaganza
            return (
              <div
                key={tier.tier}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-200 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-cyan-500/60 shadow-xl shadow-cyan-950/20'
                    : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'
                } p-6 sm:p-7`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs uppercase tracking-wider py-1 px-4 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Most Popular Weekend Feast</span>
                  </div>
                )}

                <div>
                  {/* Tier Title & Days */}
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold text-white">
                      {tier.tier}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{tier.days}</p>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{tier.hours}</span>
                  </div>

                  {/* Price Block */}
                  <div className="mt-5 pb-5 border-b border-slate-800">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-display tabular-nums">
                        ${tier.adultPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ adult</span>
                    </div>

                    {/* Kids & Senior Rates */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 text-[11px] text-slate-400 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
                      <div>
                        <span className="text-slate-300 font-semibold">Kids (3–6):</span> ${tier.kidsPrice3to6.toFixed(2)}
                      </div>
                      <div>
                        <span className="text-slate-300 font-semibold">Kids (7–10):</span> ${tier.kidsPrice7to10.toFixed(2)}
                      </div>
                      <div className="col-span-2 text-cyan-300/90 font-medium">
                        Seniors 65+: {tier.seniorDiscount}
                      </div>
                    </div>
                  </div>

                  {/* Station Highlights */}
                  <div className="mt-5 space-y-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Buffet Highlights:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {tier.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-7 pt-4">
                  <button
                    onClick={onOpenReservation}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                      isFeatured
                        ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve For {tier.tier.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operating Hours & Policy Footnote */}
        <div className="mt-12 bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-cyan-950/80 border border-cyan-800/60 rounded-lg shrink-0">
              <Clock className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Daily Operating Schedule</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {RESTAURANT_INFO.hours.map((h) => `${h.days}: ${h.open} – ${h.close}`).join('  |  ')}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Last seating is 45 minutes prior to closing time. Walk-ins always warmly welcome!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call For Large Parties</span>
            </a>
            <button
              onClick={onOpenReservation}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
