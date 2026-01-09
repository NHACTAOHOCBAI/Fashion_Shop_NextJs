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
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientProviders from "@/app/client-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
