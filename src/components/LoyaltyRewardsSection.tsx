import React, { useState } from 'react';
import { LOYALTY_REWARDS } from '../data/restaurantData';
import { LoyaltyReward } from '../types/restaurant';
import {
  Award,
  Crown,
  Gift,
  QrCode,
  Sparkles,
  CheckCircle2,
  TicketPercent,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame
} from 'lucide-react';

export const LoyaltyRewardsSection: React.FC = () => {
  const [userName, setUserName] = useState<string>('Alex Morgan');
  const [userPhone, setUserPhone] = useState<string>('(757) 828-4491');
  const [memberPoints, setMemberPoints] = useState<number>(450);
  const [activeTier, setActiveTier] = useState<'Pearl' | 'Coral' | 'Golden Trident'>('Pearl');
  const [activeVoucher, setActiveVoucher] = useState<{
    code: string;
    title: string;
    expiresIn: string;
  } | null>(null);
  const [claimSuccess, setClaimSuccess] = useState<string>('');
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);
  const [joinPhone, setJoinPhone] = useState<string>('');
  const [joinName, setJoinName] = useState<string>('');

  const tiers = [
    {
      name: 'Pearl Explorer',
      range: '0 – 499 pts',
      multiplier: '10 pts / $1',
      perks: ['Free refill soft drinks', 'Member birthday dessert treat', 'Access to digital reservation waitlist priority']
    },
    {
      name: 'Coral Patron',
      range: '500 – 1,499 pts',
      multiplier: '12 pts / $1',
      perks: ['10% off weekday buffet bills', 'Priority seating at peak hours', 'Complimentary garlic butter crab tools kit']
    },
    {
      name: 'Golden Trident VIP',
      range: '1,500+ pts',
      multiplier: '15 pts / $1',
      perks: ['Complimentary whole lobster upgrade on birthdays', 'Zero-wait VIP booth reservations', 'Exclusive seasonal chef tastings']
    }
  ];

  const handleClaimReward = (reward: LoyaltyReward) => {
    if (memberPoints < reward.pointsCost) {
      alert(`You need ${reward.pointsCost - memberPoints} more points to redeem ${reward.title}!`);
      return;
    }

    const randomVoucher = `${reward.voucherCodePrefix}${Math.floor(100000 + Math.random() * 900000)}`;
    setMemberPoints((prev) => prev - reward.pointsCost);
    setActiveVoucher({
      code: randomVoucher,
      title: reward.title,
      expiresIn: 'Valid for 30 days',
    });
    setClaimSuccess(`Successfully redeemed: ${reward.title}! Show voucher to cashier.`);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinPhone || !joinName) return;
    setUserName(joinName);
    setUserPhone(joinPhone);
    setMemberPoints((prev) => prev + 100); // 100 bonus welcome points
    setShowJoinModal(false);
    setClaimSuccess('Welcome to Ocean Club! 100 bonus points have been added to your card.');
  };

  const simulateEarnPoints = () => {
    setMemberPoints((prev) => {
      const next = prev + 150;
      if (next >= 1500) setActiveTier('Golden Trident');
      else if (next >= 500) setActiveTier('Coral');
      return next;
    });
    setClaimSuccess('Simulated receipt scan: +150 points added to your balance!');
  };

  return (
    <section id="rewards" className="py-20 bg-slate-900/60 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400">
            <span>Ocean Club Rewards</span>
            <span aria-hidden="true">·</span>
            <span>Earn 10 Points Per $1</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Dine, Earn & Savor Exclusive Seafood Perks
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every dollar spent at Ocean Grill earns points redeemable for discounts, snow crab clusters, and free weekend buffet passes.
          </p>
        </div>

        {/* Success Alert if claimed */}
        {claimSuccess && (
          <div className="max-w-2xl mx-auto mb-8 p-3.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{claimSuccess}</span>
            </div>
            <button
              onClick={() => setClaimSuccess('')}
              className="text-emerald-400 hover:text-white text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Member Card & Tier Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left: Interactive Digital Membership Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-6 sm:p-7 overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 shadow-2xl space-y-6">
              
              {/* Card Hologram Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-wider uppercase font-display">
                      Ocean Club
                    </div>
                    <div className="text-[10px] text-cyan-400 font-medium">VIP Dining Pass</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {activeTier} Tier
                  </span>
                </div>
              </div>

              {/* Points Balance */}
              <div className="py-2">
                <div className="text-xs text-slate-400">Available Points Balance</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold text-white font-display tabular-nums tracking-tight">
                    {memberPoints}
                  </span>
                  <span className="text-xs text-cyan-400 font-semibold uppercase">Points</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  100 points = $5 restaurant dining credit
                </div>
              </div>

              {/* Realistic Barcode / Member QR Code */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400">Member: {userName}</div>
                  <div className="text-xs font-mono text-slate-200">{userPhone}</div>
                  <div className="text-[9px] text-slate-400">Scan at cashier on checkout</div>
                </div>
                <div className="p-1.5 bg-white rounded-lg shrink-0">
                  <QrCode className="w-9 h-9 text-slate-950" />
                </div>
              </div>

              {/* Simulation Quick Tools */}
              <div className="pt-2 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={simulateEarnPoints}
                  className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-center font-medium transition-colors cursor-pointer"
                >
                  + Add Receipt (+150 pts)
                </button>
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="py-1.5 px-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Switch Member
                </button>
              </div>

            </div>
          </div>

          {/* Right: Tier Progression & Benefits (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display font-bold text-xl text-white">
              Membership Tiers & VIP Benefits
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Your points accumulate with every visit to 3877 Holland Rd. Higher tiers unlock automatic discounts and complimentary seafood upgrades.
            </p>

            <div className="space-y-3 pt-2">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    </div>
                    <span className="text-xs text-cyan-300 font-mono font-medium">{t.range}</span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                    {t.perks.map((p) => (
                      <span key={p} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{p}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Active Voucher Display if any */}
        {activeVoucher && (
          <div className="mb-12 max-w-xl mx-auto bg-gradient-to-r from-cyan-950/80 via-slate-900 to-cyan-950/80 border border-cyan-400/50 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <TicketPercent className="w-4 h-4" />
                <span>Active Dining Voucher Ready</span>
              </div>
              <span className="text-xs text-slate-400">{activeVoucher.expiresIn}</span>
            </div>

            <div className="text-white font-display text-lg font-bold">
              {activeVoucher.title}
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-cyan-400 tracking-wider">
                {activeVoucher.code}
              </span>
              <span className="text-[11px] text-slate-400">Present to server before bill</span>
            </div>
          </div>
        )}

        {/* Redeemable Rewards Catalog */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Redeem Available Rewards
              </h3>
              <p className="text-xs text-slate-400">
                Click redeem to exchange your points balance for instant dining vouchers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOYALTY_REWARDS.map((rew) => {
              const canAfford = memberPoints >= rew.pointsCost;
              return (
                <div
                  key={rew.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-slate-900 text-cyan-400 rounded-lg border border-slate-800">
                        <Gift className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        {rew.pointsCost} PTS
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{rew.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {rew.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-900">
                    <button
                      onClick={() => handleClaimReward(rew)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        canAfford
                          ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-sm'
                          : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {canAfford ? 'Redeem Voucher' : `Need ${rew.pointsCost - memberPoints} Pts`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Join Ocean Club Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-xl text-white">
              Join Ocean Club Rewards
            </h3>
            <p className="text-xs text-slate-400">
              Sign up with your phone number to receive a 100 Bonus Point welcome grant and digital membership pass!
            </p>

            <form onSubmit={handleJoinSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  placeholder="e.g. Rachel Miller"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mobile Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={joinPhone}
                  onChange={(e) => setJoinPhone(e.target.value)}
                  placeholder="(757) 000-0000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Get Pass & +100 Points
                </button>
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
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
