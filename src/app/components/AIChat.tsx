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
        <motion.rect x="20" y="38" rx="3"
          animate={{ height: [5, 9, 4, 8, 5], width: [20, 17, 20, 15, 20] }}
          transition={{ duration: 0.35, repeat: Infinity }}
          fill={BRAND.header} y={38} x={20} width={20} height={6} />
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
  if (m.includes("service") || m.includes("what do you do")) return "We offer web design, development, branding, marketing & strategy — all under one roof! 🚀";
  if (m.includes("price") || m.includes("cost")) return "Pricing varies by project. Book a free consultation on our Contact page to get a custom quote!";
  if (m.includes("location") || m.includes("where")) return "We're based in Dallas, TX — but we work with brands nationwide! 🌎";
  if (m.includes("contact") || m.includes("schedule") || m.includes("call")) return "Head to the Contact page to book a Zoom call. We'd love to meet you! 📅";
  if (m.includes("portfolio") || m.includes("work") || m.includes("client")) return "Check out our Work page to see projects across different industries!";
  if (m.match(/^hi|^hello|^hey/)) return "Hey there! 👋 What can I help you with today?";
  return "Great question! Feel free to explore our site, or book a call — we'd love to help! 😊";
}

const GREETINGS = ["Hi there! 👋 Need help?", "Hey! Got questions? 😊", "Hello! I'm Leo, your guide!", "Psst… ask me anything! 🤖"];

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
                <div style={{ width: 40, height: 40, flexShrink: 0 }}>
                  <RobotFace talking={talking} thinking={thinking} size={40} />
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
              width: 64, height: 64, borderRadius: 18,
              background: BRAND.bg, border: `2px solid ${BRAND.header}`,
              cursor: isDragging ? "grabbing" : "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 8px 28px ${BRAND.header}30`,
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
