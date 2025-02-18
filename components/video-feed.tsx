"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { Quiz } from "@/components/quiz";

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [watchedCount, setWatchedCount] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoComplete = () => {
    const newCount = watchedCount + 1;
    setWatchedCount(newCount);
    if (newCount >= 5) {
      setShowQuiz(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Videos</h2>
        <Progress value={(watchedCount / 5) * 100} className="w-32" />
      </div>
      
      {showQuiz ? (
        <Quiz onComplete={() => setShowQuiz(false)} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative aspect-[9/16]">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="object-cover w-full h-full"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-0 m-auto h-12 w-12 rounded-full"
                  onClick={handleVideoComplete}
                >
                  <PlayCircle className="h-8 w-8" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{video.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}