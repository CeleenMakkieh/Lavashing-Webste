"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useT } from "@/contexts/TranslationContext";

const BRAND = {
  bg: "#f8eeea",
  header: "#6b8d6d",
  headline: "#670626",
  accent: "#bad797",
  text: "#1a0509",
};

/* ── Pin data — positions calibrated to lavashing map.png ── */
const HQ = { id: "dallas", name: "Dallas, TX", label: "HQ", left: "45.5%", top: "70%" };

const DFW_CITIES = [
  { id: "irving", name: "Irving, TX", left: "44.5%", top: "71%" },
  { id: "plano",  name: "Plano, TX",  left: "46.5%", top: "68%" },
];

const STATE_PINS = [
  { id: "seattle",      name: "Seattle, WA",  left: "10.5%", top: "17%" },
  { id: "houston",      name: "Houston, TX",  left: "45.5%", top: "80%" },
  { id: "pennsylvania", name: "Pennsylvania", left: "77.5%", top: "36%" },
];

/* ── Tooltip ── */
function Tooltip({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(10,6,20,0.92)",
        color: "#f5e6cf",
        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "11px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        zIndex: 30,
        border: "1px solid rgba(201,169,110,0.4)",
        pointerEvents: "none",
      }}
    >
      {label}
    </motion.div>
  );
}

/* ── HQ Pin — large glowing gold ── */
function HQPin({ hovered, onEnter, onLeave }: { hovered: string | null; onEnter: () => void; onLeave: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 220, delay: 0.2 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        left: HQ.left,
        top: HQ.top,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        zIndex: 15,
      }}
    >
      <AnimatePresence>
        {hovered === HQ.id && <Tooltip label="Dallas, TX — Headquarters" />}
      </AnimatePresence>

      {/* Outer glow ring */}
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: "50%",
          background: "rgba(201,169,110,0.35)",
          pointerEvents: "none",
        }}
      />
      {/* Second ring */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        style={{
          position: "absolute",
          inset: -5,
          borderRadius: "50%",
          background: "rgba(201,169,110,0.25)",
          pointerEvents: "none",
        }}
      />
      {/* Main dot */}
      <motion.div
        whileHover={{ scale: 1.25 }}
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#c9a96e",
          border: "2.5px solid #fff",
          boxShadow: "0 0 12px rgba(201,169,110,0.9), 0 0 4px rgba(201,169,110,0.5)",
          position: "relative",
          zIndex: 1,
        }}
      />
    </motion.div>
  );
}

/* ── DFW mini pin — small matcha dot ── */
function DFWPin({ city, hovered, onEnter, onLeave }: {
  city: typeof DFW_CITIES[0];
  hovered: string | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 220, delay: 0.4 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        left: city.left,
        top: city.top,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        zIndex: 12,
      }}
    >
      <AnimatePresence>
        {hovered === city.id && <Tooltip label={city.name} />}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.5 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#bad797",
          border: "1.5px solid rgba(255,255,255,0.7)",
          boxShadow: "0 0 6px rgba(186,215,151,0.7)",
        }}
      />
    </motion.div>
  );
}

/* ── State client pin — small white dot ── */
function StatePin({ city, hovered, onEnter, onLeave }: {
  city: typeof STATE_PINS[0];
  hovered: string | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 220, delay: 0.5 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        left: city.left,
        top: city.top,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      <AnimatePresence>
        {hovered === city.id && <Tooltip label={city.name} />}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.6 }}
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.85)",
          border: "1.5px solid rgba(255,255,255,0.5)",
          boxShadow: "0 0 5px rgba(255,255,255,0.5)",
        }}
      />
    </motion.div>
  );
}

/* ── Main ── */
export default function InteractiveMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useT();

  return (
    <section className="py-28" style={{ background: BRAND.header + "0a" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: BRAND.headline }}>
            {t("map.headline")}
          </h2>
          <p className="text-lg" style={{ color: BRAND.text + "80" }}>
            {t("map.sub")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70 }}
          className="relative rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="relative w-full">
            <Image
              src="/lavashing map.png"
              alt="Lavashing Service Map"
              width={1200}
              height={675}
              className="w-full h-auto block"
              priority
            />
            <div className="absolute inset-0">
              {STATE_PINS.map((c) => (
                <StatePin key={c.id} city={c} hovered={hovered}
                  onEnter={() => setHovered(c.id)} onLeave={() => setHovered(null)} />
              ))}
              {DFW_CITIES.map((c) => (
                <DFWPin key={c.id} city={c} hovered={hovered}
                  onEnter={() => setHovered(c.id)} onLeave={() => setHovered(null)} />
              ))}
              <HQPin hovered={hovered}
                onEnter={() => setHovered("dallas")} onLeave={() => setHovered(null)} />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
