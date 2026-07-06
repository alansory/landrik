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

const VIDEO_ID = "TSkBIOEq2AA";
export const MUSIC_KEY = "landrik-music";

function buildEmbedUrl() {
  const params = new URLSearchParams({
    autoplay: "1",
    loop: "1",
    playlist: VIDEO_ID,
    controls: "0",
    disablekb: "1",
    fs: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    enablejsapi: "1",
    mute: "0",
  });

  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }

  return `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?${params.toString()}`;
}

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pathname = usePathname();
  const [playing, setPlaying] = useState(false);

  const startPlayback = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const nextSrc = buildEmbedUrl();
    if (iframe.src !== nextSrc) {
      iframe.src = nextSrc;
    }

    setPlaying(true);
  }, []);

  const pausePlayback = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.src = "about:blank";
    sessionStorage.removeItem(MUSIC_KEY);
    setPlaying(false);
  }, []);

  const playOnOpen = useCallback(() => {
    sessionStorage.setItem(MUSIC_KEY, "playing");
    startPlayback();
  }, [startPlayback]);

  useEffect(() => {
    const shouldPlay =
      pathname === "/invitation" &&
      sessionStorage.getItem(MUSIC_KEY) === "playing";

    if (shouldPlay && !playing) {
      startPlayback();
    }
  }, [pathname, playing, startPlayback]);

  const toggle = useCallback(() => {
    if (playing) {
      pausePlayback();
      return;
    }

    sessionStorage.setItem(MUSIC_KEY, "playing");
    startPlayback();
  }, [playing, pausePlayback, startPlayback]);

  return (
    <MusicContext.Provider value={{ playOnOpen, toggle, playing }}>
      {children}
      <iframe
        ref={iframeRef}
        className="music-player"
        title="Background music"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      />
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
