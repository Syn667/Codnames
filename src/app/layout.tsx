import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: "Codnames — Online Multiplayer Espionage Game",
  description: "Play Codnames online with friends. The definitive spy party game with all 14 official expansion packs, real-time multiplayer, and custom word decks.",
  keywords: ["codnames", "codenames", "online board game", "word game", "party game", "espionage", "spymaster"],
  icons: {
    icon: [
      { url: '/cod_badge_icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/cod_badge_icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${displayFont.variable} ${monoFont.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
