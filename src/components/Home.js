import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Home.css';

const RANDOM_CHARACTER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()[]{}<>?/|~';

function generateRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * RANDOM_CHARACTER_SET.length);
  return RANDOM_CHARACTER_SET[randomIndex];
}

function generateRandomizedString(targetText) {
  return targetText
    .split('')
    .map((character) => (character === ' ' ? ' ' : generateRandomCharacter()))
    .join('');
}

function scrambleText(targetText, revealCount) {
  const characters = targetText.split('');
  for (let index = revealCount; index < characters.length; index += 1) {
    if (characters[index] === ' ') {
      continue;
    }
    characters[index] = generateRandomCharacter();
  }
  return characters.join('');
}

export default function Home() {
  const targetText = useMemo(() => 'Cole Mlostek', []);
  const [displayText, setDisplayText] = useState(() => generateRandomizedString(targetText));
  const [revealedCharactersCount, setRevealedCharactersCount] = useState(0);
  const scrambleIntervalRef = useRef(null);
  const revealIntervalRef = useRef(null);

  useEffect(() => {
    // Frequently scramble unrevealed characters for the jumbled animation effect
    scrambleIntervalRef.current = setInterval(() => {
      setDisplayText((current) => {
        return scrambleText(targetText, revealedCharactersCount);
      });
    }, 30);

    // Gradually reveal the target text, one character at a time
    revealIntervalRef.current = setInterval(() => {
      setRevealedCharactersCount((count) => {
        if (count >= targetText.length) {
          return count;
        }

        const nextCount = count + 1;
        // Ensure spaces are revealed atomically (skip to include spaces)
        let adjustedCount = nextCount;
        while (adjustedCount < targetText.length && targetText[adjustedCount - 1] === ' ') {
          adjustedCount += 1;
        }

        // Update the display to reflect the newly revealed characters
        setDisplayText((prev) => {
          const revealedPortion = targetText.slice(0, adjustedCount);
          const scrambledRemainder = scrambleText(targetText.slice(adjustedCount), 0);
          return revealedPortion + scrambledRemainder;
        });

        return adjustedCount;
      });
    }, 120);

    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
      if (revealIntervalRef.current) {
        clearInterval(revealIntervalRef.current);
      }
    };
  }, [targetText, revealedCharactersCount]);

  useEffect(() => {
    // Stop scrambling once fully revealed
    if (revealedCharactersCount >= targetText.length) {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
      if (revealIntervalRef.current) {
        clearInterval(revealIntervalRef.current);
      }
      setDisplayText(targetText);
    }
  }, [revealedCharactersCount, targetText]);

  const backgroundImageUrl = `${process.env.PUBLIC_URL || ''}/pfp.jpeg`;

  return (
    <section className="home-hero" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="home-hero__overlay" />
      <div className="home-hero__content">
        <h1 className="home-hero__title" aria-label={targetText}>
          {displayText}
        </h1>
      </div>
    </section>
  );
}


