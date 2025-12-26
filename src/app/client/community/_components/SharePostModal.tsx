"use client";

import { useState } from "react";
import { X, Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

interface SharePostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

const SharePostModal = ({ post, isOpen, onClose }: SharePostModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const postUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/client/community/post/${post.id}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50 p-[20px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] w-full max-w-[520px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-[24px] border-b border-gray-200">
          <div className="flex items-center gap-[12px]">
            <div className="w-[40px] h-[40px] bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] rounded-full flex items-center justify-center">
              <Share2 className="w-[20px] h-[20px] text-white" />
            </div>
            <h6 className="text-[22px] font-bold text-gray-800">Share Link</h6>
          </div>
          <button
            onClick={onClose}
            className="p-[8px] hover:bg-gray-100 rounded-full"
          >
            <X className="w-[24px] h-[24px] text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-[24px]">
          {/* Post Preview */}
          <div className="bg-[#F6F7F8] rounded-[16px] p-[20px] mb-[24px]">
            <div className="flex items-center gap-[12px] mb-[12px]">
              <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center text-white font-semibold text-[14px]">
                {post.user?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-semibold text-[14px] text-gray-800">
                  {post.user?.fullName || "User"}
                </p>
                <p className="text-[12px] text-gray-500">
                  {post.totalLikes} likes · {post.totalComments} comments
                </p>
              </div>
            </div>
            <p className="text-[14px] text-gray-700 line-clamp-3">
              {post.content}
            </p>
          </div>

          {/* Copy Link */}
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-[8px]">
              Post Link
            </label>
            <div className="flex gap-[12px]">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 px-[16px] py-[12px] border border-gray-200 rounded-[12px] bg-gray-50 text-[14px] text-gray-600 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`px-[20px] py-[12px] rounded-[12px] font-medium flex items-center gap-[8px] ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-[#40BFFF] text-white hover:bg-[#3AADEB]"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-[18px] h-[18px]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-[18px] h-[18px]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-[24px] py-[20px] bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-[24px] py-[10px] border border-gray-200 rounded-[12px] font-medium hover:bg-gray-100 text-[16px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePostModal;
