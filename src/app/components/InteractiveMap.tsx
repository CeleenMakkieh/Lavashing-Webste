"use client";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";

export default function InteractiveMap() {
  const locations = [
    { name: "Dallas, TX", x: 48, y: 58, size: "large", isHome: true },
    { name: "Austin, TX", x: 46, y: 62, size: "medium" },
    { name: "Houston, TX", x: 50, y: 64, size: "medium" },
    { name: "New York, NY", x: 75, y: 35, size: "medium" },
    { name: "Los Angeles, CA", x: 18, y: 52, size: "medium" },
    { name: "Chicago, IL", x: 62, y: 38, size: "small" },
    { name: "Miami, FL", x: 72, y: 68, size: "small" },
    { name: "Seattle, WA", x: 15, y: 22, size: "small" },
  ];

  return (
    <section className="py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Based in Dallas. Serving clients nationwide.</h2>
          <p className="text-xl text-foreground/70">
            Working with brands across Texas and beyond
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl border border-border overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <rect x="40" y="50" width="15" height="20" fill="url(#mapGradient)" opacity="0.3" />

              {locations.map((location, index) => {
                const sizes = {
                  large: 6,
                  medium: 4,
                  small: 3,
                };
                const size = sizes[location.size as keyof typeof sizes];

                return (
                  <motion.g
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.circle
                      cx={location.x}
                      cy={location.y}
                      r={size}
                      fill={location.isHome ? "currentColor" : "currentColor"}
                      opacity={location.isHome ? 1 : 0.6}
                      whileHover={{ scale: 1.5, opacity: 1 }}
                      className="cursor-pointer"
                    />
                    {location.isHome && (
                      <motion.circle
                        cx={location.x}
                        cy={location.y}
                        r={size + 3}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        opacity="0.3"
                        animate={{
                          r: [size + 3, size + 6, size + 3],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.g>
                );
              })}
            </svg>

            <div className="absolute inset-0 pointer-events-none">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="absolute pointer-events-auto"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                >
                  <div className="relative group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {location.name}
                      {location.isHome && (
                        <span className="ml-2 inline-flex items-center gap-1">
                          <MapPin size={12} /> HQ
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-foreground rounded-full" />
                <span className="text-sm text-foreground/70">Headquarters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-foreground/60 rounded-full" />
                <span className="text-sm text-foreground/70">Client Locations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
