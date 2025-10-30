"use client";
import ChatPage from "@/app/(client)/_components/Chatting";
import Footer from "@/app/(client)/_components/footer";
import Header from "@/app/(client)/_components/header";
import Loading from "@/app/(client)/loading";
import { useAuthInit } from "@/hooks/useAuthInit";
import React, { Suspense } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  useAuthInit();

  return (
    <div className="relative">
      <Header />
      <main className="mx-auto w-[1200px] py-[20px]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Footer />
      <div className="fixed bottom-6 right-6 z-50">
        <ChatPage />
      </div>
    </div>
  );
}

export default Layout;
