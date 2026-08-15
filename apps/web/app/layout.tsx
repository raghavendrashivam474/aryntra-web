import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aryntra — India's Intelligent Decision Layer",
  description:
    "Aryntra builds intelligent systems that help people understand, reason, decide, build, and create. India's Intelligent Decision Layer.",
  metadataBase: new URL("https://aryntra.com"),
  openGraph: {
    title: "Aryntra — India's Intelligent Decision Layer",
    description:
      "Aryntra builds intelligent systems that help people understand, reason, decide, build, and create.",
    url: "https://aryntra.com",
    siteName: "Aryntra",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryntra — India's Intelligent Decision Layer",
    description:
      "Aryntra builds intelligent systems that help people understand, reason, decide, build, and create.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
