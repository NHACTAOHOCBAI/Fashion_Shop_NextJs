"use client";

import NormalButton from "@/app/client/_components/NormalButton";
import { OrderNewsItem } from "@/app/client/my-account/(notifications)/order-news/page";
import { newAddress } from "@/constants/address";
import { useGetNotification } from "@/hooks/queries/useNotification";
import Image from "next/image";

const Discount = () => {
  const { data: myNotification } = useGetNotification({
    type: "DISCOUNT" as NotificationType,
  });
  newAddress();
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

      {/* List */}
      <div className="flex flex-col gap-[35px] mt-[60px]">
        {myNotification?.data.map((item: Notification) => (
          <OrderNewsItem key={item.id} notification={item} />
        ))}

        {!myNotification?.data.length && (
          <p className="text-center text-gray-400">No notifications yet</p>
        )}
      </div>
    </div>
  );
};

export default Discount;
