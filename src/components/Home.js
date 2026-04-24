import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Home.css';

// ── Text scramble helpers ─────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
function randChar() { return CHARS[Math.floor(Math.random() * CHARS.length)]; }
function scrambleText(target, revealCount) {
  return target.split('').map((ch, i) => (i < revealCount || ch === ' ' ? ch : randChar())).join('');
}

// ── Bird data ─────────────────────────────────────────────────────────────────
const BIRD_DATA = [
  { id: 0, top: '22%', size: 32, delay: '0s',   dur: '18s' },
  { id: 1, top: '17%', size: 22, delay: '6s',   dur: '24s' },
  { id: 2, top: '29%', size: 28, delay: '11s',  dur: '15s' },
  { id: 3, top: '13%', size: 18, delay: '17s',  dur: '28s' },
  { id: 4, top: '34%', size: 24, delay: '3s',   dur: '21s' },
  { id: 5, top: '19%', size: 16, delay: '14s',  dur: '32s' },
  { id: 6, top: '25%', size: 20, delay: '8s',   dur: '19s' },
];

function Birds() {
  return (
    <div className="birds" aria-hidden="true">
      {BIRD_DATA.map(b => (
        <svg
          key={b.id}
          className="bird"
          style={{
            top: b.top,
            width: b.size,
            height: b.size * 0.4,
            animationDelay: b.delay,
            animationDuration: b.dur,
          }}
          viewBox="0 0 32 12"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M0,6 Q8,0 16,6 Q24,0 32,6" />
        </svg>
      ))}
    </div>
  );
}

// ── Star data — generated once at module load (stable, no useMemo needed) ────
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  cx: parseFloat((Math.random() * 100).toFixed(2)),
  cy: parseFloat((Math.random() * 82).toFixed(2)),   // upper 82% of sky layer
  r:  parseFloat((0.18 + Math.random() * 0.52).toFixed(2)),
  dur:   (2.5 + Math.random() * 3.5).toFixed(1) + 's',
  delay: (Math.random() * 6).toFixed(1) + 's',
}));

// ── Wave paths (tileable: start-y === end-y) ─────────────────────────────────
const WAVE_PATHS = [
  'M0,40 C240,80 480,0 720,45 C960,90 1200,10 1440,40 L1440,120 L0,120 Z',
  'M0,60 C200,30 450,100 720,55 C990,10 1240,85 1440,60 L1440,120 L0,120 Z',
  'M0,75 C360,40 480,100 720,75 C960,50 1080,100 1440,75 L1440,120 L0,120 Z',
];

function WaveLayer({ pathD, className }) {
  return (
    <div className={`wave-track ${className}`}>
      <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d={pathD} />
      </svg>
      <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d={pathD} />
      </svg>
    </div>
  );
}

// ── Sky layer: stars, moon, planets ─────────────────────────────────────────
function SkyLayer({ offset, reducedMotion }) {
  const style = reducedMotion ? {} : { transform: `translateY(${-offset * 0.22}px)` };

  return (
    <div className="sky-layer" style={style} aria-hidden="true">
      {/* Star field */}
      <svg
        className="star-field"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 4-pointed star, normalized to ±1, centered at origin */}
          <path id="star4" d="M0,-1 L0.22,-0.22 L1,0 L0.22,0.22 L0,1 L-0.22,0.22 L-1,0 L-0.22,-0.22 Z" />
        </defs>
        {STARS.map(s => (
          <use
            key={s.id}
            href="#star4"
            transform={`translate(${s.cx},${s.cy}) scale(${s.r * 1.3})`}
            className="star"
            style={{ animationDuration: s.dur, animationDelay: s.delay }}
          />
        ))}
      </svg>

      {/* Moon */}
      <div className="moon">
        <div className="moon__halo" />
        <div className="moon__crater moon__crater--1" />
        <div className="moon__crater moon__crater--2" />
        <div className="moon__crater moon__crater--3" />
      </div>

      {/* Background sky planets */}
      <div className="sky-planet sky-planet--1" />
      <div className="sky-planet sky-planet--2" />

      {/* Sun — rises in light mode */}
      <div className="sun" aria-hidden="true" />

      {/* Birds — fly in light mode */}
      <Birds />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Home() {
  const targetText = useMemo(() => 'Cole Mlostek', []);
  const [displayText, setDisplayText] = useState(() => scrambleText(targetText, 0));
  const [revealCount,  setRevealCount]  = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [skyOffset, setSkyOffset] = useState(0);

  const scrambleRef = useRef(null);
  const revealRef   = useRef(null);
  const rafRef      = useRef(null);

  // Reduced-motion preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(!!mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update); };
  }, []);

  // Scroll parallax (rAF-throttled)
  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setSkyOffset(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  // Text scramble
  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(targetText);
      setRevealCount(targetText.length);
      return;
    }
    scrambleRef.current = setInterval(() => setDisplayText(scrambleText(targetText, revealCount)), 30);
    revealRef.current = setInterval(() => {
      setRevealCount(count => {
        if (count >= targetText.length) return count;
        let next = count + 1;
        while (next < targetText.length && targetText[next - 1] === ' ') next++;
        setDisplayText(scrambleText(targetText, next));
        return next;
      });
    }, 120);
    return () => { clearInterval(scrambleRef.current); clearInterval(revealRef.current); };
  }, [targetText, revealCount, reducedMotion]);

  useEffect(() => {
    if (revealCount >= targetText.length) {
      clearInterval(scrambleRef.current);
      clearInterval(revealRef.current);
      setDisplayText(targetText);
    }
  }, [revealCount, targetText]);

  return (
    <section className="hero" id="home">
      {/* Sky with parallax */}
      <SkyLayer offset={skyOffset} reducedMotion={reducedMotion} />

      {/* Hero text content */}
      <div className="hero__content">
        <span className="hero__eyebrow">Welcome</span>
        <h1 className="hero__title" aria-label={targetText}>
          {displayText}
        </h1>
        <p className="hero__subtitle">
          Software Engineer&nbsp;&nbsp;·&nbsp;&nbsp;Bioinformatics
        </p>
        <a href="#about" className="hero__cta">Explore</a>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span className="scroll-arrow">↓</span>
      </div>

      {/* Layered waves */}
      <div className="hero__waves" aria-hidden="true">
        <WaveLayer pathD={WAVE_PATHS[0]} className="wave-track--1" />
        <WaveLayer pathD={WAVE_PATHS[1]} className="wave-track--2" />
        <WaveLayer pathD={WAVE_PATHS[2]} className="wave-track--3" />
      </div>
    </section>
  );
}
