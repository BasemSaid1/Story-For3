import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    {
      id: 1,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDL9dj3xhVYlqmUbQ0qmYEbjRr7znBgBAwThsWbuEjZNj8pUVsHayKqJQswQDC9dcWMl0MDZ1NHQWMHvGU7aUz2n2QJa21Vnal_cteFxMLvfArGTjJCm22kNjWpjpPxmHvdau7-bdkkIWPNLXagB3JKQCLfVhocrlQA5UqBITxpx8-20qI3KqGsQK72B84H--hWTRU7dznV2h56rVErKdq5TJS8N4XoN114wmX6FQ0FpKkimiZWZScgwsLBtZ1WWk4nUeVU7u88DYE",
      caption: "أول يوم تقابلنا فيه...",
      rotate: "-rotate-2",
      hoverRotate: "hover:rotate-0"
    },
    {
      id: 2,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA66RCVkkjwcNZSaxMsgGh839vTXwVa8R5AKtWZYFugX4_EvW55zTSWzuDHPNZ6tMehTjASrLzV46ty-wtNUJRzZJ4MT7oAK2DmRp7eeaFZmVrQ95sHIaT9rgBEq4WdjO5VMyIAaSnLH4O7Rhqbdj_VFonNgcC5LTzXa7qA8d5ZblR-WWkJvnoDY6m7qklaWGNLooySvSqKeniaMZajKp28lKeVecAHkITWwO52e59vlGDHK_9NuGPLY_d-oQO7sJpx_OpAuwlF5Dpw",
      caption: "ضحكتكِ التي أنارت دربي",
      rotate: "rotate-2",
      hoverRotate: "hover:rotate-0"
    },
    {
      id: 3,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2fJhef6AuLB8_RGWE7TLIAHgyEKYgFCxdzeKztoCMQDWzMeYXj4MDqJaNqYMMLDoIUndSmMikiQs1oE1OXpuX3QMuaW8U0xTLcduXDxeWScsqzK-qz2N1GqVqMr8GTNhaP22LCEwbtW6HyahMIrzejp4AjGE9uOFnJiLyANZZ2K1IN5946SFcU0qZPX5FRG2Z7AkyUbvkCK7OP2pzPVimprhIgA008L-k23KkpRtQFFvD-za8xpXlj-fa96n69vF1Ll4z3VUG_iS-",
      caption: "معاً إلى الأبد",
      rotate: "-rotate-1",
      hoverRotate: "hover:rotate-0"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section id="gallery" className="py-2 sm:py-4 px-2 w-full flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-amiri text-xl sm:text-2xl md:text-3xl text-center mb-3 sm:mb-4 text-[#95002a] font-bold tracking-wide"
        >
          معرض لحظاتنا 💖
        </motion.h3>

        {/* Desktop Layout: Side-by-side Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 justify-items-center w-full">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`w-full max-w-[240px] transition-transform duration-500 transform ${photo.rotate} ${photo.hoverRotate}`}
            >
              <div className="bg-white p-3 pb-5 rounded-sm polaroid-shadow border border-slate-100 hover:shadow-[0_12px_28px_rgba(149,0,42,0.1)] transition-all duration-300">
                <div className="aspect-square bg-slate-50 overflow-hidden mb-3 rounded-sm border border-slate-100 relative group">
                  <img
                    referrerPolicy="no-referrer"
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
                <p className="font-amiri text-base text-center font-bold text-slate-700 select-none">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet Layout: Slick Single Polaroid Slider (Absolutely NO scrolling required!) */}
        <div className="md:hidden flex flex-col items-center justify-center w-full max-w-[270px] relative">
          <div className="relative w-full aspect-[4/5] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="bg-white p-3 pb-5 rounded-sm polaroid-shadow border border-slate-100 shadow-md">
                  <div className="aspect-square bg-slate-50 overflow-hidden mb-3 rounded-sm border border-slate-100 relative">
                    <img
                      referrerPolicy="no-referrer"
                      src={photos[currentIndex].src}
                      alt={photos[currentIndex].caption}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <p className="font-amiri text-base text-center font-bold text-[#95002a] select-none">
                    {photos[currentIndex].caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controller Buttons */}
          <div className="flex items-center justify-between w-full mt-3 px-2">
            <button 
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-white border border-red-50 text-[#95002a] active:bg-red-50 transition-colors shadow-sm"
              aria-label="السابق"
            >
              <ChevronRight size={18} />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "w-4 bg-[#95002a]" : "bg-red-200"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-1.5 rounded-full bg-white border border-red-50 text-[#95002a] active:bg-red-50 transition-colors shadow-sm"
              aria-label="التالي"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
