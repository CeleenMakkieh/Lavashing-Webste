"use client";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Calendar, Video } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

export default function Contact({
  email = "hello@lavashing.com",
  phone = "(469) 555-1234",
  address = "Dallas, TX",
}: {
  email?: string;
  phone?: string;
  address?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "f5eff44c-9895-4368-a0e4-4a5c1896ed46",
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Thank you! We'll be in touch soon.");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSchedule = () => {
    toast.success("Opening HoneyBook scheduler...");
  };

  const handleZoom = () => {
    toast.success("Opening Zoom meeting request...");
  };

  return (
    <div className="pt-20">
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl mb-8">Let's Work Together</h1>
            <p className="text-xl md:text-2xl text-foreground/70">
              Ready to start your project? Get in touch and let's create something amazing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl mb-8">Send us a message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Name</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label>Company (Optional)</Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={6}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message"}
                  <Send size={18} className="ml-2" />
                </Button>
              </form>

          
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl mb-8">Other ways to connect</h2>

                <div className="space-y-6">
                  <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg mb-1">Email</h3>
                        <a
                          href={`mailto:${email}`}
                          className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg mb-1">Phone</h3>
                        <a
                          href={`tel:${phone.replace(/\D/g, "")}`}
                          className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                          {phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg mb-1">Location</h3>
                        <p className="text-foreground/70">{address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             

              <div className="p-6 bg-muted/50 rounded-2xl">
                <h3 className="text-lg mb-3">Quick Response</h3>
                <p className="text-foreground/70 mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <p className="text-sm text-foreground/60">
                  Office Hours: Monday - Friday, 9am - 6pm CST
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl mb-4">Prefer to chat first?</h2>
            <p className="text-lg text-foreground/70">
              Use our AI chat assistant in the bottom right corner to get instant answers to your questions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
