import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-bg"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-bg/50 to-ink-bg z-10" />
        <img
          src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop"
          alt="Premium custom t-shirt floating in air"
          className="w-full h-full object-cover opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Floating Ink Particles (Simulated with CSS) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-purple/40 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                x: [null, Math.random() * 100 - 50],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter uppercase leading-[0.85] mb-6">
            Ink Your <br />
            <span className="text-gradient">Story</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="text-lg md:text-2xl text-ink-text-muted font-light mb-2">
            Premium Custom Apparel for Teams, Brands & Creators
          </p>
          <p className="text-sm md:text-base text-accent-blue font-medium">
            This is just a demo website made by Shudhanshu Jha for Pratik Sir
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group relative px-8 py-4 bg-white text-black rounded-full font-medium text-lg overflow-hidden transition-transform hover:scale-105">
            <span className="relative z-10">Start Designing</span>
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="absolute inset-0 rounded-full ring-2 ring-white/50 scale-110 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </button>
          
          <button className="group px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-medium text-lg hover:bg-white/5 transition-colors">
            Explore Collections
          </button>
        </motion.div>
      </div>
    </section>
  );
}
