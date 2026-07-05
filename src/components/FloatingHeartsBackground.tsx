import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface HeartParticle {
  id: number;
  x: number; // percentage width
  size: number;
  delay: number;
  duration: number;
  color: string;
  drift: number; // horizontal drift amplitude
}

export default function FloatingHeartsBackground() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Generate lots of small, delicate, romantic floating hearts
    const colors = [
      "rgba(149, 0, 42, 0.15)",   // Warm crimson
      "rgba(244, 63, 94, 0.18)",   // Sweet rose
      "rgba(251, 113, 133, 0.15)", // Cute pastel pink
      "rgba(212, 175, 55, 0.12)",  // Royal gold glimmer
    ];

    const generatedHearts = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random start across the viewport width
      size: Math.random() * 10 + 6, // smaller elegant sizes between 6px and 16px
      delay: Math.random() * -25, // negative delay so they are pre-populated on load!
      duration: Math.random() * 12 + 12, // float durations (12s to 24s)
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 60 - 30, // side-to-side drift offset
    }));

    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      {/* Gentle rising field of small hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{
            left: `${heart.x}%`,
            color: heart.color,
          }}
          initial={{ y: "105vh", opacity: 0, scale: 0.6, rotate: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.6, 1, 1.1, 0.7],
            x: [0, heart.drift, heart.drift * -0.5, heart.drift],
            rotate: [0, 25, -25, 45],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Gentle ambient glowing pulses in corners */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-red-100/10 blur-[80px] sm:blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-[-10%] left-[-10%] w-[55vw] h-[55vw] max-w-[500px] rounded-full bg-rose-100/10 blur-[70px] sm:blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: "12s" }} />
    </div>
  );
}
