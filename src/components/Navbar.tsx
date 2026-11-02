import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, Calendar, Menu as MenuIcon, X, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if open now based on VA Beach local time
    const now = new Date();
    const day = now.getDay(); // 0 is Sun, 5 is Fri, 6 is Sat
    const currentHour = now.getHours();
    const isWeekend = day === 0 || day === 5 || day === 6;
    const closingHour = isWeekend ? 22 : 21;
    setIsOpenNow(currentHour >= 11 && currentHour < closingHour);
  }, []);

  const navLinks = [
    { label: 'Buffet Menu', href: '#menu' },
    { label: 'HD Gallery', href: '#gallery' },
    { label: 'Pricing & Hours', href: '#pricing' },
    { label: 'Reservations', href: '#reservations' },
    { label: 'Ocean Club', href: '#rewards' },
    { label: 'Guest Reviews', href: '#reviews' },
    { label: 'Map & Contact', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl'
          : 'bg-slate-950/60 backdrop-blur-sm border-b border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav links) - Zone 3 (1 Primary Action) */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Minimalist Wave/Fish Logo */}
          <a
            href="#"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <Logo size="md" />
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Quick Call shortcut */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              title="Call restaurant directly"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="tabular-nums">{RESTAURANT_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenReservation}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-lg shadow-sm hover:shadow-cyan-500/20 transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenReservation}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-md"
            >
              Book Table
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-6 py-5 mt-3 space-y-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs text-slate-400 pb-2 border-b border-slate-900">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {isOpenNow ? 'Open Now · Closes at 9:00 PM' : 'Opens Today at 11:00 AM'}
            </span>
          </div>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-cyan-400 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              Call {RESTAURANT_INFO.phone}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-lg shadow-sm"
            >
              Reserve Table Online
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
