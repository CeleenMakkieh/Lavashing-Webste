import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function TeamPreview() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Strategy",
      color: "from-pink-500 to-orange-500",
    },
    {
      name: "David Park",
      role: "Lead Developer",
      color: "from-orange-500 to-yellow-500",
    },
  ];

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Meet the team</h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Talented professionals dedicated to bringing your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-white">
                    <div className="text-xl mb-1">{member.name}</div>
                    <div className="text-sm opacity-90">{member.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/about">
            <Button size="lg" variant="outline">
              Meet Everyone
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
