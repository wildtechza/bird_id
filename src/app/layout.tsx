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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
