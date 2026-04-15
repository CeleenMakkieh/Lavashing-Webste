"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const BRAND = {
  bg: "#ffffe9",
  header: "#6b8d6d",
  pink: "#f6c0d7",
  text: "#111111",
};

/* ─── City positions as % of image dimensions ─── */
const HQ = {
  id: "dallas", name: "Dallas, TX", role: "Headquarters", emoji: "🏢",
  left: "46.5%", top: "66%",
};
const CLIENTS = [
  { id: "seattle",  name: "Seattle, WA",  role: "Client", emoji: "🌲", left: "10%",   top: "19%" },
  { id: "chicago",  name: "Chicago, IL",  role: "Client", emoji: "🌆", left: "61.5%", top: "34%" },
  { id: "houston",  name: "Houston, TX",  role: "Client", emoji: "🛢️", left: "48%",   top: "74%" },
];

function ClientPin({ city, hovered, onEnter, onLeave }: {
  city: typeof CLIENTS[0];
  hovered: string | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const isHovered = hovered === city.id;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: city.left, top: city.top }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shadow-lg"
            style={{ background: BRAND.header, color: "#fff" }}
          >
            {city.name}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${BRAND.header}` }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pin */}
      <motion.div
        whileHover={{ scale: 1.3 }}
        className="w-5 h-5 rounded-full border-2 shadow-md"
        style={{ background: BRAND.pink, borderColor: BRAND.header }}
      >
        <div className="w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: BRAND.header }} />
      </motion.div>
    </motion.div>
  );
}

function HQPin({ hovered, onEnter, onLeave }: {
  hovered: string | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const isHovered = hovered === "dallas";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: HQ.left, top: HQ.top }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shadow-lg"
            style={{ background: BRAND.header, color: "#fff" }}
          >
            Dallas, TX — HQ
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${BRAND.header}` }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse rings */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        style={{ width: 40, height: 40, border: `1.5px solid ${BRAND.header}`, background: "transparent" }}
        animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        style={{ width: 28, height: 28, border: `1.5px solid ${BRAND.header}`, background: "transparent" }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }}
      />

      {/* Main pin */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="relative w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
        style={{ background: BRAND.header, border: `3px solid ${BRAND.bg}` }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: BRAND.bg }} />
      </motion.div>

      {/* Always-visible label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-8 px-2 py-0.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-sm"
        style={{ background: BRAND.header + "ee", color: "#fff" }}
      >
        Dallas HQ
      </div>
    </motion.div>
  );
}

export default function InteractiveMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-28" style={{ background: BRAND.header + "0a" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: BRAND.header }}>
            Based in Dallas. Serving clients nationwide.
          </h2>
          <p className="text-lg" style={{ color: BRAND.text + "80" }}>
            Our HQ is in Dallas, TX — with clients across the country
          </p>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70 }}
          className="relative rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Map image */}
          <div className="relative w-full">
            <Image
              src="/us-map.jpg"
              alt="United States Map"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />

            {/* Pins overlay — absolutely positioned over image */}
            <div className="absolute inset-0">
              {CLIENTS.map((c) => (
                <ClientPin
                  key={c.id}
                  city={c}
                  hovered={hovered}
                  onEnter={() => setHovered(c.id)}
                  onLeave={() => setHovered(null)}
                />
              ))}
              <HQPin
                hovered={hovered}
                onEnter={() => setHovered("dallas")}
                onLeave={() => setHovered(null)}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
