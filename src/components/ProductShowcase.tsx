import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Custom T-Shirts",
    desc: "Premium cotton blends for everyday wear.",
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Hoodies",
    desc: "Heavyweight fleece for maximum comfort.",
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Corporate Uniforms",
    desc: "Professional apparel for your team.",
    img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Event Merchandise",
    desc: "Memorable gear for your next big event.",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
  },
];

export function ProductShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="products" className="py-32 px-6 bg-ink-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight">
              Our <span className="text-gradient">Collections</span>
            </h2>
            <p className="text-ink-text-muted mt-4 max-w-md text-lg">
              Discover our range of premium apparel designed to elevate your brand identity.
            </p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 text-white hover:text-accent-blue transition-colors group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-ink-surface border border-ink-border"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-bg via-ink-bg/20 to-transparent" />
              </div>

              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                <motion.div
                  animate={{
                    y: hoveredId === product.id ? -10 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h3 className="text-2xl font-display font-bold mb-2">{product.title}</h3>
                  <p className="text-sm text-ink-text-muted mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {product.desc}
                  </p>
                  
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              </div>

              {/* Glowing Border Effect */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 pointer-events-none ${
                  hoveredId === product.id ? "border-accent-purple/50 shadow-[0_0_30px_rgba(176,38,255,0.3)]" : ""
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
