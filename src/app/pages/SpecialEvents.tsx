"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const HB_PID = "699125b1fab39a0007237d9b";

const BRAND = {
  bg: "#faffe0",
  maroon: "#670626",
  green: "#6b8d6d",
  black: "#1a0509",
  accent: "#bad797",
  gold: "#c9a96e",
  champagne: "#f5e6cf",
  rose: "#e8a0b0",
};

/* ── Subtle sparkles for light background ── */
function Sparkles({ count = 20 }: { count?: number }) {
  return (
    <div className="hidden md:block" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {[...Array(count)].map((_, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.12, 0.5, 0.12], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: (i * 0.41) % 4 }}
          style={{
            position: "absolute",
            fontSize: i % 5 === 0 ? "0.9rem" : "0.55rem",
            color: i % 3 === 0 ? BRAND.maroon : BRAND.green,
            left: `${(i * 13 + 5) % 100}%`,
            top: `${(i * 19 + 9) % 100}%`,
            userSelect: "none",
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}

/* ── Camera section sub-components ── */
function LensPortal({ clipRadius, bg }: { clipRadius: MotionValue<number>; bg: string }) {
  const clipPath = useTransform(
    clipRadius,
    (r) => `circle(${r}% at calc(50% + 1.25cm) calc(50% + 0.5cm))`
  );
  return <motion.div style={{ position: "absolute", inset: 0, background: bg, zIndex: 3, clipPath }} />;
}

function ScrollDown({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "8vh",
        zIndex: 4,
        opacity,
        pointerEvents: "none",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        style={{
          color: BRAND.green,
          letterSpacing: "0.25em",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        Scroll down
      </motion.p>
    </motion.div>
  );
}

function CenterTitle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.25, 0.55, 0.68], [0, 1, 0]);
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 5,
        opacity,
      }}
    >
      <p
        style={{
          color: BRAND.green,
          letterSpacing: "0.4em",
          fontSize: "clamp(0.65rem, 1.5vw, 0.85rem)",
          textTransform: "uppercase",
          marginBottom: "1rem",
          fontWeight: 600,
        }}
      >
        Lavashing Special Events
      </p>
      <h1
        style={{
          fontFamily: "serif",
          fontSize: "clamp(2.5rem, 7vw, 6rem)",
          fontWeight: 700,
          color: BRAND.maroon,
          lineHeight: 1.1,
          maxWidth: "14ch",
        }}
      >
        Where Every Moment Becomes Forever
      </h1>
    </motion.div>
  );
}

