import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Founder, TechNova",
    text: "Ink.Company completely transformed our team merch. The quality is unmatched and the design process was incredibly smooth.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "David Chen",
    role: "Event Director",
    text: "We needed 500 custom hoodies in a week. They delivered early, and the fabric feels premium. Highly recommended.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Elena Rodriguez",
    role: "Creative Agency Lead",
    text: "The neon prints pop exactly how we envisioned. Our clients constantly ask where we got our agency apparel.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Marcus Johnson",
    role: "Startup CEO",
    text: "Finally, a custom apparel brand that understands modern aesthetics. No more stiff, boxy corporate shirts.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
];

export function SocialProof() {
  return (
    <section className="py-32 bg-ink-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6"
        >
          Loved By <span className="text-gradient">Creators</span>
        </motion.h2>
      </div>

      {/* Scrolling Carousel */}
      <div className="relative w-full overflow-hidden flex">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-6 px-6 w-max"
        >
          {/* Double the array for seamless looping */}
          {[...testimonials, ...testimonials].map((testimonial, i) => (
            <div
              key={i}
              className="w-[350px] md:w-[450px] shrink-0 glass-panel p-8 rounded-3xl border border-ink-border hover:border-accent-purple/50 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-accent-purple text-accent-purple" />
                ))}
              </div>
              <p className="text-lg text-ink-text leading-relaxed mb-8">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-display font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-ink-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
