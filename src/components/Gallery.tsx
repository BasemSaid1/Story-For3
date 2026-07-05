import React from "react";
import { motion } from "motion/react";

export default function Gallery() {
  const photos = [
    {
      id: 1,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDL9dj3xhVYlqmUbQ0qmYEbjRr7znBgBAwThsWbuEjZNj8pUVsHayKqJQswQDC9dcWMl0MDZ1NHQWMHvGU7aUz2n2QJa21Vnal_cteFxMLvfArGTjJCm22kNjWpjpPxmHvdau7-bdkkIWPNLXagB3JKQCLfVhocrlQA5UqBITxpx8-20qI3KqGsQK72B84H--hWTRU7dznV2h56rVErKdq5TJS8N4XoN114wmX6FQ0FpKkimiZWZScgwsLBtZ1WWk4nUeVU7u88DYE",
      caption: "أول يوم تقابلنا فيه...",
      rotate: "-rotate-3",
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

  return (
    <section id="gallery" className="py-24 px-6 md:px-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-amiri text-4xl sm:text-5xl text-center mb-16 text-[#95002a] font-bold tracking-wide"
        >
          معرض لحظاتنا
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 justify-items-center">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className={`w-full max-w-sm transition-transform duration-500 transform ${photo.rotate} ${photo.hoverRotate}`}
            >
              <div className="bg-white p-4 pb-8 rounded-sm polaroid-shadow border border-slate-100 hover:shadow-[0_20px_50px_rgba(149,0,42,0.15)] transition-all duration-300">
                <div className="aspect-square bg-slate-50 overflow-hidden mb-6 rounded-sm border border-slate-100 relative group">
                  <img
                    referrerPolicy="no-referrer"
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
                <p className="font-amiri text-lg text-center font-bold text-slate-700 tracking-wide select-none">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
