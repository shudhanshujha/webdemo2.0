import { motion } from "motion/react";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
];

export function ClientLogos() {
  return (
    <section className="py-24 bg-ink-bg border-y border-ink-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-sm font-medium text-ink-text-muted uppercase tracking-widest">
          Trusted by innovative teams worldwide
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink-bg to-transparent z-10" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex items-center gap-24 px-12 w-max"
        >
          {/* Double array for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="w-32 h-12 flex items-center justify-center shrink-0 group">
              <img
                src={logo}
                alt="Client Logo"
                className="max-w-full max-h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
