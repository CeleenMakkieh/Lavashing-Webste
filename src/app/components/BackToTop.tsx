"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1rem",
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.5rem 1rem",
        background: "#670626",
        color: "#faffe0",
        border: "none",
        borderRadius: "999px",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        boxShadow: "0 4px 16px rgba(103,6,38,0.35)",
        cursor: "pointer",
      }}
      aria-label="Back to top"
    >
      ↑ Top
    </button>
  );
}
