'use client'

import { useState } from 'react'
import { PodcastEpisodes } from './podcast-episodes'
import { AudioPlayer } from './audio-player'

export function PodcastWrapper() {
  const [currentEpisode, setCurrentEpisode] = useState<{ src: string; title: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayEpisode = (episode: { src: string; title: string }) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  return (
    <div>
      <PodcastEpisodes onPlayEpisode={handlePlayEpisode} />
      {currentEpisode && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
          <AudioPlayer 
            src={currentEpisode.src} 
            title={currentEpisode.title} 
            isPlaying={isPlaying}
            onPlayPause={setIsPlaying}
          />
        </div>
      )}
    </div>
  );
}