import React, { useState } from 'react';
import { RECENT_REVIEWS } from '../data/restaurantData';
import { ReviewItem } from '../types/restaurant';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  X,
  PlusCircle,
  Quote
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(RECENT_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);

  // New review form
  const [author, setAuthor] = useState<string>('');
  const [location, setLocation] = useState<string>('Virginia Beach, VA');
  const [rating, setRating] = useState<number>(5);
  const [visitType, setVisitType] = useState<ReviewItem['visitType']>('Weekend Dinner');
  const [content, setContent] = useState<string>('');
  const [favoriteItems, setFavoriteItems] = useState<string>('Steamed Blue Crabs, Snow Crab Legs');

  const filters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'Weekend Dinner', label: 'Weekend Dinner' },
    { id: 'Family Birthday', label: 'Family & Groups' },
    { id: 'Weekday Lunch', label: 'Weekday Lunch' },
  ];

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.visitType === activeFilter;
  });

  const toggleHelpful = (id: string) => {
    setHelpfulVoted((prev) => {
      const already = prev[id];
      setReviews((revList) =>
        revList.map((r) =>
          r.id === id ? { ...r, helpfulCount: r.helpfulCount + (already ? -1 : 1) } : r
        )
      );
      return { ...prev, [id]: !already };
    });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author,
      location: location || 'Virginia Beach, VA',
      rating,
      date: 'Just now',
      verifiedDiner: true,
      visitType,
      content,
      favoriteItems: favoriteItems.split(',').map((s) => s.trim()).filter(Boolean),
      helpfulCount: 1,
    };

    setReviews([newRev, ...reviews]);
    setShowReviewModal(false);
    setAuthor('');
    setContent('');
  };

  return (
    <section id="reviews" className="py-20 bg-slate-950 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400">
            <span>Verified Guest Experiences</span>
            <span aria-hidden="true">·</span>
            <span>Virginia Beach Foodies</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Best Reviews & Diner Testimonials
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Read firsthand accounts from families, seafood enthusiasts, and local patrons who regularly make Ocean Grill their favorite dining destination.
          </p>
        </div>

        {/* Rating Breakdown & Trust Stats */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Big Score (4 cols) */}
          <div className="lg:col-span-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
            <div className="text-5xl sm:text-6xl font-extrabold text-white font-display tabular-nums">
              4.95
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-1 my-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-400">
              Based on <span className="text-white font-semibold">1,280+ verified ratings</span> across Google, Birdeye, and direct guest check-ins.
            </p>
          </div>

          {/* Rating Bars (5 cols) */}
          <div className="lg:col-span-5 space-y-2 text-xs">
            {[
              { label: '5 Stars', percent: 96, count: '1,228' },
              { label: '4 Stars', percent: 3, count: '39' },
              { label: '3 Stars', percent: 1, count: '10' },
              { label: '2 Stars', percent: 0, count: '2' },
              { label: '1 Star', percent: 0, count: '1' },
            ].map((bar) => (
              <div key={bar.label} className="flex items-center gap-3">
                <span className="w-14 text-slate-400 shrink-0">{bar.label}</span>
                <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full"
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-400 tabular-nums shrink-0">
                  {bar.count}
                </span>
              </div>
            ))}
          </div>

          {/* Action to Write Review (3 cols) */}
          <div className="lg:col-span-3 text-center lg:text-right space-y-3">
            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Leave a Guest Review</span>
            </button>
            <p className="text-[11px] text-slate-400">
              Verified diners earn +50 Ocean Club points upon review submission.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const hasVoted = helpfulVoted[rev.id];
            return (
              <div
                key={rev.id}
                className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
              >
                <div className="space-y-3">
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-white text-sm">
                          {rev.author}
                        </span>
                        {rev.verifiedDiner && (
                          <span
                            title="Verified Diner"
                            className="text-cyan-400"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {rev.location} · {rev.date}
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Visit Tag (Quiet text, zero pill) */}
                  <div className="text-[11px] font-medium text-cyan-400/90">
                    Visit: {rev.visitType}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    "{rev.content}"
                  </p>

                  {/* Favorite Items */}
                  {rev.favoriteItems && rev.favoriteItems.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        Diner Favorites:
                      </div>
                      <div className="text-xs text-slate-300">
                        {rev.favoriteItems.join(' · ')}
                      </div>
                    </div>
                  )}
                </div>

                {/* Helpful Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Was this helpful?</span>
                  <button
                    onClick={() => toggleHelpful(rev.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      hasVoted
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="tabular-nums">{rev.helpfulCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-display font-bold text-xl text-white">
                Write a Diner Review
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Overall Star Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-white ml-2">{rating} out of 5 Stars</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Jason Myers"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Visit Type
                  </label>
                  <select
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Weekend Dinner">Weekend Dinner</option>
                    <option value="Weekday Lunch">Weekday Lunch</option>
                    <option value="Family Birthday">Family & Birthday</option>
                    <option value="Hibachi Night">Hibachi Night</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Dining Experience Review
                </label>
                <textarea
                  required
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell us about the seafood quality, buffet variety, cleanliness, or service..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Favorite Buffet Dishes (Comma separated)
                </label>
                <input
                  type="text"
                  value={favoriteItems}
                  onChange={(e) => setFavoriteItems(e.target.value)}
                  placeholder="e.g. Blue Crabs, Spicy Yellowtail, Hibachi Noodles"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Publish Guest Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
