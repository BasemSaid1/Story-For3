import React from "react";
import { motion } from "motion/react";

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
      description: "اكتشفت أن السعادة الحقيقية هي مجرد وجودكِ بجانبي، حلمنا يكبر يوماً بعد يوم."
    }
  ];

  return (
    <section id="memories" className="py-24 bg-gradient-to-b from-[#f8f9ff] to-[#eff4ff]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-amiri text-4xl sm:text-5xl text-center mb-16 text-[#95002a] font-bold tracking-wide"
        >
          خطنا الزمني 📖
        </motion.h3>

        <div className="space-y-12 relative before:absolute before:inset-0 before:right-8 sm:before:right-1/2 before:w-[2px] before:bg-red-200/50 before:pointer-events-none">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className={`flex flex-col sm:flex-row items-stretch gap-6 md:gap-8 ${
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Year Indicator */}
                <div className="w-24 flex-shrink-0 flex items-center justify-start sm:justify-center z-10">
                  <span className="text-3xl sm:text-4xl font-playfair font-extrabold text-[#735c00] border-r-4 border-[#735c00] pr-4 py-1 tracking-wider bg-[#f8f9ff]/80 backdrop-blur-sm rounded-l-md font-amiri">
                    {event.year}
                  </span>
                </div>

                {/* Event Card */}
                <div className="flex-1 bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-red-50 hover:shadow-lg transition-shadow duration-300 relative">
                  {/* Small decorative heart pin */}
                  <div className={`absolute top-4 ${isEven ? "left-4" : "right-4"} w-2 h-2 rounded-full bg-red-400`} />
                  
                  <h4 className="font-amiri text-2xl text-[#95002a] font-bold mb-3">
                    {event.title}
                  </h4>
                  <p className="font-sans text-base leading-relaxed text-slate-600 font-medium">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
