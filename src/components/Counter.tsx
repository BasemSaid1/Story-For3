import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Calculate dynamic days since 2024-01-01
  const startDate = new Date("2024-01-01");
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const targetDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = 20; // 20ms steps
    const totalSteps = duration / intervalTime;
    const increment = targetDays / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetDays) {
        setCount(targetDays);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, targetDays]);

  return (
    <section 
      ref={containerRef}
      className="py-10 sm:py-12 px-4 bg-[#95002a] text-[#ffd0d2] relative overflow-hidden flex flex-col items-center justify-center rounded-2xl border border-[#D4AF37]/20 max-w-xl mx-auto w-full shadow-lg"
    >
      {/* Decorative floating grids in the background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-6 sm:grid-cols-8 h-full w-full">
          {[...Array(48)].map((_, i) => (
            <div key={i} className="border-r border-b border-white/20 aspect-square" />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-xs uppercase tracking-widest text-[#ffdadb] mb-2 font-bold"
        >
          لقد مرت
        </motion.p>
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold font-playfair text-white tracking-tighter mb-2 text-shadow-md font-amiri"
        >
          {count.toLocaleString("ar-EG")}
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-amiri text-lg sm:text-2xl text-yellow-100 font-bold italic px-2 leading-relaxed"
        >
          يوماً منذ أن أنرتِ عالمي ❤️
        </motion.p>
      </div>
    </section>
  );
}
