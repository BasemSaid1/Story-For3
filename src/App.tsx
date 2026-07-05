import React, { useState, useEffect } from "react";
import MusicPlayer from "./components/MusicPlayer";
import GiftBox from "./components/GiftBox";
import Gallery from "./components/Gallery";
import Timeline from "./components/Timeline";
import Counter from "./components/Counter";
import Letter from "./components/Letter";
import Finale from "./components/Finale";
import FloatingHeartsBackground from "./components/FloatingHeartsBackground";
import { Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Revealed stage tracks how much of the story has been unlocked:
  // 0: Gift Box only
  // 1: Gift Box + Gallery
  // 2: Gift Box + Gallery + Timeline
  // 3: Gift Box + Gallery + Timeline + Counter
  // 4: Gift Box + Gallery + Timeline + Counter + Letter
  // 5: Gift Box + Gallery + Timeline + Counter + Letter + Finale
  const [revealedStage, setRevealedStage] = useState(0);

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  const handleUnlockStage = (stage: number, targetId: string) => {
    if (revealedStage < stage) {
      setRevealedStage(stage);
    }
    scrollToSection(targetId);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#121c2a] font-sans relative antialiased selection:bg-red-100 selection:text-red-900 flex flex-col overflow-x-hidden">
      {/* Interactive, beautiful floating animated background with small hearts */}
      <FloatingHeartsBackground />

      {/* Audio Control & Floating Header */}
      <MusicPlayer />
      
      <header className="absolute top-0 inset-x-0 z-40 flex justify-between items-center px-6 md:px-12 py-5 pointer-events-none">
        {/* Left aligned title badge */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="font-playfair text-lg md:text-xl italic font-extrabold text-[#95002a] select-none pointer-events-auto"
        >
          For Omnia
        </motion.div>
        
        {/* Right side floating romantic badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 bg-white/75 backdrop-blur-sm px-3 py-1 rounded-full border border-red-50/50 shadow-sm pointer-events-auto"
        >
          <span className="font-amiri text-xs font-bold text-[#95002a]">حكاية حبنا</span>
          <Heart size={14} className="fill-[#95002a] text-[#95002a] animate-pulse" />
        </motion.div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-grow w-full max-w-2xl mx-auto px-4 pt-20 pb-32 flex flex-col items-center">
        
        {/* Step 1: The Gift Box surprise at the very top */}
        <div id="section-giftbox" className="w-full flex justify-center min-h-[85vh] flex-col items-center">
          <GiftBox onOpenNext={() => handleUnlockStage(1, "section-gallery")} />
        </div>

        {/* Dynamic Storytelling Timeline: Parts reveal sequentially */}
        <AnimatePresence>
          {revealedStage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center gap-16 mt-6"
            >
              {/* Divider */}
              <div className="flex items-center justify-center gap-3 text-red-200/80 w-full my-4">
                <Heart size={10} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100 rounded-full" />
                <Heart size={14} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100 rounded-full" />
                <Heart size={10} className="fill-current" />
              </div>

              {/* Gallery Section */}
              <div id="section-gallery" className="w-full scroll-mt-24 flex flex-col items-center">
                <Gallery />
                
                {/* Reveal Timeline Button */}
                {revealedStage === 1 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUnlockStage(2, "section-timeline")}
                    className="mt-8 bg-[#95002a] text-white font-amiri font-bold text-base px-6 py-2.5 rounded-full shadow-md hover:bg-[#be123c] transition-colors flex items-center gap-2 border border-red-200/20"
                  >
                    <span>رؤية خطنا الزمني 📖</span>
                    <ChevronDown size={18} className="animate-bounce" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {revealedStage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center gap-16"
            >
              {/* Divider */}
              <div className="flex items-center justify-center gap-3 text-red-200/80 w-full my-6">
                <Heart size={10} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100/60 rounded-full" />
                <Heart size={14} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100/60 rounded-full" />
                <Heart size={10} className="fill-current" />
              </div>

              {/* Timeline Section */}
              <div id="section-timeline" className="w-full scroll-mt-24 flex flex-col items-center">
                <Timeline />
                
                {/* Reveal Counter Button */}
                {revealedStage === 2 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUnlockStage(3, "section-counter")}
                    className="mt-8 bg-[#735c00] text-white font-amiri font-bold text-base px-6 py-2.5 rounded-full shadow-md hover:bg-yellow-800 transition-colors flex items-center gap-2 border border-yellow-200/20"
                  >
                    <span>كم يوماً مرَّ على حبنا؟ ⏳</span>
                    <ChevronDown size={18} className="animate-bounce" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {revealedStage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center gap-16"
            >
              {/* Divider */}
              <div className="flex items-center justify-center gap-3 text-red-200/80 w-full my-6">
                <Heart size={10} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100/60 rounded-full" />
                <Heart size={14} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100/60 rounded-full" />
                <Heart size={10} className="fill-current" />
              </div>

              {/* Counter Section */}
              <div id="section-counter" className="w-full scroll-mt-24 flex flex-col items-center">
                <Counter />
                
                {/* Reveal Letter Button */}
                {revealedStage === 3 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUnlockStage(4, "section-letter")}
                    className="mt-8 bg-[#95002a] text-white font-amiri font-bold text-base px-6 py-2.5 rounded-full shadow-md hover:bg-[#be123c] transition-colors flex items-center gap-2 border border-red-200/20"
                  >
                    <span>لقراءة رسالتكِ الخاصة ✉️</span>
                    <ChevronDown size={18} className="animate-bounce" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {revealedStage >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center gap-16"
            >
              {/* Divider */}
              <div className="flex items-center justify-center gap-3 text-red-200/80 w-full my-6">
                <Heart size={10} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100/60 rounded-full" />
                <Heart size={14} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100/60 rounded-full" />
                <Heart size={10} className="fill-current" />
              </div>

              {/* Letter Section */}
              <div id="section-letter" className="w-full scroll-mt-24 flex flex-col items-center">
                <Letter />
                
                {/* Reveal Finale Button */}
                {revealedStage === 4 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUnlockStage(5, "section-finale")}
                    className="mt-8 bg-[#735c00] text-white font-amiri font-bold text-base px-6 py-2.5 rounded-full shadow-md hover:bg-yellow-800 transition-colors flex items-center gap-2 border border-yellow-200/20"
                  >
                    <span>اضغطي لمفاجأة الختام ✨</span>
                    <ChevronDown size={18} className="animate-bounce" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {revealedStage >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center gap-16"
            >
              {/* Divider */}
              <div className="flex items-center justify-center gap-3 text-red-200/80 w-full my-6">
                <Heart size={10} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100/60 rounded-full" />
                <Heart size={14} className="fill-current" />
                <div className="w-16 sm:w-24 h-0.5 bg-red-100/60 rounded-full" />
                <Heart size={10} className="fill-current" />
              </div>

              {/* Finale Section */}
              <div id="section-finale" className="w-full scroll-mt-24 flex flex-col items-center">
                <Finale />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
