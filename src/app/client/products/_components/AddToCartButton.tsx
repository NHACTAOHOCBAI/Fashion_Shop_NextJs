"use client";
import { Loader2, ShoppingCart } from "lucide-react";

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
}

const AddToCartButton = ({
  isLoading = false,
  disabled = false,
  onClick,
}: AddToCartButtonProps) => {
  return (
    <div
      onClick={onClick}
      // Thuộc tính aria-disabled để thông báo trạng thái cho các công cụ hỗ trợ (Accessibility)
      aria-disabled={disabled}
      role="button" // Sử dụng role="button" cho một div hoạt động như một nút
      className={`
        flex gap-[10px] py-[12px] px-[14px] rounded-[5px] duration-300
        ${
          disabled
            ? // STYLE KHI DISABLED: Màu xám, không có hiệu ứng hover/active, không có cursor
              "text-gray-400 bg-gray-200 cursor-not-allowed opacity-70"
            : // STYLE KHI ACTIVE: Màu xanh, có hiệu ứng hover/active
              "text-[#40BFFF] bg-[#33A0FF]/10 cursor-pointer hover:bg-[#40BFFF] hover:text-white active:scale-90"
        }
      `}
    >
      {isLoading ? (
        // ✨ HIỂN THỊ SPINNER KHI ĐANG LOADING
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <p>Loading...</p>
        </>
      ) : (
        // HIỂN THỊ NỘI DUNG BÌNH THƯỜNG
        <>
          <ShoppingCart />
          <p>Add To Cart</p>
        </>
      )}
      {/* <ShoppingCart />
      <p>Add To Cart</p> */}
    </div>
  );
};
export default AddToCartButton;
