"use client";

import NormalButton from "@/app/client/_components/NormalButton";
import {
  useGetNotification,
  useMarkAsRead,
  useMarkOneAsRead,
} from "@/hooks/queries/useNotification";
import { cn } from "@/lib/utils";
import { Bell, ShoppingBag, Tag } from "lucide-react";

const OrderNews = () => {
  const { data: myNotification } = useGetNotification({
    type: "ORDER" as NotificationType,
  });
  const { mutate: markAsRead } = useMarkAsRead();
  return (
    <div>
      {/* Header */}
      <div className="flex">
        <div>
          <p className="text-[24px]">Order News</p>
          <p className="text-[18px] font-light mt-[11px]">
            Latest news about your orders status
          </p>
        </div>

        <div className="ml-auto mr-[53px]">
          <NormalButton onClick={() => markAsRead()}>
            <p className="text-[14px] text-[#40BFFF]">Mark all as read</p>
          </NormalButton>
        </div>
      </div>
      {/* List container */}
      <div className="max-h-[520px] overflow-y-auto pr-2  mt-[10px]">
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

export default OrderNews;
interface OrderNewsItemProps {
  notification: Notification;
}

export const OrderNewsItem = ({ notification }: OrderNewsItemProps) => {
  const { mutate: markOneAsRead } = useMarkOneAsRead();

  const Icon =
    notification.type === "ORDER"
      ? ShoppingBag
      : notification.type === "DISCOUNT"
      ? Tag
      : Bell;

  return (
    <div
      className={cn(
        "flex gap-4 w-full p-4 rounded-xl border transition cursor-pointer",
        notification.isRead
          ? "bg-white hover:bg-gray-50"
          : "bg-blue-50 border-blue-100 hover:bg-blue-100"
      )}
      onClick={() => {
        if (!notification.isRead) {
          markOneAsRead({ id: notification.id });
        }
      }}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
          notification.type === "ORDER" && "bg-green-100 text-green-600",
          notification.type === "DISCOUNT" && "bg-orange-100 text-orange-600"
        )}
      >
        <Icon size={22} />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "text-sm",
              notification.isRead ? "font-medium" : "font-semibold"
            )}
          >
            {notification.title}
          </p>

          {!notification.isRead && (
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {notification.message}
        </p>

        <p className="text-xs text-gray-400">{notification.time}</p>
      </div>
    </div>
  );
};
