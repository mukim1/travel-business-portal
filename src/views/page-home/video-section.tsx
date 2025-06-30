"use client";

import { Play, Pause } from "lucide-react";
import React, { useRef, useState } from "react";

type VideoSectionProps = {
  videoUrl?: string;
  heading?: string;
  subheading?: string;
};

const VideoSection: React.FC<VideoSectionProps> = ({
  // src="https://cdn.pixabay.com/video/2019/02/19/21528-318978038_large.mp4"
  videoUrl = "https://cdn.pixabay.com/video/2019/04/06/22619-328940133_large.mp4",
  heading = "Discover Amazing Places",
  subheading = "Watch our incredible travel experiences and get inspired for your next adventure",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-[500px] bg-cover bg-center flex items-center justify-center">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="relative z-10 text-center text-white px-4">
              <div
                className="bg-white/20 backdrop-blur-md w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg"
                onClick={handleTogglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-12 w-12 text-white ml-1" />
                ) : (
                  <Play className="h-12 w-12 text-white ml-1" />
                )}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h3>
              <p className="text-xl opacity-90 max-w-md mx-auto">
                {subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
