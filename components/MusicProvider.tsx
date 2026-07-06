"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { SpeakerSimpleHigh, SpeakerSlash } from "@phosphor-icons/react";

const MUSIC_SRC = "/music/engagement.mp3";
export const MUSIC_KEY = "landrik-music";

type MusicContextValue = {
  playOnOpen: () => void;
  toggle: () => void;
  playing: boolean;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
}

type MusicProviderProps = {
  children: ReactNode;
};

export default function MusicProvider({ children }: MusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();
  const [playing, setPlaying] = useState(false);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    sessionStorage.setItem(MUSIC_KEY, "playing");

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const pausePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    sessionStorage.removeItem(MUSIC_KEY);
    setPlaying(false);
  }, []);

  const playOnOpen = useCallback(() => {
    void startPlayback();
  }, [startPlayback]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlaying = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const shouldPlay =
      pathname === "/invitation" &&
      sessionStorage.getItem(MUSIC_KEY) === "playing";

    if (shouldPlay && !playing) {
      void startPlayback();
    }
  }, [pathname, playing, startPlayback]);

  const toggle = useCallback(() => {
    if (playing) {
      pausePlayback();
      return;
    }

    void startPlayback();
  }, [playing, pausePlayback, startPlayback]);

  return (
    <MusicContext.Provider value={{ playOnOpen, toggle, playing }}>
      {children}
      <audio ref={audioRef} className="music-player" loop preload="auto">
        <source src={encodeURI(MUSIC_SRC)} type="audio/mpeg" />
      </audio>
      <button
        type="button"
        className="music-toggle"
        onClick={toggle}
        aria-label={playing ? "Stop music" : "Play music"}
      >
        {playing ? (
          <SpeakerSimpleHigh
            className="music-toggle__icon"
            size={18}
            weight="regular"
          />
        ) : (
          <SpeakerSlash className="music-toggle__icon" size={18} weight="regular" />
        )}
      </button>
    </MusicContext.Provider>
  );
}
