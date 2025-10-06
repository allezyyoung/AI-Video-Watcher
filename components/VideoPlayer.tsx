
import React from 'react';

interface VideoPlayerProps {
  videoId: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full rounded-lg shadow-2xl border border-white/10"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
