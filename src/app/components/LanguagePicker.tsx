"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "lv_lang";

export default function LanguagePicker() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Always show on every page load / refresh
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    }
    setShow(true);
  }, []);

  function choose(lang: "en" | "ar") {
    localStorage.setItem(STORAGE_KEY, lang);
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.removeAttribute("dir");
      document.documentElement.setAttribute("lang", "en");
    }
    window.dispatchEvent(new Event("lv_lang_change"));
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,5,9,0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{
              background: "#faffe0",
              borderRadius: "20px",
              padding: "2.5rem 2rem",
              maxWidth: "420px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 24px 64px rgba(103,6,38,0.25)",
              border: "1.5px solid #bad79760",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              style={{
                position: "absolute",
                top: "0.9rem",
                right: "0.9rem",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#67062612",
                border: "1px solid #67062630",
                color: "#670626",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                fontWeight: 700,
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              ×
            </button>
            <p style={{ color: "#6b8d6d", letterSpacing: "0.3em", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>
              Welcome · مرحباً
            </p>
            <h2 style={{ fontFamily: "serif", fontSize: "clamp(1.4rem,5vw,1.9rem)", fontWeight: 700, color: "#670626", marginBottom: "0.5rem", lineHeight: 1.2 }}>
              Choose your language
            </h2>
            <p style={{ color: "#1a0509", opacity: 0.6, fontSize: "0.88rem", marginBottom: "2rem" }}>
              اختر لغتك
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => choose("en")}
                style={{
                  flex: 1,
                  padding: "1rem",
                  background: "#670626",
                  color: "#faffe0",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "opacity 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span style={{ fontSize: "1.8rem" }}>🇺🇸</span>
                English
              </button>

              <button
                onClick={() => choose("ar")}
                style={{
                  flex: 1,
                  padding: "1rem",
                  background: "#6b8d6d",
                  color: "#faffe0",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "opacity 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span style={{ fontSize: "1.8rem" }}>🇸🇦</span>
                العربية
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
