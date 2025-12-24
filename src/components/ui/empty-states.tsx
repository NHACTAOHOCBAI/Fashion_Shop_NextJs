"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Package, Search, AlertCircle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { float } from "@/lib/animations";

/**
 * Empty States Library
 * Provides consistent empty state UI across the application
 */

interface EmptyStateProps {
  type: "cart" | "wishlist" | "orders" | "search" | "error" | "inbox";
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const iconMap = {
  cart: ShoppingCart,
  wishlist: Heart,
  orders: Package,
  search: Search,
  error: AlertCircle,
  inbox: Inbox,
};

const colorMap = {
  cart: "text-[var(--cyan-300)] dark:text-[var(--cyan-600)]",
  wishlist: "text-red-300 dark:text-red-600",
  orders: "text-purple-300 dark:text-purple-600",
  search: "text-[var(--yellow-300)] dark:text-[var(--yellow-600)]",
  error: "text-gray-300 dark:text-gray-600",
  inbox: "text-blue-300 dark:text-blue-600",
};

const defaultTitles = {
  cart: "Your cart is empty",
  wishlist: "Your wishlist is empty",
  orders: "No orders found",
  search: "No results found",
  error: "Something went wrong",
  inbox: "No messages yet",
};

const defaultDescriptions = {
  cart: "Looks like you haven't added anything yet",
  wishlist: "Save items you love to easily find them later",
  orders: "You haven't placed any orders yet",
  search: "Try different keywords or filters",
  error: "We encountered an error. Please try again",
  inbox: "You don't have any messages at the moment",
};

export const EmptyState = ({
  type,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  const Icon = iconMap[type];
  const color = colorMap[type];
  const displayTitle = title || defaultTitles[type];
  const displayDescription = description || defaultDescriptions[type];

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center py-24 px-8",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated Icon */}
      <motion.div
        variants={float}
        initial="initial"
        animate="animate"
        className="mb-8"
      >
        <Icon className={cn("w-32 h-32", color)} strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <h3 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-3 text-center">
        {displayTitle}
      </h3>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8 text-lg">
        {displayDescription}
      </p>

      {/* Action Button */}
      {action && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

// Specialized Empty States

export const EmptyCart = ({ action }: { action?: React.ReactNode }) => (
  <EmptyState type="cart" action={action} />
);

export const EmptyWishlist = ({ action }: { action?: React.ReactNode }) => (
  <EmptyState type="wishlist" action={action} />
);

export const EmptyOrders = ({ action }: { action?: React.ReactNode }) => (
  <EmptyState type="orders" action={action} />
);

export const EmptySearch = ({
  query,
  action,
}: {
  query?: string;
  action?: React.ReactNode;
}) => (
  <EmptyState
    type="search"
    title={query ? `No results for "${query}"` : "No results found"}
    description="Try adjusting your search or filters to find what you're looking for"
    action={action}
  />
);

export const ErrorState = ({
  message,
  action,
}: {
  message?: string;
  action?: React.ReactNode;
}) => <EmptyState type="error" description={message} action={action} />;

export default EmptyState;
