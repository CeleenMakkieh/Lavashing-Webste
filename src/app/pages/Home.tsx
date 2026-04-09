import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Link } from "react-router";
import { Sparkles, Code, Palette, TrendingUp, Target, ArrowUpRight } from "lucide-react";
import ClientLogos from "../components/ClientLogos";
import InteractiveMap from "../components/InteractiveMap";

const BRAND = {
  bg: "#ffffe9",
  header: "#6b8d6d",
  pink: "#f6c0d7",
  text: "#111111",
};

/* ─── Custom cursor ──────────────────────── */
function MagneticCursor() {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
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
      <motion.div style={{ x: tx, y: ty, translateX: "-50%", translateY: "-50%", width: big ? 48 : 32, height: big ? 48 : 32, borderRadius: "50%", border: `1.5px solid ${BRAND.header}`, position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none", opacity: 0.5, transition: "width 0.2s, height 0.2s" }} />
    </>
  );
}

/* ─── Typewriter ────────────────────────── */
const WORDS = ["inspire", "convert", "captivate", "grow you"];
function TypewriterWord() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = WORDS[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && shown.length < word.length) t = setTimeout(() => setShown(word.slice(0, shown.length + 1)), 80);
    else if (!del) t = setTimeout(() => setDel(true), 1600);
    else if (del && shown.length > 0) t = setTimeout(() => setShown(shown.slice(0, -1)), 45);
    else { setDel(false); setIdx(i => (i + 1) % WORDS.length); }
    return () => clearTimeout(t);
  }, [shown, del, idx]);
  return (
    <span style={{ color: BRAND.header }}>
      {shown}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} style={{ display: "inline-block", width: 3, height: "0.8em", marginLeft: 4, background: BRAND.header, verticalAlign: "middle" }} />
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
              color: isHighlight ? BRAND.pink : BRAND.text
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

/* ─── 3-D tilt card ─────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 140, damping: 22 });
  const sy = useSpring(ry, { stiffness: 140, damping: 22 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }} className={className}>
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
        style={{ background: hov ? BRAND.header : BRAND.bg, borderColor: hov ? BRAND.header : BRAND.header + "28", transition: "background 0.3s, border-color 0.3s", transformStyle: "preserve-3d" }}
        className="p-8 rounded-3xl border-2 relative overflow-hidden flex flex-col h-full cursor-default"
      >
        <span style={{ position: "absolute", top: 14, right: 18, fontSize: 64, fontWeight: 900, color: hov ? "#fff" : BRAND.header, opacity: 0.06, lineHeight: 1, userSelect: "none" }}>{s.num}</span>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: hov ? "#ffffff22" : BRAND.header + "18", color: hov ? "#fff" : BRAND.header, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "background 0.3s, color 0.3s" }}>{s.icon}</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: hov ? "#fff" : BRAND.header, transition: "color 0.3s" }}>{s.title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: hov ? "#ffffffbb" : BRAND.text + "80", flex: 1, transition: "color 0.3s" }}>{s.desc}</p>
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: hov ? BRAND.pink : BRAND.header, transition: "color 0.3s" }}>
          Learn more <ArrowUpRight size={13} />
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ─── Stat card ─────────────────────────── */
// Removed - stats section not needed

