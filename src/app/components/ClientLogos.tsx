"use client";
import { motion } from "motion/react";
import Image from "next/image";
import type { WPClient } from "@/lib/wordpress";
import { useT } from "@/contexts/TranslationContext";

const DEFAULT_CLIENTS: WPClient[] = [
  { name: "One Bite", logoUrl: "/onebite.png" },
  { name: "SS Towing", logoUrl: "/ss-towing.png" },
  { name: "Super Towing", logoUrl: "/super-towing.png" },
  { name: "One Coffee", logoUrl: "/one-coffee.png" },
  { name: "One Smoothie", logoUrl: "/one-smoothie.png" },
  { name: "Aj's Chicken", logoUrl: "/ajs-chicken.png" },
  { name: "Shimaa", logoUrl: "/shimaa.png" },
  { name: "WJ Place", logoUrl: "/wj-tires.png" },
  { name: "Lune Cafe", logoUrl: "/lune.png" },
  { name: "State Protection Service", logoUrl: "/state-protection-service.png" },
];

export default function ClientLogos({ clients = DEFAULT_CLIENTS }: { clients?: WPClient[] }) {
  const { t } = useT();
  const visibleClients = clients.filter((c) => c.logoUrl);
  return (
    <section className="py-24 overflow-hidden" style={{ background: "#f8eeea" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 font-bold" style={{ color: "#670626" }}>
            {t("clients.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {visibleClients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex items-center justify-center"
              style={{ height: 120 }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={client.logoUrl!}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
