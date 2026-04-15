"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { X, Send, Minimize2 } from "lucide-react";

const BRAND = { header: "#6b8d6d", pink: "#f6c0d7", bg: "#ffffe9", text: "#111111" };

/* ─── Robot SVG face ────────────────────── */
function RobotFace({ thinking = false, talking = false, size = 56 }: { thinking?: boolean; talking?: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      {/* Body */}
<rect x="8" y="16" width="44" height="34" rx="9" fill={BRAND.header} />
      {/* Antenna pole */}
      <rect x="27" y="3" width="6" height="12" rx="3" fill={BRAND.header} />
      {/* Antenna tip */}
      <motion.circle cx="30" cy="3" r="5" fill={BRAND.pink}
        animate={thinking ? { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, repeat: Infinity }} />
      {/* Eye left white */}
      <motion.rect x="13" y="23" width="12" height="11" rx="3.5" fill="white"
        animate={!thinking ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
        transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.5 }} />
      {/* Eye left pupil */}
      <motion.circle cx="19" cy="28.5" r="3.5" fill="#111"
        animate={{ x: thinking ? [-2, 2, -2] : 0 }} transition={{ duration: 1.4, repeat: Infinity }} />
      <circle cx="20.5" cy="27" r="1" fill="white" opacity="0.7" />
      {/* Eye right white */}
      <motion.rect x="35" y="23" width="12" height="11" rx="3.5" fill="white"
        animate={!thinking ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
        transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.5, delay: 0.06 }} />
      {/* Eye right pupil */}
      <motion.circle cx="41" cy="28.5" r="3.5" fill="#111"
        animate={{ x: thinking ? [-2, 2, -2] : 0 }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.1 }} />
      <circle cx="42.5" cy="27" r="1" fill="white" opacity="0.7" />
      {/* Mouth */}
      {talking ? (
        <motion.rect x="20" y="38" rx="3" width="20" height="6"
          animate={{ height: [5, 9, 4, 8, 5], width: [20, 17, 20, 15, 20] }}
          transition={{ duration: 0.35, repeat: Infinity }}
          fill={BRAND.header} />
      ) : (
        <rect x="20" y="38" width="20" height="6" rx="3" fill={BRAND.header} />
      )}
      {/* Ear bolts */}
      <circle cx="8" cy="33" r="3.5" fill="#ffffff" stroke={BRAND.header} strokeWidth="1.5" />
      <circle cx="52" cy="33" r="3.5" fill="#ffffff" stroke={BRAND.header} strokeWidth="1.5" />
      {/* Chest indicator */}
      <motion.circle cx="30" cy="44" r="3" fill={BRAND.pink}
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} />
    </svg>
  );
}

/* ─── Speech bubble ─────────────────────── */
function SpeechBubble({ text, onDismiss }: { text: string; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.75, y: 8 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onClick={onDismiss}
      className="absolute bottom-[calc(100%+14px)] right-0 w-52 rounded-2xl rounded-br-none shadow-xl p-3 cursor-pointer"
      style={{ background: BRAND.bg, border: `1.5px solid ${BRAND.header}30` }}
    >
      <p className="text-sm leading-snug" style={{ color: BRAND.header }}>{text}</p>
      {/* Tail */}
      <div style={{ position: "absolute", bottom: -8, right: 18, width: 16, height: 16, background: BRAND.bg, border: `1.5px solid ${BRAND.header}30`, borderTop: "none", borderLeft: "none", transform: "rotate(45deg)" }} />
    </motion.div>
  );
}