/* ── Event type row ── */
function EventRow({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      style={{
        padding: "2rem 0",
        borderBottom: `1px solid ${BRAND.green}30`,
      }}
    >
      <h3
        style={{
          fontFamily: "serif",
          fontSize: "1.4rem",
          fontWeight: 600,
          color: BRAND.green,
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>
      <p style={{ color: BRAND.black, lineHeight: 1.85, fontSize: "0.95rem" }}>{desc}</p>
    </motion.div>
  );
}

export default function SpecialEvents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w._HB_ = w._HB_ || {};
    w._HB_.pid = HB_PID;
    if (!document.querySelector(`script[data-hb="${HB_PID}"]`)) {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.setAttribute("data-hb", HB_PID);
      s.src = "https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js";
      document.body.appendChild(s);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cameraScale = useTransform(scrollYProgress, [0, 0.35, 0.6], [1, 3.5, 12]);
  const cameraOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);
  const rawClipRadius = useTransform(scrollYProgress, [0.25, 0.55], [0, 150]);
  const clipRadius = useSpring(rawClipRadius, { stiffness: 80, damping: 20 });

  return (
    <div style={{ background: BRAND.bg, color: BRAND.black }}>

      {/* ── STICKY CAMERA SCROLL — desktop only ─────────────── */}
      {!isMobile && <div ref={containerRef} style={{ height: "600vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: BRAND.bg, zIndex: 0 }} />
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              scale: cameraScale,
              opacity: cameraOpacity,
              transformOrigin: "calc(50% + 1.25cm) calc(50% + 0.5cm)",
            }}
          >
            <Image
              src="/camera.png"
              alt="Camera"
              width={700}
              height={500}
              style={{ objectFit: "contain", maxWidth: "75vw", maxHeight: "75vh" }}
              priority
            />
          </motion.div>
          <LensPortal clipRadius={clipRadius} bg={BRAND.bg} />
          <CenterTitle scrollYProgress={scrollYProgress} />
          <ScrollDown scrollYProgress={scrollYProgress} />
        </div>
      </div>}

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div>

        {/* HERO */}
        <section
          style={{
            padding: "10vh 5vw 8vh",
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Sparkles count={18} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              color: BRAND.green,
              letterSpacing: "0.3em",
              fontSize: "0.78rem",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Photography Services
          </motion.p>

          <h1
            style={{
              fontFamily: "serif",
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              fontWeight: 700,
              color: BRAND.maroon,
              lineHeight: 1.15,
              marginBottom: "2rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Every moment deserves to be remembered forever.
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              justifyContent: "center",
              marginBottom: "2.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {["Weddings", "Engagements", "Graduations", "Infants"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.3rem 1rem",
                  border: `1.5px solid ${BRAND.maroon}50`,
                  borderRadius: "999px",
                  color: BRAND.maroon,
                  fontSize: "0.8rem",
                  letterSpacing: "0.06em",
                  background: `${BRAND.maroon}08`,
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              color: BRAND.black,
              lineHeight: 1.9,
              fontSize: "1.05rem",
              maxWidth: "640px",
              margin: "0 auto 2.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            We photograph the moments that matter most not just the big ones, but the quiet ones in between.
            The look between two people. A graduate&apos;s proud smile. A newborn&apos;s first breath of light.
            These are the pictures you&apos;ll reach for again and again, for the rest of your life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "0.85rem 2.5rem",
                background: BRAND.maroon,
                color: BRAND.bg,
                borderRadius: "4px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                fontSize: "0.88rem",
                textDecoration: "none",
              }}
            >
              Book Your Session
            </Link>
          </motion.div>
        </section>

        {/* WHAT WE PHOTOGRAPH */}
        <section
          style={{
            padding: "6vh 5vw 10vh",
            maxWidth: "860px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Sparkles count={12} />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: BRAND.maroon,
              marginBottom: "0.4rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            What we photograph
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              color: BRAND.green,
              fontSize: "0.9rem",
              marginBottom: "1rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Every kind of milestone. Every kind of love.
          </motion.p>
          <div style={{ borderTop: `1px solid ${BRAND.green}30`, position: "relative", zIndex: 1 }}>
            {[
              {
                title: "Weddings & Engagements",
                desc: "Description",
              },
              {
                title: "Graduations",
                desc: "Description",
              },
              {
                title: "Newborns & Infants",
                desc: "Description",
              },
              {
                title: "All the In-Betweens",
                desc: "Description",
              },
            ].map((e, i) => (
              <EventRow key={e.title} title={e.title} desc={e.desc} index={i} />
            ))}
          </div>
        </section>

        {/* QUOTE */}
        <section
          style={{
            padding: "10vh 5vw",
            background: BRAND.maroon,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Sparkles count={22} />
          <motion.p
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{
              fontFamily: "serif",
              fontSize: "clamp(1.3rem, 3vw, 2.4rem)",
              fontWeight: 300,
              color: BRAND.bg,
              lineHeight: 1.65,
              maxWidth: "800px",
              margin: "0 auto",
              fontStyle: "italic",
              position: "relative",
              zIndex: 1,
            }}
          >
            &ldquo;We don&apos;t just take photographs. We give you something to hold onto
            long after the moment has passed.&rdquo;
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              color: BRAND.accent,
              marginTop: "2rem",
              letterSpacing: "0.2em",
              fontSize: "0.78rem",
              textTransform: "uppercase",
              position: "relative",
              zIndex: 1,
            }}
          >
            — Lavashing Special Events
          </motion.p>
        </section>

        {/* HOW IT WORKS */}
        <section
          style={{
            padding: "10vh 5vw",
            maxWidth: "780px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Sparkles count={14} />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: BRAND.maroon,
              marginBottom: "0.4rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              color: BRAND.green,
              fontSize: "0.9rem",
              marginBottom: "3.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Simple, personal, no pressure.
          </motion.p>
          {[
            {
              n: "01",
              title: "Say hello",
              desc: "Description",
            },
            {
              n: "02",
              title: "We connect",
              desc: "Description",
            },
            {
              n: "03",
              title: "Your session or day",
              desc: "Description",
            },
            {
              n: "04",
              title: "Your gallery",
              desc: "Description",
            },
          ].map((item, i) => (
            <motion.div
              key={item.n}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                display: "flex",
                gap: "1.75rem",
                marginBottom: "2.75rem",
                alignItems: "flex-start",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: `2px solid ${BRAND.maroon}45`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: BRAND.maroon,
                }}
              >
                {item.n}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "serif",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: BRAND.green,
                    marginBottom: "0.45rem",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: BRAND.black, lineHeight: 1.85, fontSize: "0.93rem" }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "10vh 5vw",
            textAlign: "center",
            background: `${BRAND.accent}50`,
            position: "relative",
          }}
        >
          <Sparkles count={20} />
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "serif",
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: BRAND.maroon,
              marginBottom: "1.25rem",
              lineHeight: 1.2,
              position: "relative",
              zIndex: 1,
            }}
          >
            Ready to book your session?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            style={{
              color: BRAND.black,
              maxWidth: "480px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.85,
              fontSize: "1rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Dates book up quickly. Reach out today and let&apos;s make sure your day is saved.
          </motion.p>

          {/* HoneyBook widget */}
          <div style={{ position: "relative", zIndex: 1, marginTop: "1rem" }}>
            <div className={`hb-p-${HB_PID}-2`} />
            <img height={1} width={1} style={{ display: "none" }} src={`https://www.honeybook.com/p.png?pid=${HB_PID}`} alt="" />
          </div>
        </section>

      </div>

      {/* ── HONEYBOOK FORM ───────────────────────────────────── */}
      <div style={{ padding: "6vh 5vw", background: BRAND.bg }}>
        <div className={`hb-p-${HB_PID}-2`} />
        <img height={1} width={1} style={{ display: "none" }} src={`https://www.honeybook.com/p.png?pid=${HB_PID}`} alt="" />
      </div>

      {/* ── BACK TO MARKETING — fixed top-left ───────────────── */}
      <Link
        href="/"
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "1.5rem",
          zIndex: 100,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.55rem",
          padding: "0.5rem 1.1rem",
          background: "rgba(250,255,224,0.88)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${BRAND.maroon}40`,
          borderRadius: "999px",
          color: BRAND.maroon,
          fontSize: "0.75rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        ← Back to Marketing
      </Link>
    </div>
  );
}
