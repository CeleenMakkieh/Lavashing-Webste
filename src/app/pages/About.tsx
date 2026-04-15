"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Target, Users, Award, TrendingUp, ArrowUpRight, MapPin } from "lucide-react";

/* ─── Brand tokens ───────────────────────────── */
const BRAND = {
  bg: "#f8eeea",
  header: "#6b8d6d",
  headline: "#670626",
  accent: "#bad797",
  btnIdle: "#6b8d6d",
  btnHover: "#bad797",
  text: "#1a0509",
};

/* ─── Cursor-tracked magnetic button ─────────── */
function MagneticBtn({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={className}
      style={style}
    >
      {children}
    </motion.button>
  );
}

/* ─── Parallax text strip ─────────────────────── */
function MarqueeStrip() {
  const words = ["Strategy", "Branding", "Design", "Development", "Marketing", "Growth"];
  const repeated = [...words, ...words, ...words];
  return (
    <div className="overflow-hidden py-5 border-y-2" style={{ borderColor: BRAND.headline + "33" }}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((w, i) => (
          <span key={i} className="text-2xl font-bold tracking-widest uppercase" style={{ color: BRAND.headline }}>
            {w} <span className="opacity-30 mx-2">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Hover-reveal team card ─────────────────── */
function TeamCard({ member, index }: { member: { name: string; role: string; color: string; fun: string }; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer group"
    >
      {/* Gradient fill */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${member.color}`}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Name always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <motion.div
          animate={{ y: hovered ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <p className="text-white font-semibold text-lg leading-tight">{member.name}</p>
          <p className="text-white/70 text-sm">{member.role}</p>
        </motion.div>
      </div>

      {/* Fun fact slides up on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="absolute inset-0 flex items-center justify-center p-6 z-20"
            style={{ background: "rgba(107,141,109,0.92)", backdropFilter: "blur(8px)" }}
          >
            <div className="text-center text-white">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-sm font-medium leading-relaxed">{member.fun}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow icon top-right */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, rotate: hovered ? 0 : -45 }}
        className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
      >
        <ArrowUpRight size={14} className="text-white" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Scrolling stat counter ─────────────────── */
function StatBlock({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring" }}
      className="border-l-2 pl-6 py-2"
      style={{ borderColor: BRAND.headline }}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
        className="text-5xl md:text-6xl font-bold mb-1"
        style={{ color: BRAND.headline }}
      >
        {value}
      </motion.div>
      <div className="text-sm uppercase tracking-widest opacity-60">{label}</div>
    </motion.div>
  );
}

/* ─── Value pill ─────────────────────────────── */
function ValuePill({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setOpen((o) => !o)}
      className="border-b cursor-pointer group"
      style={{ borderColor: BRAND.headline + "33" }}
    >
      <div className="flex items-center justify-between py-5 px-2">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
            style={{ background: open ? BRAND.accent : BRAND.accent + "33", color: BRAND.headline }}
          >
            {icon}
          </div>
          <span className="text-xl font-medium" style={{ color: BRAND.accent }}>{title}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-2xl font-light"
          style={{ color: BRAND.headline }}
        >
          +
        </motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-14 pb-5 text-base leading-relaxed" style={{ color: BRAND.accent + "cc" }}>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────── */
import type { WPTeamMember, WPService, WPValue } from "@/lib/wordpress";
import Image from "next/image";

const DEFAULT_STORY = [
  "Founded in Dallas, Texas, Lavashing was born from a simple belief: that great digital experiences can transform businesses and inspire people.",
  "Over the past decade, we've grown from a small team of passionate creators into a full-service agency serving clients across the United States. But our core mission remains the same — to create work that's both beautiful and effective.",
  "We're not just another agency. We're your strategic partner, invested in your success and committed to delivering results that actually move the needle.",
];

const DEFAULT_SERVICES = [
  { title: "Web Design & Development", description: "From sleek corporate sites to complex web apps — fast, beautiful, user-friendly.", features: [] },
  { title: "Branding & Identity", description: "Distinctive brand identities that capture your essence and resonate with your audience.", features: [] },
  { title: "Marketing & Strategy", description: "Data-backed campaigns with creative edge to grow your audience and revenue.", features: [] },
  { title: "Consulting & Support", description: "Ongoing partnership to ensure your digital presence evolves and keeps performing.", features: [] },
];

const DEFAULT_VALUES: WPValue[] = [
  { title: "Purpose-Driven", description: "We believe in creating work that matters and makes a real impact. Every pixel, every line of copy, every campaign — intentional and meaningful." },
  { title: "Collaborative", description: "Your success is our success. We work as partners, not just vendors. That means transparency, honest feedback, and shared wins." },
  { title: "Excellence", description: "We hold ourselves to the highest standards in everything we do — from strategic thinking to micro-interactions." },
  { title: "Growth-Focused", description: "We're committed to continuous improvement. We study trends, test ideas, and iterate — so your brand stays ahead." },
];

const VALUE_ICONS = [<Target size={18} />, <Users size={18} />, <Award size={18} />, <TrendingUp size={18} />];

export default function About({
  team = [],
  aboutStory = DEFAULT_STORY,
  aboutImageUrl = "",
  services = DEFAULT_SERVICES,
  values = DEFAULT_VALUES,
}: {
  team?: WPTeamMember[];
  aboutStory?: string[];
  aboutImageUrl?: string;
  services?: WPService[];
  values?: WPValue[];
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const valuePills = values.map((v, i) => ({
    icon: VALUE_ICONS[i % VALUE_ICONS.length],
    title: v.title,
    description: v.description,
  }));

  return (
    <div className="pt-20" style={{ background: BRAND.bg, color: BRAND.text }}>

      {/* ── HERO ───────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden px-4 sm:px-8 lg:px-16">
        {/* Large decorative letter */}
        <motion.div
          style={{ y: heroY }}
          className="absolute right-0 top-0 text-[28vw] font-bold leading-none select-none pointer-events-none"
        >
          <span style={{ color: BRAND.header + "0d" }}>L</span>
        </motion.div>

        <motion.div style={{ scale: heroScale }} className="relative z-10 max-w-7xl mx-auto w-full py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full mb-10 border"
            style={{ borderColor: BRAND.header + "50", color: BRAND.header }}
          >
            <MapPin size={12} /> Dallas, TX · Est. 2022
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,10vw,8rem)] leading-[0.95] tracking-tight mb-10 max-w-4xl"
            style={{ color: BRAND.headline }}
          >
            We make brands
            <br />
            <em className="not-italic" style={{ color: BRAND.accent }}>unforgettable.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl leading-relaxed"
            style={{ color: BRAND.text + "99" }}
          >
            A Dallas-based creative agency on a mission to help ambitious brands thrive — through design, strategy, and technology that actually works.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-0 flex items-center gap-3"
            style={{ color: BRAND.header + "80" }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-px h-10"
              style={{ background: `linear-gradient(to bottom, ${BRAND.header}, transparent)` }}
            />
            <span className="text-xs uppercase tracking-widest">Scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── OUR STORY ────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: image placeholder with interactive overlay */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80 }}
            className="relative"
          >
            <div
              className="aspect-[4/3] rounded-3xl overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${BRAND.header}30, ${BRAND.btnHover}40)` }}
            >
              {aboutImageUrl ? (
                <Image
                  src={aboutImageUrl}
                  alt="About Lavashing"
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 40 + i * 30,
                        height: 40 + i * 30,
                        background: i % 2 === 0 ? BRAND.header + "40" : BRAND.btnHover + "60",
                        top: `${10 + i * 15}%`,
                        left: `${5 + i * 18}%`,
                      }}
                      animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    />
                  ))}
                </>
              )}
              <div className="absolute inset-0 flex items-end p-8">
                <div
                  className="px-5 py-3 rounded-2xl text-sm font-medium"
                  style={{ background: BRAND.bg + "cc", backdropFilter: "blur(8px)", color: BRAND.header }}
                >
                  📍 Born in Dallas · Growing everywhere
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-5 -right-5 px-4 py-3 rounded-2xl shadow-lg text-sm font-semibold border-2"
              style={{ background: BRAND.btnHover, borderColor: BRAND.header + "30", color: BRAND.header }}
            >
              Est. 2022 ✨
            </motion.div>
          </motion.div>

          {/* Right: story text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: BRAND.headline }}>Our Story</h2>
            {aboutStory.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-lg leading-relaxed"
                style={{ color: BRAND.text + "aa" }}
              >
                {p}
              </motion.p>
            ))}

            {/* CTA inline */}
            <MagneticBtn
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 border-2"
              style={{
                background: BRAND.headline,
                borderColor: BRAND.headline,
                color: BRAND.accent,
              } as React.CSSProperties}
            >
              Start a project <ArrowUpRight size={14} />
            </MagneticBtn>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────── */}
      <section className="py-24 px-4 sm:px-8 lg:px-16" style={{ background: BRAND.header + "0d" }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16"
            style={{ color: BRAND.headline }}
          >
            What We Do
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border" style={{ borderColor: BRAND.header + "22" }}>
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: BRAND.btnHover + "50" }}
                className="p-10 group cursor-default transition-colors duration-300"
                style={{ background: "#ffffff" }}
              >
                <span className="text-xs font-bold tracking-widest opacity-40 mb-4 block">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold leading-snug" style={{ color: BRAND.headline }}>{s.title}</h3>
                  <motion.div
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 45 }}
                    className="shrink-0 mt-1"
                    style={{ color: BRAND.header }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </div>
                <p className="mt-3 text-base leading-relaxed" style={{ color: BRAND.text + "80" }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES accordion ─────────────────────────── */}
      <section className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: BRAND.headline }}
          >
            Our Values
          </motion.h2>
          <div className="border-t" style={{ borderColor: BRAND.headline + "33" }}>
            {valuePills.map((v, i) => (
              <ValuePill key={i} {...v} index={i} />
            ))}
          </div>
        </div>
      </section>

      

      {/* ── LOCATION CTA ─────────────────────────────── */}
      <section className="py-32 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
        {/* Large bg text */}
        <div
          className="absolute inset-0 flex items-center justify-center text-[20vw] font-black select-none pointer-events-none"
          style={{ color: BRAND.header + "07" }}
        >
          DALLAS
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: BRAND.headline }}>
            Based in Dallas, TX
          </h2>
          <p className="text-xl mb-4 leading-relaxed" style={{ color: BRAND.text + "99" }}>
            Proud to call Dallas home, but our work reaches clients across Texas and throughout the entire United States.
          </p>
          <p className="text-lg mb-12" style={{ color: BRAND.text + "70" }}>
            Local or coast-to-coast — we're here to help your business grow.
          </p>
          <MagneticBtn
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300"
            style={{ background: BRAND.btnIdle, color: "#fff" } as React.CSSProperties}
          >
            <MapPin size={16} /> Let's connect
          </MagneticBtn>
        </motion.div>
      </section>
    </div>
  );
}
