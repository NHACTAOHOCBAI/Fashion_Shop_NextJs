"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface AvatarUploaderProps {
  currentAvatar?: string;
  preview: string | null;
  onChange: (file: File | null, preview: string | null) => void;
  fullName: string;
}

export function AvatarUploader({
  currentAvatar,
  preview,
  onChange,
  fullName,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file?: File) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    onChange(file, previewUrl);
  };

  const removePreview = () => {
    onChange(null, null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="relative w-fit">
      <Avatar className="h-24 w-24">
        {preview ? (
          <Image
            src={preview}
            alt="Avatar preview"
            fill
            className="object-cover rounded-full"
          />
        ) : (
          <>
            <AvatarImage src={currentAvatar} />
            <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
          </>
        )}
      </Avatar>

      {/* Upload */}
      <Button
        size="icon"
        variant="secondary"
        className="absolute -bottom-2 -right-2 rounded-full"
        onClick={() => inputRef.current?.click()}
      >
        <Camera size={16} />
      </Button>

      {/* Remove preview */}
      {preview && (
        <Button
          size="icon"
          variant="destructive"
          className="absolute -top-2 -right-2 rounded-full"
          onClick={removePreview}
        >
          <X size={14} />
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
    </div>
  );
}
