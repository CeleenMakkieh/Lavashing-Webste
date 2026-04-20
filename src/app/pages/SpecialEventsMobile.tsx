"use client";
import { useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useT } from "@/contexts/TranslationContext";

const HB_PID = "699125b1fab39a0007237d9b";

const BRAND = {
  bg: "#faffe0",
  maroon: "#670626",
  green: "#6b8d6d",
  black: "#1a0509",
  accent: "#bad797",
};

function EventRow({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ padding: "1.5rem 0", borderBottom: `1px solid ${BRAND.green}30` }}
    >
      <h3 style={{ fontFamily: "serif", fontSize: "1.2rem", fontWeight: 600, color: BRAND.green, marginBottom: "0.4rem" }}>{title}</h3>
      <p style={{ color: BRAND.black, lineHeight: 1.8, fontSize: "0.9rem" }}>{desc}</p>
    </motion.div>
  );
}

export default function SpecialEventsMobile() {
  const { t, tArr } = useT();
  useEffect(() => {
    const existing = document.querySelector(`script[data-hb="${HB_PID}"]`);
    if (existing) existing.remove();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w._HB_ = { pid: HB_PID };
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.setAttribute("data-hb", HB_PID);
    s.src = "https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js";
    document.body.appendChild(s);
  }, []);

  return (
    <div style={{ background: BRAND.bg, color: BRAND.black }}>

      {/* ── HERO ── */}
      <section style={{ padding: "10vh 6vw 6vh", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ color: BRAND.green, letterSpacing: "0.3em", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: "1.2rem" }}>
          {t("events.badge")}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "serif", fontSize: "clamp(2rem,9vw,3rem)", fontWeight: 700, color: BRAND.maroon, lineHeight: 1.15, marginBottom: "1.5rem" }}>
          {t("events.hero.headline")}
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1.8rem" }}>
          {tArr("events.tags").map((tag) => (
            <span key={tag} style={{ padding: "0.25rem 0.9rem", border: `1.5px solid ${BRAND.maroon}50`, borderRadius: "999px", color: BRAND.maroon, fontSize: "0.75rem", background: `${BRAND.maroon}08` }}>
              {tag}
            </span>
          ))}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ color: BRAND.black, lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "2rem" }}>
          {t("events.hero.desc")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Link href="/contact" style={{ display: "inline-block", padding: "0.85rem 2.2rem", background: BRAND.maroon, color: BRAND.bg, borderRadius: "4px", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.85rem", textDecoration: "none" }}>
            {t("events.hero.cta")}
          </Link>
        </motion.div>
      </section>

      {/* ── WHAT WE PHOTOGRAPH ── */}
      <section style={{ padding: "4vh 6vw 8vh" }}>
        <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "serif", fontSize: "clamp(1.4rem,6vw,2rem)", fontWeight: 700, color: BRAND.maroon, marginBottom: "0.3rem" }}>
          {t("events.what.title")}
        </motion.h2>
        <p style={{ color: BRAND.green, fontSize: "0.85rem", marginBottom: "0.5rem" }}>{t("events.what.sub")}</p>
        <div style={{ borderTop: `1px solid ${BRAND.green}30` }}>
          {[
            { title: t("events.wedding.title"), desc: t("events.wedding.desc") },
            { title: t("events.graduation.title"), desc: t("events.graduation.desc") },
            { title: t("events.newborn.title"), desc: t("events.newborn.desc") },
            { title: t("events.inbetween.title"), desc: t("events.inbetween.desc") },
          ].map((e, i) => <EventRow key={i} title={e.title} desc={e.desc} index={i} />)}
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ padding: "8vh 6vw", background: BRAND.maroon, textAlign: "center" }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ fontFamily: "serif", fontSize: "clamp(1.1rem,5vw,1.5rem)", fontWeight: 300, color: BRAND.bg, lineHeight: 1.7, fontStyle: "italic" }}>
          &ldquo;{t("events.quote")}&rdquo;
        </motion.p>
        <p style={{ color: BRAND.accent, marginTop: "1.5rem", letterSpacing: "0.2em", fontSize: "0.7rem", textTransform: "uppercase" }}>
          — {t("events.center.badge")}
        </p>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "8vh 6vw" }}>
        <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "serif", fontSize: "clamp(1.4rem,6vw,2rem)", fontWeight: 700, color: BRAND.maroon, marginBottom: "0.3rem" }}>
          {t("events.how.title")}
        </motion.h2>
        <p style={{ color: BRAND.green, fontSize: "0.85rem", marginBottom: "2.5rem" }}>{t("events.how.sub")}</p>
        {[
          { n: "01", title: t("events.step.1") },
          { n: "02", title: t("events.step.2") },
          { n: "03", title: t("events.step.3") },
          { n: "04", title: t("events.step.4") },
        ].map((item, i) => (
          <motion.div key={item.n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ display: "flex", gap: "1.2rem", marginBottom: "2rem", alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, width: "44px", height: "44px", borderRadius: "50%", border: `2px solid ${BRAND.maroon}45`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "serif", fontSize: "0.9rem", fontWeight: 600, color: BRAND.maroon }}>
              {item.n}
            </div>
            <div>
              <h3 style={{ fontFamily: "serif", fontSize: "1.1rem", fontWeight: 600, color: BRAND.green }}>{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── CTA + HONEYBOOK ── */}
      <section style={{ padding: "8vh 6vw", textAlign: "center", background: `${BRAND.accent}50` }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "serif", fontSize: "clamp(1.6rem,7vw,2.4rem)", fontWeight: 700, color: BRAND.maroon, marginBottom: "1rem", lineHeight: 1.2 }}>
          {t("events.cta.title")}
        </motion.h2>
        <p style={{ color: BRAND.black, marginBottom: "2rem", lineHeight: 1.8, fontSize: "0.95rem" }}>
          {t("events.cta.sub")}
        </p>
        <div className={`hb-p-${HB_PID}-2`} />
        <img height={1} width={1} style={{ display: "none" }} src={`https://www.honeybook.com/p.png?pid=${HB_PID}`} alt="" />
      </section>

      <div style={{ padding: "4vh 6vw", background: BRAND.bg }}>
        <div className={`hb-p-${HB_PID}-2`} />
        <img height={1} width={1} style={{ display: "none" }} src={`https://www.honeybook.com/p.png?pid=${HB_PID}`} alt="" />
      </div>

      {/* ── BACK TO MARKETING ── */}
      <Link href="/" style={{ position: "fixed", top: "1rem", left: "1rem", zIndex: 100, display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.45rem 0.9rem", background: "rgba(250,255,224,0.92)", backdropFilter: "blur(10px)", border: `1px solid ${BRAND.maroon}40`, borderRadius: "999px", color: BRAND.maroon, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
        {t("events.back")}
      </Link>
    </div>
  );
}
