"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import {
  Code, Palette, Sparkles, TrendingUp, Lightbulb,
  ShoppingBag, Heart, GraduationCap, Building2, Utensils, Briefcase,
  ArrowUpRight, Plus
} from "lucide-react";
import ClientLogos from "../components/ClientLogos";

const BRAND = { bg: "#f8eeea", header: "#6b8d6d", headline: "#670626", accent: "#bad797", pink: "#f6c0d7", text: "#1a0509" };

/* ─── Magnetic cursor ────────────────────── */
function MagneticCursor() {
  const cx = useMotionValue(-100); const cy = useMotionValue(-100);
  const tx = useSpring(cx, { stiffness: 55, damping: 16 });
  const ty = useSpring(cy, { stiffness: 55, damping: 16 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const mv = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); };
    const ov = (e: MouseEvent) => { if ((e.target as Element).closest("a,button,[data-hover]")) setBig(true); };
    const ol = () => setBig(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", ov);
    window.addEventListener("mouseout", ol);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", ov); window.removeEventListener("mouseout", ol); };
  }, []);
  return (
    <>
      <motion.div style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%", width: 10, height: 10, borderRadius: "50%", background: BRAND.header, position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none" }} />
      <motion.div style={{ x: tx, y: ty, translateX: "-50%", translateY: "-50%", width: big ? 48 : 32, height: big ? 48 : 32, borderRadius: "50%", border: `1.5px solid ${BRAND.header}`, position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none", opacity: 0.45, transition: "width 0.2s, height 0.2s" }} />
    </>
  );
}

/* ─── 3D Tilt wrapper (desktop only) ─────── */
function Tilt({ children, className = "", intensity = 14 }: { children: React.ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 140, damping: 22 });
  const sy = useSpring(ry, { stiffness: 140, damping: 22 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const r = ref.current!.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * intensity);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * intensity);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: isMobile ? 0 : sx, rotateY: isMobile ? 0 : sy, transformStyle: isMobile ? "flat" : "preserve-3d" }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Floating shape ────────────────────── */
function Shape({ top, bottom, left, right, w, h, bg, border, br, blur, delay, dur, dy, dr }: {
  top?: string; bottom?: string; left?: string; right?: string;
  w: number; h: number; bg?: string; border?: string; br: string;
  blur?: boolean; delay: number; dur: number; dy: number; dr: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -dy, 0], rotate: [-dr / 2, dr / 2, -dr / 2] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", pointerEvents: "none", top, bottom, left, right, width: w, height: h, background: bg, border, borderRadius: br, filter: blur ? "blur(10px)" : undefined }}
    />
  );
}

/* ─── Word scroll reveal ─────────────────── */
function RevealText({ text, className = "", highlightWords = [] }: { text: string; className?: string; highlightWords?: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] });
  const words = text.split(" ");
  return (
    <div ref={ref} className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word.toLowerCase().replace(/[.,!?;]/g, ""));
        return (
          <motion.span key={i} style={{
            opacity: useTransform(scrollYProgress, [i / words.length, Math.min((i + 1) / words.length + 0.1, 1)], [0.1, 1]),
            color: isHighlight ? BRAND.accent : BRAND.headline,
            fontSize: isHighlight ? "1.1em" : undefined,
            fontStyle: isHighlight ? "italic" : undefined,
          }}>
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

/* ─── Service flip card ──────────────────── */
function ServiceCard({ s, i }: { s: { icon: React.ReactNode; title: string; description: string; features: string[]; num: string }; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Tilt intensity={16}>
      <motion.div
        initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: i * 0.09, type: "spring", stiffness: 80 }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        data-hover
        style={{
          background: hov ? BRAND.accent : "#ffffff",
          borderColor: hov ? BRAND.accent : BRAND.headline + "28",
          transition: "background 0.32s, border-color 0.32s",
          transformStyle: "preserve-3d", minHeight: 300,
        }}
        className="p-8 rounded-3xl border-2 relative overflow-hidden flex flex-col cursor-default"
      >
        {/* Ghost number floats in Z */}
        <span style={{
          position: "absolute", top: 12, right: 16, fontSize: 72, fontWeight: 900,
          color: BRAND.headline, opacity: 0.06, lineHeight: 1, userSelect: "none",
          transform: "translateZ(20px)", transition: "color 0.32s",
        }}>{s.num}</span>

        {/* Icon */}
        <motion.div
          animate={{ rotateY: hov ? 360 : 0 }} transition={{ duration: 0.6 }}
          style={{ width: 56, height: 56, borderRadius: 14, background: BRAND.headline + "18", color: BRAND.headline, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "background 0.32s, color 0.32s" }}
        >{s.icon}</motion.div>

        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: BRAND.headline, transition: "color 0.32s" }}>{s.title}</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: hov ? BRAND.text : BRAND.text + "80", flex: 1, transition: "color 0.32s", marginBottom: 16 }}>{s.description}</p>

        {/* Features slide up */}
        <AnimatePresence>
          {hov && (
            <motion.ul initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
              {s.features.slice(0, 3).map((f, fi) => (
                <motion.li key={fi} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: fi * 0.06 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: BRAND.headline }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: BRAND.headline, flexShrink: 0 }} />{f}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: BRAND.headline, transition: "color 0.32s" }}>
          See details <ArrowUpRight size={13} />
        </div>
      </motion.div>
    </Tilt>
  );
}

