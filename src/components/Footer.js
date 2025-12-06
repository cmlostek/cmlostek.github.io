import React, { useRef, useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const youtubeVideoId = 'b0q5PR1xpA0';
  const iframeRef = useRef(null);

  // Default to playing on load
  const [playing, setPlaying] = useState(true);
  // Track whether user explicitly stopped playback to prevent auto-unmute/resume
  const [userStopped, setUserStopped] = useState(false);
  // Track whether we've already unmuted via a user gesture
  const unmutedRef = useRef(false);

  // Build embed URL with enablejsapi so we can control via postMessage; keep mute=1 for autoplay
  const origin = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&rel=0&modestbranding=1&origin=${origin}`;

  // Send YouTube iframe API commands via postMessage
  const postCommand = (cmd) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args: [] }), '*');
  };

  // Attempt to start playback muted on mount (browsers allow muted autoplay)
  useEffect(() => {
    postCommand('playVideo');
  }, []);

  // Auto-unmute on the first user gesture only if player is supposed to be playing and user hasn't stopped it
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tryUnmute = () => {
      if (!playing || userStopped || unmutedRef.current) return;
      postCommand('unMute');
      postCommand('playVideo');
      unmutedRef.current = true;
      // listeners added with { once: true } will auto-remove, but clean up anyway
      window.removeEventListener('pointerdown', tryUnmute);
      window.removeEventListener('keydown', tryUnmute);
      window.removeEventListener('touchstart', tryUnmute);
    };

    // add listeners that run once on first interaction
    window.addEventListener('pointerdown', tryUnmute, { once: true });
    window.addEventListener('keydown', tryUnmute, { once: true });
    window.addEventListener('touchstart', tryUnmute, { once: true });

    return () => {
      window.removeEventListener('pointerdown', tryUnmute);
      window.removeEventListener('keydown', tryUnmute);
      window.removeEventListener('touchstart', tryUnmute);
    };
  }, [playing, userStopped]);

  const handleToggle = () => {
    if (playing) {
      // Stop/pause and mark as user-stopped; auto-unmute/resume will not occur until user explicitly plays again
      postCommand('pauseVideo');
      setPlaying(false);
      setUserStopped(true);
    } else {
      // User explicitly started playback: play and unmute (this click is a user gesture)
      postCommand('playVideo');
      postCommand('unMute');
      setPlaying(true);
      setUserStopped(false);
      unmutedRef.current = true;
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Hidden autoplaying iframe for background music (muted so browsers allow autoplay) */}
        <iframe
          id="bg-music-iframe"
          ref={iframeRef}
          src={youtubeEmbedUrl}
          title="Background music - Cipher by LEMMINO"
          allow="autoplay; encrypted-media"
          style={{ position: 'absolute', width: 1, height: 1, left: -9999, top: 'auto', border: 0 }}
          aria-hidden="true"
        />
        <div className="footer-content">
          <p>&copy; {currentYear} Cole Mlostek. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://github.com/cmlostek" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/colemlostek" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:your.colerm17@gmail.com">
              Email
            </a>
            <a
              href="https://www.yohelab.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Research Lab
            </a>
            <a
              href="https://youtu.be/b0q5PR1xpA0?si=PLMeFO6Wzf8DBLfv"
              target="_blank"
              rel="noopener noreferrer"
            >
              Music: Cipher — LEMMINO
            </a>

            {/* Play/unmute toggle (user gesture to enable sound) */}
            <button
              type="button"
              className={`music-toggle ${playing ? 'playing' : ''}`}
              onClick={handleToggle}
              aria-pressed={playing}
              aria-label={playing ? 'Stop background music' : 'Play background music'}
            >
              {playing ? 'Stop Music' : 'Play Music'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
