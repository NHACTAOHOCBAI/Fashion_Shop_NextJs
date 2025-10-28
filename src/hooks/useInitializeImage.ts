/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useInitializeImage = (images?: string | string[]) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [fileArray, setFileArray] = useState<File[]>([]);

  useEffect(() => {
    // Nếu không có ảnh hoặc mảng rỗng → reset
    if (!images || (Array.isArray(images) && images.length === 0)) {
      setFileArray([]);
      return;
    }

    const initializeImages = async () => {
      try {
        setIsImageLoading(true);

        // Chuẩn hóa thành mảng
        const imageList = Array.isArray(images) ? images : [images];

        // Fetch tất cả ảnh song song
        const files = await Promise.all(
          imageList.map(async (url, index) => {
            if (!url) return null;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${url}`);
            const blob = await response.blob();
            const file = new File([blob], `image-${index + 1}`, {
              type: blob.type || "image/jpeg",
            });
            (file as any).preview = url;
            return file;
          })
        );

        setFileArray(files.filter(Boolean) as File[]);
      } catch (error) {
        console.error("Error initializing images:", error);
      } finally {
        setIsImageLoading(false);
      }
    };

    initializeImages();

    // Cleanup previews khi unmount
    return () => {
      fileArray.forEach((file) => {
        const preview = (file as any).preview;
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
    // ✅ chỉ cần phụ thuộc vào images, KHÔNG thêm fileArray
  }, [images]);

  return {
    isImageLoading,
    fileArray,
  };
};
