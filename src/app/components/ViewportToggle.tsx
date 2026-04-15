"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Monitor, Smartphone, Columns2 } from "lucide-react";

const BRAND = { header: "#6b8d6d", headline: "#670626", accent: "#bad797", pink: "#f6c0d7", bg: "#f8eeea" };

type ViewMode = "desktop" | "mobile" | "both";

export default function ViewportToggle() {
  const [mode, setMode] = useState<ViewMode>("desktop");

  return (
    <>
      {/* Floating toolbar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 rounded-full shadow-xl"
        style={{
          background: BRAND.bg,
          border: `2px solid ${BRAND.header}`,
          padding: "6px",
          display: "flex",
          gap: "4px",
        }}
      >
        <button
          onClick={() => setMode("desktop")}
          style={{
            padding: "10px 16px",
            borderRadius: "999px",
            border: "none",
            background: mode === "desktop" ? BRAND.header : "transparent",
            color: mode === "desktop" ? "#fff" : BRAND.header,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          title="Desktop View"
        >
          <Monitor size={16} />
          <span className="hidden sm:inline">Desktop</span>
        </button>

        <button
          onClick={() => setMode("mobile")}
          style={{
            padding: "10px 16px",
            borderRadius: "999px",
            border: "none",
            background: mode === "mobile" ? BRAND.header : "transparent",
            color: mode === "mobile" ? "#fff" : BRAND.header,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          title="Mobile View"
        >
          <Smartphone size={16} />
          <span className="hidden sm:inline">Mobile</span>
        </button>

        <button
          onClick={() => setMode("both")}
          style={{
            padding: "10px 16px",
            borderRadius: "999px",
            border: "none",
            background: mode === "both" ? BRAND.header : "transparent",
            color: mode === "both" ? "#fff" : BRAND.header,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          title="Side by Side"
        >
          <Columns2 size={16} />
          <span className="hidden sm:inline">Both</span>
        </button>
      </motion.div>

      {/* Viewport overlay */}
      <AnimatePresence>
        {mode === "mobile" && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#00000008",
              zIndex: 35,
              pointerEvents: "none",
              opacity: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "80px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "375px",
                height: "calc(100vh - 100px)",
                background: "#fff",
                borderRadius: "24px",
                boxShadow: `0 20px 60px ${BRAND.header}40, 0 0 0 8px ${BRAND.header}15`,
                pointerEvents: "none",
                border: `3px solid ${BRAND.header}`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "120px",
                  height: "20px",
                  background: BRAND.header,
                  borderRadius: "999px",
                }}
              />
            </div>
          </motion.div>
        )}

        {mode === "both" && (
          <motion.div
            key="both"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#00000008",
              zIndex: 35,
              pointerEvents: "none",
              padding: "80px 20px 20px",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "flex-start",
              opacity: 1,
            }}
          >
            {/* Desktop frame */}
            <div
              style={{
                width: "60%",
                maxWidth: "900px",
                height: "calc(100vh - 120px)",
                background: "#fff",
                borderRadius: "16px",
                boxShadow: `0 10px 40px ${BRAND.header}30`,
                border: `3px solid ${BRAND.header}`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-32px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: BRAND.header,
                  background: BRAND.bg,
                  padding: "6px 14px",
                  borderRadius: "999px",
                  border: `2px solid ${BRAND.header}`,
                }}
              >
                Desktop View
              </div>
            </div>

            {/* Mobile frame */}
            <div
              style={{
                width: "375px",
                height: "calc(100vh - 120px)",
                background: "#fff",
                borderRadius: "24px",
                boxShadow: `0 10px 40px ${BRAND.header}40`,
                border: `3px solid ${BRAND.header}`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "120px",
                  height: "20px",
                  background: BRAND.header,
                  borderRadius: "999px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-32px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: BRAND.header,
                  background: BRAND.bg,
                  padding: "6px 14px",
                  borderRadius: "999px",
                  border: `2px solid ${BRAND.header}`,
                }}
              >
                Mobile View
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
