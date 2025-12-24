"use client";
import { Loader2, ShoppingCart, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  isLoading?: boolean;
  /**
   * Xác định xem nút có bị vô hiệu hóa hay không.
   */
  disabled?: boolean;
  /**
   * Hàm xử lý khi click vào nút (chỉ gọi khi không bị disabled).
   */
  onClick?: () => void;
  /**
   * Show success state temporarily after action completes
   */
  showSuccess?: boolean;
}

const AddToCartButton = ({
  isLoading = false,
  disabled = false,
  onClick,
  showSuccess = false,
}: AddToCartButtonProps) => {
  const [internalSuccess, setInternalSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      setInternalSuccess(true);
      const timer = setTimeout(() => setInternalSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleClick = () => {
    if (!disabled && !isLoading) {
      onClick?.();
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      aria-disabled={disabled}
      role="button"
      className={cn(
        "relative flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden",
        disabled || isLoading
          ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          : internalSuccess
          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
          : "bg-gradient-to-r from-[var(--cyan-400)] to-[var(--cyan-500)] text-white hover:from-[var(--cyan-500)] hover:to-[var(--cyan-600)] shadow-lg hover:shadow-xl cursor-pointer"
      )}
      whileHover={!disabled && !isLoading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
    >
      {/* Background pulse effect */}
      {!disabled && !isLoading && !internalSuccess && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 flex items-center gap-3"
        initial={false}
        animate={{ scale: 1 }}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Adding...</span>
          </>
        ) : internalSuccess ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Check className="h-5 w-5" />
            </motion.div>
            <span>Added!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>Add To Cart</span>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AddToCartButton;
