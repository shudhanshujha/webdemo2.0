import { motion } from "motion/react";
import { Paintbrush, Scissors, Truck, Package, Globe } from "lucide-react";

const features = [
  { icon: Paintbrush, title: "Fully Custom Designs", desc: "Your brand, your rules. Complete creative freedom." },
  { icon: Scissors, title: "Premium Fabric", desc: "Ethically sourced, ultra-soft materials built to last." },
  { icon: Package, title: "Low Minimum Orders", desc: "Start small or scale big. We cater to all sizes." },
  { icon: Truck, title: "Fast Delivery", desc: "Industry-leading turnaround times for your urgent needs." },
  { icon: Globe, title: "Pan-India Shipping", desc: "Delivering your custom apparel anywhere in the country." },
];

export function WhyInk() {
  return (
    <section id="why-us" className="py-32 px-6 bg-ink-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-square rounded-3xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="Startup team designing custom t-shirt graphics"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/40 to-transparent mix-blend-overlay" />
          
          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-8 glass-panel p-6 rounded-2xl max-w-xs"
          >
            <div className="text-4xl font-display font-bold text-gradient mb-2">10k+</div>
            <div className="text-sm text-ink-text-muted">Brands trust us with their merchandise.</div>
          </motion.div>
        </motion.div>

        {/* Right: Features */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6">
              Why <span className="text-gradient">Ink.Company</span>
            </h2>
            <p className="text-lg text-ink-text-muted">
              We don't just print shirts. We craft wearable experiences that resonate with your audience and elevate your brand identity.
            </p>
          </motion.div>

          <div className="space-y-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-6 group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-ink-border flex items-center justify-center shrink-0 group-hover:bg-gradient-accent transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-accent-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-ink-text-muted leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
