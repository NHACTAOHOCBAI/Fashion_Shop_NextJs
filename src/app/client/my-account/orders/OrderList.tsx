"use client";

import Loading from "@/app/client/_components/Loading";
import { useMyOrders } from "@/hooks/queries/useOrder";
import { OrderItem } from "./OrderItem";
import { OrderStatus } from "@/constants/status.enum";
import { Package } from "lucide-react";
import { useState, useEffect } from "react";
import { LoadMore } from "@/components/ui/load-more";
import { ListSkeletons } from "@/components/skeletons/list-skeletons";
import { motion, AnimatePresence } from "framer-motion";

export const OrderList = ({ status }: { status?: OrderStatus }) => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, error } = useMyOrders({ status, page, limit });
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Initialize or append orders when data changes
  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllOrders(data.data);
      } else {
        setAllOrders((prev) => [...prev, ...data.data]);
      }

      if (data.pagination) {
        const totalPages = Math.ceil(
          data.pagination.total / data.pagination.limit
        );
        setHasMore(data.pagination.page < totalPages);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    }
  }, [data, page, status]);

  // Reset pagination when status filter changes
  useEffect(() => {
    setPage(1);
    setAllOrders([]);
    setHasMore(true);
    setLoadingMore(false);
  }, [status]);

  useEffect(() => {
    if (data?.data) {
      setAllOrders(data.data);
    }
  }, [data]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  // Initial loading state
  if (isLoading && page === 1) return <Loading />;

  // Empty state
  const hasOrders = allOrders.length > 0;
  if (!hasOrders && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
          No orders found
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {status
            ? "No orders with this status yet"
            : "You haven't placed any orders yet"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Orders List with Animation */}
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="sync">
          {allOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <OrderItem order={order} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading More Skeletons */}
      {loadingMore && <ListSkeletons type="order" count={2} />}

      {/* Load More Button */}
      {allOrders.length > 0 && (
        <LoadMore
          onLoadMore={handleLoadMore}
          isLoading={loadingMore}
          hasMore={hasMore}
          error={error?.message}
        />
      )}
    </div>
  );
};
