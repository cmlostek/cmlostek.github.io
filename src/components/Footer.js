import React, { useRef, useState, useEffect, useCallback } from 'react';
import './Footer.css';

/* ─── Ocean Ambience ────────────────────────────────────────────────────────
   Layers:
     1. Low sine drone (55 Hz / A1) – deep ocean hum
     2. Pink-ish noise filtered to ~300 Hz – ocean wash
     3. Slow LFO (0.08 Hz) modulating the filter frequency by ±180 Hz – wave motion
   Master gain: ~0.12 (very quiet)
──────────────────────────────────────────────────────────────────────────── */
function buildOceanGraph(ctx) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.12, ctx.currentTime);
  master.connect(ctx.destination);

  // 1. Drone
  const drone = ctx.createOscillator();
  drone.type = 'sine';
  drone.frequency.value = 55;
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.35;
  drone.connect(droneGain);
  droneGain.connect(master);
  drone.start();

  // 2. Noise source
  const bufLen = 2 * ctx.sampleRate;
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufLen; i++) {
    const white = Math.random() * 2 - 1;
    // Simple pink-ish filter
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  noise.loop = true;

  // 3. Low-pass filter (ocean wash)
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 300;
  filter.Q.value = 0.8;

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.6;

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();

  // 4. LFO → filter frequency modulation (wave motion)
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.08;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  return { master, nodes: [drone, noise, lfo] };
}

export default function Footer() {
  const ctxRef    = useRef(null);
  const graphRef  = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.AudioContext && !window.webkitAudioContext) {
      setSupported(false);
    }
  }, []);

  const startAudio = useCallback(() => {
    if (ctxRef.current) {
      // Resume if suspended (e.g. after pause)
      if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume();
      }
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;
    graphRef.current = buildOceanGraph(ctx);
  }, []);

  const stopAudio = useCallback(() => {
    if (ctxRef.current && ctxRef.current.state === 'running') {
      ctxRef.current.suspend();
    }
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        graphRef.current?.nodes.forEach(n => { try { n.stop(); } catch (_) {} });
        ctxRef.current.close();
      }
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-music">
          {supported ? (
            <>
              <button
                className={`music-btn${isPlaying ? ' music-btn--playing' : ''}`}
                onClick={handleToggle}
                aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient ocean music'}
              >
                <span className="music-btn__icon" aria-hidden="true">
                  {isPlaying ? '▐▐' : '▶'}
                </span>
                {isPlaying ? 'Pause Ocean' : 'Play Ocean'}
              </button>
              <span className="music-hint">ambient · very low volume</span>
            </>
          ) : (
            <span className="music-hint">Web Audio not supported in this browser</span>
          )}
        </div>

        <p className="footer-copy">
          &copy; {year} Cole Mlostek
        </p>
      </div>
    </footer>
  );
}
