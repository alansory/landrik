import Image from "next/image";
import type { ReactNode } from "react";

type InvitationShellProps = {
  children: ReactNode;
  animated?: boolean;
};

export default function InvitationShell({
  children,
  animated = false,
}: InvitationShellProps) {
  return (
    <main className={`invitation${animated ? " invitation--enter" : ""}`}>
      <div className="invitation__frame" aria-hidden="true">
        <Image
          src="/img/Frame 2.png"
          alt=""
          fill
          priority
          className="invitation__background"
          sizes="100vw"
        />
      </div>

      <Image
        src="/img/red-roses 1 2.png"
        alt=""
        width={280}
        height={280}
        priority
        className="invitation__roses invitation__roses--top-left"
        aria-hidden
      />
      <Image
        src="/img/red roses 2 1.png"
        alt=""
        width={280}
        height={280}
        priority
        className="invitation__roses invitation__roses--bottom-right"
        aria-hidden
      />

      <section className="invitation__content">{children}</section>
    </main>
  );
}
