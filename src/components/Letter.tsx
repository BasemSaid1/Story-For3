import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function Letter() {
  return (
    <section id="surprise" className="py-4 sm:py-8 px-4 relative w-full">
      {/* Decorative floral elements or subtle background icons */}
      <div className="absolute top-4 right-4 text-red-50/40 pointer-events-none">
        <Heart size={64} className="fill-current stroke-none rotate-12" />
      </div>
      <div className="absolute bottom-4 left-4 text-red-50/30 pointer-events-none">
        <Heart size={80} className="fill-current stroke-none -rotate-12" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-gradient-to-b from-red-50/20 to-red-50/5 p-5 sm:p-10 rounded-2xl border border-red-100/60 shadow-lg relative overflow-hidden"
      >
        {/* Intimate decorative golden double border */}
        <div className="absolute inset-2.5 rounded-xl border border-[#D4AF37]/15 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-4 sm:mb-6 text-red-700"
          >
            <Heart size={32} className="fill-current" />
          </motion.div>

          <h3 className="font-amiri text-xl sm:text-2xl text-center text-[#95002a] font-bold mb-4 sm:mb-6 select-none">
            إلى "أمنية" الغالية،
          </h3>

          <p className="font-amiri text-lg sm:text-xl leading-relaxed text-slate-800 text-center font-medium max-w-xl select-text px-2 sm:px-4">
            أكتب لكِ هذه الكلمات لأعبر لكِ عن مدى حبي وامتناني لوجودكِ في حياتي. أنتِ لستِ فقط حبيبتي، بل أنتِ موطني وأماني. كل يوم يمر بجانبكِ هو عيد بالنسبة لي. شكراً لأنكِ كنتِ وما زلتِ الشخص الذي يجعل كل شيء جميلاً.
          </p>

          <div className="mt-6 sm:mt-8 text-center">
            <span className="font-amiri text-lg sm:text-xl font-bold text-[#95002a] block">
              حبيبكِ دائماً
            </span>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-1.5 rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
