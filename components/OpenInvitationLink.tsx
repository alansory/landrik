"use client";

import { useRouter } from "next/navigation";
import { enterInvitationFullscreen } from "@/components/FullscreenControl";
import { useMusic } from "@/components/MusicProvider";

export default function OpenInvitationLink() {
  const router = useRouter();
  const { playOnOpen } = useMusic();

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    playOnOpen();
    await enterInvitationFullscreen();
    router.push("/invitation");
  };

  return (
    <button type="button" className="invitation__button" onClick={handleClick}>
      Open The Invitation
    </button>
  );
}
