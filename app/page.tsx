import { Suspense } from "react";
import InvitationShell from "@/components/InvitationShell";
import OpenInvitationLink from "@/components/OpenInvitationLink";

export default function HomePage() {
  return (
    <InvitationShell animated>
      <p className="invitation__greeting">Dear,</p>
      <p className="invitation__title">Our Beloved Guest</p>
      <Suspense fallback={
        <button type="button" className="invitation__button" disabled>
          Open The Invitation
        </button>
      }>
        <OpenInvitationLink />
      </Suspense>
    </InvitationShell>
  );
}
