"use client";
import { motion } from "motion/react";
import Image from "next/image";
import type { WPClient } from "@/lib/wordpress";

const DEFAULT_CLIENTS: WPClient[] = [
  { name: "One Bite" },
  { name: "SS Towing" },
  { name: "Super Towing" },
  { name: "One Coffee" },
  { name: "Shimaa Beauty Center" },
  { name: "Shimaa Academy" },
  { name: "WJ Place" },
  { name: "Lune Cafe" },
  { name: "ZExpress" },
  { name: "Flora and Noor" },
  { name: "State Protection Service" },
];

export default function ClientLogos({ clients = DEFAULT_CLIENTS }: { clients?: WPClient[] }) {
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
            Trusted by Businesses Nationwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="aspect-video rounded-2xl flex items-center justify-center p-6"
              style={{ background: "#fff", border: "1.5px solid #67062218" }}
            >
              {client.logoUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold select-none"
                  style={{ background: "#67062210", color: "#670626" }}
                >
                  {client.name.charAt(0)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
