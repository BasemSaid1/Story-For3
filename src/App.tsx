import React, { useState } from "react";
import Loader from "./components/Loader";
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
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [unlockedStep, setUnlockedStep] = useState(0);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

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
            transition={{ duration: 0.5 }}
          >
            <GiftBox onOpenNext={() => handleNextStep(1)} />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Gallery />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5 }}
          >
            <Counter />
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5 }}
          >
            <Finale />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#121c2a] font-sans relative antialiased selection:bg-red-100 selection:text-red-900 pb-32">
      {/* 1. Loading Pulse Screen */}
      <Loader onComplete={handleLoaderComplete} />

      {!loading && (
        <>
          {/* Background Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/30 blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="absolute top-[30%] left-0 w-[400px] h-[400px] bg-pink-100/20 blur-[100px] rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-rose-100/30 blur-[140px] rounded-full pointer-events-none z-0" />

          {/* 2. Audio Control & Floating Header */}
          <MusicPlayer />
          
          <header className="absolute top-0 inset-x-0 z-40 flex justify-between items-center px-6 md:px-16 py-6 pointer-events-none">
            {/* Left aligned title badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="font-playfair text-xl md:text-2xl italic font-extrabold text-[#95002a] select-none pointer-events-auto"
            >
              For Omnia
            </motion.div>
            
            {/* Right side floating elements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-red-50/50 shadow-sm pointer-events-auto"
            >
              <span className="font-amiri text-sm font-bold text-[#95002a]">{stepLabels[currentStep]}</span>
              <Heart size={16} className="fill-[#95002a] text-[#95002a] animate-pulse" />
            </motion.div>
          </header>

          {/* Main Slide Screen Container */}
          <main className="relative z-10 min-h-[70vh] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {renderActiveStep()}
            </AnimatePresence>
          </main>

          {/* Unified Step Navigation & Progress Controls */}
          <div className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-md border-t border-red-50 py-4 px-6 md:px-16 flex flex-col gap-3 items-center justify-between z-40 shadow-xl">
            {/* Dots indicator with label */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              <div className="flex items-center gap-2">
                {stepLabels.map((label, index) => {
                  const isCurrent = index === currentStep;
                  const isUnlocked = index <= unlockedStep;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      disabled={!isUnlocked}
                      whileHover={isUnlocked ? { scale: 1.2 } : {}}
                      whileTap={isUnlocked ? { scale: 0.9 } : {}}
                      className={`relative flex items-center justify-center transition-all ${
                        isCurrent 
                          ? "w-8 h-4 rounded-full bg-[#95002a]" 
                          : isUnlocked 
                            ? "w-3 h-3 rounded-full bg-red-300 hover:bg-red-400" 
                            : "w-2.5 h-2.5 rounded-full bg-slate-200 cursor-not-allowed"
                      }`}
                      title={label}
                    >
                      {isCurrent && (
                        <Heart size={10} className="fill-white text-white" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
              <span className="font-amiri text-xs font-bold text-slate-500 select-none">
                الخطوة {currentStep + 1} من ٦: {stepLabels[currentStep]}
              </span>
            </div>

            {/* Navigation Buttons (Back & Next) */}
            <div className="flex items-center justify-between w-full max-w-xl">
              {/* Back button */}
              <div className="w-28">
                {currentStep > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevStep}
                    className="flex items-center gap-1.5 text-[#95002a] hover:text-[#be123c] font-amiri font-bold text-lg py-1.5"
                  >
                    <ChevronRight size={20} className="stroke-[2.5]" />
                    <span>السابق</span>
                  </motion.button>
                )}
              </div>

              {/* Central romantic marker */}
              <div className="hidden sm:flex items-center gap-1 text-red-200">
                <Heart size={12} className="fill-current" />
                <Heart size={16} className="fill-current" />
                <Heart size={12} className="fill-current" />
              </div>

              {/* Next button */}
              <div className="w-28 flex justify-end">
                {currentStep < 5 && currentStep <= unlockedStep && (
                  <motion.button
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNextStep()}
                    // For step 0, hide until they open the box through the box interactions
                    className={`flex items-center gap-1.5 bg-[#95002a] hover:bg-[#be123c] text-white px-5 py-2 rounded-full font-amiri font-bold text-lg shadow-md transition-colors border border-red-100 ${
                      currentStep === 0 && unlockedStep === 0 ? "hidden" : ""
                    }`}
                  >
                    <span>التالي</span>
                    <ChevronLeft size={20} className="stroke-[2.5]" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
