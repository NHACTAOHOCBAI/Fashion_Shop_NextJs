"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MyTagProps {
  value: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const MyTag = ({
  value,
  variant = "default",
  size = "md",
  className,
}: MyTagProps) => {
  const variants = {
    default:
      "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600",
    primary:
      "bg-gradient-to-r from-[var(--cyan-100)] to-[var(--cyan-50)] dark:from-[var(--cyan-900)] dark:to-[var(--cyan-800)] text-[var(--cyan-700)] dark:text-[var(--cyan-300)] border-[var(--cyan-200)] dark:border-[var(--cyan-700)]",
    secondary:
      "bg-gradient-to-r from-[var(--yellow-100)] to-[var(--yellow-50)] dark:from-[var(--yellow-900)] dark:to-[var(--yellow-800)] text-[var(--yellow-700)] dark:text-[var(--yellow-300)] border-[var(--yellow-200)] dark:border-[var(--yellow-700)]",
    success:
      "bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700",
    warning:
      "bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900 dark:to-orange-800 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <motion.div
      className={cn(
        "inline-flex items-center border rounded-lg font-medium transition-all",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {value}
    </motion.div>
  );
};

export default MyTag;
