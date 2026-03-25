"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Play, Youtube } from "lucide-react";
import Image from "next/image";
import VideoModal from "./VideoModal";

const thumbnailContainer: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

interface YouTubeThumbnailProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function YouTubeThumbnail({
  videoId,
  title = "YouTube video",
  className = "",
}: YouTubeThumbnailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get highest quality thumbnail - try mobile-first
  const mobileUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  const hqUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const maxresUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  // Use mobile-first approach
  const currentUrl = imageError ? hqUrl : mobileUrl;

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageError = () => {
    if (!imageError && currentUrl === mobileUrl) {
      setImageError(true);
    } else if (imageError && currentUrl === hqUrl) {
      setImageError(true); // Keep error state to show fallback
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <motion.div
        variants={thumbnailContainer}
        initial="hidden"
        animate="visible"
        className={`relative w-full cursor-pointer group ${className}`}
        style={{ aspectRatio: "16/9" }}
        onClick={handleClick}
      >
        {/* Thumbnail image */}
        <Image
          src={currentUrl}
          alt={title}
          fill
          className="object-cover rounded-lg"
          style={{ borderRadius: "0.75rem" }}
          onError={handleImageError}
          onLoad={handleImageLoad}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority={false}
        />
        
        {/* Loading placeholder */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ backgroundColor: "#1a1a1a", borderRadius: "0.75rem" }}>
            <Youtube size={48} className="text-red-500" />
          </div>
        )}
        
        {/* Error fallback */}
        {imageError && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-800 to-gray-900" style={{ borderRadius: "0.75rem" }}>
            <div className="text-center">
              <Youtube size={48} className="text-red-500 mb-2" />
              <p className="text-white text-sm">Video Preview</p>
            </div>
          </div>
        )}
        
        {/* Dark overlay on hover */}
        <div 
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
            borderRadius: "0.75rem",
          }}
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Play button circle */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: "rgba(255, 0, 0, 0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Play size={32} className="text-white ml-1" fill="white" />
            </div>
            
            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
        
        {/* YouTube badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm">
            <Youtube size={16} className="text-red-500" />
            <span className="text-xs text-white font-medium">YouTube</span>
          </div>
        </div>
        
        {/* Shadow */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.75rem",
          }}
        />
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        videoId={videoId}
        title={title}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

// Quick thumbnail component
export function QuickYouTubeThumbnail({ 
  videoUrl, 
  className = "" 
}: { 
  videoUrl: string; 
  className?: string;
}) {
  // Extract video ID from URL
  const getVideoId = (urlOrId: string) => {
    if (urlOrId.match(/^[a-zA-Z0-9_-]{11}$/)) {
      return urlOrId;
    }
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = urlOrId.match(regex);
    return match ? match[1] : urlOrId;
  };

  const videoId = getVideoId(videoUrl);
  
  return (
    <YouTubeThumbnail
      videoId={videoId}
      className={className}
      title="Video presentation"
    />
  );
}
