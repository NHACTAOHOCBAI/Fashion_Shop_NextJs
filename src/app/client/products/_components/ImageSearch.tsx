"use client";

import { Camera } from "lucide-react";
import { useRef } from "react";

interface Props {
  onImageSelected: (file: File) => void;
}

function ImageSearchButton({ onImageSelected }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
    e.target.value = "";
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="ml-3 flex items-center justify-center w-[44px] h-[44px] rounded-[8px] bg-white border hover:bg-gray-100"
        title="Search by image"
      >
        <Camera size={20} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </>
  );
}

interface Props {
  imageUrl: string;
  onClear: () => void;
}

function ImageSearchPreview({ imageUrl, onClear }: Props) {
  return (
    <div className="flex items-center gap-3 mt-3 bg-white p-3 rounded-[8px] border">
      <img
        src={imageUrl}
        alt="preview"
        className="w-[60px] h-[60px] object-cover rounded"
      />
      <p className="text-sm text-gray-600 flex-1">
        Searching products by image
      </p>
      <button
        onClick={onClear}
        className="text-sm text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
export { ImageSearchButton, ImageSearchPreview };
