import { motion } from "motion/react";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  const links = {
    Products: ["Custom T-Shirts", "Hoodies", "Polos", "Corporate Uniforms", "Accessories"],
    Company: ["About Us", "Careers", "Sustainability", "Press", "Contact"],
    Support: ["Help Center", "Shipping & Returns", "Size Guide", "Track Order", "FAQ"],
  };

  return (
    <footer className="bg-ink-bg border-t border-ink-border pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="text-3xl font-display font-bold tracking-tighter mb-6 block">
              INK<span className="text-accent-purple">.</span>COMPANY
            </a>
            <p className="text-ink-text-muted max-w-sm leading-relaxed mb-8">
              Premium custom apparel for teams, brands, and creators. Wear your identity, tell your story.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-ink-surface border border-ink-border flex items-center justify-center text-ink-text-muted hover:text-white hover:border-accent-purple transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items], i) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-lg mb-6">{title}</h4>
              <ul className="space-y-4">
                {items.map((item, j) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-ink-text-muted hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-ink-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-text-muted">
          <p>&copy; {new Date().getFullYear()} Ink.Company. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
