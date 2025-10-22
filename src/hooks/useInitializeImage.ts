/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useInitializeImage = (image: string | undefined) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [fileArray, setFileArray] = useState<File[]>([]);

  useEffect(() => {
    if (!image) return;
    const initializeImage = async () => {
      setIsImageLoading(true);
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "image", { type: blob.type });
      (file as any).preview = image;
      setFileArray([file]);
      setIsImageLoading(false);
    };

    initializeImage();
  }, [image]);

  return {
    isImageLoading,
    fileArray,
  };
};
