import type { Metadata } from "next";
import { Fredoka, Caveat } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const caveat = Caveat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Kisahtanggalku - Ada Apa di Balik Tanggal Lahirmu?",
  description: "Cari tahu peristiwa sejarah, zodiak, shio, dan tokoh terkenal yang lahir di tanggal yang sama denganmu.",
  openGraph: {
    title: "Kisahtanggalku - Ada Apa di Balik Tanggal Lahirmu?",
    description: "Cari tahu peristiwa sejarah, zodiak, shio, dan tokoh terkenal yang lahir di tanggal yang sama denganmu.",
    url: "https://kisahtanggalku.invitea.cards",
    siteName: "Kisahtanggalku",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kisahtanggalku - Ada Apa di Balik Tanggal Lahirmu?",
    description: "Cari tahu peristiwa sejarah, zodiak, shio, dan tokoh terkenal yang lahir di tanggal yang sama denganmu.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${fredoka.variable} ${caveat.variable} font-sans`}>{children}</body>
    </html>
  );
}
