"use client";

import NormalButton from "@/app/client/_components/NormalButton";
import { useGetNotification } from "@/hooks/queries/useNotification";
import Image from "next/image";

const Discount = () => {
  const { data: myNotification } = useGetNotification({});

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
          <DiscountItem key={item.id} notification={item} />
        ))}

        {!myNotification?.data.length && (
          <p className="text-center text-gray-400">
            No discount notifications yet
          </p>
        )}
      </div>
    </div>
  );
};
interface DiscountItemProps {
  notification: Notification;
}

const DiscountItem = ({ notification }: DiscountItemProps) => {
  return (
    <div
      className={`
        flex items-center w-full px-[28px] py-[10px] rounded-[8px] border
        ${notification.isRead ? "bg-[#FAFAFB]" : "bg-[#EEF6FF]"}
      `}
    >
      {/* Image */}
      <Image
        height={94}
        width={138}
        alt="discount"
        src="https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png"
        className="bg-[#F6F7F8] rounded-[8px] w-[138px] h-[94px] object-contain"
      />

      {/* Content */}
      <div className="ml-[11px] flex-1">
        <p className="text-[18px] font-medium">{notification.title}</p>

        <p className="font-light text-[14px]">{notification.message}</p>

        <p className="text-[14px] text-gray-500">{notification.time}</p>
      </div>
    </div>
  );
};

export default Discount;
