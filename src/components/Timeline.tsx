import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function Timeline() {
  const events = [
    {
      year: "٢٠٢٤",
      title: "البداية السعيدة",
      description: "اليوم الذي تغير فيه كل شيء، حين رأيتكِ لأول مرة وبدأنا رحلتنا معاً."
    },
    {
      year: "٢٠٢٥",
      title: "رحلتنا ومغامراتنا",
      description: "ذكريات لا تُنسى ولحظات مليئة بالضحك والأمان تحت سماء دافئة."
    },
    {
      year: "الآن",
      title: "كل يوم معكِ هو عيد",
      description: "اكتشفت أن السعادة الحقيقية هي وجودكِ بجانبي، حلمنا يكبر يوماً بعد يوم."
    }
  ];

  return (
    <section id="memories" className="py-2 px-2 w-full flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-amiri text-xl sm:text-2xl text-center mb-6 text-[#95002a] font-bold tracking-wide"
        >
          خطنا الزمني 📖
        </motion.h3>

        {/* Beautiful Compact Vertical Timeline where all 3 items are fully displayed together */}
        <div className="relative border-r-2 border-red-100 pr-6 mr-3 space-y-5">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Checkpoint Indicator (Heart) centered perfectly on the right border line */}
              <div className="absolute -right-[37px] top-1.5 bg-white p-1 rounded-full border border-red-200 shadow-sm z-10 text-[#95002a] flex items-center justify-center w-5 h-5">
                <Heart size={10} className="fill-[#95002a]" />
              </div>

              {/* Event Content Card */}
              <div className="bg-white p-3.5 rounded-xl border border-red-50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Decorative gold corner accent */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#D4AF37]/20 rounded-tl-xl pointer-events-none" />
                
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-amiri text-base sm:text-lg text-[#95002a] font-bold">
                    {event.title}
                  </h4>
                  <span className="font-amiri text-xs bg-red-50 text-[#95002a] px-2 py-0.5 rounded-full font-bold">
                    {event.year}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-slate-600 font-medium select-text">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
