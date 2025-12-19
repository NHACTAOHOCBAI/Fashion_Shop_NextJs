"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProviders } from "@/config/react-query.provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/config/theme.provider";
import { ReduxProvider } from "@/providers/reduxProvider";
import LoadingOverlay from "@/components/loading_overlay/loading-overlay";
import { SocketProvider } from "@/providers/socketProvider";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SocketProvider>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="top-center" />
              <ReactQueryProviders>
                <LoadingOverlay />
                {children}
              </ReactQueryProviders>
            </ThemeProvider>
          </ReduxProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
