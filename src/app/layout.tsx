import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../context/CentralDataContext";
import { Suspense } from "react";
import { CentralDataProvider } from "../context/CentralDataContext";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bird Id",
  description: "Test your bird identification skills!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh] bg-[#f5f7f2] text-[#171717] dark:bg-[radial-gradient(circle_at_top_left,rgba(104,160,70,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(76,119,255,0.08),transparent_35%),linear-gradient(135deg,#0d1815,#121f1b)] dark:text-[#f5f7f2]`}
      >
        <CentralDataProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            {children}
          </Suspense>
        </CentralDataProvider>
      </body>
    </html>
  );
}