/* ─── Industry accordion ─────────────────── */
function IndustryRow({ ind, i }: { ind: { icon: React.ReactNode; title: string; description: string; clients: number }; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.07 }}
      onClick={() => setOpen(o => !o)} data-hover
      className="border-b cursor-pointer" style={{ borderColor: BRAND.header + "22" }}
    >
      <div className="flex items-center justify-between py-5 px-2 gap-4">
        <div className="flex items-center gap-5">
          <motion.div
            animate={{ background: open ? BRAND.accent : BRAND.header + "18", rotate: open ? 8 : 0 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ color: BRAND.header, transition: "background 0.25s" }}
          >{ind.icon}</motion.div>
          <div>
            <span style={{ fontSize: 19, fontWeight: 700, color: BRAND.headline }}>{ind.title}</span>
            <span style={{ marginLeft: 12, fontSize: 11, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{ind.clients} clients</span>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 300 }} style={{ color: BRAND.header }}>
          <Plus size={22} />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
            <p style={{ padding: "0 16px 20px 68px", fontSize: 14.5, lineHeight: 1.7, color: BRAND.text + "80" }}>{ind.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── 3D Process step ────────────────────── */
function ProcessStep({ step, title, desc, i, total }: { step: string; title: string; desc: string; i: number; total: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Tilt intensity={10}>
      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        data-hover
        style={{
          background: hov ? BRAND.accent : "#ffffff",
          borderColor: hov ? BRAND.accent : BRAND.headline + "28",
          transition: "background 0.3s, border-color 0.3s",
          padding: "28px 24px", borderRadius: 24, border: "2px solid", cursor: "default", position: "relative",
        }}
      >
        {/* Connector */}
        {i < total - 1 && (
          <div style={{ display: "none" }} className="lg:block" />
        )}
        <motion.div
          animate={{ background: hov ? BRAND.headline + "18" : BRAND.headline + "12" }}
          style={{ width: 48, height: 48, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, transition: "background 0.3s" }}
        >
          <span style={{ fontSize: 16, fontWeight: 900, color: BRAND.headline }}>{step}</span>
        </motion.div>

        {/* Ghost number */}
        <motion.div style={{ position: "absolute", top: 24, right: 20, opacity: 0.06, fontSize: 56, fontWeight: 900, color: BRAND.headline, lineHeight: 1 }}>
          {step}
        </motion.div>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: BRAND.headline, transition: "color 0.3s" }}>{title}</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: hov ? BRAND.text : BRAND.text + "70", transition: "color 0.3s" }}>{desc}</p>
      </motion.div>
    </Tilt>
  );
}

/* ─── Main ──────────────────────────────── */
import type { WPService, WPIndustry, WPProcessStep } from "@/lib/wordpress";

const ICONS = [<Code size={22} />, <Palette size={22} />, <Sparkles size={22} />, <TrendingUp size={22} />, <Lightbulb size={22} />];
const INDUSTRY_ICONS = [<ShoppingBag size={20} />, <Heart size={20} />, <GraduationCap size={20} />, <Building2 size={20} />, <Utensils size={20} />, <Briefcase size={20} />];

