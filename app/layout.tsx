import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viaja AI - Discover Cities Through the Eyes of Locals",
  description: "Find authentic travel experiences recommended by locals. Beyond the tourist traps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen bg-stone-50 font-sans antialiased">
        <header className="border-b border-stone-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="font-display text-2xl font-semibold text-stone-900">
              Viaja AI
            </Link>
            <nav className="flex gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-stone-600 hover:text-brand-600 transition-colors"
              >
                Discover
              </Link>
              <Link
                href="/submit"
                className="text-sm font-medium text-stone-600 hover:text-brand-600 transition-colors"
              >
                Submit
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-auto border-t border-stone-200 bg-white py-8">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-stone-500 sm:px-6">
            Viaja AI — Discover cities through the eyes of locals
          </div>
        </footer>
      </body>
    </html>
  );
}
