"use client";
import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";
import Script from "next/script";

export default function Contact({
  email = "hello@lavashing.com",
  phone = "(469) 555-1234",
  address = "Dallas, TX",
}: {
  email?: string;
  phone?: string;
  address?: string;
}) {
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

              {/* HoneyBook widget */}
              <div className="hb-p-699125b1fab39a0007237d9b-1" />
              <img height="1" width="1" style={{ display: "none" }} src="https://www.honeybook.com/p.png?pid=699125b1fab39a0007237d9b" alt="" />
              <Script
                id="honeybook-widget"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    (function(h,b,s,n,i,p,e,t) {
                      h._HB_ = h._HB_ || {}; h._HB_.pid = i;
                      t=b.createElement(s); t.type="text/javascript"; t.async=!0; t.src=n;
                      e=b.getElementsByTagName(s)[0]; e.parentNode.insertBefore(t,e);
                    })(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","699125b1fab39a0007237d9b");
                  `,
                }}
              />
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
                  Office Hours: Monday - Friday, 9am - 5pm CST
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
