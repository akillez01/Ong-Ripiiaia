import { Pause, Play, Volume1, Volume2, VolumeX, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  audioUrl: string;
  title: string;
  artist?: string;
  onClose: () => void;
}

const FooterAudioPlayer: React.FC<Props> = ({ audioUrl, title, artist, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, audioUrl]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 flex items-center px-4 py-2 border-t">
      <audio
        ref={audioRef}
        src={audioUrl}
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <button onClick={onClose} className="mr-4 text-gray-500 hover:text-red-500" aria-label="Fechar player">
        <X />
      </button>
      <button
        className="mr-2"
        onClick={() => setIsPlaying((p) => !p)}
        aria-label={isPlaying ? 'Pausar' : 'Tocar'}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center">
          <span className="font-semibold truncate">{title}</span>
          {artist && <span className="ml-2 text-xs text-gray-500 truncate">{artist}</span>}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 1}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500">{formatTime(duration)}</span>
        </div>
      </div>
      <button
        onClick={() => setIsMuted((m) => !m)}
        className="mx-2"
        aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
      >
        {isMuted || volume === 0 ? <VolumeX /> : volume < 0.5 ? <Volume1 /> : <Volume2 />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={e => {
          const v = parseFloat(e.target.value);
          setVolume(v);
          setIsMuted(v === 0);
        }}
        className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default FooterAudioPlayer;