/* ─── Main ──────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const shapes = [
    { top: "6%", left: "-4%", w: 360, h: 360, bg: BRAND.header + "18", br: "50%", delay: 0, dur: 9, dy: 40, dr: 20, blur: true },
    { top: "4%", right: "3%", w: 155, h: 155, bg: BRAND.pink, br: "2.2rem", border: `2px solid ${BRAND.header}22`, delay: 1.5, dur: 7, dy: 22, dr: 28 },
    { top: "43%", right: "9%", w: 75, h: 75, bg: BRAND.header + "55", br: "50%", border: `2px solid ${BRAND.header}40`, delay: 0.8, dur: 6, dy: 18, dr: 0 },
    { bottom: "13%", left: "5%", w: 110, h: 110, border: `13px solid ${BRAND.header}38`, br: "50%", delay: 2, dur: 10, dy: 30, dr: 42 },
    { top: "60%", left: "15%", w: 46, h: 46, bg: BRAND.pink, br: "11px", delay: 1, dur: 8, dy: 15, dr: 22 },
    { bottom: "7%", right: "11%", w: 170, h: 55, bg: BRAND.header + "22", br: "999px", blur: true, delay: 3, dur: 11, dy: 25, dr: 8 },
  ];

  const svcs = [
    { num: "01", icon: <Code size={22} />, title: "Web Development", desc: "Custom sites and apps built with modern tech — fast, accessible, built to scale." },
    { num: "02", icon: <Palette size={22} />, title: "Web Design", desc: "Beautiful interfaces that captivate your audience and drive real conversions." },
    { num: "03", icon: <Sparkles size={22} />, title: "Branding", desc: "Distinctive brand identities that make your business impossible to forget." },
    { num: "04", icon: <TrendingUp size={22} />, title: "Marketing", desc: "Strategic campaigns backed by data to grow your audience and boost ROI." },
    { num: "05", icon: <Target size={22} />, title: "Strategy", desc: "Data-driven insights and planning to guide your business confidently forward." },
  ];

  

  return (
    <div className="pt-20 overflow-x-hidden" style={{ background: BRAND.bg, color: BRAND.text }}>
      <MagneticCursor />

      {/* ── HERO ─────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
        {shapes.map((s, i) => <Shape key={i} s={s} />)}

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
            style={{ fontSize: "clamp(3rem,9vw,7.5rem)", lineHeight: 0.97, letterSpacing: "-0.02em", color: BRAND.text }}
          >
            We create
            <br />experiences that
            <br /><TypewriterWord />
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-xl max-w-2xl mx-auto mb-14 leading-relaxed"
            style={{ color: BRAND.text + "80" }}
          >
            A modern marketing and web agency crafting premium digital solutions for ambitious brands.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link to="/contact">
              <motion.button data-hover whileHover={{ scale: 1.04, background: BRAND.pink, color: BRAND.header }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full text-base font-bold text-white inline-flex items-center gap-2 transition-all duration-200"
                style={{ background: BRAND.header }}
              >Book a Call <ArrowUpRight size={15} /></motion.button>
            </Link>
            <Link to="/work">
              <motion.button data-hover whileHover={{ background: BRAND.header, color: "#fff", scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full text-base font-bold border-2 transition-all duration-200"
                style={{ borderColor: BRAND.header, color: BRAND.header, background: "transparent" }}
              >Explore Our Work</motion.button>
            </Link>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 10 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl mx-auto" style={{ perspective: 1200 }}
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border-2" style={{ borderColor: BRAND.header + "30" }}>
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="https://cdn.coverr.co/videos/coverr-gradient-wave-3d-animation-9948/1080p.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, ${BRAND.header}33, transparent)` }} />
              <div className="absolute bottom-5 left-5 rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-md"
                style={{ background: "rgba(255,255,233,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">Available for new projects</span>
              </div>
            </div>
            <Shape s={{ top: "-20px", right: "-20px", w: 54, h: 54, bg: BRAND.header, br: "14px", delay: 0.5, dur: 5, dy: 13, dr: 18 }} />
            <Shape s={{ bottom: "-18px", left: "-18px", w: 68, h: 68, bg: BRAND.pink, br: "50%", blur: true, delay: 1, dur: 7, dy: 17, dr: 12 }} />
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

      {/* ── MANIFESTO REVEAL ─────────────────────── */}
      <section className="py-24 px-4 sm:px-8 lg:px-16" style={{ background: BRAND.header + "0b" }}>
        <div className="max-w-5xl mx-auto">
          <RevealText
            text="From concept to launch we deliver comprehensive digital solutions — tailored precisely to your needs and built to outperform."
            className="text-3xl md:text-4xl font-bold leading-[1.3]"
            highlightWords={["tailored", "precisely"]}
          />
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────── */}
      <section className="py-28 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold" style={{ color: BRAND.header }}>What we do</motion.h2>
              <p className="mt-2 text-base opacity-50">Hover for a 3D effect</p>
            </div>
            <Link to="/work">
              <motion.button data-hover whileHover={{ background: BRAND.pink, color: BRAND.header }}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200"
                style={{ borderColor: BRAND.header, color: BRAND.header }}>All services →</motion.button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {svcs.map((s, i) => <SvcCard key={i} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────── */}
      <div className="overflow-hidden py-5 border-y-2" style={{ borderColor: BRAND.header + "22" }}>
        <motion.div className="flex gap-12 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
          {[...Array(4)].flatMap(() => ["Strategy", "Branding", "Design", "Development", "Marketing", "Growth"]).map((w, i) => (
            <span key={i} style={{ fontSize: 22, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: BRAND.header }}>
              {w} <span style={{ opacity: 0.3, margin: "0 8px" }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      <ClientLogos />
      <InteractiveMap />

      {/* ── CTA ──────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-8 lg:px-16 relative overflow-hidden" style={{ background: BRAND.header }}>
        <div className="absolute inset-0 flex items-center justify-center font-black select-none pointer-events-none" style={{ fontSize: "18vw", color: "#ffffff07" }}>LAVASHING</div>
        <Shape s={{ top: "-5%", left: "-3%", w: 280, h: 280, bg: "#ffffff07", br: "50%", delay: 0, dur: 8, dy: 35, dr: 25 }} />
        <Shape s={{ bottom: "-5%", right: "-3%", w: 230, h: 230, bg: "#ffffff07", br: "3rem", delay: 1.5, dur: 10, dy: 28, dr: 18 }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl mb-12" style={{ color: "#ffffffbb" }}>Let's create something extraordinary together.</p>
          <Link to="/contact">
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
