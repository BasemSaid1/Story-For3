import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Heart } from "lucide-react";

export default function Finale() {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
          vec2 uv = v_texCoord;
          // Sky gradient (dark night violet-black)
          vec3 color = vec3(0.015, 0.008, 0.03); 
          
          // Add some ambient star field
          float starNoise = hash(uv);
          if (starNoise > 0.997) {
              color += vec3(0.5, 0.5, 0.8) * (0.3 + 0.7 * sin(u_time * 2.0 + starNoise * 100.0));
          }

          // Fireworks logic (12 elements for a richer, more active display)
          for(int i=0; i<12; i++) {
              float t = u_time + float(i) * 1.25;
              vec2 pos = vec2(
                hash(vec2(float(i), 3.0 + float(i))), 
                hash(vec2(float(i), 7.0 + float(i)))
              );
              pos = pos * 0.7 + 0.15; // constrain to center
              
              float burst = fract(t * 0.4);
              float size = burst * 0.55;
              float d = length(uv - pos);
              
              if(d < size && burst < 0.85) {
                  float spark = smoothstep(size, size - 0.015, d) * (1.0 - burst);
                  
                  // Vary color for each firework burst using float modulation
                  vec3 fireworkColor;
                  float typeVal = mod(float(i), 4.0);
                  if (typeVal < 1.0) {
                      fireworkColor = vec3(1.0, 0.35, 0.45); // Rose Red
                  } else if (typeVal < 2.0) {
                      fireworkColor = vec3(1.0, 0.85, 0.35); // Gold/Yellow
                  } else if (typeVal < 3.0) {
                      fireworkColor = vec3(0.35, 0.8, 1.0); // Sky Blue
                  } else {
                      fireworkColor = vec3(1.0, 0.4, 0.9); // Violet
                  }
                  
                  color += fireworkColor * spark * hash(uv * 10.0 + t);
              }
          }
          
          gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Function to compile shaders
    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compilation failed: ", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking failed: ", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Buffer setup
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");

    let animationFrameId: number;

    const render = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="py-6 sm:py-10 flex flex-col items-center justify-center w-full">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative overflow-hidden group bg-[#735c00] text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full font-amiri text-xl sm:text-2xl font-bold shadow-xl hover:shadow-yellow-900/10 transition-all border border-[#D4AF37]/50 flex items-center gap-3"
      >
        <Sparkles size={20} className="text-yellow-200 animate-pulse" />
        <span className="relative z-10">مفاجأة أخيرة... اضغطي هنا ✨</span>
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[120] bg-black overflow-hidden flex flex-col items-center justify-center"
          >
            {/* Background Fireworks WebGL Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* Glowing Golden Content Overlay */}
            <div className="relative z-10 text-center px-4 max-w-lg pointer-events-none">
              <motion.div
                initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 120, 
                  damping: 15,
                  delay: 0.3
                }}
                className="mb-4"
              >
                {/* Simulated beautiful calligraphy glow style */}
                <h2 
                  className="text-6xl sm:text-8xl md:text-[9rem] font-amiri font-extrabold text-[#D4AF37]"
                  style={{
                    textShadow: "0 0 15px rgba(212, 175, 55, 0.7), 0 0 35px rgba(212, 175, 55, 0.4)",
                    fontFamily: "'Amiri', serif"
                  }}
                >
                  أمنية
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex items-center gap-2 text-red-500 animate-pulse">
                  <Heart size={20} className="fill-current" />
                  <Heart size={28} className="fill-current scale-110" />
                  <Heart size={20} className="fill-current" />
                </div>
                
                <p 
                  className="text-white font-amiri text-2xl sm:text-3xl font-bold tracking-wide leading-relaxed px-2"
                  style={{
                    textShadow: "0 2px 10px rgba(0,0,0,0.8)"
                  }}
                >
                  أحبكِ أكثر من أي وقت مضى
                </p>
              </motion.div>
            </div>

            {/* Interactive Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-colors border border-white/10 pointer-events-auto"
              title="إغلاق المفاجأة"
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
