"use client";

import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BookmarkButtonProps {
  postId: number;
  isBookmarked?: boolean;
  onToggle: (postId: number) => void;
  isPending?: boolean;
  showLabel?: boolean;
}

const BookmarkButton = ({
  postId,
  isBookmarked,
  onToggle,
  isPending,
  showLabel = true,
}: BookmarkButtonProps) => {
  return (
    <motion.button
      onClick={() => onToggle(postId)}
      disabled={isPending}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        isBookmarked && "text-blue-500",
        isPending && "opacity-50 cursor-not-allowed"
      )}
    >
      <motion.div
        initial={false}
        animate={isBookmarked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Bookmark
          className={cn(
            "w-4 h-4 transition-all",
            isBookmarked && "fill-current"
          )}
        />
      </motion.div>
      {showLabel && (
        <span className="text-sm font-medium">
          {isBookmarked ? "Đã lưu" : "Lưu"}
        </span>
      )}
    </motion.button>
  );
};

export default BookmarkButton;