/* ─── AI response ───────────────────────── */
function getReply(msg: string): string {
  const m = msg.toLowerCase();

  // Greetings
  if (m.match(/^(hi|hello|hey|sup|yo|howdy|good morning|good afternoon|good evening)/)) return "Hey there! 👋 I'm Leo. Ask me anything about Lavashing — services, pricing, process, you name it!";
  if (m.includes("how are you") || m.includes("how's it going") || m.includes("how r u")) return "Doing great, thanks for asking! 😊 Ready to help you build something amazing. What's on your mind?";
  if (m.includes("who are you") || m.includes("what are you") || m.includes("your name")) return "I'm Leo, Lavashing's AI assistant! 🤖 I'm here to answer your questions and point you in the right direction.";
  if (m.includes("thank") || m.includes("thanks") || m.includes("appreciate")) return "Of course! Happy to help. 😊 Anything else you'd like to know?";
  if (m.includes("bye") || m.includes("goodbye") || m.includes("see you") || m.includes("cya")) return "Talk soon! 👋 Don't hesitate to reach out — we're always here when you're ready.";

  // Services
  if (m.includes("service") || m.includes("what do you do") || m.includes("what do you offer") || m.includes("what do you specialize")) return "We offer web design, development, branding, marketing & strategy — all under one roof! Head to our Work page to see it all. 🚀";
  if (m.includes("web design") || m.includes("design")) return "Our design team creates stunning, conversion-focused websites tailored to your brand. Beautiful AND functional! 🎨";
  if (m.includes("web dev") || m.includes("development") || m.includes("build a website") || m.includes("build a site")) return "We build custom websites and web apps using modern tech — fast, accessible, and built to scale. 💻";
  if (m.includes("brand") || m.includes("logo") || m.includes("identity")) return "We craft full brand identities — logo, colors, messaging, and guidelines — that make your business unforgettable. ✨";
  if (m.includes("market") || m.includes("seo") || m.includes("ads") || m.includes("social media") || m.includes("campaign")) return "Our marketing team runs data-driven campaigns — SEO, social, paid ads, content — to grow your audience and ROI. 📈";
  if (m.includes("strategy") || m.includes("consulting") || m.includes("growth plan")) return "We offer strategic consulting: market research, competitor analysis, digital roadmaps, and growth planning. 🗺️";
  if (m.includes("ecommerce") || m.includes("e-commerce") || m.includes("online store") || m.includes("shopify")) return "Yes, we build ecommerce experiences! From custom stores to Shopify to full headless setups — whatever fits your brand. 🛒";
  if (m.includes("wordpress") || m.includes("cms") || m.includes("content management")) return "We love headless WordPress! It gives you a powerful CMS to manage content while your site stays blazing fast. 🔥";
  if (m.includes("mobile") || m.includes("responsive") || m.includes("phone")) return "Every site we build is fully responsive — pixel-perfect on mobile, tablet, and desktop. 📱";
  if (m.includes("app") || m.includes("web app") || m.includes("saas")) return "We build web apps too! From SaaS dashboards to custom tools — if you can imagine it, we can build it. 🛠️";

  // Pricing
  if (m.includes("price") || m.includes("cost") || m.includes("how much") || m.includes("budget") || m.includes("rate") || m.includes("quote") || m.includes("fee")) return "Pricing depends on the scope — every project is unique. Book a free call on our Contact page and we'll put together a custom proposal! 💬";
  if (m.includes("free") || m.includes("consultation")) return "Yes! We offer free initial consultations. Head to the Contact page to book a Zoom call — no commitment needed. 😊";
  if (m.includes("payment") || m.includes("invoice") || m.includes("deposit")) return "We typically work with milestone-based payments. We'll walk you through everything during your free consultation. 📋";

  // Timeline & Process
  if (m.includes("how long") || m.includes("timeline") || m.includes("turnaround") || m.includes("deadline") || m.includes("time")) return "Timelines vary — a branding project may take 2–3 weeks, a full website 4–8 weeks. We set clear milestones upfront. ⏱️";
  if (m.includes("process") || m.includes("how do you work") || m.includes("steps") || m.includes("workflow")) return "Our process: Discovery → Strategy → Design → Build → Launch. We keep you in the loop every step of the way! 🔄";
  if (m.includes("revision") || m.includes("changes") || m.includes("edit") || m.includes("feedback")) return "We include revision rounds in every project so you get exactly what you envisioned. Collaboration is key for us! ✏️";
  if (m.includes("support") || m.includes("maintenance") || m.includes("after launch") || m.includes("ongoing")) return "We offer post-launch support and maintenance plans. We don't just build and disappear! 🛡️";
  if (m.includes("hosting") || m.includes("domain") || m.includes("server")) return "We can help with hosting recommendations and setup. We work with top-tier providers for speed and reliability. ⚡";

  // Location & About
  if (m.includes("location") || m.includes("where are you") || m.includes("based") || m.includes("dallas") || m.includes("texas") || m.includes("office")) return "We're based in Dallas, TX — but we work with brands nationwide and internationally! 🌎";
  if (m.includes("about") || m.includes("who is lavashing") || m.includes("tell me about") || m.includes("company")) return "Lavashing is a Dallas-based agency specializing in premium digital experiences — design, dev, branding & marketing, all in one place. 🏢";
  if (m.includes("team") || m.includes("founder") || m.includes("who works") || m.includes("staff") || m.includes("people")) return "We have a small but mighty team of designers, developers, strategists, and marketers. Visit our About page to meet us! 👥";
  if (m.includes("industry") || m.includes("industries") || m.includes("sector") || m.includes("niche")) return "We've worked with clients in ecommerce, healthcare, real estate, food & beverage, education, and professional services. 🏭";
  if (m.includes("experience") || m.includes("how long have you") || m.includes("years")) return "We've been creating premium digital experiences for ambitious brands — check out our About page for the full story! 📖";

  // Contact & Next Steps
  if (m.includes("contact") || m.includes("schedule") || m.includes("call") || m.includes("meeting") || m.includes("talk") || m.includes("reach")) return "Head to our Contact page to book a free Zoom call. We'd love to hear about your project! 📅";
  if (m.includes("email") || m.includes("phone") || m.includes("number")) return "You can reach us at hello@lavashing.com or via our Contact page. We respond quickly! ✉️";
  if (m.includes("get started") || m.includes("start") || m.includes("begin") || m.includes("ready") || m.includes("hire")) return "Amazing — let's do it! 🎉 The best first step is booking a free call on our Contact page so we can learn about your goals.";
  if (m.includes("portfolio") || m.includes("example") || m.includes("sample") || m.includes("work") || m.includes("showcase")) return "Check out our Work page — we've got projects across branding, web design, development, and marketing. 🖼️";
  if (m.includes("blog") || m.includes("article") || m.includes("read") || m.includes("resource")) return "Our Blog is full of insights on web design, marketing, branding, and strategy. Worth a read! 📰";
  if (m.includes("result") || m.includes("roi") || m.includes("success") || m.includes("outcome")) return "We're obsessed with results — our work is designed to increase conversions, brand recognition, and revenue. 📊";
  if (m.includes("testimonial") || m.includes("review") || m.includes("feedback") || m.includes("client say")) return "Our clients love the results! We'd be happy to share more details on a call — head to the Contact page to book. 🌟";

  // Fallback
  return "Great question! Feel free to explore our site, or book a free call — we'd love to learn about your project and see how we can help! 😊";
}

