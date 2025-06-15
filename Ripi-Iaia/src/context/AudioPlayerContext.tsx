import React, { createContext, useContext, useState } from 'react';

export type FooterPlayerData = {
  audioUrl: string;
  title: string;
  artist?: string;
};

type AudioPlayerContextType = {
  footerPlayer: FooterPlayerData | null;
  setFooterPlayer: (data: FooterPlayerData | null) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [footerPlayer, setFooterPlayer] = useState<FooterPlayerData | null>(null);
  return (
    <AudioPlayerContext.Provider value={{ footerPlayer, setFooterPlayer }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error('useAudioPlayer deve ser usado dentro de AudioPlayerProvider');
  return ctx;
}