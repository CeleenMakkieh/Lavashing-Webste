"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Target, Users, Award, TrendingUp, ArrowUpRight, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/contexts/TranslationContext";

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
  const { tArr } = useT();
  const words = tArr("about.marquee");
  const repeated = [...words, ...words, ...words];
  const [duration, setDuration] = useState(18);
  useEffect(() => { if (window.innerWidth < 768) setDuration(7); }, []);
  return (
    <div className="overflow-hidden py-5 border-y-2" style={{ borderColor: BRAND.headline + "33" }}>
      <motion.div
        key={duration}
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
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
          <span className="text-xl font-medium" style={{ color: BRAND.headline }}>{title}</span>
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
            <p className="px-14 pb-5 text-base leading-relaxed" style={{ color: BRAND.header }}>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────── */
import type { WPValue } from "@/lib/wordpress";

const DEFAULT_VALUES_KEYS = [
  { titleKey: "about.value.1.title", descKey: "about.value.1.desc" },
  { titleKey: "about.value.2.title", descKey: "about.value.2.desc" },
  { titleKey: "about.value.3.title", descKey: "about.value.3.desc" },
  { titleKey: "about.value.4.title", descKey: "about.value.4.desc" },
];

const VALUE_ICONS = [<Target size={18} />, <Users size={18} />, <Award size={18} />, <TrendingUp size={18} />];

/* ── Gallery media list ───────────────────────── */
const MEDIA: { type: "video" | "image"; src: string; wide: boolean }[] = [
  { type: "video", src: "/Video_20260420_135730_989.mp4", wide: true },
  { type: "image", src: "/Image_20260420_140935_075.png", wide: false },
  { type: "image", src: "/ow1.png", wide: false },
  { type: "video", src: "/Video_20260420_140933_789.mp4", wide: false },
  { type: "image", src: "/Image_20260420_141051_929.png", wide: false },
  { type: "image", src: "/Image_20260420_140935_031.png", wide: false },
  { type: "image", src: "/Image_20260420_140934_285.png", wide: false },
  { type: "image", src: "/Image_20260420_140935_135.png", wide: true },
  { type: "video", src: "/Video_20260420_135736_975.mp4", wide: false },
  { type: "image", src: "/Image_20260420_140935_397.png", wide: false },
  { type: "video", src: "/Video_20260420_135739_833.mp4", wide: true },
  { type: "image", src: "/Image_20260420_140935_791.png", wide: false },
  { type: "video", src: "/Video_20260420_140933_767.mp4", wide: false },
  { type: "image", src: "/Image_20260420_141052_746.png", wide: true },
  { type: "image", src: "/Image_20260420_141053_662.png", wide: false },
  { type: "video", src: "/Video_20260420_140934_315.mp4", wide: true },
  { type: "image", src: "/Image_20260420_141217_273.png", wide: false },
  { type: "video", src: "/Video_20260420_140934_330.mp4", wide: false },
  { type: "image", src: "/Image_20260420_141217_286.png", wide: false },
  { type: "video", src: "/Video_20260420_140936_750_1.mp4", wide: true },
  { type: "video", src: "/Video_20260420_135735_395_1.mp4", wide: false },
];

/* ── Lightbox ─────────────────────────────────── */
function Lightbox({ idx, onClose, onNav }: { idx: number; onClose: () => void; onNav: (dir: 1 | -1) => void }) {
  const item = MEDIA[idx];
  const touchX = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.93)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) onNav(diff > 0 ? 1 : -1);
      }}
    >
      {/* Media */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: "90vw", maxHeight: "88vh", borderRadius: 16, overflow: "hidden" }}
      >
        {item.type === "video" ? (
          <video autoPlay loop muted playsInline controls
            style={{ maxWidth: "90vw", maxHeight: "88vh", display: "block", borderRadius: 16 }}>
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt="" style={{ maxWidth: "90vw", maxHeight: "88vh", display: "block", borderRadius: 16, objectFit: "contain" }} />
        )}
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        style={{ position: "fixed", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onNav(-1); }}
        style={{ position: "fixed", left: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNav(1); }}
        style={{ position: "fixed", right: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Counter */}
      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
        {idx + 1} / {MEDIA.length}
      </div>
    </motion.div>
  );
}

