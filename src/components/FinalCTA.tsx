import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-48 px-6 flex items-center justify-center overflow-hidden bg-ink-bg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
          alt="Epic fashion editorial style group wearing custom t-shirts"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-bg via-ink-bg/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.9] mb-8">
            Your Story <br />
            <span className="text-gradient">Deserves</span> To Be Worn.
          </h2>
          <p className="text-xl md:text-2xl text-ink-text-muted font-light max-w-2xl mx-auto mb-12">
            Join thousands of creators and brands who trust Ink.Company to bring their vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-display font-bold text-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-3"
            >
              <span className="relative z-10">Start Designing</span>
              <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent text-white border-2 border-white/20 rounded-full font-display font-bold text-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Get a Quote
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
