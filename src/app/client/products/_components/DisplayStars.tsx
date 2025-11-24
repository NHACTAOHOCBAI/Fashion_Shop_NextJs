import { FaStar } from "react-icons/fa"; // Giả định FaStar đã được import

interface DisplayStarsProps {
  value: number; // Giá trị rating, ví dụ: 4.7
}

const DisplayStars = ({ value }: DisplayStarsProps) => {
  // 1. Làm tròn xuống giá trị 'value' để xác định số sao vàng
  const filledStars = Math.floor(value); // Ví dụ: Math.floor(4.7) = 4

  // 2. Tạo một mảng 5 phần tử để lặp qua 5 sao
  const totalStars = 5;
  const starsArray = Array(totalStars).fill(0); // [0, 0, 0, 0, 0]

  return (
    <div className="flex gap-[2px]">
      {starsArray.map((_, index) => {
        // 3. Kiểm tra: index (0-4) có nhỏ hơn số sao vàng (filledStars) không?
        const isFilled = index < filledStars;

        // Xác định class màu sắc dựa trên kết quả kiểm tra
        const starColorClass = isFilled ? "text-yellow-300" : "text-[#C1C8CE]";

        return (
          // Key là cần thiết khi dùng map()
          <FaStar key={index} className={starColorClass} />
        );
      })}
      <p className="ml-[5px] text-[14px] font-medium">{value}</p>
    </div>
  );
};
export default DisplayStars;
