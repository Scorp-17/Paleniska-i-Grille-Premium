import { useMemo } from "react";
import { motion } from "motion/react";

interface Particle {
  id: string;
  left: number; // starting X position (%)
  bottom: number; // starting Y position (%)
  size: number; // size in px
  delay: number; // animation delay (s)
  duration: number; // animation duration (s)
  sway1: number; // intermediate horizontal sway (px)
  sway2: number; // final horizontal sway (px)
  scaleEnd: number; // ending scale
  opacity: number; // max opacity
  color: string; // Tailwind bg color or inline style
  blur: string; // Tailwind blur class
}

export default function FireParticles() {
  const particles = useMemo(() => {
    const list: Particle[] = [];

    // 1. Soft Flame glow particles (large, blurry, warm orange/red/yellow)
    const flameCount = 18;
    for (let i = 0; i < flameCount; i++) {
      const colors = [
        "rgba(239, 68, 68, 0.4)", // red-500
        "rgba(249, 115, 22, 0.5)", // orange-500
        "rgba(245, 158, 11, 0.5)", // amber-500
        "rgba(234, 179, 8, 0.3)", // yellow-500
      ];
      list.push({
        id: `flame-${i}`,
        left: 35 + Math.random() * 30, // concentrated in the middle (35% to 65%)
        bottom: 5 + Math.random() * 10, // starts near the base
        size: 30 + Math.random() * 60, // large soft flames
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 3,
        sway1: (Math.random() - 0.5) * 80,
        sway2: (Math.random() - 0.5) * 140,
        scaleEnd: 0.2 + Math.random() * 0.3, // shrinks as it rises
        opacity: 0.3 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        blur: "blur-xl",
      });
    }

    // 2. High-intensity sparks/embers (small, fast, bright gold/yellow/orange, high wobble)
    const sparkCount = 35;
    for (let i = 0; i < sparkCount; i++) {
      const colors = [
        "#f59e0b", // amber-500
        "#fbbf24", // amber-400
        "#fcd34d", // amber-300
        "#f97316", // orange-500
        "#ffffff", // bright white core sparks
      ];
      list.push({
        id: `spark-${i}`,
        left: 40 + Math.random() * 20, // tighter center (40% to 60%)
        bottom: 8 + Math.random() * 12,
        size: 2 + Math.random() * 5, // small sparks
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 2.5,
        sway1: (Math.random() - 0.5) * 100, // wider sway
        sway2: (Math.random() - 0.5) * 200,
        scaleEnd: 0.1,
        opacity: 0.8 + Math.random() * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        blur: "blur-[0.5px]",
      });
    }

    // 3. Ambient smoke wisps (larger, very blurry, dark gray/copper, floating higher)
    const smokeCount = 10;
    for (let i = 0; i < smokeCount; i++) {
      list.push({
        id: `smoke-${i}`,
        left: 30 + Math.random() * 40, // spread wider
        bottom: 15 + Math.random() * 15,
        size: 70 + Math.random() * 90,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 4,
        sway1: (Math.random() - 0.3) * 120, // drifts slightly with wind direction (to the right)
        sway2: (Math.random() - 0.2) * 220,
        scaleEnd: 1.5 + Math.random() * 1.0, // expands as it rises
        opacity: 0.04 + Math.random() * 0.08,
        color: "rgba(120, 113, 108, 0.3)", // stone-500
        blur: "blur-2xl",
      });
    }

    return list;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Visual core glow at the fire base */}
      <div
        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-62.5 md:w-112.5 h-30 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.45) 0%, rgba(239,68,68,0.2) 50%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Floating fire, spark, and smoke particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.blur}`}
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{
            opacity: 0,
            scale: 0.3,
            y: 0,
            x: 0,
          }}
          animate={{
            opacity: [0, p.opacity, p.opacity * 0.8, 0],
            scale: [0.3, 1.2, 1.0, p.scaleEnd],
            y: [-10, -500], // float upwards
            x: [0, p.sway1, p.sway2], // organic swaying path
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