export default function About({
  values,
}: {
  values?: WPValue[];
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const { t } = useT();
  const [showAll, setShowAll] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const navLightbox = (dir: 1 | -1) =>
    setLightboxIdx(prev => prev === null ? null : (prev + dir + MEDIA.length) % MEDIA.length);

  const PREVIEW_COUNT = 5;

  // Use WordPress values if provided, otherwise use translated defaults
  const resolvedValues: WPValue[] = values && values.length > 0
    ? values
    : DEFAULT_VALUES_KEYS.map(k => ({ title: t(k.titleKey), description: t(k.descKey) }));

  const valuePills = resolvedValues.map((v, i) => ({
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
            <MapPin size={12} /> {t("about.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,7vw,6rem)] leading-[1.05] tracking-tight mb-10 max-w-4xl font-bold"
            style={{ color: BRAND.headline }}
          >
            <span style={{ color: BRAND.accent }}>{t("about.hero.getfound")}</span>
            <br /><span style={{ color: BRAND.accent }}>{t("about.hero.getchosen")}</span>
            <br /><span style={{ color: BRAND.accent }}>{t("about.hero.getremembered")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl leading-relaxed"
            style={{ color: BRAND.text + "99" }}
          >
            {t("about.hero.sub")}
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
            <span className="text-xs uppercase tracking-widest">{t("about.hero.scroll")}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── WORK MEDIA GRID ──────────────────────────── */}
      <section className="py-24 px-4 sm:px-8 lg:px-16" style={{ background: BRAND.header + "0a" }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: BRAND.headline }}
          >
            {t("about.work.title")}
          </motion.h2>

          {/* Bento grid */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {MEDIA.map((item, i) => {
                if (!showAll && i >= PREVIEW_COUNT) return null;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.07, type: "spring", stiffness: 80 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openLightbox(i)}
                    className={`rounded-2xl overflow-hidden relative group cursor-pointer ${item.wide ? "col-span-2" : "col-span-1"}`}
                    style={{ aspectRatio: item.wide ? "16/9" : "1/1", background: BRAND.header + "20" }}
                  >
                    {item.type === "video" ? (
                      <video autoPlay loop muted playsInline
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
                        <source src={item.src} type="video/mp4" />
                      </video>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.src} alt={`Lavashing work ${i + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(to top, ${BRAND.headline}50, transparent)` }} />
                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ArrowUpRight size={20} color="#fff" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Fade gradient at bottom when collapsed */}
            {!showAll && (
              <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${BRAND.bg}, transparent)` }} />
            )}
          </div>

          {/* Explore More / Show Less button */}
          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAll(v => !v)}
              style={{
                padding: "0.85rem 2.4rem",
                borderRadius: "999px",
                border: `2px solid ${BRAND.headline}`,
                background: showAll ? BRAND.headline : "transparent",
                color: showAll ? "#fff" : BRAND.headline,
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "background 0.25s, color 0.25s",
              }}
            >
              {showAll ? t("about.work.showLess") : t("about.work.seeAll")}
            </motion.button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox idx={lightboxIdx} onClose={closeLightbox} onNav={navLightbox} />
        )}
      </AnimatePresence>

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
            {t("about.values.title")}
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
            {t("about.location.title")}
          </h2>
          <p className="text-xl mb-4 leading-relaxed" style={{ color: BRAND.text + "99" }}>
            {t("about.location.sub")}
          </p>
          <p className="text-lg mb-12" style={{ color: BRAND.text + "70" }}>
            {t("about.location.sub2")}
          </p>
          <MagneticBtn
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300"
            style={{ background: BRAND.btnIdle, color: "#fff" } as React.CSSProperties}
          >
            <MapPin size={16} /> {t("about.location.cta")}
          </MagneticBtn>
        </motion.div>
      </section>
    </div>
  );
}
