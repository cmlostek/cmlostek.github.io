import React from 'react';

export function FishSvg({ className = '', style = {}, flipped = false }) {
  return (
    <svg
      className={className}
      style={{ transform: flipped ? 'scaleX(-1)' : undefined, ...style }}
      viewBox="0 0 110 52"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      {/* Body */}
      <ellipse cx="47" cy="26" rx="37" ry="16" />
      {/* Tail */}
      <path d="M82,12 L110,26 L82,40 Z" />
      {/* Dorsal fin */}
      <path d="M34,10 Q46,1 58,10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pectoral fin */}
      <path d="M42,30 Q48,38 56,34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="20" cy="22" r="4.5" fill="rgba(5,14,26,0.55)" />
      <circle cx="19" cy="21" r="1.8" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

export function JellyfishSvg({ className = '', style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 60 95"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      {/* Bell */}
      <path d="M30,6 Q56,6 56,34 Q56,56 30,62 Q4,56 4,34 Q4,6 30,6 Z" />
      {/* Inner highlight */}
      <path
        d="M30,13 Q50,13 50,34 Q50,52 30,58 Q10,52 10,34 Q10,13 30,13 Z"
        fill="rgba(255,255,255,0.08)"
      />
      {/* Tentacles */}
      <path d="M16,62 Q12,74 15,88" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
      <path d="M22,63 Q20,77 22,92" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
      <path d="M30,64 Q30,78 30,94" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
      <path d="M38,63 Q40,77 38,92" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
      <path d="M44,62 Q48,74 45,88" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

export function WhaleSvg({ className = '', style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 240 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      {/* Body */}
      <path d="M10,50 Q30,20 90,32 Q130,42 175,38 Q200,35 218,48 Q200,62 175,62 Q130,58 90,68 Q30,80 10,50 Z" />
      {/* Tail flukes */}
      <path d="M214,42 Q236,28 230,50 Q236,72 214,58 Q220,50 214,42 Z" />
      {/* Dorsal fin */}
      <path d="M120,35 Q132,18 144,35" />
      {/* Pec fin */}
      <path d="M90,48 Q80,62 98,65 Q106,56 90,48 Z" />
      {/* Eye */}
      <circle cx="52" cy="46" r="5.5" fill="rgba(5,14,26,0.4)" />
      <circle cx="51" cy="45" r="2" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}
