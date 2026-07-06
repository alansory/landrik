"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { enterInvitationFullscreen } from "@/components/FullscreenControl";
import { useMusic } from "@/components/MusicProvider";

export default function OpenInvitationLink() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { playOnOpen } = useMusic();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    playOnOpen();
    void enterInvitationFullscreen();

    const query = searchParams.toString();
    router.push(query ? `/invitation?${query}` : "/invitation");
  };

  return (
    <button type="button" className="invitation__button" onClick={handleClick}>
      Open The Invitation
    </button>
  );
}
