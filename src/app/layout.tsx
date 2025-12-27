"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProviders } from "@/config/react-query.provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/config/theme.provider";
import LoadingOverlay from "@/components/loading_overlay/loading-overlay";
import { SocketProvider } from "@/providers/socketProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";
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
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
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
            </PersistGate>
          </Provider>
        </SocketProvider>
      </body>
    </html>
  );
}
