import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart } from "lucide-react";

interface GiftBoxProps {
  onOpenNext: () => void;
}

export default function GiftBox({ onOpenNext }: GiftBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Delay showing the inner message to allow the opening animation to play
    setTimeout(() => {
      setShowContent(true);
    }, 800);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-4 sm:py-8 px-4 relative overflow-hidden">
      {/* Decorative floating hearts in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: `${Math.random() * 100}vw`, scale: 0.5 + Math.random() }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-red-400"
          >
            <Heart size={24} className="fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-6 sm:mb-8 max-w-xl z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-amiri text-3xl sm:text-4xl md:text-5xl text-[#95002a] font-bold mb-2 tracking-tight"
        >
          مفاجأة لكِ يا أمنية ✨
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-sans text-base sm:text-lg text-slate-600 font-medium"
        >
          اضغطي على الصندوق واكتشفي ما بداخله...
        </motion.p>
      </div>

      {/* Gift Box Container */}
      <div className="relative w-64 h-64 flex items-center justify-center cursor-pointer z-10" onClick={handleOpen}>
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute text-yellow-500 pointer-events-none"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles size={40} className="translate-y-[-110px]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D-Like Gift Box Representation using HTML/Tailwind */}
        <div className="relative w-40 h-40">
          {/* Lid */}
          <motion.div 
            className="absolute w-[172px] h-9 bg-[#95002a] border-2 border-[#D4AF37] rounded-md z-30 left-[-6px] top-[-8px] shadow-lg flex items-center justify-center"
            animate={isOpen ? { 
              y: -100, 
              x: 60, 
              rotate: 45, 
              opacity: 0,
              scale: 0.8
            } : { 
              y: [0, -3, 0],
            }}
            transition={isOpen ? {
              type: "spring",
              stiffness: 80,
              damping: 10
            } : {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            {/* Ribbon crossing on lid */}
            <div className="absolute w-7 h-full bg-[#D4AF37]" />
            <div className="absolute h-7 w-full bg-[#D4AF37]" />
            {/* Box Lid bow representation */}
            <div className="absolute -top-3.5 w-10 h-5 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-md">
              <div className="w-3.5 h-3.5 rounded-full bg-[#95002a]" />
            </div>
          </motion.div>

          {/* Box Body */}
          <motion.div 
            className="absolute inset-0 bg-[#be123c] border-2 border-[#D4AF37] rounded-b-lg shadow-xl overflow-hidden z-20"
            whileHover={!isOpen ? { scale: 1.05, rotate: [0, -2, 2, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            {/* Ribbon crossing on body */}
            <div className="absolute w-7 h-full bg-[#D4AF37] left-1/2 translate-x-[-50%]" />
            <div className="absolute h-7 w-full bg-[#D4AF37] top-1/2 translate-y-[-50%]" />
            
            {/* Depth/Shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Sparkles coming out when box opens */}
          {isOpen && !showContent && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0], 
                    x: (Math.random() - 0.5) * 250, 
                    y: (Math.random() - 0.5) * 250 - 40,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute text-yellow-400"
                >
                  <Sparkles size={16} className="fill-current" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reveal Message */}
      <div className="min-h-24 flex flex-col items-center justify-center mt-6 z-10 px-4">
        <AnimatePresence>
          {showContent && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-center max-w-md"
            >
              <h3 className="font-amiri text-xl sm:text-2xl text-[#735c00] font-bold mb-4 flex flex-wrap items-center justify-center gap-1.5 leading-relaxed">
                <Heart size={20} className="fill-red-600 text-red-600 animate-pulse inline" />
                أنتِ أغلى وأجمل هدية في حياتي يا أمنية
                <Heart size={20} className="fill-red-600 text-red-600 animate-pulse inline" />
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenNext}
                className="bg-[#95002a] text-white px-8 py-3 rounded-full font-sans text-sm tracking-wider hover:bg-[#be123c] transition-all shadow-lg shadow-red-900/10 hover:shadow-red-900/20 font-bold border border-[#D4AF37]/30"
              >
                تابعي الرحلة معنا ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
