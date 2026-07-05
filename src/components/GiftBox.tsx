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
    <section className="min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#f8f9ff] to-[#eff4ff]">
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

      <div className="text-center mb-12 max-w-xl z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-amiri text-4xl sm:text-5xl md:text-6xl text-[#95002a] font-bold mb-4 tracking-tight"
        >
          مفاجأة لكِ يا أمنية ✨
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-sans text-lg text-slate-600 font-medium"
        >
          اضغطي على الصندوق واكتشفي ما بداخله...
        </motion.p>
      </div>

      {/* Gift Box Container */}
      <div className="relative w-72 h-72 flex items-center justify-center cursor-pointer z-10" onClick={handleOpen}>
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute text-yellow-500 pointer-events-none"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles size={48} className="translate-y-[-140px]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D-Like Gift Box Representation using HTML/Tailwind */}
        <div className="relative w-48 h-48">
          {/* Lid */}
          <motion.div 
            className="absolute w-[204px] h-10 bg-[#95002a] border-2 border-[#D4AF37] rounded-md z-30 left-[-6px] top-[-10px] shadow-lg flex items-center justify-center"
            animate={isOpen ? { 
              y: -120, 
              x: 80, 
              rotate: 45, 
              opacity: 0,
              scale: 0.8
            } : { 
              y: [0, -4, 0],
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
            <div className="absolute w-8 h-full bg-[#D4AF37]" />
            <div className="absolute h-8 w-full bg-[#D4AF37]" />
            {/* Box Lid bow representation */}
            <div className="absolute -top-4 w-12 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-full bg-[#95002a]" />
            </div>
          </motion.div>

          {/* Box Body */}
          <motion.div 
            className="absolute inset-0 bg-[#be123c] border-2 border-[#D4AF37] rounded-b-lg shadow-xl overflow-hidden z-20"
            whileHover={!isOpen ? { scale: 1.05, rotate: [0, -2, 2, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            {/* Ribbon crossing on body */}
            <div className="absolute w-8 h-full bg-[#D4AF37] left-1/2 translate-x-[-50%]" />
            <div className="absolute h-8 w-full bg-[#D4AF37] top-1/2 translate-y-[-50%]" />
            
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
                    x: (Math.random() - 0.5) * 300, 
                    y: (Math.random() - 0.5) * 300 - 50,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute text-yellow-400"
                >
                  <Sparkles size={20} className="fill-current" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reveal Message */}
      <div className="h-32 flex flex-col items-center justify-center mt-12 z-10">
        <AnimatePresence>
          {showContent && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-center"
            >
              <h3 className="font-amiri text-2xl sm:text-3xl text-[#735c00] font-bold mb-6 flex items-center justify-center gap-2">
                <Heart size={28} className="fill-red-600 text-red-600 animate-pulse" />
                أنتِ أغلى وأجمل هدية في حياتي يا أمنية
                <Heart size={28} className="fill-red-600 text-red-600 animate-pulse" />
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenNext}
                className="bg-[#95002a] text-white px-10 py-3.5 rounded-full font-sans text-sm tracking-wider hover:bg-[#be123c] transition-all shadow-lg shadow-red-900/10 hover:shadow-red-900/20 font-bold border border-[#D4AF37]/30"
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
