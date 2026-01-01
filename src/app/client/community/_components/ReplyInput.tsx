"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";
import { useAddReply } from "@/hooks/queries/usePost";
import { toast } from "sonner";

interface ReplyInputProps {
  postId: number;
  commentId: number;
  commentAuthorName: string;
  currentUser?: User;
  onCancel: () => void;
  onSuccess?: () => void;
}

const ReplyInput = ({
  postId,
  commentId,
  commentAuthorName,
  currentUser,
  onCancel,
  onSuccess,
}: ReplyInputProps) => {
  const [content, setContent] = useState("");
  const { mutate: addReply, isPending } = useAddReply();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    if (!currentUser) {
      toast.error("Please login to reply");
      return;
    }

    addReply(
      { postId, commentId, data: { content: content.trim() } },
      {
        onSuccess: () => {
          toast.success("Reply added successfully");
          setContent("");
          onSuccess?.(); // Call the success callback to auto-expand replies
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to add reply");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 ml-12">
      <div className="flex items-start gap-2">
        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center flex-shrink-0">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-xs">
              {currentUser?.fullName?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>

        {/* Input Field */}
        <div className="flex-1 relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Reply to ${commentAuthorName}...`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40BFFF] focus:border-transparent resize-none"
            rows={2}
            disabled={isPending}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isPending}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !content.trim()}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#40BFFF] text-white rounded-lg text-sm font-medium hover:bg-[#3AADEB] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Reply
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReplyInput;
