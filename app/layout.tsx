import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { CompareBar } from "@/components/compare/CompareBar";
import { Navbar } from "@/components/Navbar";
import { AppProviders } from "@/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CollegeFind — Discover Your Perfect College",
  description:
    "Search and compare Indian colleges by fees, ratings, packages, and location.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-gray-50 antialiased`}>
        <AppProviders>
          <Navbar />
          <Suspense fallback={null}>{children}</Suspense>
          <CompareBar />
        </AppProviders>
      </body>
    </html>
  );
}
