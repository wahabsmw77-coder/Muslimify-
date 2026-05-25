import React from "react";

interface MuslimifyLogoProps {
  className?: string;
  variant?: "header" | "dark" | "colored";
}

export function MosqueLogoSVG({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 80" 
      className={`${className} shrink-0 drop-shadow-sm`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Minaret Structure */}
      <path d="M15 36h4v34h-4z" fill="#0a1d0e" />
      <path d="M13 70h8v2.5H13z" fill="#0a1d0e" />
      
      {/* Minaret Balcony Gilded Accent */}
      <path d="M12 36h10v2.5H12z" fill="#D4AF37" />
      <path d="M16 31.5H18v5H16z" fill="#0a1d0e" />
      
      {/* Minaret dome top */}
      <path d="M15.5 31.5C15.5 29.5 17 28 17 28s1.5 1.5 1.5 3.5h-3z" fill="#0a1d0e" />
      {/* Gold spike on minaret */}
      <path d="M17 25v3.5" stroke="#D4AF37" strokeWidth="0.75" />
      <circle cx="17" cy="24" r="0.75" fill="#D4AF37" />
      
      {/* Middle Main Wall */}
      <path d="M22 47h32v23H22z" fill="#0a1d0e" />
      {/* Horizontal Gilded Highlights */}
      <path d="M22 51h32v1.5H22z" fill="#D4AF37" opacity="0.8" />
      <path d="M22 66h32v1.5H22z" fill="#D4AF37" opacity="0.6" />

      {/* Central Green Dome matching the actual image */}
      <path 
        d="M24 47C24 30.5 31.5 25.5 38 25.5c6.5 0 14 5 14 21.5H24z" 
        fill="#1B5E20" 
      />
      
      {/* Floating Golden Crescent above central dome */}
      <path 
        d="M38.5 11c3.2 0 5.8 1.4 7.2 3.6a6.5 6.5 0 11-7.2-3.6z" 
        fill="#D4AF37" 
      />

      {/* Lower Archways / Gates */}
      <path d="M25 70V61.5c0-1.8 1.2-3.2 2.8-3.2s2.8 1.4 2.8 3.2V70" fill="#07130a" />
      {/* Center Holy Gate (Gilded Border) */}
      <path d="M33.5 70V58c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4v12" fill="#1B5E20" stroke="#D4AF37" strokeWidth="0.75" />
      <path d="M49 70V61.5c0-1.8 1.2-3.2 2.8-3.2s2.8 1.4 2.8 3.2V70" fill="#07130a" />
    </svg>
  );
}

export default function MuslimifyLogo({ className = "h-9", variant = "colored" }: MuslimifyLogoProps) {
  const isHeader = variant === "header";
  
  // Font sizes & branding
  const textClass = isHeader 
    ? "text-white" 
    : "text-emerald-900 dark:text-white";

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* elegant text matching 'Muslimify' written with capital M and display font */}
      <span className={`font-display text-2xl sm:text-3xl font-extrabold tracking-wide select-none ${textClass}`}>
        <span className="text-islamic-gold">M</span>uslimify
      </span>
    </div>
  );
}
