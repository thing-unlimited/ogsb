import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types/restaurant';
import { Search, Utensils, Sparkles, Plus, Check, Heart, Info, X } from 'lucide-react';

interface DigitalMenuSectionProps {
  onOpenReservation: () => void;
}

export const DigitalMenuSection: React.FC<DigitalMenuSectionProps> = ({ onOpenReservation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [plateItems, setPlateItems] = useState<MenuItem[]>([]);
  const [isPlateDrawerOpen, setIsPlateDrawerOpen] = useState(false);
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Stations' },
    { id: 'seafood', label: 'Fresh Seafood & Raw Bar' },
    { id: 'sushi', label: 'Sushi & Sashimi' },
    { id: 'hibachi', label: 'Hibachi & Live Grill' },
    { id: 'hot-entrees', label: 'Hot Gourmet Entrées' },
    { id: 'fruits-salad', label: 'Fresh Fruit & Salads' },
    { id: 'desserts', label: 'Desserts & Sweets' },
  ];

  const dietaryOptions = ['all', 'Gluten-Free', 'Shellfish', 'Spicy', 'Vegetarian'];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDietary =
        dietaryFilter === 'all' || (item.dietary && item.dietary.includes(dietaryFilter as any));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  const togglePlateItem = (item: MenuItem) => {
    setPlateItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isInPlate = (id: string) => plateItems.some((p) => p.id === id);

  return (
    <section id="menu" className="py-20 bg-slate-900/50 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <span>Unlimited Dining</span>
              <span aria-hidden="true">·</span>
              <span>150+ Daily Selections</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Digital Buffet Menu & Live Stations
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Browse our freshly replenished culinary stations. Select your must-have favorites to assemble your custom buffet plate ahead of your visit.
            </p>
          </div>

          {/* Floating Buffet Plate Trigger */}
          <button
            onClick={() => setIsPlateDrawerOpen(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-white shadow-lg shrink-0 transition-all cursor-pointer group"
          >
            <div className="relative p-2 bg-cyan-950 text-cyan-400 rounded-lg group-hover:bg-cyan-900">
              <Utensils className="w-4 h-4" />
              {plateItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-400 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {plateItems.length}
                </span>
              )}
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-200">My Buffet Plate</div>
              <div className="text-[11px] text-slate-400">
                {plateItems.length === 0 ? '0 items selected' : `${plateItems.length} favorites saved`}
              </div>
            </div>
          </button>
        </div>

        {/* Filter Controls (Search + Categories + Dietary) */}
        <div className="space-y-4 mb-8">
          
          {/* Row 1: Search & Dietary Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crabs, sushi, noodles, beef, oysters..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Filter Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap mr-1 hidden md:inline">
                Dietary:
              </span>
              {dietaryOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setDietaryFilter(opt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    dietaryFilter === opt
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {opt === 'all' ? 'All Diets' : opt}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Buffet Station Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const onPlate = isInPlate(item.id);
            return (
              <div
                key={item.id}
                className="group bg-slate-950/70 border border-slate-800/80 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Image Slot if available */}
                  {item.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      {item.isSignature && (
                        <div className="absolute top-2.5 left-2.5 bg-cyan-950/90 border border-cyan-700/60 text-cyan-300 text-[10px] font-semibold px-2 py-0.5 rounded shadow">
                          Chef Signature
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 pb-0 flex items-center justify-between text-xs text-slate-400">
                      <span className="text-[11px] font-medium text-cyan-400/90">{item.categoryLabel}</span>
                      {item.isSignature && (
                        <span className="text-[10px] font-medium text-amber-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 fill-amber-400" />
                          Signature
                        </span>
                      )}
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    {/* Preparation or Station Note */}
                    {item.prepStyle && (
                      <p className="text-[11px] text-cyan-400/80 font-medium">
                        {item.prepStyle}
                      </p>
                    )}

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Unboxed Metadata (Zero Pill) */}
                    {item.dietary && item.dietary.length > 0 && (
                      <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                        {item.dietary.map((d, i) => (
                          <React.Fragment key={d}>
                            {i > 0 && <span aria-hidden="true">·</span>}
                            <span>{d}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 pt-2 border-t border-slate-900 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveItemModal(item)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Station Details</span>
                  </button>

                  <button
                    onClick={() => togglePlateItem(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      onPlate
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
                    }`}
                  >
                    {onPlate ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span>On My Plate</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Plate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state when filters return 0 */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center bg-slate-950/60 rounded-xl border border-slate-800 p-8 space-y-3">
            <Utensils className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-white font-medium">No dishes match your filter</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search query or selecting a different buffet station.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-2 text-xs font-semibold text-cyan-400 hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Slide-over Drawer for "My Custom Buffet Plate" */}
      {isPlateDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsPlateDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-display font-bold text-lg text-white">My Buffet Plate Planner</h3>
                  </div>
                  <button
                    onClick={() => setIsPlateDrawerOpen(false)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-slate-400 mt-3">
                  Your curated list of must-try dishes at Ocean Grill. Save this guide for your table visit!
                </p>

                {/* Items List */}
                <div className="mt-5 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {plateItems.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 space-y-2">
                      <Heart className="w-7 h-7 mx-auto text-slate-600" />
                      <p className="text-xs">Your plate is currently empty.</p>
                      <p className="text-[11px] text-slate-500">
                        Click "Add to Plate" on any dish to build your dream seafood spread.
                      </p>
                    </div>
                  ) : (
                    plateItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-11 h-11 rounded object-cover shrink-0"
                            />
                          )}
                          <div>
                            <div className="text-xs font-semibold text-white">{item.name}</div>
                            <div className="text-[10px] text-cyan-400">{item.categoryLabel}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => togglePlateItem(item)}
                          className="p-1 text-slate-400 hover:text-rose-400"
                          title="Remove from plate"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                {plateItems.length > 0 && (
                  <button
                    onClick={() => setPlateItems([])}
                    className="w-full text-xs text-slate-400 hover:text-white py-1.5"
                  >
                    Clear All ({plateItems.length})
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsPlateDrawerOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-semibold text-xs rounded-lg shadow-md hover:from-cyan-300 hover:to-sky-300 transition-colors"
                >
                  Book Table to Enjoy This Plate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {activeItemModal.image && (
              <div className="relative aspect-[16/10] bg-slate-950">
                <img
                  src={activeItemModal.image}
                  alt={activeItemModal.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveItemModal(null)}
                  className="absolute top-3 right-3 p-1.5 bg-slate-950/80 text-white rounded-full hover:bg-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="p-6 space-y-4">
              {!activeItemModal.image && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveItemModal(null)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div>
                <div className="text-xs font-medium text-cyan-400">{activeItemModal.categoryLabel}</div>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  {activeItemModal.name}
                </h3>
              </div>

              {activeItemModal.prepStyle && (
                <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-cyan-300">Station Preparation: </span>
                  {activeItemModal.prepStyle}
                </div>
              )}

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeItemModal.description}
              </p>

              {/* Tags & Dietary */}
              <div className="flex flex-wrap gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                {activeItemModal.tags.map((t) => (
                  <span key={t} className="text-slate-300">#{t}</span>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    togglePlateItem(activeItemModal);
                    setActiveItemModal(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
                >
                  {isInPlate(activeItemModal.id) ? 'Remove From My Plate' : 'Add To My Plate'}
                </button>
                <button
                  onClick={() => setActiveItemModal(null)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