const GREETINGS = [
  "Hi there! 👋 Need help?",
  "Hey! Got questions? 😊",
  "Hello! I'm Leo, your guide!",
  "Psst… ask me anything! 🤖",
  "Looking for something? I can help! 🔍",
  "Hi! Curious about our services? 🚀",
  "Hey! Ready to start a project? Let's chat! 💬",
];

/* ─── Roam waypoints — stay on RIGHT side ── */
function randomWaypoint(): { x: number; y: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Stay within right side: x range -60 to +60 from base right position, y range mid-screen
  return {
    x: (Math.random() - 0.5) * 100,        // ±50px horizontal drift
    y: -(Math.random() * (vh * 0.45) + vh * 0.05), // 5%–50% from bottom
  };
}

/* ─── Main component ────────────────────── */
export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState(GREETINGS[0]);
  const [thinking, setThinking] = useState(false);
  const [talking, setTalking] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hi! 👋 I'm Leo, your Lavashing guide. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const bubbleRef = useRef<ReturnType<typeof setTimeout>>();
  const msgEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    bubbleRef.current = setTimeout(() => {
      setBubbleText(GREETINGS[0]);
      setBubble(true);
      bubbleRef.current = setTimeout(() => setBubble(false), 4500);
    }, 1800);

    // Periodic greetings
    const id = setInterval(() => {
      if (!open && !isDragging) {
        setBubbleText(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
        setBubble(true);
        setTimeout(() => setBubble(false), 4500);
      }
    }, 20000);

    return () => { clearTimeout(bubbleRef.current); clearInterval(id); };
  }, [open, isDragging]);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const txt = input.trim();
    setMessages(p => [...p, { role: "user", content: txt }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setTalking(true);
      setMessages(p => [...p, { role: "assistant", content: getReply(txt) }]);
      setTimeout(() => setTalking(false), 1800);
    }, 800 + Math.random() * 500);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{
        top: 0,
        left: 0,
        right: typeof window !== 'undefined' ? window.innerWidth - 400 : 0,
        bottom: typeof window !== 'undefined' ? window.innerHeight - 100 : 0,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 200)}
      className="fixed bottom-6 right-6 z-50"
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* ── Chat panel ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="mb-4 rounded-3xl overflow-hidden shadow-2xl"
            style={{ width: 320, background: BRAND.bg, border: `1.5px solid ${BRAND.header}30`, transformOrigin: "bottom right" }}
          >
              {/* Header */}
              <div style={{ background: BRAND.header, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 44, height: 44, flexShrink: 0, borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)",
                  border: "2px solid rgba(255,255,255,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <RobotFace talking={talking} thinking={thinking} size={34} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0 }}>Leo · AI Assistant</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ee7b7", animation: "pulse 2s infinite" }} />
                    <span style={{ color: "#ffffffbb", fontSize: 11 }}>Online · always happy to help</span>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} style={{ color: "#ffffffbb", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <Minimize2 size={16} />
                </button>
              </div>

              {/* Messages */}
              <div
                style={{ height: 280, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, background: BRAND.bg + "cc" }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                {messages.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8 }}>
                    {m.role === "assistant" && <div style={{ width: 24, height: 24, flexShrink: 0, marginTop: 2 }}><RobotFace size={24} /></div>}
                    <div style={{
                      maxWidth: "80%", padding: "8px 12px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: m.role === "user" ? BRAND.header : "#fff",
                      color: m.role === "user" ? "#fff" : BRAND.header,
                      fontSize: 13, lineHeight: 1.5,
                      border: m.role === "assistant" ? `1px solid ${BRAND.header}20` : "none",
                    }}>{m.content}</div>
                  </motion.div>
                ))}

                {thinking && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: "flex", gap: 8, justifyContent: "flex-start" }}>
                    <div style={{ width: 24, height: 24, flexShrink: 0 }}><RobotFace thinking size={24} /></div>
                    <div style={{ padding: "10px 14px", borderRadius: "18px 18px 18px 4px", background: "#fff", border: `1px solid ${BRAND.header}20`, display: "flex", gap: 4, alignItems: "center" }}>
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                          style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.header + "60" }} />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={msgEndRef} />
              </div>

              {/* Input */}
              <div
                style={{ padding: "10px 12px", borderTop: `1px solid ${BRAND.header}18`, background: BRAND.bg, display: "flex", gap: 8 }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <input
                  value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
                  placeholder="Ask me anything…"
                  style={{ flex: 1, padding: "9px 14px", borderRadius: 999, border: `1.5px solid ${BRAND.header}30`, background: "#fff", fontSize: 13, color: BRAND.header, outline: "none" }}
                />
                <motion.button onClick={send} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                  style={{ width: 36, height: 36, borderRadius: "50%", background: BRAND.header, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Send size={14} color="#fff" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Robot button + bubble ─── */}
        <div style={{ position: "relative" }}>
          <AnimatePresence>
            {bubble && !open && <SpeechBubble text={bubbleText} onDismiss={() => setBubble(false)} />}
          </AnimatePresence>

          {/* Circular glow ring behind the button */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${BRAND.pink}90 0%, ${BRAND.header}40 60%, transparent 75%)`,
              pointerEvents: "none",
              zIndex: -1,
            }}
          />

          <motion.button
            onClick={(e) => {
              if (!isDragging) {
                setOpen(o => !o);
                setBubble(false);
              }
            }}
            whileHover={{ scale: 1.1, rotate: open ? 0 : 5 }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: 64, height: 64, borderRadius: "50%",
              background: BRAND.bg, border: `2.5px solid ${BRAND.header}`,
              cursor: isDragging ? "grabbing" : "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 8px 32px ${BRAND.header}50, 0 0 0 6px ${BRAND.bg}`,
              overflow: "hidden", padding: 0,
            }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={24} color={BRAND.header} />
                </motion.div>
              ) : (
                <motion.div key="robot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <RobotFace talking={talking} size={52} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
    </motion.div>
  );
}
