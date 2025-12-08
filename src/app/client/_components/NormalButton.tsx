import { Loader2 } from "lucide-react";
import React from "react";

interface NormalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  /**
   * Thêm prop disabled để có thể vô hiệu hóa nút ngay cả khi không loading.
   */
  disabled?: boolean;
}

const NormalButton = ({
  children,
  onClick,
  isLoading = false,
  disabled = false,
}: NormalButtonProps) => {
  // 1. Xác định trạng thái vô hiệu hóa tổng thể (giống như AddToCartButton)
  const isDisabled = isLoading || disabled;

  // 2. Xử lý sự kiện click: ngăn chặn click nếu đang loading hoặc disabled
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) {
      e.preventDefault(); // Ngăn chặn hành động click
      return;
    }
    onClick?.();
  };

  // 3. Logic Tailwind CSS được hợp nhất và thêm flex để căn giữa nội dung và spinner
  const baseClasses =
    "bg-[#F6F7F8] px-[18px] py-[6px] rounded-[4px] select-none duration-300 flex items-center justify-center gap-2";

  const interactionClasses = isDisabled
    ? // STYLE KHI DISABLED HOẶC LOADING: Giảm opacity, không hiệu ứng click, cursor not-allowed
      "cursor-not-allowed opacity-60"
    : // STYLE KHI BÌNH THƯỜNG: Có hiệu ứng click
      "cursor-pointer active:scale-90 hover:opacity-80 active:bg-gray-200";

  return (
    <div
      onClick={handleClick} // Dùng handleClick để kiểm soát logic disabled
      aria-disabled={isDisabled}
      role="button"
      className={`${baseClasses} ${interactionClasses}`}
    >
      {isLoading && (
        // HIỂN THỊ SPINNER KHI ĐANG LOADING
        // Kích thước spinner nhỏ hơn một chút (h-4 w-4) cho nút tiêu chuẩn
        <Loader2 className="h-4 w-4 animate-spin text-gray-700" />
      )}
      {children}
    </div>
  );
};
export default NormalButton;
