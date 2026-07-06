import type { Metadata } from "next";
import { Libre_Caslon_Text, Parisienne } from "next/font/google";
import MusicProvider from "@/components/MusicProvider";
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Milania and Landrikus",
  description:
    "Engagement invitation for Milania and Landrikus. 15 August 2026 at Beatriss Restaurant and Cafe, South Jakarta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${libreCaslon.className} ${parisienne.variable}`}>
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
