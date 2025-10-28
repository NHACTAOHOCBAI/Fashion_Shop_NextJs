/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
export const useInitializeImage = (images?: string | string[]) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [fileArray, setFileArray] = useState<File[]>([]);

  useEffect(() => {
    if (!images || (Array.isArray(images) && images.length === 0)) return;

    const initializeImages = async () => {
      try {
        setIsImageLoading(true);

        // Chuẩn hóa về mảng
        const imageList = Array.isArray(images) ? images : [images];

        // Tải từng ảnh song song
        const files = await Promise.all(
          imageList.map(async (url, index) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], `image-${index + 1}`, {
              type: blob.type,
            });
            (file as any).preview = url; // thêm preview để ImageUpload hiển thị được
            return file;
          })
        );

        setFileArray(files);
      } catch (error) {
        console.error("Error initializing images:", error);
      } finally {
        setIsImageLoading(false);
      }
    };

    initializeImages();
  }, [images]);

  return {
    isImageLoading,
    fileArray,
  };
};
