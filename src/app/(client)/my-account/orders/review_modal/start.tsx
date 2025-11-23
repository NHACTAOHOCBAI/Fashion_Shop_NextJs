"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export function Rating({ max = 5, onChange }) {
  const [value, setValue] = useState(0);

  const handleSelect = (v) => {
    setValue(v);
    onChange?.(v);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;

        return (
          <Star
            key={i}
            onClick={() => handleSelect(starValue)}
            className={`
              h-6 w-6 cursor-pointer transition
              ${
                starValue <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }
            `}
          />
        );
      })}
    </div>
  );
}
