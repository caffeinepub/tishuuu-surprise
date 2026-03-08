import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ButtonPos {
  top: number;
  left: number;
}

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  symbol: string;
  color: string;
}

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CONFETTI_SYMBOLS = ["💖", "💕", "🌸", "✨", "💗", "🌺", "💝", "⭐"];
const CONFETTI_COLORS = [
  "#ff6b9d",
  "#ff1493",
  "#ffb3c8",
  "#ff69b4",
  "#ffd1dc",
  "#fff",
];
const HEART_CHARS = ["💕", "💖", "💗", "🌸", "✨", "💝"];

function makeConfetti(count: number): Confetti[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2.5 + Math.random() * 3,
    size: 14 + Math.floor(Math.random() * 20),
    symbol:
      CONFETTI_SYMBOLS[Math.floor(Math.random() * CONFETTI_SYMBOLS.length)],
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }));
}

function makeHearts(count: number): Heart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 12 + Math.floor(Math.random() * 24),
  }));
}

const HEARTS = makeHearts(22);
const CONFETTI = makeConfetti(60);

// ─── Runaway button ───────────────────────────────────────────────────────────
function getRandomPos(): ButtonPos {
  const margin = 80;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return {
    top: margin + Math.random() * (vh - margin * 2),
    left: margin + Math.random() * (vw - margin * 2),
  };
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [buttonPos, setButtonPos] = useState<ButtonPos>({ top: 0, left: 0 });
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // Keep button visible on screen resize
  useEffect(() => {
    if (!isFixed) return;
    const clamp = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const margin = 80;
      setButtonPos((prev) => ({
        top: Math.min(Math.max(prev.top, margin), vh - margin),
        left: Math.min(Math.max(prev.left, margin), vw - margin),
      }));
    };
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, [isFixed]);

  const runAway = useCallback(() => {
    if (!isFixed) setIsFixed(true);
    setButtonPos(getRandomPos());
  }, [isFixed]);

  const handleNoTouch = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      runAway();
    },
    [runAway],
  );

  return (
    <div className="romantic-root">
      {/* ── Animated background hearts ── */}
      <div className="hearts-bg" aria-hidden="true">
        {HEARTS.map((h) => (
          <span
            key={h.id}
            className="bg-heart"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            {HEART_CHARS[h.id % HEART_CHARS.length]}
          </span>
        ))}
      </div>

      {/* ── Main content ── */}
      <main className="romantic-main">
        <motion.div
          className="romantic-card"
          initial={{ opacity: 0, y: 40, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title */}
          <motion.h1
            className="romantic-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            For My Tishuuuu 💕
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            className="petal-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            🌸 &nbsp;💖&nbsp; 🌸
          </motion.div>

          {/* Love paragraph */}
          <motion.p
            className="love-para"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Ladliiiiiii, chup chapppp meri cutieee shaadi kr lena mere se,
            because, ab tumsaa jaha me koi nhi h hum toh tumhare ho bethe.{" "}
            <span className="love-highlight">
              Love you Tishuuuu my cutuuuu 💖
            </span>
          </motion.p>

          {/* Question */}
          <motion.div
            className="question-wrap"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="question-text">
              Did you forgive me my tishuuu, my sweety my babyyyyy? 🥺
            </p>
            <p className="question-sub">Please maan jaao... 🙏💕</p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="buttons-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {/* YES button */}
            <motion.button
              data-ocid="main.primary_button"
              className="btn-yes"
              onClick={() => setShowCelebration(true)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
            >
              Maan gyi 💖
            </motion.button>

            {/* NO button — runs away */}
            {!isFixed && (
              <motion.button
                ref={noBtnRef}
                data-ocid="main.secondary_button"
                className="btn-no"
                onMouseEnter={runAway}
                onTouchStart={handleNoTouch}
                whileHover={{ opacity: 0.7 }}
                aria-label="Nhi manungi — this button likes to run away!"
              >
                Nhi manungi 😤
              </motion.button>
            )}
          </motion.div>

          {/* Hint text for when button ran away */}
          <AnimatePresence>
            {isFixed && (
              <motion.p
                className="hint-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Arey arey! Button bhaag gaya 😂 Seedha "Maan gyi" dabaao!
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* ── Runaway "No" button — fixed positioning ── */}
      <AnimatePresence>
        {isFixed && (
          <motion.button
            data-ocid="main.toggle"
            className="btn-no btn-no-fixed"
            style={{ top: buttonPos.top, left: buttonPos.left }}
            onMouseEnter={runAway}
            onTouchStart={handleNoTouch}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.75 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label="Nhi manungi — runaway button"
          >
            Nhi manungi 😤
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Celebration overlay ── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            data-ocid="main.success_state"
            className="celebration-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Confetti rain */}
            <div className="confetti-layer" aria-hidden="true">
              {CONFETTI.map((c) => (
                <span
                  key={c.id}
                  className="confetti-piece"
                  style={{
                    left: `${c.left}%`,
                    fontSize: `${c.size}px`,
                    color: c.color,
                    animationDuration: `${c.duration}s`,
                    animationDelay: `${c.delay}s`,
                  }}
                >
                  {c.symbol}
                </span>
              ))}
            </div>

            {/* Card */}
            <motion.div
              className="celebration-card"
              initial={{ scale: 0.6, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <motion.h2
                className="celeb-title"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Yesss!! 🎉
              </motion.h2>

              <motion.img
                src="/assets/generated/good-choice-meme.dim_600x500.png"
                alt="Good choice meme — celebrating Tishuu saying yes!"
                className="meme-img"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                loading="lazy"
              />

              <motion.p
                className="celeb-msg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Mujhe pata tha tum maan jaogi! 🎉💕
                <br />
                <span className="celeb-sub">
                  Ab sirf pyaar pyaar pyaar! 💖🌸
                </span>
              </motion.p>

              <motion.button
                data-ocid="main.close_button"
                className="btn-replay"
                onClick={() => {
                  setShowCelebration(false);
                  setIsFixed(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                Phir se dekhein 🔁
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="romantic-footer">
        <p>
          Made with 💕 for Tishuuuu &nbsp;·&nbsp;{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="main.link"
            className="footer-link"
          >
            Built with love using caffeine.ai
          </a>{" "}
          © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
