'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

interface AudioPlayerProps {
  src: string;
  title: string;
  isPlaying: boolean;
  onPlayPause: (isPlaying: boolean) => void;
}

export function AudioPlayer({ src, title, isPlaying, onPlayPause }: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = src;
    audio.load();
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [src, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    }
  }, []);

  const togglePlay = () => {
    const newIsPlaying = !isPlaying;
    onPlayPause(newIsPlaying);
    if (newIsPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }

  const handleTimeChange = (newTime: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime[0];
      setCurrentTime(newTime[0]);
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume[0];
      setVolume(newVolume[0]);
      setIsMuted(newVolume[0] === 0);
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMuted) {
        audio.volume = volume;
        setIsMuted(false);
      } else {
        audio.volume = 0;
        setIsMuted(true);
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  }

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  }

  return (
    <div className="bg-card rounded-lg p-4 shadow-md">
      <audio ref={audioRef} src={src} />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" size="icon" onClick={skipBackward}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={skipForward}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleTimeChange}
          className="flex-grow"
        />
        <span className="text-sm">{formatTime(duration)}</span>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Button variant="ghost" size="icon" onClick={toggleMute}>
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  )
}