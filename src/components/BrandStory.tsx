import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="story" ref={ref} className="relative py-48 overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1fac0840f2?q=80&w=2000&auto=format&fit=crop"
          alt="Women founders startup fashion brand designing apparel"
          className="w-full h-full object-cover opacity-30 scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-bg via-ink-bg/60 to-ink-bg" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-tight mb-8">
            Wear your <span className="text-gradient">identity.</span>
            <br />
            Tell your <span className="text-gradient">story.</span>
          </h2>
          <p className="text-xl md:text-3xl text-ink-text-muted font-light leading-relaxed max-w-3xl mx-auto">
            Ink.Company was created to help brands turn their ideas into wearable statements. We believe custom apparel shouldn't be an afterthought—it should be a reflection of who you are.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
