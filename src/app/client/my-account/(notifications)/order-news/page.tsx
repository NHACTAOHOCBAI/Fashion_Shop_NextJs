"use client";

import { useEffect, useState } from "react";
import NormalButton from "@/app/client/_components/NormalButton";
import {
  useGetNotification,
  useMarkAsRead,
} from "@/hooks/queries/useNotification";
import { Bell } from "lucide-react";
import { LoadMore } from "@/components/ui/load-more";
import { ListSkeletons } from "@/components/skeletons/list-skeletons";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationItem } from "../_components/NotificationItem";

const OrderNews = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useGetNotification({
    type: NotificationType.ORDER,
    page,
    limit,
  });

  const { mutate: markAsRead } = useMarkAsRead();
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Initialize or append notifications when data changes
  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllNotifications(data.data);
      } else {
        setAllNotifications((prev) => [...prev, ...data.data]);
      }

      if (data.pagination) {
        const totalPages = Math.ceil(data.pagination.total / data.pagination.limit);
        setHasMore(data.pagination.page < totalPages);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    }
  }, [data, page]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  // Initial loading
  if (isLoading && page === 1) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#40BFFF]/5 to-transparent rounded-lg p-4 border border-[#40BFFF]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#40BFFF] flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h6 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Order News
              </h6>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Latest news about your orders status
              </p>
            </div>
          </div>
        </div>
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          Loading notifications...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#40BFFF]/5 to-transparent rounded-lg p-4 border border-[#40BFFF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#40BFFF] flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h6 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                Order News
                {allNotifications.length > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-[#40BFFF] text-white rounded-full">
                    {allNotifications.length}
                  </span>
                )}
              </h6>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Latest news about your orders status
              </p>
            </div>
          </div>

          {allNotifications.length > 0 && (
            <NormalButton onClick={() => markAsRead()}>
              <p className="text-sm text-[#40BFFF]">Mark all as read</p>
            </NormalButton>
          )}
        </div>
      </div>

      {/* List container */}
      <div>
        {allNotifications.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="sync">
                {allNotifications.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    <NotificationItem notification={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Loading More Skeletons */}
            {loadingMore && <ListSkeletons type="notification" count={3} />}

            {/* Load More Button */}
            <LoadMore
              onLoadMore={handleLoadMore}
              isLoading={loadingMore}
              hasMore={hasMore}
              error={error?.message}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
              No notifications yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We'll notify you when there are updates about your orders
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderNews;
