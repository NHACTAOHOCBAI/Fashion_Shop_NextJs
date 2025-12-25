"use client";

import { useMarkOneAsRead } from "@/hooks/queries/useNotification";
import { cn } from "@/lib/utils";
import { Bell, ShoppingBag, Tag } from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
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
        "flex gap-4 w-full p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md",
        notification.isRead
          ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          : "bg-[#40BFFF]/5 border-[#40BFFF]/20 hover:bg-[#40BFFF]/10"
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
          "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
          notification.type === "ORDER" &&
            "bg-[#40BFFF]/10 text-[#40BFFF]",
          notification.type === "DISCOUNT" &&
            "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
        )}
      >
        <Icon size={22} />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "text-sm text-gray-800 dark:text-gray-100",
              notification.isRead ? "font-medium" : "font-semibold"
            )}
          >
            {notification.title}
          </p>

          {!notification.isRead && (
            <span className="w-2 h-2 rounded-full bg-[#40BFFF] flex-shrink-0" />
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {notification.message}
        </p>

        {notification.time && (
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {notification.time}
          </p>
        )}
      </div>
    </div>
  );
};
