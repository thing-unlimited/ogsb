import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DigitalMenuSection } from './components/DigitalMenuSection';
import { PricingSection } from './components/PricingSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { ReservationSection } from './components/ReservationSection';
import { LoyaltyRewardsSection } from './components/LoyaltyRewardsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationMapSection } from './components/LocationMapSection';
import { Footer } from './components/Footer';
import { X, Calendar, CheckCircle2, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);
  const [quickPartySize, setQuickPartySize] = useState(4);
  const [quickTime, setQuickTime] = useState('6:30 PM');
  const [quickDate, setQuickDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSuccess, setQuickSuccess] = useState<string | null>(null);

  const handleOpenReservation = () => {
    // Scroll directly to the reservation section or open modal
    const section = document.getElementById('reservations');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsQuickBookingOpen(true);
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    const randomCode = `OG-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuickSuccess(randomCode);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenReservation={handleOpenReservation}
        activeSection="hero"
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Authentic Photos & Verified Location */}
        <HeroSection
          onOpenReservation={handleOpenReservation}
        />

        {/* 2. Digital Buffet Menu & Custom Plate Planner */}
        <DigitalMenuSection
          onOpenReservation={handleOpenReservation}
        />

        {/* 3. Ultra-HD Photo Gallery & High-Res Preservation */}
        <PhotoGallerySection
          onOpenReservation={handleOpenReservation}
        />

        {/* 4. Transparent Buffet Pricing & Operating Hours */}
        <PricingSection
          onOpenReservation={handleOpenReservation}
        />

        {/* 5. Real-Time Table Reservations & Lookup Engine */}
        <ReservationSection />

        {/* 5. Ocean Club Loyalty Rewards & Digital Card */}
        <LoyaltyRewardsSection />

        {/* 6. Best Reviews & Guest Diner Testimonials */}
        <ReviewsSection />

        {/* 7. Verified Address, Phone & Interactive Location Maps */}
        <LocationMapSection />
      </main>

      {/* Footer */}
      <Footer onOpenReservation={handleOpenReservation} />

      {/* Quick Booking Modal if triggered */}
      {isQuickBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-lg text-white">
                  Fast Table Reservation
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsQuickBookingOpen(false);
                  setQuickSuccess(null);
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {quickSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-800">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  Reservation Confirmed!
                </h4>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-cyan-400 font-bold text-lg">
                  {quickSuccess}
                </div>
                <p className="text-xs text-slate-300">
                  {quickPartySize} guests on {quickDate} at {quickTime}.
                </p>
                <p className="text-[11px] text-slate-400">
                  3877 Holland Rd, Suite 416, Virginia Beach, VA
                </p>
                <button
                  onClick={() => {
                    setIsQuickBookingOpen(false);
                    setQuickSuccess(null);
                  }}
                  className="w-full py-2 bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg mt-2 cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Party Size
                    </label>
                    <select
                      value={quickPartySize}
                      onChange={(e) => setQuickPartySize(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15].map((n) => (
                        <option key={n} value={n}>
                          {n} Guests
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Time Slot
                    </label>
                    <select
                      value={quickTime}
                      onChange={(e) => setQuickTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white"
                    >
                      {['12:00 PM', '1:00 PM', '5:30 PM', '6:30 PM', '7:30 PM', '8:15 PM'].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={quickDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    placeholder="(757) 000-0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-semibold text-xs rounded-lg cursor-pointer"
                  >
                    Confirm Table Reservation
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsQuickBookingOpen(false)}
                    className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
