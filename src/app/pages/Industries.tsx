import { motion } from "motion/react";
import { ShoppingBag, Heart, GraduationCap, Building2, Utensils, Briefcase } from "lucide-react";
import ClientLogos from "../components/ClientLogos";

export default function Industries() {
  const industries = [
    {
      icon: <ShoppingBag size={40} />,
      title: "E-commerce & Retail",
      description: "Helping online and brick-and-mortar retailers create seamless shopping experiences.",
      examples: ["TechCorp", "BuildRight"],
    },
    {
      icon: <Heart size={40} />,
      title: "Healthcare & Wellness",
      description: "Supporting healthcare providers and wellness brands with compliant, user-friendly digital solutions.",
      examples: ["GlobalCo"],
    },
    {
      icon: <GraduationCap size={40} />,
      title: "Education",
      description: "Empowering educational institutions and edtech companies to reach and engage learners.",
      examples: ["Innovate"],
    },
    {
      icon: <Building2 size={40} />,
      title: "Real Estate",
      description: "Creating powerful digital tools for real estate agencies and property management companies.",
      examples: ["StartupX"],
    },
    {
      icon: <Utensils size={40} />,
      title: "Food & Beverage",
      description: "Crafting appetizing digital experiences for restaurants, food brands, and delivery services.",
      examples: ["CreativeWorks"],
    },
    {
      icon: <Briefcase size={40} />,
      title: "Professional Services",
      description: "Building credibility and trust for consultants, agencies, and service providers.",
      examples: ["DesignHub", "FutureLabs"],
    },
  ];

  return (
    <div className="pt-20">
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl mb-8">Industries We Serve</h1>
            <p className="text-xl md:text-2xl text-foreground/70">
              We've partnered with businesses across diverse sectors, delivering tailored solutions that drive results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-card border border-border rounded-3xl hover:shadow-lg transition-shadow group"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  {industry.icon}
                </div>
                <h2 className="text-2xl mb-4">{industry.title}</h2>
                <p className="text-foreground/70 mb-6">{industry.description}</p>
                <div className="flex flex-wrap gap-2">
                  {industry.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-foreground/60"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl mb-6">Don't see your industry?</h2>
            <p className="text-lg text-foreground/70 mb-8">
              We work with businesses of all types and sizes. Our adaptable approach means we can create solutions tailored to your specific industry needs, no matter the sector.
            </p>
          </motion.div>
        </div>
      </section>

      <ClientLogos />

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl mb-6">Industry Expertise Meets Custom Solutions</h2>
              <p className="text-lg text-foreground/70 mb-6">
                Each industry has its unique challenges and opportunities. We combine deep industry knowledge with innovative thinking to create solutions that work specifically for your market.
              </p>
              <p className="text-lg text-foreground/70">
                From compliance requirements to industry-specific user behaviors, we understand what it takes to succeed in your space.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
