"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview } from "@/hooks/queries/useReview";

interface Props {
  open: boolean;
  onClose: () => void;
  orderId: number;
  productId: number;
}

export const ReviewModal = ({ open, onClose, orderId, productId }: Props) => {
  const { mutate: createReview, isPending } = useCreateReview();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState<string>();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  /* cleanup preview URLs */
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleSelectFiles = (selected: FileList | null) => {
    if (!selected) return;

    const newFiles = Array.from(selected);
    const total = files.length + newFiles.length;

    if (total > 3) {
      alert("Bạn chỉ có thể upload tối đa 3 ảnh");
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [
      ...prev,
      ...newFiles.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    createReview(
      {
        orderId,
        productId,
        rating,
        comment,
        files,
      },
      {
        onSuccess: () => {
          setFiles([]);
          setPreviews([]);
          setComment(undefined);
          setRating(5);
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[520px]">
        <DialogHeader className="text-[24px]">Review</DialogHeader>

        {/* Rating */}
        <div className="space-y-1">
          <p className="text-sm font-medium">Rating</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-1">
          <p className="text-sm font-medium">Comment</p>
          <Textarea
            placeholder="Chia sẻ cảm nhận của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none"
          />
        </div>

        {/* Image upload */}
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Images <span className="text-gray-400">(Maximum 3)</span>
          </p>

          <div className="flex gap-3 flex-wrap">
            {/* previews */}
            {previews.map((src, index) => (
              <div
                key={src}
                className="relative w-[90px] h-[90px] border rounded-md overflow-hidden"
              >
                <img
                  src={src}
                  className="w-full h-full object-cover"
                  alt="preview"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* add image */}
            {files.length < 3 && (
              <label className="w-[90px] h-[90px] border border-dashed rounded-md flex items-center justify-center cursor-pointer text-gray-400 hover:border-gray-500">
                +
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleSelectFiles(e.target.files)}
                />
              </label>
            )}
          </div>
        </div>

        {/* actions */}
        <div className="flex justify-end gap-3 mt-5">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
