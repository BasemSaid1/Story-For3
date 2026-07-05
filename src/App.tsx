import React, { useState } from "react";
import MusicPlayer from "./components/MusicPlayer";
import GiftBox from "./components/GiftBox";
import Gallery from "./components/Gallery";
import Timeline from "./components/Timeline";
import Counter from "./components/Counter";
import Letter from "./components/Letter";
import Finale from "./components/Finale";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [unlockedStep, setUnlockedStep] = useState(0);

  const handleNextStep = (nextIndex?: number) => {
    const targetStep = nextIndex !== undefined ? nextIndex : currentStep + 1;
    if (targetStep <= 5) {
      setCurrentStep(targetStep);
      setUnlockedStep((prev) => Math.max(prev, targetStep));
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDotClick = (index: number) => {
    if (index <= unlockedStep) {
      setCurrentStep(index);
    }
  };

  const stepLabels = [
    "الهدية المفاجأة",
    "معرض اللحظات",
    "خطنا الزمني",
    "أيامنا السعيدة",
    "رسالة من القلب",
    "مفاجأة الختام"
  ];

  const renderActiveStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="giftbox"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <GiftBox onOpenNext={() => handleNextStep(1)} />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <Gallery />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <Timeline />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="counter"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <Counter />
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <Letter />
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <Finale />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#121c2a] font-sans relative antialiased selection:bg-red-100 selection:text-red-900 flex flex-col justify-between overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-100/20 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[30%] left-0 w-[300px] h-[300px] bg-pink-100/15 blur-[80px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-rose-100/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Audio Control & Floating Header */}
      <MusicPlayer />
      
      <header className="absolute top-0 inset-x-0 z-40 flex justify-between items-center px-4 md:px-12 py-3 sm:py-4 pointer-events-none">
        {/* Left aligned title badge */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="font-playfair text-base sm:text-lg md:text-xl italic font-extrabold text-[#95002a] select-none pointer-events-auto"
        >
          For Omnia
        </motion.div>
        
        {/* Right side floating elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-red-50/50 shadow-sm pointer-events-auto"
        >
          <span className="font-amiri text-xs font-bold text-[#95002a]">{stepLabels[currentStep]}</span>
          <Heart size={13} className="fill-[#95002a] text-[#95002a] animate-pulse" />
        </motion.div>
      </header>

      {/* Main Slide Screen Container - Centered viewport height and optimized spacing to completely prevent overflow */}
      <main className="relative z-10 flex-grow w-full max-w-4xl mx-auto px-4 pt-24 pb-4 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {renderActiveStep()}
        </AnimatePresence>
      </main>

      {/* Unified Step Navigation & Progress Controls - Flows naturally below the main content */}
      <div className="relative w-full max-w-lg mx-auto py-6 px-4 pb-12 flex flex-col gap-3 items-center justify-between z-40">
        {/* Dots indicator with label */}
        <div className="flex flex-col items-center gap-1.5 w-full">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {stepLabels.map((label, index) => {
              const isCurrent = index === currentStep;
              const isUnlocked = index <= unlockedStep;
              return (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  disabled={!isUnlocked}
                  whileHover={isUnlocked ? { scale: 1.15 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                  className={`relative flex items-center justify-center transition-all ${
                    isCurrent 
                      ? "w-5 h-2.5 rounded-full bg-[#95002a]" 
                      : isUnlocked 
                        ? "w-2 h-2 rounded-full bg-red-300 hover:bg-red-400" 
                        : "w-1.5 h-1.5 rounded-full bg-slate-200 cursor-not-allowed"
                  }`}
                  title={label}
                >
                  {isCurrent && (
                    <Heart size={6} className="fill-white text-white" />
                  )}
                </motion.button>
              );
            })}
          </div>
          <span className="font-amiri text-[10px] sm:text-[11px] font-bold text-slate-500 select-none">
            الخطوة {currentStep + 1} من ٦: {stepLabels[currentStep]}
          </span>
        </div>

        {/* Navigation Buttons (Back & Next) */}
        <div className="flex items-center justify-between w-full max-w-lg">
          {/* Back button */}
          <div className="w-20 sm:w-24">
            {currentStep > 0 && (
              <motion.button
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevStep}
                className="flex items-center gap-0.5 text-[#95002a] hover:text-[#be123c] font-amiri font-bold text-sm sm:text-base py-1"
              >
                <ChevronRight size={16} className="stroke-[2.5]" />
                <span>السابق</span>
              </motion.button>
            )}
          </div>

          {/* Central romantic marker */}
          <div className="hidden sm:flex items-center gap-1 text-red-200/80">
            <Heart size={8} className="fill-current" />
            <Heart size={12} className="fill-current" />
            <Heart size={8} className="fill-current" />
          </div>

          {/* Next button */}
          <div className="w-20 sm:w-24 flex justify-end">
            {currentStep < 5 && currentStep <= unlockedStep && (
              <motion.button
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNextStep()}
                // For step 0, hide until they open the box through the box interactions
                className={`flex items-center gap-0.5 bg-[#95002a] hover:bg-[#be123c] text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-amiri font-bold text-sm sm:text-base shadow-sm transition-colors border border-red-100 ${
                  currentStep === 0 && unlockedStep === 0 ? "hidden" : ""
                }`}
              >
                <span>التالي</span>
                <ChevronLeft size={16} className="stroke-[2.5]" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