export default function Work({ services, industries, processSteps }: { services: WPService[]; industries: WPIndustry[]; processSteps: WPProcessStep[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Enrich services from WordPress with sequential numbering and icons
  const enrichedServices = services.map((s, i) => ({
    ...s,
    num: String(i + 1).padStart(2, "0"),
    icon: ICONS[i % ICONS.length],
  }));

  const enrichedIndustries = industries.map((ind, i) => ({
    ...ind,
    icon: INDUSTRY_ICONS[i % INDUSTRY_ICONS.length],
    clients: ind.clientCount,
  }));

  const process = processSteps.map((s, i) => ({
    step: String(i + 1).padStart(2, "0"),
    title: s.title,
    desc: s.description,
  }));

  return (
    <div className="pt-20 overflow-x-hidden" style={{ background: BRAND.bg, color: BRAND.text }}>
      <MagneticCursor />

      {/* ── HERO ─────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Floating shapes */}
        <Shape top="8%" left="-3%" w={320} h={320} bg={BRAND.header + "15"} br="50%" blur delay={0} dur={9} dy={38} dr={16} />
        <Shape bottom="10%" right="6%" w={110} h={110} border={`13px solid ${BRAND.header}38`} br="50%" delay={2} dur={10} dy={28} dr={40} />
        <Shape top="50%" right="14%" w={60} h={60} bg={BRAND.header + "55"} br="50%" delay={0.8} dur={6} dy={18} dr={0} />
        <Shape bottom="8%" left="8%" w={180} h={55} bg={BRAND.header + "20"} br="999px" blur delay={3} dur={11} dy={22} dr={8} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-24">
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold mb-8"
            style={{ fontSize: "clamp(3rem,10vw,8rem)", lineHeight: 0.95, letterSpacing: "-0.02em", color: BRAND.headline }}
          >
            Services &<br /><span style={{ color: BRAND.headline }}>Industries.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl max-w-2xl leading-relaxed" style={{ color: BRAND.text + "80" }}>
            Full-service digital solutions across every channel and sector — built to grow ambitious brands.
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: BRAND.header + "60" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
            style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${BRAND.header}, transparent)` }} />
        </motion.div>
      </section>

      {/* ── REVEAL STRIP ─────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 lg:px-16" style={{ background: BRAND.header + "0b" }}>
        <div className="max-w-5xl mx-auto">
          <RevealText text="From concept to launch we deliver comprehensive digital solutions — tailored precisely to your needs and built to outperform."
            className="text-3xl md:text-4xl font-bold leading-[1.3]"
            highlightWords={["tailored", "precisely"]} />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────── */}
      <div className="overflow-hidden py-5 border-y-2" style={{ borderColor: BRAND.headline + "33" }}>
        <motion.div className="flex gap-12 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          {[...Array(4)].flatMap(() => ["Web Dev", "UI Design", "Branding", "SEO", "Strategy", "Marketing", "Growth", "E-commerce"]).map((w, i) => (
            <span key={i} style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: BRAND.headline }}>
              {w} <span style={{ opacity: 0.3, margin: "0 8px" }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── SERVICES 3D GRID ─────────────────────── */}
      <section className="py-28 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
        {/* Section shapes */}
        <Shape bottom="5%" left="-2%" w={160} h={160} bg={BRAND.header + "15"} br="50%" blur delay={1.5} dur={10} dy={25} dr={15} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: BRAND.headline }}>Our Services</h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {enrichedServices.map((s, i) => <ServiceCard key={i} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESS 3D CARDS ─────────────────────── */}
      <section className="py-28 px-4 sm:px-8 lg:px-16 relative overflow-hidden" style={{ background: BRAND.header + "0c" }}>
        <Shape bottom="-5%" left="3%" w={140} h={140} border={`12px solid ${BRAND.header}28`} br="50%" delay={2} dur={9} dy={22} dr={35} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: BRAND.headline }}>Our Process</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5" style={{ perspective: "1000px" }}>
            {process.map((p, i) => <ProcessStep key={i} {...p} i={i} total={process.length} />)}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────── */}
      <section className="py-28 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
        <Shape top="10%" right="-3%" w={180} h={180} bg={BRAND.header + "12"} br="50%" blur delay={1} dur={10} dy={30} dr={20} />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: BRAND.headline }}>Industries We Serve</h2>
            <p style={{ marginTop: 8, fontSize: 15, color: BRAND.accent }}>Click any industry to learn more</p>
          </motion.div>

          <div style={{ borderTop: `2px solid ${BRAND.header}22` }}>
            {enrichedIndustries.map((ind, i) => <IndustryRow key={i} ind={ind} i={i} />)}
          </div>

          {/* Don't see yours */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-14 p-10 rounded-3xl text-center"
            style={{ border: `2px solid ${BRAND.accent}`, background: BRAND.accent + "28" }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: BRAND.headline, marginBottom: 10 }}>Don't see your industry?</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: BRAND.text + "80", marginBottom: 20 }}>
              We work with businesses of all types. Our adaptable approach creates solutions for any sector.
            </p>
            <motion.button whileHover={{ scale: 1.04, background: BRAND.accent, color: BRAND.headline }} whileTap={{ scale: 0.97 }} data-hover
              className="px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-200"
              style={{ background: BRAND.headline }}>Let's talk anyway →</motion.button>
          </motion.div>
        </div>
      </section>

      <ClientLogos />
    </div>
  );
}
