import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function Letter() {
  return (
    <section id="surprise" className="py-24 px-6 bg-white relative">
      {/* Decorative floral elements or subtle background icons */}
      <div className="absolute top-10 right-10 text-red-50/60 pointer-events-none">
        <Heart size={120} className="fill-current stroke-none rotate-12" />
      </div>
      <div className="absolute bottom-10 left-10 text-red-50/40 pointer-events-none">
        <Heart size={180} className="fill-current stroke-none -rotate-12" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-gradient-to-b from-red-50/30 to-red-50/10 p-10 sm:p-16 md:p-20 rounded-[2.5rem] border border-red-100/80 shadow-xl shadow-red-950/5 relative overflow-hidden"
      >
        {/* Intimate decorative golden double border */}
        <div className="absolute inset-4 rounded-[2rem] border border-[#D4AF37]/20 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-8 text-red-700"
          >
            <Heart size={44} className="fill-current" />
          </motion.div>

          <h3 className="font-amiri text-2xl sm:text-3xl text-center text-[#95002a] font-bold mb-8 select-none">
            إلى "أمنية" الغالية،
          </h3>

          <p className="font-amiri text-xl sm:text-2xl leading-relaxed text-slate-800 text-center font-medium max-w-2xl select-text">
            أكتب لكِ هذه الكلمات لأعبر لكِ عن مدى حبي وامتناني لوجودكِ في حياتي. أنتِ لستِ فقط حبيبتي، بل أنتِ موطني وأماني. كل يوم يمر بجانبكِ هو عيد بالنسبة لي. شكراً لأنكِ كنتِ وما زلتِ الشخص الذي يجعل كل شيء جميلاً.
          </p>

          <div className="mt-12 text-center">
            <span className="font-amiri text-2xl font-bold text-[#95002a] block mb-1">
              حبيبكِ دائماً
            </span>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2 rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
