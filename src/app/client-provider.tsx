"use client";

import { ReactNode } from "react";
import { ReactQueryProviders } from "@/config/react-query.provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/config/theme.provider";
import LoadingOverlay from "@/components/loading_overlay/loading-overlay";
import { SocketProvider } from "@/providers/socketProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
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
  );
}
