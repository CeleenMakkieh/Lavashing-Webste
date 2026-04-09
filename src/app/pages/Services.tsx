

import { motion } from "motion/react"; import { Link } from "react-router"; import { ArrowRight, Sparkles, Code, Palette, TrendingUp, Target } from "lucide-react"; import ClientLogos from "../components/ClientLogos"; import InteractiveMap from "../components/InteractiveMap"; import { Button } from "

pasted


import { useState } from "react"; import { motion, AnimatePresence } from "motion/react"; import { MessageCircle, X, Send } from "lucide-react"; import { Button } from "./ui/button"; import { Input } from "./ui/input"; export default function AIChat() { const [isOpen, setIsOpen] = useState(false)

pasted


import { motion } from "motion/react"; import { MapPin } from "lucide-react"; export default function InteractiveMap() { const locations = [ { name: "Dallas, TX", x: 48, y: 58, size: "large", isHome: true }, { name: "Austin, TX", x: 46, y: 62, size: "medium" }, { name: "Houston, TX",

pasted

for the home page i want it to have 3d moviments keep the same colors maybe floating shapes for now around not galaxy also remove yhe start project bottoma nd expolre oi  work maybe we n put the video also make ot fun while scrolling for all paages 

 for the ai chatboc iwanta robot that will pop up and say hi how can  ihelp ypu the cjat box will float and roam arounf the sreran from teh left bottom side.

for the intercative mao create a better map

12:33 PM

Reading frontend design skill
Reading frontend design skill
Now let me build all three enhanced components with ambitious creative direction.


Created 3 files, read a file
Created 3 files, read a file
Here's what's new in all three files:

Home.tsx

6 floating 3D shapes (orbs, cubes, rings, pills) that drift and rotate in the hero — no galaxy, just clean geometric depth
Hero text + video parallax out as you scroll down, with opacity and scale transforms
The video stays but the two CTA buttons are gone
Service cards lift on hover with colored gradient backgrounds
A scroll indicator arrow pulses at the bottom of the hero
Stats section and CTA section also have floating shapes for continuity
AIChat.tsx

A hand-drawn animated SVG robot ("Lavi") with blinking eyes, an antenna light, and a talking mouth
The robot roams freely around the bottom-left of the screen when the chat is closed
Speech bubbles pop up above the robot saying things like "Hi there! 👋 Need help?" every ~18 seconds
When you open the chat, the robot glides back to its corner — typing dots animate while it "thinks"
InteractiveMap.tsx

Proper SVG US map outline with approximate state shapes highlighted (TX, CA, NY, FL, IL, WA)
Pulsing concentric rings on the Dallas HQ dot with a radial glow
Dashed animated connection lines flash from HQ to each client city in sequence
Sidebar of clickable city cards with client counts — clicking one highlights the dot on the map and shows a tooltip
Total client count tally at the bottom of the sidebar
Home
Code · TSX 
Aichat
Code · TSX 
Interactivemap
Code · TSX 

import { motion } from "motion/react"; import { Target, Users, Award, TrendingUp } from "lucide-react"; export default function About() { const values = [ { icon: <Target size={32} />, title: "Purpose-Driven", description: "We believe in creating work that matters and makes

pasted

headers color: 
#6b8d6d background: 
#ffffe9 bottoms are green: when hover it will be baybe. bit l: 
#f6c0d7 text is black

the about page is very boring look at clay global website as refernce how interactive it is

12:43 PM

Searched the web
Searched the web


Failed to fetch https://clay.global/about

clay.global agency about page design interactive 2024
10 results


Clay | UX Design & Branding Agency
clay.global

Clay | Dribbble
dribbble.com

Clay Agency Reviews (March 2026) | Digital Agency Network
digitalagencynetwork.com

Digital Product and Brand Design Company | About | Clay
clay.global

Case Studies: Web Design, UI/UX, Branding Portfolio | Clay
clay.global

The Winning Combination: Design & UX Research Agency in One | Clay
clay.global

Clay Reviews | View Portfolios | DesignRush
www.designrush.com

Clay – UI/UX Design Agency | LinkedIn
www.linkedin.com

Clay Global - UI / UX + Web Design + Branding in San Francisco, CA, USA :: Behance
www.behance.net

UI/UX Design, Branding, Web Design Services | Clay
clay.global
Done
Good — I have a strong picture of Clay's approach: rich motion, staggered reveals, hover interactions on team cards, bold typography, smooth transitions, and sections that feel alive. Now let me build a completely reimagined About page with the exact brand colors specified.


Created a file, read a file
Created a file, read a file
Here's everything packed into the new About.tsx with your exact brand colors (
#6b8d6d headers, 
#ffffe9 background, 
#f6c0d7 hover pink):

What makes it Clay-level interactive:

Magnetic CTA buttons — they physically follow your cursor when you hover, like a real force field
Hover-reveal team cards — each card flips up a green overlay with a fun personal fact about each team member on hover
Accordion values — click any value to expand the description with a smooth height animation; the + rotates to ×
Scrolling marquee strip — services scroll sideways continuously between sections
Hero parallax — the giant decorative "L" and headline scale/drift as you scroll out
Services grid — a tight bordered grid where each cell blushes pink on hover with an arrow that rotates 45°
Story section — animated floating blobs inside the image placeholder, a bouncing "Est. 2014" badge, staggered text reveals
Giant ghost text — "DALLAS" renders huge and faint behind the location CTA
Stat counters — spring-animated numbers with a left accent border in brand green
About
Code · TSX 

import { motion } from "motion/react"; import { Code, Palette, Sparkles, TrendingUp, Lightbulb, ShoppingBag, Heart, GraduationCap, Building2, Utensils, Briefcase } from "lucide-react"; import ClientLogos from "../components/ClientLogos"; export default function Work() { const services = [ {

pasted


import { motion } from "motion/react"; import { Link } from "react-router"; import { Code, Palette, Sparkles, TrendingUp, Target, ArrowRight, Check } from "lucide-react"; import { Button } from "../components/ui/button"; export default function Services() { const services = [ { icon: <C

pasted

do the samae for the work one and for the services as well:

12:50 PM

Created 2 files, read a file
Created 2 files, read a file
Both pages are done with the full brand palette (
#6b8d6d green, 
#ffffe9 cream, 
#f6c0d7 blush hover) and Clay-level interactivity throughout. Here's what's new:

Work.tsx

Hero with giant ghost "WORK" parallax text + animated filter pills (All / Web / Branding / etc.)
Flip-reveal service cards — front shows title + icon, hover slides up a green panel listing all features
Accordion industries — click any row to expand the description; + icon rotates to ×
Hover-animated process steps that turn solid green on mouseover with a connecting line
"Don't see your industry?" block with blush pink background and an arrow CTA
Services.tsx

Hero with parallax ghost "SERV" text and a scroll indicator
Big accordion services — click each to expand a two-column layout: description + CTA on left, feature checklist with pink checkmarks on right. First service starts open
Process cards in a 2×3 grid — each turns solid green on hover, revealing white text
Pricing section — three tiers (Starter / Growth / Enterprise), middle tier highlighted in green with a "Most Popular" blush badge
Full-bleed green CTA footer with ghost "LET'S GO" text behind it
Work
Code · TSX 
Services
Code · TSX 

import { motion, useScroll, useTransform, useSpring } from "motion/react"; import { Link } from "react-router"; import { Sparkles, Code, Palette, TrendingUp, Target } from "lucide-react"; import ClientLogos from "../components/ClientLogos"; import InteractiveMap from "../components/InteractiveMap";

pasted

i also dont like th e home page it not interactive engough  the ai chatbox keep floation outside the screen i can barely hold him i need him to float on the right side maybe a robot will pop up say hi, how cani help you

1:05 PM
Now let me build the two updated files — a much more interactive Home page and a fixed AI chatbot.


Created 3 files, ran a command, read a file
Created 3 files, ran a command, read a file
Here's what changed in both files:

Home.tsx — much more interactive:

Custom magnetic cursor — a small green dot follows your mouse instantly, with a larger ring that lags behind and expands when hovering links/buttons
Typewriter headline — "experiences that _____" cycles through inspire → convert → captivate → grow you with a blinking cursor
Word-by-word scroll reveal — the manifesto section reveals each word as you scroll through it, animated by scroll position
3D tilt service cards — mouse position within each card tilts it in true 3D perspective using spring physics
Stat cards flip to solid green with a scale bounce on hover
All brand colors applied (
#6b8d6d, 
#ffffe9, 
#f6c0d7)
AIChat.tsx — fixed and improved:

Robot is now anchored to the bottom-right corner — it roams gently within a small radius (±50px) but can never drift off screen
Right side only — the fixed bottom-6 right-6 anchor guarantees it always stays visible
When the chat opens, the robot smoothly springs back to its home position
Speech bubbles pop up above it with greetings every ~20 seconds
Chat panel opens upward from the robot with a spring animation, styled in brand colors
The robot's eyes blink, pupils track left/right when thinking, and the mouth animates when talking
Home
Code · TSX 
Aichat
Code · TSX 
where is the 3d movments in work and services

1:16 PM
Looking at the Work and Services pages — they're missing the 3D tilt cards, floating shapes, custom cursor, and scroll-triggered effects. Let me add all of that now.


Created 2 files, ran a command, read a file
Created 2 files, ran a command, read a file

Remove old files to rewrite with 3D effects

Script

Work page with full 3D effects - tilt cards, floating shapes, cursor, parallax, scroll reveals
Work.tsx

Services page with full 3D effects - tilt accordion, floating shapes, cursor, parallax, scroll reveals
Services.tsx

Presented 2 files
Done
Both pages now have the full 3D treatment. Here's exactly what's been added:

Work.tsx — 3D everywhere:

Magnetic cursor — green dot + trailing ring that expands on interactive elements
6 floating shapes in every section (hero, services, process, industries) — orbs, rings, pills, cubes drifting and rotating
3D tilt service cards — mouse position physically tilts each card in perspective space, icon does a full Y-axis spin on hover, features slide up from inside the card
3D tilt process steps — each of the 5 steps tilts on mouseover and turns solid green with a sheen sweep
Hero parallax — content floats up and fades as you scroll
Word-by-word scroll reveal manifesto strip
Animated industry rows — icon rotates 8° and turns pink on open
Services.tsx — 3D everywhere:

Same magnetic cursor + floating shapes throughout all 4 sections
Service accordion with 3D icon box — the icon box itself is a Tilt component, and the icon inside does a 360° Y-spin on hover
3D process cards — tilt + sheen sweep animation fires across the card on mouseover
3D pricing cards — all three tilt, the highlighted card has a green glow shadow, sheen sweeps on hover for non-highlighted cards
Hero service pills — hover turns each pill solid green
Scroll reveal manifesto strip with word-by-word opacity driven by scroll position
Work
Code · TSX 
Services
Code · TSX 


let me be able ot grab the chat ai box 

Claude is AI and can make mistakes. Please double-check responses.
Services · TSX
Copy

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Code, Palette, Sparkles, TrendingUp, Target, ArrowUpRight, Check, ChevronDown } from "lucide-react";
 
const BRAND = { bg: "#ffffe9", header: "#6b8d6d", pink: "#f6c0d7", text: "#111111" };
 
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
 
/* ─── 3D Tilt wrapper ────────────────────── */
function Tilt({ children, className = "", intensity = 12 }: { children: React.ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 140, damping: 22 });
  const sy = useSpring(ry, { stiffness: 140, damping: 22 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * intensity);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * intensity);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }} className={className}>
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
function RevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] });
  const words = text.split(" ");
  return (
    <div ref={ref} className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <motion.span key={i} style={{ opacity: useTransform(scrollYProgress, [i / words.length, Math.min((i + 1) / words.length + 0.1, 1)], [0.1, 1]) }}>
          {word}
        </motion.span>
      ))}
    </div>
  );
}
 
/* ─── Big accordion service row with 3D icon ─ */
function ServiceRow({ s, i }: {
  s: { num: string; icon: React.ReactNode; title: string; tagline: string; description: string; features: string[] };
  i: number;
}) {
  const [open, setOpen] = useState(i === 0);
  const [hov, setHov] = useState(false);
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.08, type: "spring", stiffness: 90 }}
      style={{ borderBottom: `2px solid ${BRAND.header}20` }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        data-hover
        className="w-full flex items-center justify-between py-7 px-2 gap-6 text-left"
      >
        <div className="flex items-center gap-5">
          <span style={{ fontSize: 12, fontWeight: 900, opacity: 0.3, letterSpacing: "0.12em", width: 28 }}>{s.num}</span>
 
          {/* 3D rotating icon box */}
          <Tilt intensity={20}>
            <motion.div
              animate={{ background: open ? BRAND.header : BRAND.header + "18", rotateY: hov ? 15 : 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ width: 48, height: 48, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", color: open ? "#fff" : BRAND.header, transition: "color 0.28s", transformStyle: "preserve-3d" }}
            >
              {/* Icon flips in Z on hover */}
              <motion.div animate={{ rotateY: hov ? 360 : 0 }} transition={{ duration: 0.55 }}>
                {s.icon}
              </motion.div>
            </motion.div>
          </Tilt>
 
          <div>
            <h3 style={{ fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: 700, color: BRAND.header, lineHeight: 1.15 }}>{s.title}</h3>
            <p style={{ fontSize: 12.5, opacity: 0.45, marginTop: 2 }}>{s.tagline}</p>
          </div>
        </div>
 
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: "spring", stiffness: 300 }} style={{ color: BRAND.header, flexShrink: 0 }}>
          <ChevronDown size={24} />
        </motion.div>
      </button>
 
      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-10 px-2 pl-[74px]">
              <div>
                <p style={{ fontSize: 15.5, lineHeight: 1.75, color: BRAND.text + "99", marginBottom: 28 }}>{s.description}</p>
                <Link to="/contact">
                  <motion.button data-hover
                    whileHover={{ background: BRAND.pink, color: BRAND.header, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-200"
                    style={{ background: BRAND.header }}
                  >Start a project <ArrowUpRight size={13} /></motion.button>
                </Link>
              </div>
 
              {/* Checklist — items pop in */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.35, marginBottom: 14 }}>What's included</p>
                <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                  {s.features.map((f, fi) => (
                    <motion.li key={fi} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: fi * 0.05 }}
                      style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: BRAND.text + "88" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: BRAND.pink, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={11} style={{ color: BRAND.header }} />
                      </div>{f}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
 
/* ─── 3D Process card ────────────────────── */
function ProcessCard({ step, title, desc, i }: { step: string; title: string; desc: string; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Tilt intensity={14}>
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 15 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 90 }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        data-hover
        style={{
          background: hov ? BRAND.header : BRAND.bg,
          border: `2px solid ${hov ? BRAND.header : BRAND.header + "28"}`,
          padding: "28px 24px", borderRadius: 24, cursor: "default", position: "relative", overflow: "hidden",
          transition: "background 0.3s, border-color 0.3s", transformStyle: "preserve-3d",
        }}
      >
        {/* Ghost step */}
        <div style={{ position: "absolute", bottom: -10, right: -4, fontSize: 80, fontWeight: 900, color: hov ? "#fff" : BRAND.header, opacity: 0.05, lineHeight: 1, userSelect: "none" }}>{step}</div>
 
        {/* Step badge */}
        <motion.div animate={{ background: hov ? BRAND.pink : BRAND.header + "18", scale: hov ? 1.08 : 1 }}
          style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, transition: "background 0.3s" }}>
          <span style={{ fontSize: 14, fontWeight: 900, color: BRAND.header }}>{step}</span>
        </motion.div>
 
        <h3 style={{ fontSize: 18, fontWeight: 700, color: hov ? "#fff" : BRAND.header, marginBottom: 10, transition: "color 0.3s" }}>{title}</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: hov ? "#ffffffbb" : BRAND.text + "70", transition: "color 0.3s" }}>{desc}</p>
 
        {/* Sheen effect */}
        <AnimatePresence>
          {hov && (
            <motion.div initial={{ x: "-100%", skewX: -15 }} animate={{ x: "200%" }} transition={{ duration: 0.5 }}
              style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", pointerEvents: "none" }} />
          )}
        </AnimatePresence>
      </motion.div>
    </Tilt>
  );
}
 
/* ─── Pricing tier with 3D tilt ─────────── */
function PricingCard({ tier, i }: { tier: { name: string; price: string; sub: string; features: string[]; highlight: boolean }; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Tilt intensity={10}>
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }} transition={{ delay: i * 0.12, type: "spring", stiffness: 80 }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        data-hover
        style={{
          background: tier.highlight ? BRAND.header : BRAND.bg,
          border: `2px solid ${tier.highlight ? BRAND.header : hov ? BRAND.header : BRAND.header + "28"}`,
          padding: "36px 28px", borderRadius: 28, cursor: "default", position: "relative", display: "flex", flexDirection: "column",
          transition: "border-color 0.28s", transformStyle: "preserve-3d",
          boxShadow: tier.highlight ? `0 24px 60px ${BRAND.header}28` : hov ? `0 16px 40px ${BRAND.header}14` : "none",
        }}
      >
        {tier.highlight && (
          <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: BRAND.pink, color: BRAND.header, fontSize: 11, fontWeight: 700, padding: "5px 16px", borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Most Popular
          </div>
        )}
 
        {/* Sheen on hover */}
        <AnimatePresence>
          {hov && !tier.highlight && (
            <motion.div initial={{ x: "-100%", skewX: -15 }} animate={{ x: "250%" }} transition={{ duration: 0.55 }}
              style={{ position: "absolute", inset: 0, width: "40%", background: "linear-gradient(90deg, transparent, rgba(107,141,109,0.06), transparent)", pointerEvents: "none", borderRadius: 28 }} />
          )}
        </AnimatePresence>
 
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: tier.highlight ? "#ffffffbb" : BRAND.header + "aa", marginBottom: 8 }}>{tier.name}</p>
        <div style={{ fontSize: 44, fontWeight: 900, color: tier.highlight ? "#fff" : BRAND.header, marginBottom: 4, lineHeight: 1 }}>{tier.price}</div>
        <p style={{ fontSize: 13, color: tier.highlight ? "#ffffffaa" : BRAND.text + "70", marginBottom: 28 }}>{tier.sub}</p>
 
        <ul style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, marginBottom: 28 }}>
          {tier.features.map((f, fi) => (
            <motion.li key={fi} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: fi * 0.05 }}
              style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: tier.highlight ? "#ffffffcc" : BRAND.text + "90" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: tier.highlight ? BRAND.pink : BRAND.header + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={10} style={{ color: BRAND.header }} />
              </div>{f}
            </motion.li>
          ))}
        </ul>
 
        <Link to="/contact">
          <motion.button data-hover
            whileHover={{ scale: 1.04, background: tier.highlight ? BRAND.pink : BRAND.header, color: tier.highlight ? BRAND.header : "#fff" }}
            whileTap={{ scale: 0.96 }}
            style={{ width: "100%", padding: "13px 0", borderRadius: 999, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", background: tier.highlight ? BRAND.pink : BRAND.header, color: tier.highlight ? BRAND.header : "#fff", transition: "all 0.22s" }}
          >Get started</motion.button>
        </Link>
      </motion.div>
    </Tilt>
  );
}
 
