"use client";

import { MyAccountSidebar } from "@/app/client/my-account/_components/sidebar";

const MyAccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[1240px] mx-auto py-[50px] flex gap-[24px]">
      <MyAccountSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};
export default MyAccountLayout;
