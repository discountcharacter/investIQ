"use client";

import { useState } from 'react';
import { Header } from "@/components/header";
import { Quiz } from "@/components/quiz";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const videos = [
  {
    id: "0m1QnekDFzs",
    title: "Finance Short 1"
  },
  {
    id: "I_G8wmKe8oo",
    title: "Finance Short 2"
  }
];

export default function ShortsPage() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentVideo > 0) {
      setCurrentVideo(prev => prev - 1);
    } else if (direction === 'down' && currentVideo < videos.length - 1) {
      setCurrentVideo(prev => prev + 1);
      if (currentVideo === videos.length - 2) {
        setTimeout(() => setShowQuiz(true), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!showQuiz ? (
            <motion.div 
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative max-w-sm mx-auto h-[80vh]"
            >
              <div className="relative h-full rounded-xl overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${videos[currentVideo].id}?autoplay=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                <button
                  onClick={() => handleScroll('up')}
                  disabled={currentVideo === 0}
                  className="p-2 rounded-full bg-primary/80 text-primary-foreground disabled:opacity-50"
                >
                  <ChevronUp className="h-6 w-6" />
                </button>
                <button
                  onClick={() => handleScroll('down')}
                  disabled={currentVideo === videos.length - 1}
                  className="p-2 rounded-full bg-primary/80 text-primary-foreground disabled:opacity-50"
                >
                  <ChevronDown className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Quiz onComplete={() => setShowQuiz(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}