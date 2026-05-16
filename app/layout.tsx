import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Ingot Landing",
  description: "A structured canvas for building connected worlds.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={publicSans.className}>{children}</body>
    </html>
  );
}
