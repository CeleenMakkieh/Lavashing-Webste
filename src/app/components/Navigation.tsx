"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useT } from "@/contexts/TranslationContext";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useT();

  if (pathname === "/special-events") return null;

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/work", label: t("nav.work") },
    { path: "/special-events", label: t("nav.specialEvents") },
    { path: "/blog", label: t("nav.blog") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          <Link href="/" className="flex items-center">
            <Image src="/Lavashing Logo.png" alt="Lavashing" width={300} height={90} className="h-24 w-auto object-contain" priority />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="relative py-2 transition-colors"
                style={{ color: "#670626" }}
              >
                {link.label}
                {pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#670626]"
                  />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-semibold"
              style={{ background: "#670626", color: "#bad797" }}
            >
              {t("nav.cta")}
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-background"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block py-2 transition-colors font-medium"
                style={{ color: "#670626" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-6 py-2.5 rounded-lg text-center hover:opacity-90 transition-opacity font-semibold"
              style={{ background: "#670626", color: "#bad797" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.cta")}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
