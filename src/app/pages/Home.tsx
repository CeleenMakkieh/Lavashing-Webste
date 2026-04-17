"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { Sparkles, Code, Palette, TrendingUp, Target, ArrowUpRight, Smartphone, Share2, FileText, Paintbrush, Search, Zap, Lightbulb } from "lucide-react";
import ClientLogos from "../components/ClientLogos";
import InteractiveMap from "../components/InteractiveMap";
import type { WPSiteSettings, WPClient } from "@/lib/wordpress";

const BRAND = {
  bg: "#f8eeea",
  header: "#6b8d6d",
  headline: "#670626",
  accent: "#bad797",
  pink: "#f6c0d7",
  text: "#1a0509",
};

/* ─── Custom cursor (desktop only) ──────────── */
function MagneticCursor() {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const tx = useSpring(cx, { stiffness: 55, damping: 16 });
  const ty = useSpring(cy, { stiffness: 55, damping: 16 });
  const [big, setBig] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch || !window.matchMedia("(pointer: fine)").matches) return;
    setShow(true);
    const mv = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); };
    const ov = (e: MouseEvent) => { if ((e.target as Element).closest("a,button,[data-hover]")) setBig(true); };
    const ol = () => setBig(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", ov);
    window.addEventListener("mouseout", ol);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", ov); window.removeEventListener("mouseout", ol); };
  }, []);
  if (!show) return null;
  return (
    <>
      <motion.div style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%", width: 10, height: 10, borderRadius: "50%", background: BRAND.header, position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none" }} />
      <motion.div style={{ x: tx, y: ty, translateX: "-50%", translateY: "-50%", width: big ? 48 : 32, height: big ? 48 : 32, borderRadius: "50%", border: `1.5px solid ${BRAND.header}`, position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none", opacity: 0.5, transition: "width 0.2s, height 0.2s" }} />
    </>
  );
}

/* ─── Typewriter ────────────────────────── */
function TypewriterWord({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && shown.length < word.length) t = setTimeout(() => setShown(word.slice(0, shown.length + 1)), 80);
    else if (!del) t = setTimeout(() => setDel(true), 1600);
    else if (del && shown.length > 0) t = setTimeout(() => setShown(shown.slice(0, -1)), 45);
    else { setDel(false); setIdx(i => (i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [shown, del, idx]);
  return (
    <span style={{ color: "#6b8d6d" }}>
      {shown}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} style={{ display: "inline-block", width: 3, height: "0.8em", marginLeft: 4, background: "#6b8d6d", verticalAlign: "middle" }} />
    </span>
  );
}

/* ─── Word-by-word scroll reveal ─────────── */
function RevealText({ text, className = "", highlightWords = [] }: { text: string; className?: string; highlightWords?: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] });
  const words = text.split(" ");
  return (
    <div ref={ref} className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const pct = i / words.length;
        const isHighlight = highlightWords.includes(word.toLowerCase().replace(/[.,!?;]/g, ""));
        return (
          <motion.span
            key={i}
            style={{
              opacity: useTransform(scrollYProgress, [pct, Math.min(pct + 0.15, 1)], [0.1, 1]),
              color: isHighlight ? "#bad797" : "#670626",
              fontSize: isHighlight ? "1.15em" : undefined,
              fontStyle: isHighlight ? "italic" : undefined
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

/* ─── Floating shape ────────────────────── */
function Shape({ s }: { s: { top?: string; bottom?: string; left?: string; right?: string; w: number; h: number; bg?: string; border?: string; br: string; blur?: boolean; delay: number; dur: number; dy: number; dr: number } }) {
  return (
    <motion.div
      animate={{ y: [0, -s.dy, 0], rotate: [-s.dr / 2, s.dr / 2, -s.dr / 2] }}
      transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", pointerEvents: "none",
        top: s.top, bottom: s.bottom, left: s.left, right: s.right,
        width: s.w, height: s.h,
        background: s.bg,
        border: s.border,
        borderRadius: s.br,
        filter: s.blur ? "blur(8px)" : undefined,
      }}
    />
  );
}

/* ─── 3-D tilt card (desktop only) ──────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: isMobile ? 0 : sx, rotateY: isMobile ? 0 : sy, transformStyle: isMobile ? "flat" : "preserve-3d" }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Service card ──────────────────────── */
function SvcCard({ s, i }: { s: { num: string; icon: React.ReactNode; title: string; desc: string }; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <TiltCard>
      <motion.div
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        data-hover
        style={{ background: hov ? BRAND.accent : "#ffffff", borderColor: hov ? BRAND.accent : BRAND.headline + "28", transition: "background 0.3s, border-color 0.3s", transformStyle: "preserve-3d" }}
        className="p-8 rounded-3xl border-2 relative overflow-hidden flex flex-col h-full cursor-default"
      >
        <span style={{ position: "absolute", top: 14, right: 18, fontSize: 64, fontWeight: 900, color: hov ? BRAND.headline : BRAND.headline, opacity: 0.06, lineHeight: 1, userSelect: "none" }}>{s.num}</span>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: hov ? BRAND.headline + "22" : BRAND.headline + "12", color: hov ? BRAND.headline : BRAND.headline, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "background 0.3s, color 0.3s" }}>{s.icon}</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: BRAND.headline, transition: "color 0.3s" }}>{s.title}</h3>
        <p style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: hov ? BRAND.text : BRAND.text + "80",
          flex: 1,
          transition: "color 0.3s, max-height 0.4s ease",
          overflow: "hidden",
          maxHeight: hov ? "600px" : "4.95em",
          display: "-webkit-box",
          WebkitLineClamp: hov ? "unset" : 3,
          WebkitBoxOrient: "vertical",
        }}>{s.desc}</p>
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: BRAND.headline, transition: "color 0.3s" }}>
          Learn more <ArrowUpRight size={13} />
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ─── Stat card ─────────────────────────── */
// Removed - stats section not needed

