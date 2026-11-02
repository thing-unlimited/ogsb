import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  variant = 'light',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.28em]',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Minimalist Wave & Fish Brandmark */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Subtle Outer Brand Circle */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="url(#oceanGradRing)"
            strokeWidth="2.5"
            strokeDasharray="280"
            strokeDashoffset="10"
            className="opacity-70"
          />

          {/* Minimalist Lower Crest Wave */}
          <path
            d="M15 62C26 50 40 70 54 58C66 48 76 60 85 52C88 56 86 66 82 72C72 82 40 85 24 76C18 72 15 67 15 62Z"
            fill="url(#deepOceanGrad)"
            opacity="0.85"
          />

          {/* Minimalist Upper Rolling Wave Crest */}
          <path
            d="M18 56C28 44 45 42 56 50C65 57 78 54 85 46C79 56 68 62 55 58C44 54 32 58 18 56Z"
            fill="url(#crestWaveGrad)"
          />

          {/* Minimalist Leaping Fish Silhouette */}
          <path
            d="M32 46C40 34 56 31 72 38C68 44 62 47 52 46C44 45 38 48 32 46Z"
            fill="url(#fishGrad)"
          />
          {/* Fish Tail Fin */}
          <path
            d="M32 46L24 40C25 45 25 48 24 53L32 46Z"
            fill="url(#fishGrad)"
          />
          {/* Fish Dorsal Fin */}
          <path
            d="M50 33C54 28 60 29 62 34C58 34 54 34 50 33Z"
            fill="url(#fishGrad)"
          />
          {/* Minimalist Fish Eye Point */}
          <circle cx="66" cy="39" r="1.5" fill="#090d16" />

          {/* Subtle Sea Grill Ember Spark */}
          <circle cx="75" cy="30" r="2" fill="#f59e0b" className="opacity-90" />
          <circle cx="81" cy="24" r="1.2" fill="#38bdf8" className="opacity-80" />

          {/* Gradients */}
          <defs>
            <linearGradient id="oceanGradRing" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#0284c7" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="deepOceanGrad" x1="15" y1="50" x2="85" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0369a1" />
              <stop offset="1" stopColor="#0c4a6e" />
            </linearGradient>
            <linearGradient id="crestWaveGrad" x1="18" y1="42" x2="85" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="fishGrad" x1="24" y1="30" x2="72" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.7" stopColor="#e0f2fe" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography Lockup */}
      {!iconOnly && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display font-extrabold tracking-tight ${textSizes[size]} ${
                variant === 'light' ? 'text-white' : 'text-slate-900'
              }`}
            >
              OCEAN GRILL
            </span>
          </div>
          <span
            className={`font-semibold uppercase ${subSizes[size]} ${
              variant === 'light' ? 'text-cyan-400' : 'text-sky-700'
            }`}
          >
            Seafood Buffet
          </span>
        </div>
      )}
    </div>
  );
};
