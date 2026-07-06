"use client";

import { useCallback, useEffect, useState } from "react";

export const FULLSCREEN_KEY = "landrik-enter-fullscreen";

function applyImmersiveMode() {
  document.documentElement.classList.add("immersive-invitation");
}

function removeImmersiveMode() {
  document.documentElement.classList.remove("immersive-invitation");
}

export async function enterInvitationFullscreen() {
  sessionStorage.setItem(FULLSCREEN_KEY, "true");
  applyImmersiveMode();

  try {
    await document.documentElement.requestFullscreen();
  } catch {
    // CSS immersive fallback for browsers that block the Fullscreen API.
  }
}

export async function exitInvitationFullscreen() {
  sessionStorage.removeItem(FULLSCREEN_KEY);
  removeImmersiveMode();

  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch {
      // Ignore if the browser already exited fullscreen.
    }
  }
}

export default function FullscreenControl() {
  const [active, setActive] = useState(false);

  const syncState = useCallback(() => {
    const immersive =
      sessionStorage.getItem(FULLSCREEN_KEY) === "true" ||
      !!document.fullscreenElement ||
      document.documentElement.classList.contains("immersive-invitation");

    setActive(immersive);

    if (immersive) {
      applyImmersiveMode();
    }
  }, []);

  useEffect(() => {
    syncState();

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        const shouldStayImmersive =
          sessionStorage.getItem(FULLSCREEN_KEY) === "true";
        setActive(shouldStayImmersive);

        if (!shouldStayImmersive) {
          removeImmersiveMode();
        }
        return;
      }

      setActive(true);
      applyImmersiveMode();
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [syncState]);

  const handleExit = async () => {
    await exitInvitationFullscreen();
    setActive(false);
  };

  if (!active) return null;

  return (
    <button
      type="button"
      className="fullscreen-exit"
      onClick={handleExit}
      aria-label="Exit fullscreen"
    >
      ✕
    </button>
  );
}
