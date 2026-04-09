import { motion } from "motion/react";

export default function ClientLogos() {
  const clients = [
    { name: "TechCorp", color: "#3B82F6" },
    { name: "DesignHub", color: "#8B5CF6" },
    { name: "StartupX", color: "#EC4899" },
    { name: "GlobalCo", color: "#F59E0B" },
    { name: "Innovate", color: "#10B981" },
    { name: "FutureLabs", color: "#6366F1" },
    { name: "CreativeWorks", color: "#EF4444" },
    { name: "BuildRight", color: "#14B8A6" },
  ];

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Trusted by leading brands</h2>
          <p className="text-xl text-foreground/70">
            We've partnered with innovative companies across industries
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="aspect-video bg-card border border-border rounded-xl flex items-center justify-center p-8 group cursor-pointer"
              >
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: client.color }}
                  />
                  <div className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                    {client.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
