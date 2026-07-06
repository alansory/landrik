export default function InvitationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link rel="preload" as="image" href="/img/bg2.webp" fetchPriority="high" />
      {children}
    </>
  );
}
