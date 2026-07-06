"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

type DetailShellProps = {
  children: ReactNode;
  animated?: boolean;
};

export default function DetailShell({
  children,
  animated = false,
}: DetailShellProps) {
  const [bgReady, setBgReady] = useState(!animated);

  const handleBgReady = () => {
    setBgReady(true);
  };

  return (
    <main
      className={`detail${animated && bgReady ? " detail--enter" : ""}${
        animated && !bgReady ? " detail--waiting" : ""
      }`}
    >
      <div className="detail__frame" aria-hidden="true">
        <Image
          src="/img/bg2.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          className="detail__background"
          sizes="100vw"
          onLoad={handleBgReady}
        />
      </div>

      <Image
        src="/img/red-roses 1 2.png"
        alt=""
        width={280}
        height={280}
        priority
        className="detail__roses detail__roses--top-left"
        aria-hidden
      />
      <Image
        src="/img/red roses 2 1.png"
        alt=""
        width={280}
        height={280}
        priority
        className="detail__roses detail__roses--bottom-right"
        aria-hidden
      />

      <section className="detail__content">{children}</section>
    </main>
  );
}
