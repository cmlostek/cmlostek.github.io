import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';

const VIDEO_ID = process.env.REACT_APP_MUSIC_VIDEO_ID || 'REPLACE_WITH_VIDEO_ID';

function postPlayerCommand(iframeEl, func, args = []) {
  if (!iframeEl || !iframeEl.contentWindow) return;
  const message = JSON.stringify({ event: 'command', func, args });
  iframeEl.contentWindow.postMessage(message, '*');
}

export default function Footer() {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [userStopped, setUserStopped] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Ensure we send the setVolume command a bit after mount to increase success rate
    const initTimeout = setTimeout(() => {
      // Set volume to ~50%
      postPlayerCommand(iframe, 'setVolume', [50]);
      // Try to start playback (muted autoplay is allowed by browsers)
      postPlayerCommand(iframe, 'playVideo');
    }, 500);

    // Auto-unmute on first user gesture unless the user explicitly stopped playback
    const onFirstGesture = () => {
      if (userStopped) return;
      // set volume again to be safe, then unmute
      postPlayerCommand(iframe, 'setVolume', [50]);
      postPlayerCommand(iframe, 'unMute');
      setIsPlaying(true);
      window.removeEventListener('click', onFirstGesture, { capture: true });
      window.removeEventListener('keydown', onFirstGesture, { capture: true });
      window.removeEventListener('touchstart', onFirstGesture, { capture: true });
    };
    window.addEventListener('click', onFirstGesture, { capture: true });
    window.addEventListener('keydown', onFirstGesture, { capture: true });
    window.addEventListener('touchstart', onFirstGesture, { capture: true });

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('click', onFirstGesture, { capture: true });
      window.removeEventListener('keydown', onFirstGesture, { capture: true });
      window.removeEventListener('touchstart', onFirstGesture, { capture: true });
    };
  }, [userStopped]);

  const handleToggle = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (isPlaying) {
      postPlayerCommand(iframe, 'pauseVideo');
      setUserStopped(true);
      setIsPlaying(false);
    } else {
      // user action: unmute and play at 50%
      postPlayerCommand(iframe, 'setVolume', [50]);
      postPlayerCommand(iframe, 'unMute');
      postPlayerCommand(iframe, 'playVideo');
      setUserStopped(false);
      setIsPlaying(true);
    }
  };

  // iframe src: enablejsapi=1 for postMessage control, autoplay=1 & mute=1 so autoplay works,
  // loop=1 & playlist=<id> for looping. origin helps with some browsers.
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const src = `https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&origin=${encodeURIComponent(origin)}`;

  return (
    <footer className="site-footer">
      <div className="footer-controls">
        <button className="music-toggle" onClick={handleToggle}>
          {isPlaying ? 'Stop Music' : 'Play Music'}
        </button>
        <small className="music-note">Music volume preset to ~50%</small>
      </div>

      {/* Hidden iframe controlled via postMessage */}
      <iframe
        ref={iframeRef}
        title="site-music-player"
        src={src}
        className="hidden-music-iframe"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </footer>
  );
}
