import { Link } from "react-router";
import { Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl">Lavashing</h3>
            <p className="text-primary-foreground/70">
              Dallas-based marketing and web agency serving clients nationwide.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Web Design</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Branding</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Marketing</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Strategy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link></li>
              <li><Link to="/industries" className="hover:text-primary-foreground transition-colors">Industries</Link></li>
              <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Dallas, TX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:hello@lavashing.com" className="hover:text-primary-foreground transition-colors">
                  hello@lavashing.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+14695551234" className="hover:text-primary-foreground transition-colors">
                  (469) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/70">
          <p>&copy; {new Date().getFullYear()} Lavashing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
