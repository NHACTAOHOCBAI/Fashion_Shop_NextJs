"use client";
import React from "react";

// Định nghĩa các hằng số để dễ quản lý
const MIN_VALUE = 1;
interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}
const QuantitySelector = ({ quantity, setQuantity }: QuantitySelectorProps) => {
  // Xử lý khi nhấn nút Trừ (-)
  const handleDecrement = () => {
    // Chỉ giảm nếu số lượng lớn hơn giá trị tối thiểu
    if (quantity > MIN_VALUE) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Xử lý khi nhấn nút Cộng (+)
  const handleIncrement = () => {
    // Tăng số lượng. Bạn có thể thêm logic MAX_VALUE ở đây nếu cần.
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    // Container chính: tạo nền trắng, bo góc, và đổ bóng nhẹ
    <div className="flex items-center justify-between w-[140px] h-[50px] bg-[#F6F7F8] rounded-[5px] p-2">
      {/* Nút Trừ (-) */}
      <button
        onClick={handleDecrement}
        // Vô hiệu hóa nút nếu đã đạt số lượng tối thiểu
        disabled={quantity <= MIN_VALUE}
        className={`
          flex items-center justify-center 
          text-lg font-semibold 
          w-8 h-8 rounded-full 
          transition duration-150 ease-in-out
          ${
            quantity <= MIN_VALUE // Màu xám khi disabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#40BFFF] hover:bg-gray-100 active:bg-gray-200" // Màu xanh khi active
          }
        `}
      >
        —
      </button>

      {/* Hiển thị Số lượng */}
      <span className="text-[16px] select-none">{quantity}</span>

      {/* Nút Cộng (+) */}
      <button
        onClick={handleIncrement}
        className="
          flex items-center justify-center 
          text-xl font-semibold 
          text-[#40BFFF] 
          w-8 h-8 rounded-full 
          hover:bg-gray-100 active:bg-gray-200 
          transition duration-150 ease-in-out
        "
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
