import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';

const VideoBackground: React.FC = () => {
  const { data } = usePortfolio();
  const videoUrl = data.media?.backgroundVideo || '/video/bg-video.mp4';

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none -z-10">
      <video
        key={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      {/* Lightened gradient overlay to make video clearer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
    </div>
  );
};

export default VideoBackground;