import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Reservation } from '../types/restaurant';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle2,
  MapPin,
  Sparkles,
  Search,
  Phone,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';

interface ReservationSectionProps {
  initialOpen?: boolean;
}

export const ReservationSection: React.FC<ReservationSectionProps> = () => {
  const [partySize, setPartySize] = useState<number>(4);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('6:30 PM');
  const [seatingZone, setSeatingZone] = useState<Reservation['seatingZone']>('main-hall');
  const [occasion, setOccasion] = useState<string>('Casual Dining');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string[]>(['Crab Crackers & Mallet Kit']);
  const [notes, setNotes] = useState<string>('');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);
  const [lookupCode, setLookupCode] = useState<string>('');
  const [lookupResult, setLookupResult] = useState<Reservation | null>(null);
  const [lookupError, setLookupError] = useState<string>('');
  const [isManaging, setIsManaging] = useState<boolean>(false);

  // Stored reservations in local state
  const [savedReservations, setSavedReservations] = useState<Reservation[]>([
    {
      id: 'res-demo-1',
      confirmationCode: 'OG-4921',
      guestName: 'David Vance',
      guestPhone: '(757) 555-0192',
      guestEmail: 'david.vance@example.com',
      partySize: 4,
      date: new Date().toISOString().split('T')[0],
      timeSlot: '7:00 PM',
      seatingZone: 'sushi-booths',
      occasion: 'Date Night',
      specialRequests: ['Crab Crackers & Mallet Kit'],
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
  ]);

  const availableTimeSlots = [
    { time: '11:30 AM', meal: 'Lunch Buffet', status: 'Available' },
    { time: '12:30 PM', meal: 'Lunch Buffet', status: 'Available' },
    { time: '1:30 PM', meal: 'Lunch Buffet', status: 'Available' },
    { time: '4:30 PM', meal: 'Early Dinner', status: 'Available' },
    { time: '5:30 PM', meal: 'Dinner Buffet', status: 'Popular' },
    { time: '6:30 PM', meal: 'Dinner Buffet', status: 'Filling Fast' },
    { time: '7:15 PM', meal: 'Dinner Buffet', status: 'Prime Feast' },
    { time: '8:00 PM', meal: 'Dinner Buffet', status: 'Available' },
  ];

  const zoneOptions = [
    {
      id: 'main-hall' as const,
      name: 'Main Ocean Dining Hall',
      desc: 'Central location with easiest access to crab stations & hot buffet islands.',
      badge: 'Best for Groups'
    },
    {
      id: 'sushi-booths' as const,
      name: 'Sushi Island Booths',
      desc: 'Intimate upholstered booth seating adjacent to the live sushi master bar.',
      badge: 'Cozy & Romantic'
    },
    {
      id: 'hibachi-side' as const,
      name: 'Hibachi Grill-side',
      desc: 'Sizzling front-row view of our flaming teppan chef performances.',
      badge: 'Interactive Fun'
    },
    {
      id: 'private-banquet' as const,
      name: 'Private Ocean Banquet Room',
      desc: 'Enclosed dining room equipped for celebrations, birthdays & large parties.',
      badge: 'Parties 8+'
    },
  ];

  const requestOptions = [
    'Crab Crackers & Mallet Kit',
    'High Chair / Booster Seat',
    'Wheelchair Accessible Table',
    'Birthday Celebration Surprise',
    'Anniversary Toast Setting',
    'Quiet Window Corner'
  ];

  const toggleRequest = (req: string) => {
    setSpecialRequests(prev =>
      prev.includes(req) ? prev.filter(r => r !== req) : [...prev, req]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newCode = `OG-${randomNum}`;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      confirmationCode: newCode,
      guestName,
      guestPhone,
      guestEmail: guestEmail || `${guestName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      partySize,
      date: selectedDate,
      timeSlot: selectedTime,
      seatingZone,
      occasion,
      specialRequests,
      notes,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setSavedReservations(prev => [newReservation, ...prev]);
    setConfirmedBooking(newReservation);
  };

  const handleLookup = () => {
    setLookupError('');
    const code = lookupCode.trim().toUpperCase();
    const found = savedReservations.find(
      r => r.confirmationCode === code || r.guestPhone.includes(lookupCode.trim())
    );
    if (found) {
      setLookupResult(found);
    } else {
      setLookupError('No active reservation found with this confirmation code or phone number.');
      setLookupResult(null);
    }
  };

  const handleCancelBooking = (code: string) => {
    setSavedReservations(prev =>
      prev.map(r => r.confirmationCode === code ? { ...r, status: 'cancelled' } : r)
    );
    if (lookupResult && lookupResult.confirmationCode === code) {
      setLookupResult({ ...lookupResult, status: 'cancelled' });
    }
    if (confirmedBooking && confirmedBooking.confirmationCode === code) {
      setConfirmedBooking({ ...confirmedBooking, status: 'cancelled' });
    }
  };

  const downloadCalendarFile = (res: Reservation) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ocean Grill Seafood Buffet//Reservations//EN
BEGIN:VEVENT
SUMMARY:Ocean Grill Seafood Buffet Dinner (${res.partySize} Guests)
DESCRIPTION:Table reservation for ${res.guestName} at Ocean Grill & Seafood Buffet.\\nZone: ${res.seatingZone}\\nConfirmation: ${res.confirmationCode}
LOCATION:3877 Holland Rd, Suite 416, Virginia Beach, VA 23452
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ocean-grill-${res.confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reservations" className="py-20 bg-slate-950 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400">
            <span>Instant Confirmation</span>
            <span aria-hidden="true">·</span>
            <span>Zero Booking Fees</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Real-Time Table Reservations
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Reserve your preferred dining zone and table size in real-time. Walk-ins are always welcomed, but reservations guarantee no wait during peak crab feasts.
          </p>

          {/* Live Walk-In & Wait Time Banner */}
          <div className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 py-2 px-4 rounded-xl text-xs text-slate-300 mt-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-emerald-400">Live Status:</span>
            <span>Current walk-in wait is ~5–10 mins · 8 tables open now</span>
          </div>
        </div>

        {/* Tab Switcher: New Reservation vs Lookup Reservation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setIsManaging(false)}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                !isManaging
                  ? 'bg-cyan-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Book New Table
            </button>
            <button
              onClick={() => setIsManaging(true)}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                isManaging
                  ? 'bg-cyan-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Find / Manage Existing Reservation
            </button>
          </div>
        </div>

        {/* Form or Confirmation View */}
        {!isManaging ? (
          confirmedBooking ? (
            /* Booking Confirmation Card */
            <div className="max-w-2xl mx-auto bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-cyan-950 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-800">
                <CheckCircle2 className="w-8 h-8 text-cyan-400" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-2xl font-bold text-white">
                  Table Reservation Confirmed!
                </h3>
                <p className="text-sm text-slate-300">
                  We look forward to hosting you at Ocean Grill & Seafood Buffet.
                </p>
              </div>

              {/* Confirmation Code Banner */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 inline-block w-full text-left">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Reservation Confirmation Code
                </div>
                <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">
                  {confirmedBooking.confirmationCode}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-left text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-slate-400">Guest Name:</span>
                  <div className="font-semibold text-white">{confirmedBooking.guestName}</div>
                </div>
                <div>
                  <span className="text-slate-400">Party Size:</span>
                  <div className="font-semibold text-white">{confirmedBooking.partySize} Guests</div>
                </div>
                <div>
                  <span className="text-slate-400">Date & Time:</span>
                  <div className="font-semibold text-white">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Seating Zone:</span>
                  <div className="font-semibold text-cyan-300">
                    {zoneOptions.find(z => z.id === confirmedBooking.seatingZone)?.name}
                  </div>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">Location:</span>
                  <div className="font-semibold text-white">
                    3877 Holland Rd, Suite 416, Virginia Beach, VA 23452
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => downloadCalendarFile(confirmedBooking)}
                  className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Calendar (.ics)</span>
                </button>
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="flex-1 py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          ) : (
            /* Booking Creation Form */
            <form
              onSubmit={handleBookingSubmit}
              className="max-w-4xl mx-auto bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8"
            >
              {/* Step 1: Party Size & Date & Time */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>1. Party Size & Schedule</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Party Size */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'} {num >= 8 ? '(Banquet Suggested)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Dining Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Dining Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Casual Dining">Casual Seafood Feast</option>
                      <option value="Birthday Celebration">Birthday Celebration (Free Dessert)</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Family Reunion">Family Gathering</option>
                      <option value="Business Lunch">Business / Team Lunch</option>
                    </select>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Select Available Time Slot
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {availableTimeSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          type="button"
                          key={slot.time}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md shadow-cyan-950'
                              : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className="text-sm font-bold tabular-nums">{slot.time}</div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                            <span>{slot.meal}</span>
                            <span className={isSelected ? 'text-cyan-300 font-semibold' : ''}>
                              {slot.status}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 2: Seating Zone Selection */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>2. Preferred Seating Zone</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {zoneOptions.map((zone) => {
                    const isSelected = seatingZone === zone.id;
                    return (
                      <div
                        key={zone.id}
                        onClick={() => setSeatingZone(zone.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white">{zone.name}</h4>
                          <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                            {zone.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5">{zone.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Special Accommodations & Tools */}
              <div className="space-y-3 pt-6 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300">
                  3. Complimentary Table Accommodations
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {requestOptions.map((opt) => {
                    const checked = specialRequests.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleRequest(opt)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                          checked
                            ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            checked ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-700'
                          }`}
                        >
                          {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Guest Contact Details */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <h3 className="font-display font-bold text-lg text-white">
                  4. Contact & Confirmation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Rachel Miller"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mobile Phone (for SMS confirmation) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="(757) 000-0000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="rachel@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Dietary Notes or Seating Preferences (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please seat us near the sushi counter if possible"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  Instant table holding at 3877 Holland Rd · Tables held for 15 mins past reserved time.
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl shadow-lg shadow-cyan-950 transition-all cursor-pointer"
                >
                  Confirm Table Reservation
                </button>
              </div>
            </form>
          )
        ) : (
          /* Lookup Existing Reservation View */
          <div className="max-w-xl mx-auto bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="font-display font-bold text-xl text-white text-center">
              Lookup Your Reservation
            </h3>
            <p className="text-xs text-slate-400 text-center">
              Enter your booking confirmation code (e.g., OG-4921) or mobile phone number:
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                placeholder="OG-4921 or (757) 555-0192"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={handleLookup}
                className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

            {lookupError && (
              <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{lookupError}</span>
              </div>
            )}

            {lookupResult && (
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Confirmation Code
                    </div>
                    <div className="text-lg font-mono font-bold text-cyan-400">
                      {lookupResult.confirmationCode}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded ${
                      lookupResult.status === 'confirmed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {lookupResult.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Guest:</span>
                    <div className="font-semibold text-white">{lookupResult.guestName}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Party Size:</span>
                    <div className="font-semibold text-white">{lookupResult.partySize} Guests</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Date & Time:</span>
                    <div className="font-semibold text-white">
                      {lookupResult.date} at {lookupResult.timeSlot}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Zone:</span>
                    <div className="font-semibold text-cyan-300">{lookupResult.seatingZone}</div>
                  </div>
                </div>

                {lookupResult.status === 'confirmed' && (
                  <div className="pt-3 border-t border-slate-800 flex gap-2">
                    <button
                      onClick={() => downloadCalendarFile(lookupResult)}
                      className="flex-1 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800"
                    >
                      Export to Calendar
                    </button>
                    <button
                      onClick={() => handleCancelBooking(lookupResult.confirmationCode)}
                      className="px-4 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/80 rounded-lg border border-rose-900"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
