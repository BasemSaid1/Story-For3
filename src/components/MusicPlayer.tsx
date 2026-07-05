import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("https://serv100.albumaty.com/dl/3en/amr-diab/albums/wayah/01.Wayah.mp3");
    audioRef.current.loop = true;
    
    // Attempt auto-play or handle interaction
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Playback prevented, wait for interaction", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-3 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg border border-red-100">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
          isPlaying 
            ? "bg-red-700 text-white audio-pulse" 
            : "bg-red-50 text-red-700 hover:bg-red-100"
        }`}
        title={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        {isPlaying ? (
          <Pause size={20} className="stroke-[2.5]" />
        ) : (
          <Play size={20} className="fill-current stroke-[1.5] translate-x-[-1px]" />
        )}
      </motion.button>

      {isPlaying && (
        <motion.button
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={toggleMute}
          className="p-1 text-red-600 hover:text-red-800 transition-colors"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      )}

      {/* Ambient indicator */}
      <div className="flex items-center gap-1.5 px-3 pl-4">
        <Music size={16} className={`text-red-700 ${isPlaying ? "animate-bounce" : "opacity-60"}`} />
        <span className="font-sans text-xs text-red-950 font-medium select-none hidden sm:inline">
          {isPlaying ? "عمرو دياب - وياه" : "تشغيل الخلفية الموسيقية"}
        </span>
      </div>
    </div>
  );
}
