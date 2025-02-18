"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { Play, MessageSquare, Video } from "lucide-react";

const features = [
  {
    icon: Play,
    title: "Shorts",
    description: "Learn finance concepts through engaging 30-second videos",
    href: "/shorts",
    color: "text-blue-500"
  },
  {
    icon: MessageSquare,
    title: "Ask AI",
    description: "Get instant answers to your finance questions from our AI assistant",
    href: "/ask",
    color: "text-green-500"
  },
  {
    icon: Video,
    title: "Learn",
    description: "Generate custom video lessons tailored to your interests",
    href: "/learn",
    color: "text-purple-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Our Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover powerful tools designed to enhance your financial education journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Link 
                href={feature.href}
                className="block p-6 rounded-xl bg-card hover:shadow-lg transition-shadow"
              >
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}