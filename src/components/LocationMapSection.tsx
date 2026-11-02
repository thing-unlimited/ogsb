import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  Car,
  Compass,
  Bus
} from 'lucide-react';

export const LocationMapSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [closingTimeStr, setClosingTimeStr] = useState('9:00 PM');
  const [mapZoom, setMapZoom] = useState(1);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 5 = Fri, 6 = Sat
    const currentHour = now.getHours();
    const isWeekend = day === 0 || day === 5 || day === 6;
    const closingHour = isWeekend ? 22 : 21;
    setClosingTimeStr(isWeekend ? '10:00 PM' : '9:00 PM');
    setIsOpenNow(currentHour >= 11 && currentHour < closingHour);
  }, []);

  const copyAddress = () => {
    const full = `${RESTAURANT_INFO.address.street}, ${RESTAURANT_INFO.address.city}, ${RESTAURANT_INFO.address.state} ${RESTAURANT_INFO.address.zip}`;
    navigator.clipboard.writeText(full);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const fullAddressString = `${RESTAURANT_INFO.address.street}, ${RESTAURANT_INFO.address.city}, ${RESTAURANT_INFO.address.state} ${RESTAURANT_INFO.address.zip}`;
  const encodedAddress = encodeURIComponent(`${RESTAURANT_INFO.name}, 3877 Holland Rd, Virginia Beach, VA 23452`);
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${encodedAddress}`;

  return (
    <section id="location" className="py-20 bg-slate-900/60 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400">
            <span>Virginia Beach, Virginia</span>
            <span aria-hidden="true">·</span>
            <span>Timberlake Shopping Center</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Find Ocean Grill & Location Map
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Conveniently situated on Holland Road with plentiful free plaza parking. Get turn-by-turn driving directions or call our front desk directly.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Address Card */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-950/80 border border-cyan-800/60 rounded-xl text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">Physical Address</h3>
                    <p className="text-xs text-slate-400">Timberlake Shopping Center</p>
                  </div>
                </div>

                <button
                  onClick={copyAddress}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                  title="Copy address"
                >
                  {copiedAddress ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="pl-12 text-sm text-slate-200 font-medium">
                <p>{RESTAURANT_INFO.address.street}</p>
                <p>{RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} {RESTAURANT_INFO.address.zip}</p>
              </div>

              {/* Action Buttons for Directions */}
              <div className="pt-2 pl-12 flex flex-wrap gap-2 text-xs">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps Directions</span>
                </a>

                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium rounded-lg border border-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Apple Maps</span>
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-950/80 border border-cyan-800/60 rounded-xl text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">Direct Phone Number</h3>
                    <p className="text-xs text-slate-400">Table inquiries & take-out</p>
                  </div>
                </div>

                <button
                  onClick={copyPhone}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                  title="Copy phone"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="pl-12 flex items-center justify-between pt-1">
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="text-lg font-bold font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="px-3 py-1 bg-slate-900 text-xs font-semibold text-white border border-slate-800 hover:border-slate-700 rounded-md"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Live Hours Card */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-950/80 border border-cyan-800/60 rounded-xl text-cyan-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">Dining Hours</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-xs font-semibold ${
                          isOpenNow ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {isOpenNow ? '● Open Now' : '○ Currently Closed'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {isOpenNow ? `Closes at ${closingTimeStr}` : 'Opens at 11:00 AM'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pl-12 space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-900">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monday – Thursday:</span>
                  <span className="font-semibold text-white">11:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Friday – Sunday:</span>
                  <span className="font-semibold text-cyan-300">11:00 AM – 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Parking & Accessibility Notice */}
            <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl text-xs text-slate-400 flex items-start gap-3">
              <Car className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Free on-site parking lot with designated wheelchair accessible spots directly outside Suite 416.
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Map Display & Storefront Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            
            {/* Embedded Interactive Map Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-[380px] sm:h-[420px] flex flex-col shadow-2xl">
              
              {/* Map Top Bar */}
              <div className="p-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs z-10">
                <div className="flex items-center gap-2 text-slate-300">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-white">Timberlake Plaza, VA Beach</span>
                  <span className="text-[11px] text-slate-400">(Lat: 36.8173, Lng: -76.1082)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 1.6))}
                    className="w-6 h-6 bg-slate-900 border border-slate-800 rounded text-slate-300 hover:text-white flex items-center justify-center font-bold"
                    title="Zoom in"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.8))}
                    className="w-6 h-6 bg-slate-900 border border-slate-800 rounded text-slate-300 hover:text-white flex items-center justify-center font-bold"
                    title="Zoom out"
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Map View Canvas (Stylized Vector Map Grid) */}
              <div className="relative flex-1 bg-[#0b1322] overflow-hidden flex items-center justify-center">
                
                {/* SVG Visual Road & Corridor Blueprint of 3877 Holland Rd */}
                <div
                  className="w-full h-full relative transition-transform duration-300"
                  style={{ transform: `scale(${mapZoom})` }}
                >
                  <svg className="w-full h-full opacity-70" viewBox="0 0 800 500">
                    {/* Background terrain */}
                    <rect width="800" height="500" fill="#0b1322" />

                    {/* Waterways / Coastal Inlet */}
                    <path
                      d="M650 0 C680 120 720 280 800 350 L800 0 Z"
                      fill="#03203c"
                      opacity="0.6"
                    />

                    {/* Holland Road Highway Grid */}
                    {/* Holland Rd (Primary Arterial) */}
                    <path
                      d="M0 240 L800 240"
                      stroke="#1e293b"
                      strokeWidth="32"
                    />
                    <path
                      d="M0 240 L800 240"
                      stroke="#334155"
                      strokeWidth="20"
                    />
                    <path
                      d="M0 240 L800 240"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="16 12"
                    />

                    {/* S. Rosemont Rd Cross Street */}
                    <path
                      d="M260 0 L260 500"
                      stroke="#1e293b"
                      strokeWidth="24"
                    />
                    <path
                      d="M260 0 L260 500"
                      stroke="#334155"
                      strokeWidth="14"
                    />

                    {/* S. Independence Blvd */}
                    <path
                      d="M620 0 L620 500"
                      stroke="#1e293b"
                      strokeWidth="20"
                    />

                    {/* Timberlake Shopping Center Plaza Footprint */}
                    <rect
                      x="340"
                      y="110"
                      width="200"
                      height="100"
                      rx="8"
                      fill="#111c30"
                      stroke="#0284c7"
                      strokeWidth="1.5"
                    />
                    {/* Parking lot grid lines */}
                    <line x1="350" y1="160" x2="530" y2="160" stroke="#1e293b" strokeDasharray="4 4" />
                    <line x1="350" y1="180" x2="530" y2="180" stroke="#1e293b" strokeDasharray="4 4" />

                    {/* Labels */}
                    <text x="350" y="270" fill="#94a3b8" fontSize="13" fontWeight="bold">
                      HOLLAND ROAD (VA-410)
                    </text>
                    <text x="275" y="80" fill="#64748b" fontSize="11" fontWeight="600">
                      S. Rosemont Rd
                    </text>
                    <text x="355" y="135" fill="#38bdf8" fontSize="11" fontWeight="bold">
                      Timberlake Shopping Plaza
                    </text>
                    <text x="355" y="150" fill="#94a3b8" fontSize="9">
                      Suite 416 · Ocean Grill Buffet
                    </text>
                  </svg>

                  {/* High Visibility Pinned Marker */}
                  <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
                    <div className="animate-bounce">
                      <div className="w-10 h-10 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-400/50 border-2 border-white">
                        <MapPin className="w-6 h-6 fill-slate-950 text-slate-950" />
                      </div>
                    </div>
                    <div className="mt-1 px-3 py-1 bg-slate-950/95 border border-cyan-400/60 rounded-lg text-white font-display text-xs font-bold shadow-xl whitespace-nowrap">
                      Ocean Grill & Seafood Buffet
                    </div>
                    <div className="text-[10px] text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded shadow mt-0.5">
                      3877 Holland Rd #416
                    </div>
                  </div>

                </div>

                {/* Floating Directions Shortcut on Map */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-white">Ready to visit us?</div>
                    <div className="text-[11px] text-slate-400">
                      Just 12 minutes from the Virginia Beach Oceanfront boardwalk.
                    </div>
                  </div>

                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-semibold text-xs rounded-lg shadow shrink-0 hover:from-cyan-300 hover:to-sky-300 flex items-center gap-1.5 transition-all"
                  >
                    <span>Open Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

            {/* Storefront Visual Recognition Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
              <img
                src={RESTAURANT_INFO.photos.storefront}
                alt="Ocean Grill & Seafood Buffet Exterior View"
                className="w-24 h-16 rounded-lg object-cover border border-slate-800 shrink-0"
              />
              <div className="text-xs">
                <span className="font-semibold text-white">Look for the "Ocean Grill & Seafood Buffet OPEN" sign</span>
                <p className="text-slate-400 mt-0.5">
                  Located in the main Timberlake plaza breezeway between anchor stores. Easy drive-up entrance with automatic glass doors.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
