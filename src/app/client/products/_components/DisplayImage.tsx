"use client";
import Image from "next/image";
import { useState } from "react";
interface DisplayImagesProps {
  images: string[];
}
const DisplayImages = ({ images }: DisplayImagesProps) => {
  // 1. Dùng state để theo dõi index (chỉ mục) của ảnh đang được chọn
  // Mặc định chọn ảnh đầu tiên (index 0)
  const [activeIndex, setActiveIndex] = useState(0);

  // Lấy URL của ảnh lớn hiện tại
  const mainImageUrl = images[activeIndex] || images[0];

  // Dùng tên mô tả mẫu
  const description = "*Nike Airmax 270 React";

  return (
    <div className="flex gap-[38px]">
      {/* Cột ảnh nhỏ */}
      <div className="flex flex-col gap-[17px]">
        {images.map((imgUrl, index) => {
          // 2. Xác định class border: viền xanh nếu index khớp với activeIndex
          const isActive = index === activeIndex;
          const borderClass = isActive
            ? "border-[#40BFFF] border-[1px]" // Viền xanh khi active
            : ""; // Không viền khi không active

          return (
            // 3. Gán sự kiện onClick để cập nhật activeIndex
            <div
              key={index} // Key là cần thiết cho các phần tử lặp lại
              onClick={() => setActiveIndex(index)}
              className={`
                w-[100px] h-[100px] bg-[#F6F7F8] 
                object-contain rounded-[8px] cursor-pointer 
                flex items-center justify-center p-[5px] 
                ${borderClass} 
              `}
              // Thêm transition để hiệu ứng border mượt mà hơn (Tùy chọn)
              style={{ transition: "border-color 0.2s ease-in-out" }}
            >
              {/* Giả định <Image /> là một component có sẵn */}
              <Image
                height={100}
                width={100}
                alt={`Shoe view ${index + 1}`}
                src={imgUrl}
                className="w-full h-full object-contain rounded-[4px]" // Đảm bảo ảnh nhỏ vừa khung
              />
            </div>
          );
        })}
      </div>

      {/* Khu vực ảnh lớn */}
      <div>
        <Image
          height={390}
          width={390}
          alt="Main product view"
          // 4. Sử dụng mainImageUrl để hiển thị ảnh lớn tương ứng
          src={mainImageUrl}
          className="w-[390px] h-[390px] bg-[#F6F7F8] object-contain"
        />
        <p className="text-[14px] font-light mt-[20px]">{description}</p>
      </div>
    </div>
  );
};
export default DisplayImages;
