"use client";

import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

/**
 * LoadMore - Reusable "Load More" button component for pagination
 *
 * Handles different states:
 * - Loading: Shows spinner with "Loading more..." text
 * - No More: Shows "No more items" message
 * - Error: Shows error message with "Try Again" button
 * - Ready: Shows "Load More" button
 *
 * @example
 * <LoadMore
 *   onLoadMore={handleLoadMore}
 *   isLoading={isLoadingMore}
 *   hasMore={hasMoreItems}
 *   error={error?.message}
 * />
 */

interface LoadMoreProps {
  /** Callback function when Load More is clicked */
  onLoadMore: () => void;
  /** Whether data is currently being loaded */
  isLoading: boolean;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Optional error message to display */
  error?: string;
  /** Custom className */
  className?: string;
}

export function LoadMore({
  onLoadMore,
  isLoading,
  hasMore,
  error,
  className = "",
}: LoadMoreProps) {
  // Don't render if no more items and not loading
  if (!hasMore && !isLoading && !error) {
    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className={`flex items-center justify-center py-8 ${className}`}
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              No more items
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className={`flex flex-col items-center justify-center py-8 gap-3 ${className}`}
      >
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{error}</span>
        </div>
        <Button
          onClick={onLoadMore}
          variant="outline"
          size="sm"
          className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
        >
          Try Again
        </Button>
      </motion.div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className={`flex items-center justify-center py-8 ${className}`}
      >
        <div className="flex items-center gap-2 text-[#40BFFF]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Loading more...</span>
        </div>
      </motion.div>
    );
  }

  // Ready to load more
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className={`flex items-center justify-center py-8 ${className}`}
    >
      <Button
        onClick={onLoadMore}
        variant="outline"
        size="default"
        className="border-[#40BFFF] text-[#40BFFF] hover:bg-[#40BFFF] hover:text-white transition-all duration-200 font-medium"
      >
        Load More
      </Button>
    </motion.div>
  );
}
