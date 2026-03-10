import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Palette, Image as ImageIcon, Sparkles } from "lucide-react";

const colors = [
  { name: "Onyx Black", value: "#1a1a1a" },
  { name: "Arctic White", value: "#f5f5f5" },
  { name: "Neon Purple", value: "#b026ff" },
  { name: "Electric Blue", value: "#00f0ff" },
];

export function DesignDemo() {
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [hasLogo, setHasLogo] = useState(false);
  const [designVariant, setDesignVariant] = useState(0);

  return (
    <section id="design" className="py-32 px-6 bg-ink-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6"
        >
          Design Your <span className="text-gradient">Own</span>
        </motion.h2>
        <p className="text-xl text-ink-text-muted max-w-2xl mx-auto">
          Experience our interactive builder. Customize colors, add logos, and see your vision come to life instantly.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Interactive Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square rounded-3xl bg-ink-surface border border-ink-border overflow-hidden flex items-center justify-center"
        >
          {/* Base T-Shirt Image (Masked or tinted) */}
          <motion.div
            className="absolute inset-0 z-0 mix-blend-multiply opacity-80"
            animate={{ backgroundColor: activeColor.value }}
            transition={{ duration: 0.5 }}
          />
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"
            alt="Blank premium cotton t-shirt on mannequin"
            className="w-full h-full object-cover z-10 mix-blend-screen opacity-50"
            referrerPolicy="no-referrer"
          />

          {/* Logo Overlay */}
          <AnimatePresence>
            {hasLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute z-20 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center"
              >
                {designVariant === 0 ? (
                  <div className="text-4xl font-display font-bold text-white drop-shadow-lg">INK.</div>
                ) : (
                  <Sparkles className="w-16 h-16 text-accent-blue drop-shadow-lg" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Controls */}
        <div className="space-y-12">
          {/* Color Selection */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-accent-purple" />
              <h3 className="text-2xl font-display font-semibold">Select Color</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setActiveColor(color)}
                  className={`w-14 h-14 rounded-full border-2 transition-all duration-300 ${
                    activeColor.name === color.name
                      ? "border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
            <p className="mt-4 text-ink-text-muted">{activeColor.name}</p>
          </div>

          {/* Add Logo */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ImageIcon className="w-6 h-6 text-accent-blue" />
              <h3 className="text-2xl font-display font-semibold">Add Graphics</h3>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setHasLogo(!hasLogo)}
                className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                  hasLogo ? "bg-white text-black" : "bg-ink-surface border border-ink-border text-white hover:bg-ink-border"
                }`}
              >
                {hasLogo ? "Remove Logo" : "Add Logo"}
              </button>
              
              {hasLogo && (
                <button
                  onClick={() => setDesignVariant((prev) => (prev === 0 ? 1 : 0))}
                  className="px-6 py-3 rounded-xl font-medium bg-ink-surface border border-ink-border text-white hover:bg-ink-border transition-colors"
                >
                  Change Design
                </button>
              )}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-5 rounded-2xl bg-gradient-accent text-white font-display font-bold text-xl shadow-[0_0_40px_rgba(176,38,255,0.4)] hover:shadow-[0_0_60px_rgba(0,240,255,0.6)] transition-shadow duration-300"
          >
            Start Designing Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
