"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { TrendingUp, ChevronDown } from "lucide-react";

export function LandingHero() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/80 z-10" />
      
      <div className="container relative z-20 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <TrendingUp className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold">InvestIQ</h1>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            Smart finance, smarter you.
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            InvestIQ simplifies finance education with bite-sized 30-second videos, 
            interactive quizzes, and AI-powered insights. Learn at your own pace, 
            request custom topics for AI-generated animated lessons, and get real-time 
            answers to your investment and finance questions.
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <Link 
              href="/login" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <button 
              onClick={scrollToFeatures}
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      <button 
        onClick={scrollToFeatures}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}