/* ─── Video zoom (Clay-style) ───────────── */
function VideoZoom({ videoUrl }: { videoUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <div ref={containerRef} style={{ height: "135vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: BRAND.bg,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Video scales from center outward */}
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            scale,
            borderRadius,
            overflow: "hidden",
            originX: 0.5,
            originY: 0.5,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, ${BRAND.header}55, transparent 55%)`,
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main ──────────────────────────────── */
export default function Home({ settings, clients = [] }: { settings: WPSiteSettings; clients?: WPClient[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [marqueeDuration, setMarqueeDuration] = useState(22);
  useEffect(() => { if (window.innerWidth < 768) setMarqueeDuration(8); }, []);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const shapes = [
    { top: "6%", left: "-4%", w: 360, h: 360, bg: BRAND.header + "18", br: "50%", delay: 0, dur: 9, dy: 40, dr: 20, blur: true },
    { top: "43%", right: "9%", w: 75, h: 75, bg: BRAND.header + "55", br: "50%", border: `2px solid ${BRAND.header}40`, delay: 0.8, dur: 6, dy: 18, dr: 0 },
    { bottom: "13%", left: "5%", w: 110, h: 110, border: `13px solid ${BRAND.header}38`, br: "50%", delay: 2, dur: 10, dy: 30, dr: 42 },
    { bottom: "7%", right: "11%", w: 170, h: 55, bg: BRAND.header + "22", br: "999px", blur: true, delay: 3, dur: 11, dy: 25, dr: 8 },
  ];

  const svcs = [
    { num: "01", icon: <Code size={22} />, title: "Web Development", desc: "Fast, responsive, and scalable websites engineered for performance and search visibility. From custom-coded solutions to CMS-powered platforms, every build prioritizes clean architecture, mobile-first design, and structured data  ensuring your site ranks well on traditional search engines and gets surfaced by AI-powered tools like Google AI Overviews, ChatGPT, and Perplexity." },
    { num: "02", icon: <Smartphone size={22} />, title: "App Development", desc: "Custom mobile and web applications built to solve real business challenges. Every project moves from concept and UX research through to launch and ongoing iteration  using scalable frameworks, intuitive interfaces, and a technical foundation designed to perform seamlessly across devices and platforms." },
    { num: "03", icon: <Palette size={22} />, title: "Web Design", desc: "Visually striking, user-friendly websites that bring your brand to life and deliver a seamless experience on every screen. The focus is on layout, typography, responsiveness, and usability  making sure your site looks polished, loads fast, and moves visitors toward action. Every design choice is shaped by how real users and search engines interact with your content." },
    { num: "04", icon: <Sparkles size={22} />, title: "Branding", desc: "A strong brand is more than a logo it's how your audience recognizes, trusts, and remembers you. Branding services cover visual identity, strategy, voice, messaging, and consistency across every touchpoint. Whether it's a fresh launch or a full rebrand, the result is an identity built to stand out in both human-facing and AI-driven discovery channels." },
    { num: "05", icon: <TrendingUp size={22} />, title: "Marketing", desc: "Strategic marketing solutions built to drive growth, reach the right audience, and create lasting visibility. The approach blends creative campaigns, data-driven targeting, and results-focused strategy  all tailored to your goals and designed to perform across search, social, and emerging AI platforms." },
    { num: "06", icon: <Share2 size={22} />, title: "Social Media Management", desc: "Strategy-first social media management that keeps your brand active, relevant, and visible where your audience actually spends time. From content calendars and community engagement to analytics and platform-specific optimization every effort builds the kind of consistent, authoritative presence that both followers and AI tools increasingly recognize and recommend." },
    { num: "07", icon: <FileText size={22} />, title: "Content Creation", desc: "High-quality, original content built to rank, resonate, and get cited. From blog posts and landing pages to video scripts and email sequences, every piece is crafted using SEO best practices and AISO principles  with clear structure, entity-rich language, and authoritative sourcing that performs in traditional search results and AI-generated answers alike." },
    { num: "08", icon: <Paintbrush size={22} />, title: "Graphic Design", desc: "Scroll-stopping visuals that communicate your message clearly and elevate your brand across every platform. From social media graphics and infographics to pitch decks and ad creatives, every asset is on-brand, on-message, and optimized for the formats that drive real engagement." },
    { num: "09", icon: <Search size={22} />, title: "Search Engine Optimization (SEO)", desc: "Data-driven SEO services covering technical audits, on-page optimization, keyword strategy, link building, site architecture, page speed, schema markup, and content alignment. The objective is straightforward: rank higher, attract qualified organic traffic, and turn visitors into customers." },
    { num: "10", icon: <Zap size={22} />, title: "AI SEO (AISO) / Generative Engine Optimization (GEO)", desc: "Your brand's visibility now extends beyond Google into AI-powered platforms like ChatGPT, Perplexity, Google AI Overviews, and Copilot. AI SEO focuses on making your brand discoverable, citable, and recommended by these tools. The strategy includes entity optimization, structured data, authoritative content development, and digital footprint positioning so when users ask questions in your space, AI models point them to you." },
    { num: "11", icon: <Target size={22} />, title: "Digital Campaign Planning", desc: "Multi-channel digital campaigns built around your business objectives. From audience research and platform selection to creative direction and performance tracking, every campaign is structured to maximize impact  with messaging optimized for human engagement and AI-driven discovery alike." },
    { num: "12", icon: <Lightbulb size={22} />, title: "Creative Consulting", desc: "Strategic creative direction for brands ready to level up. From positioning and campaign ideation to content strategy and visual direction  the focus is on solving real business problems with bold, informed creative thinking and a deep understanding of how audiences discover and connect with brands today." },
  ];



  return (
    <div className="pt-20 overflow-x-hidden" style={{ background: BRAND.bg, color: BRAND.text }}>
      <MagneticCursor />

      {/* ── HERO ─────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div className="hidden md:block">{shapes.map((s, i) => <Shape key={i} s={s} />)}</div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-24 text-center"
        >
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 border text-sm font-medium"
            style={{ background: BRAND.bg, borderColor: BRAND.header + "50", color: BRAND.header }}
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold mb-8"
            style={{ fontSize: "clamp(3rem,9vw,7.5rem)", lineHeight: 0.97, letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "#670626" }}>We build brands that</span>
            <br /><TypewriterWord words={["resonate", "grow", "connect", "last", "lead"]} />
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-xl max-w-2xl mx-auto mb-14 leading-relaxed"
            style={{ color: BRAND.text + "80" }}
          >
            {settings.heroSubtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link href="/contact">
              <motion.button data-hover whileHover={{ scale: 1.04, background: "#bad797", color: "#670626" }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full text-base font-bold text-white inline-flex items-center gap-2 transition-all duration-200"
                style={{ background: "#670626" }}
              >Book a Call <ArrowUpRight size={15} /></motion.button>
            </Link>
            <Link href="/work">
              <motion.button data-hover whileHover={{ background: "#670626", color: "#fff", scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full text-base font-bold border-2 transition-all duration-200"
                style={{ borderColor: "#670626", color: "#670626", background: "transparent" }}
              >Explore Our Work</motion.button>
            </Link>
          </motion.div>

        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: BRAND.header + "70" }}
        >
          <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
            style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${BRAND.header}, transparent)` }} />
        </motion.div>
      </section>

      {/* ── VIDEO ZOOM (Clay-style) ──────────────── */}
      <VideoZoom videoUrl={settings.heroVideoUrl} />

      {/* ── MANIFESTO REVEAL ─────────────────────── */}
      <section className="py-24 px-4 sm:px-8 lg:px-16" style={{ background: "#670626" + "0e" }}>
        <div className="max-w-5xl mx-auto">
          <RevealText
            text="We turn ideas into high-performing digital experiences tailored to your brand and built to stand out"
            className="text-3xl md:text-4xl font-bold leading-[1.3]"
            highlightWords={["tailored", "stand", "out"]}
          />
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────── */}
      <section className="py-28 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold" style={{ color: "#670626" }}>What we do</motion.h2>
            </div>
            <Link href="/work">
              <motion.button data-hover whileHover={{ background: "#bad797", color: "#670626" }}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200"
                style={{ borderColor: "#670626", color: "#670626" }}>All services →</motion.button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {svcs.map((s, i) => <SvcCard key={i} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────── */}
      <div className="overflow-hidden py-5 border-y-2" style={{ borderColor: "#670626" + "33" }}>
        <motion.div key={marqueeDuration} className="flex gap-12 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: marqueeDuration, repeat: Infinity, ease: "linear" }}>
          {[...Array(4)].flatMap(() => ["Strategy", "Branding", "Design", "Development", "Marketing", "Growth"]).map((w, i) => (
            <span key={i} style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#670626" }}>
              {w} <span style={{ opacity: 0.3, margin: "0 8px" }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      <ClientLogos clients={clients} />
      <InteractiveMap />

      {/* ── CTA ──────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-8 lg:px-16 relative overflow-hidden" style={{ background: "#670626" }}>
        <div className="absolute inset-0 flex items-center justify-center font-black select-none pointer-events-none" style={{ fontSize: "18vw", color: "#f6c0d714" }}>LAVASHING</div>
        <div className="hidden md:block">
          <Shape s={{ top: "-5%", left: "-3%", w: 280, h: 280, bg: "#ffffff07", br: "50%", delay: 0, dur: 8, dy: 35, dr: 25 }} />
          <Shape s={{ bottom: "-5%", right: "-3%", w: 230, h: 230, bg: "#ffffff07", br: "3rem", delay: 1.5, dur: 10, dy: 28, dr: 18 }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: "#f6c0d7" }}>Ready to get started?</h2>
          <p className="text-xl mb-12" style={{ color: "#f6c0d7bb" }}>Let's create something extraordinary together.</p>
          <Link href="/contact">
            <motion.button data-hover whileHover={{ background: BRAND.pink, color: BRAND.header, scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white/30 inline-flex items-center gap-2 transition-all duration-200">
              Book a Call <ArrowUpRight size={15} />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
