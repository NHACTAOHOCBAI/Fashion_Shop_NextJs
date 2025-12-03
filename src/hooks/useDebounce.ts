// hooks/useDebounce.ts
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Thiết lập độ trễ
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Dọn dẹp: Hủy bỏ timeout trước khi effect chạy lại hoặc component unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Chạy lại mỗi khi 'value' hoặc 'delay' thay đổi

  return debouncedValue;
}
