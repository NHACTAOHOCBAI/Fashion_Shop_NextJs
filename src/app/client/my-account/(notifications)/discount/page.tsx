"use client";

import NormalButton from "@/app/client/_components/NormalButton";
import { OrderNewsItem } from "@/app/client/my-account/(notifications)/order-news/page";
import { useGetNotification } from "@/hooks/queries/useNotification";
import Image from "next/image";

const Discount = () => {
  const { data: myNotification } = useGetNotification({
    type: "DISCOUNT" as NotificationType,
  });
  return (
    <div>
      {/* Header */}
      <div className="flex">
        <div>
          <p className="text-[24px]">Discount</p>
          <p className="text-[18px] font-light mt-[11px]">
            Latest news about your discount
          </p>
        </div>

        <div className="ml-auto mr-[53px]">
          <NormalButton>
            <p className="text-[14px] text-[#40BFFF]">Mark all as read</p>
          </NormalButton>
        </div>
      </div>

      {/* List container */}
      <div className="max-h-[520px] overflow-y-auto pr-2 mt-[10px]">
        {myNotification?.data && myNotification.data.length > 0 ? (
          <div className="flex flex-col gap-6">
            {myNotification.data.map((item) => (
              <OrderNewsItem key={item.id} notification={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground mt-20">
            No notifications yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Discount;
