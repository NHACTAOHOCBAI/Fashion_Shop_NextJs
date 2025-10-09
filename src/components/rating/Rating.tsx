import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number; // ví dụ: 4.8 hoặc 3
    size?: number;  // tùy chọn: kích thước icon (mặc định 16)
}

export function StarRating({ rating, size = 16 }: StarRatingProps) {
    // Làm tròn để có thể hiển thị sao đầy hoặc nửa (nếu muốn)
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => {
                const isFilled = i < filledStars;
                const isHalf = i === filledStars && hasHalfStar;

                return (
                    <Star
                        size={size}
                        key={i}
                        className={`w-[${size}px] h-[${size}px] ${isFilled
                            ? "fill-yellow-400 text-yellow-400"
                            : isHalf
                                ? "fill-yellow-200 text-yellow-200"
                                : "text-gray-300"
                            }`}
                    />
                );
            })}
        </div>
    );
}