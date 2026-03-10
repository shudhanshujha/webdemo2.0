import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Search } from 'lucide-react';

export function FabricDetail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-ink-bg flex items-center justify-center">
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1605280263929-1c42c62ef169?q=80&w=2000&auto=format&fit=crop"
          alt="Macro fabric texture"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink-bg/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-bg via-transparent to-ink-bg" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-8 border border-white/20">
            <Search className="w-8 h-8 text-accent-blue" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-tight mb-8">
            Obsessive <span className="text-gradient">Detail.</span>
          </h2>
          <p className="text-xl md:text-3xl text-white font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Breathable organic cotton. Premium double-stitched seams. Durable, vibrant prints that never fade. Feel the difference in every thread.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