/* ─── Main ──────────────────────────────── */
export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
 
  const services = [
    { num: "01", icon: <Code size={20} />, title: "Web Development", tagline: "Code that performs as good as it looks",
      description: "Custom websites and web applications built with cutting-edge technology. We obsess over performance, accessibility, and scalability — so your site works beautifully for every user, on every device.",
      features: ["Custom Web Applications", "E-commerce Solutions", "CMS Integration", "Progressive Web Apps", "API Development", "Performance Optimization", "Accessibility Standards", "Analytics Setup"] },
    { num: "02", icon: <Palette size={20} />, title: "Web Design", tagline: "Interfaces that users actually love",
      description: "Beautiful, user-centered designs that captivate and convert. We design with purpose — every layout, interaction, and pixel guided by research and your brand story.",
      features: ["UI/UX Design", "Responsive Design", "Prototyping & Wireframing", "Design Systems", "User Research", "Accessibility", "Motion Design", "Brand Guidelines"] },
    { num: "03", icon: <Sparkles size={20} />, title: "Branding", tagline: "Identities that stick in people's minds",
      description: "Comprehensive brand identity development that makes your business unforgettable. From strategy to logo to full visual system — we build brands with soul.",
      features: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Messaging", "Packaging Design", "Brand Positioning", "Brand Guidelines", "Tone of Voice"] },
    { num: "04", icon: <TrendingUp size={20} />, title: "Marketing", tagline: "Growth that's measurable and sustainable",
      description: "Strategic campaigns backed by data and creativity. We find your audience, tell your story, and turn attention into revenue — across every channel that matters.",
      features: ["Digital Marketing Strategy", "Content Marketing", "Social Media Management", "Email Campaigns", "SEO Optimization", "Analytics & Reporting", "Paid Advertising", "CRO"] },
    { num: "05", icon: <Target size={20} />, title: "Strategy", tagline: "Direction when you need it most",
      description: "Data-driven insights and strategic planning to guide your business forward. We help you see the full picture — where you are, where you want to go, and exactly how to get there.",
      features: ["Market Research", "Competitive Analysis", "Customer Journey Mapping", "Growth Strategy", "Digital Transformation", "Consulting Services", "OKR Setting", "Quarterly Reviews"] },
  ];
 
  const process = [
    { step: "01", title: "Discovery", desc: "We start by understanding your business, goals, audience, and competitive landscape." },
    { step: "02", title: "Strategy", desc: "We develop a comprehensive plan tailored to your exact needs, with clear timelines." },
    { step: "03", title: "Design", desc: "Our creatives craft experiences that feel uniquely yours — functional and beautiful." },
    { step: "04", title: "Build", desc: "Our engineers bring it to life with precision — performant, secure, and scalable." },
    { step: "05", title: "Launch", desc: "We ensure a smooth launch, then stay by your side with ongoing support." },
    { step: "06", title: "Grow", desc: "We track, iterate, and optimize — so your digital presence gets stronger every month." },
  ];
 
  const pricing = [
    { name: "Starter", price: "From $5k", sub: "For new & small businesses", highlight: false,
      features: ["1-page or landing site", "Logo & brand basics", "SEO foundation", "2 revision rounds", "30-day support"] },
    { name: "Growth", price: "From $15k", sub: "For growing brands", highlight: true,
      features: ["Multi-page site", "Full brand identity", "CMS integration", "Marketing strategy", "Analytics setup", "60-day support"] },
    { name: "Enterprise", price: "Custom", sub: "For large organizations", highlight: false,
      features: ["Custom web application", "Full brand system", "Ongoing campaigns", "Dedicated team", "Priority support", "Quarterly reviews"] },
  ];
 
  return (
    <div className="pt-20 overflow-x-hidden" style={{ background: BRAND.bg, color: BRAND.text }}>
      <MagneticCursor />
 
      {/* ── HERO ─────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden">
        <Shape top="5%" right="3%" w={155} h={155} bg={BRAND.pink} br="2.2rem" delay={1.5} dur={7} dy={22} dr={28} />
        <Shape top="8%" left="-3%" w={300} h={300} bg={BRAND.header + "14"} br="50%" blur delay={0} dur={9} dy={35} dr={18} />
        <Shape bottom="12%" right="7%" w={110} h={110} border={`13px solid ${BRAND.header}35`} br="50%" delay={2} dur={10} dy={28} dr={40} />
        <Shape top="52%" right="12%" w={58} h={58} bg={BRAND.header + "55"} br="50%" delay={0.8} dur={6} dy={18} dr={0} />
        <Shape bottom="6%" left="6%" w={175} h={54} bg={BRAND.header + "20"} br="999px" blur delay={3} dur={11} dy={22} dr={8} />
        <Shape top="65%" left="3%" w={44} h={44} bg={BRAND.pink} br="11px" delay={1} dur={8} dy={14} dr={22} />
 
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-24">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full mb-10 border font-medium"
            style={{ borderColor: BRAND.header + "50", color: BRAND.header }}>
            <Sparkles size={12} /> 5 core services · 1 unified team
          </motion.div>
 
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold mb-8"
            style={{ fontSize: "clamp(3rem,10vw,8rem)", lineHeight: 0.95, letterSpacing: "-0.02em", color: BRAND.header }}>
            What we<br /><span style={{ color: BRAND.text }}>can do for you.</span>
          </motion.h1>
 
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            className="text-xl max-w-2xl leading-relaxed" style={{ color: BRAND.text + "80" }}>
            Comprehensive digital solutions designed to help your business thrive — from first impression to lasting impact.
          </motion.p>
 
          {/* Service pills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            className="flex flex-wrap gap-3 mt-12">
            {services.map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08, background: BRAND.header, color: "#fff" }} data-hover
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 cursor-default transition-all duration-200"
                style={{ borderColor: BRAND.header, color: BRAND.header, background: "transparent" }}>
                {s.icon} {s.title}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
 
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
          <RevealText text="Five disciplines. One integrated team. Every project gets the full weight of our strategy, design, and engineering working in lockstep."
            className="text-3xl md:text-4xl font-bold leading-[1.3]" />
        </div>
      </section>
 
      {/* ── MARQUEE ──────────────────────────────── */}
      <div className="overflow-hidden py-5 border-y-2" style={{ borderColor: BRAND.header + "22" }}>
        <motion.div className="flex gap-12 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
          {[...Array(4)].flatMap(() => ["Custom Builds", "Design Systems", "Brand Strategy", "SEO", "Prototyping", "Growth", "Consulting"]).map((w, i) => (
            <span key={i} style={{ fontSize: 22, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: BRAND.header }}>
              {w} <span style={{ opacity: 0.3, margin: "0 8px" }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>
 
      {/* ── SERVICES ACCORDION ───────────────────── */}
      <section className="py-28 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
        <Shape top="10%" right="-2%" w={200} h={200} bg={BRAND.pink + "40"} br="3rem" blur delay={0.5} dur={9} dy={28} dr={18} />
        <Shape bottom="5%" left="-2%" w={150} h={150} bg={BRAND.header + "12"} br="50%" blur delay={1.5} dur={11} dy={22} dr={12} />
 
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: BRAND.header }}>Our Services</h2>
            <p style={{ marginTop: 8, fontSize: 15, opacity: 0.5 }}>Click to expand · icon spins on hover</p>
          </motion.div>
 
          <div style={{ borderTop: `2px solid ${BRAND.header}20` }}>
            {services.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
          </div>
        </div>
      </section>
 
      {/* ── PROCESS 3D ───────────────────────────── */}
      <section className="py-28 px-4 sm:px-8 lg:px-16 relative overflow-hidden" style={{ background: BRAND.header + "0b" }}>
        <Shape top="-6%" right="4%" w={190} h={190} bg={BRAND.pink + "50"} br="2.5rem" delay={0.5} dur={8} dy={26} dr={20} />
        <Shape bottom="-4%" left="2%" w={130} h={130} border={`12px solid ${BRAND.header}28`} br="50%" delay={2} dur={9} dy={20} dr={35} />
 
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: BRAND.header }}>Our Process</h2>
            <p style={{ marginTop: 8, fontSize: 15, opacity: 0.5 }}>Hover each card — feel the 3D depth</p>
          </motion.div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1000px" }}>
            {process.map((p, i) => <ProcessCard key={i} {...p} i={i} />)}
          </div>
        </div>
      </section>
 
      {/* ── PRICING 3D CARDS ─────────────────────── */}
      <section className="py-28 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
        <Shape top="8%" left="-3%" w={220} h={220} bg={BRAND.header + "12"} br="50%" blur delay={0} dur={9} dy={32} dr={20} />
        <Shape bottom="5%" right="-2%" w={170} h={170} bg={BRAND.pink + "40"} br="2.5rem" blur delay={1.5} dur={11} dy={25} dr={15} />
 
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: BRAND.header }}>Simple Pricing</h2>
            <p style={{ marginTop: 8, fontSize: 15, opacity: 0.5 }}>No hidden fees · Hover to feel the tilt</p>
          </motion.div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {pricing.map((t, i) => <PricingCard key={i} tier={t} i={i} />)}
          </div>
        </div>
      </section>
 
      {/* ── CTA ──────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-8 lg:px-16 relative overflow-hidden" style={{ background: BRAND.header }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16vw", fontWeight: 900, color: "#ffffff07", userSelect: "none" }}>
          LET'S GO
        </div>
        <Shape top="-5%" left="-3%" w={260} h={260} bg="#ffffff07" br="50%" delay={0} dur={8} dy={32} dr={22} />
        <Shape bottom="-5%" right="-3%" w={200} h={200} bg="#ffffff07" br="3rem" delay={1.5} dur={10} dy={26} dr={16} />
 
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10">
          <h2 style={{ fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 800, color: "#fff", marginBottom: 20 }}>
            Ready to start your project?
          </h2>
          <p style={{ fontSize: 18, color: "#ffffffbb", marginBottom: 44 }}>Let's discuss how we can help bring your vision to life.</p>
          <Link to="/contact">
            <motion.button data-hover
              whileHover={{ background: BRAND.pink, color: BRAND.header, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white/30 transition-all duration-200"
            >Schedule a Consultation <ArrowUpRight size={16} /></motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
 
