"use client";
import Link from "next/link";
import { Linkedin, Music2, Instagram, Mail, Phone, MapPin } from "lucide-react";
import type { WPSiteSettings } from "@/lib/wordpress";

export default function Footer({ settings }: { settings: WPSiteSettings }) {
  return (
    <footer className="bg-[#670626] text-[#bad797]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl">Lavashing</h3>
            <p className="text-[#bad797]/70">{settings.footerTagline}</p>
            <div className="flex gap-4">
              <a href={settings.socialLinkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <Linkedin size={20} />
              </a>
              <a href={settings.socialTiktok} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <Music2 size={20} />
              </a>
              <a href={settings.socialInstagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Services</h4>
            <ul className="space-y-2 text-[#bad797]/70">
              <li><Link href="/work" className="hover:text-[#bad797] transition-colors">Web Design</Link></li>
              <li><Link href="/work" className="hover:text-[#bad797] transition-colors">Web Development</Link></li>
              <li><Link href="/work" className="hover:text-[#bad797] transition-colors">Branding</Link></li>
              <li><Link href="/work" className="hover:text-[#bad797] transition-colors">Marketing</Link></li>
              <li><Link href="/work" className="hover:text-[#bad797] transition-colors">Strategy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-[#bad797]/70">
              <li><Link href="/about" className="hover:text-[#bad797] transition-colors">About</Link></li>
              <li><Link href="/work" className="hover:text-[#bad797] transition-colors">Industries</Link></li>
              <li><Link href="/blog" className="hover:text-[#bad797] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[#bad797] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-3 text-[#bad797]/70">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>{settings.contactAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-[#bad797] transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <a href={`tel:${(settings.contactPhone ?? "").replace(/\D/g, "")}`} className="hover:text-[#bad797] transition-colors">
                  {settings.contactPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#bad797]/20 text-center text-[#bad797]/70">
          <p>&copy; {new Date().getFullYear()} Lavashing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
