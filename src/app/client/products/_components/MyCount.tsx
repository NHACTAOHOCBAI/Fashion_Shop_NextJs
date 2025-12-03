"use client";
import React from "react";

// Định nghĩa các hằng số để dễ quản lý
const MIN_VALUE = 1;

interface QuantitySelectorProps {
  quantity: number; // Số lượng hiện tại được chọn
  setQuantity: React.Dispatch<React.SetStateAction<number>>; // Hàm cập nhật số lượng
  maxQuantity: number; // ✨ SỐ LƯỢNG TỐI ĐA CÓ THỂ CHỌN (Tồn kho của Variant)
}

const QuantitySelector = ({
  quantity,
  setQuantity,
  maxQuantity,
}: QuantitySelectorProps) => {
  // Xử lý khi nhấn nút Trừ (-)
  const handleDecrement = () => {
    // Chỉ giảm nếu số lượng lớn hơn giá trị tối thiểu
    if (quantity > MIN_VALUE) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Xử lý khi nhấn nút Cộng (+)
  const handleIncrement = () => {
    // ✨ LOGIC KHÔNG CHO PHÉP TĂNG QUÁ SỐ LƯỢNG TỒN KHO (maxQuantity)
    if (quantity < maxQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  // Kiểm tra trạng thái disabled của nút Cộng
  const isIncrementDisabled = quantity >= maxQuantity;
  // Kiểm tra trạng thái disabled của nút Trừ
  const isDecrementDisabled = quantity <= MIN_VALUE;

  return (
    // Container chính: tạo nền trắng, bo góc, và đổ bóng nhẹ
    <div className="flex items-center justify-between w-[140px] h-[50px] bg-[#F6F7F8] rounded-[5px] p-2">
      {/* Nút Trừ (-) */}
      <button
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        className={`
          flex items-center justify-center 
          text-lg font-semibold 
          w-8 h-8 rounded-full 
          transition duration-150 ease-in-out
          ${
            isDecrementDisabled
              ? "text-gray-400 cursor-not-allowed" // Màu xám khi disabled
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
        disabled={isIncrementDisabled} // ✨ Vô hiệu hóa khi đạt maxQuantity
        className={`
          flex items-center justify-center 
          text-xl font-semibold 
          w-8 h-8 rounded-full 
          transition duration-150 ease-in-out
          ${
            isIncrementDisabled
              ? "text-gray-400 cursor-not-allowed" // Màu xám khi disabled
              : "text-[#40BFFF] hover:bg-gray-100 active:bg-gray-200" // Màu xanh khi active
          }
        `}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
