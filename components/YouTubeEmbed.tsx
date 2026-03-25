"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Play, Youtube } from "lucide-react";

const videoContainer: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  rel?: boolean;
  modestBranding?: boolean;
  showInfo?: boolean;
  allowFullscreen?: boolean;
  allowKeyboard?: boolean;
  showRelated?: boolean;
  enableCC?: boolean;
  enableAnnotations?: boolean;
}

export default function YouTubeEmbed({
  videoId,
  title = "YouTube video player",
  className = "",
  autoplay = false,
  muted = true,
  controls = true,
  rel = false,
  modestBranding = true,
  showInfo = false,
  allowFullscreen = false,
  allowKeyboard = false,
  showRelated = false,
  enableCC = false,
  enableAnnotations = false,
}: YouTubeEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isInView && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInView, isLoaded]);

  // Extract video ID from full YouTube URL if needed
  const getVideoId = (urlOrId: string) => {
    // If it's already a video ID (11 characters), return as is
    if (urlOrId.match(/^[a-zA-Z0-9_-]{11}$/)) {
      return urlOrId;
    }
    
    // Extract from various YouTube URL formats
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = urlOrId.match(regex);
    return match ? match[1] : urlOrId;
  };

  const cleanVideoId = getVideoId(videoId);
  
  const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}?${new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: muted ? "1" : "0",
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    fs: "0",
    cc_load_policy: "0",
    iv_load_policy: "3",
    autohide: "1",
    showinfo: "0",
    disablekb: "1",
    widget_referrer: typeof window !== 'undefined' ? window.location.origin : '',
    start: "0",
    end: "",
    loop: "0",
    playlist: cleanVideoId,
  }).toString()}`;

  return (
    <motion.div
      ref={ref}
      variants={videoContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative w-full ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Youtube size={48} className="text-red-500" />
            <div className="animate-pulse">
              <div className="h-2 w-32 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube iframe */}
      {isLoaded && (
        <motion.div className="relative w-full h-full rounded-lg overflow-hidden">
          <motion.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src={embedUrl}
            title={title}
            className="w-full h-full rounded-lg shadow-2xl"
            style={{
              border: "none",
              borderRadius: "0.75rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen={false}
            loading="lazy"
          />
          
          {/* Overlay to hide bottom controls */}
          <div 
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "60px",
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
            }}
          />
          
          {/* Overlay to hide top controls */}
          <div 
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "40px",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
            }}
          />
          
          {/* Side overlays to hide side buttons */}
          <div 
            className="absolute top-0 right-0 bottom-0 pointer-events-none"
            style={{
              width: "50px",
              background: "linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)",
            }}
          />
        </motion.div>
      )}

      {/* Decorative frame */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(124,107,196,0.1) 50%, transparent 100%)",
          borderRadius: "0.75rem",
        }}
      />
    </motion.div>
  );
}

// Quick embed component for common use cases
export function QuickYouTubeEmbed({ 
  videoUrl, 
  className = "" 
}: { 
  videoUrl: string; 
  className?: string;
}) {
  return (
    <YouTubeEmbed
      videoId={videoUrl}
      className={className}
      title="Video presentation"
      autoplay={false}
      muted={true}
      controls={true}
      rel={false}
      modestBranding={true}
    />
  );
}
