"use client";

import { useState } from "react";
import {
  X,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
  Loader2,
} from "lucide-react";
import { useSharePost } from "@/hooks/queries/usePost";

interface SharePostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

const SharePostModal = ({ post, isOpen, onClose }: SharePostModalProps) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const { mutate: sharePost, isPending } = useSharePost();

  if (!isOpen) return null;

  const postUrl = typeof window !== "undefined"
    ? `${window.location.origin}/client/community/post/${post.id}`
    : "";

  const shareTitle = `Check out this post by ${post.user?.fullName || "someone"}`;
  const shareText = post.content.length > 100
    ? post.content.substring(0, 100) + "..."
    : post.content;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy link");
    }
  };

  const handleShare = () => {
    sharePost(post.id, {
      onSuccess: (data) => {
        setShareSuccess(true);
        setTimeout(() => {
          setShareSuccess(false);
          onClose();
        }, 1500);
      },
      onError: (error: any) => {
        alert(error?.message || "Failed to share post");
      },
    });
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2] hover:bg-[#166FE5]",
      onClick: () => {
        handleShare();
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
          "_blank",
          "width=600,height=400"
        );
      },
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-[#1DA1F2] hover:bg-[#1A94DA]",
      onClick: () => {
        handleShare();
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`,
          "_blank",
          "width=600,height=400"
        );
      },
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0A66C2] hover:bg-[#095196]",
      onClick: () => {
        handleShare();
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
          "_blank",
          "width=600,height=400"
        );
      },
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366] hover:bg-[#1EBE57]",
      onClick: () => {
        handleShare();
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareTitle + " " + postUrl)}`,
          "_blank"
        );
      },
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      onClick: () => {
        handleShare();
        window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + "\n\n" + postUrl)}`;
      },
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-[20px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] w-full max-w-[540px] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Overlay */}
        {shareSuccess && (
          <div className="absolute inset-0 bg-white/95 flex items-center justify-center z-10 rounded-[24px]">
            <div className="text-center">
              <div className="w-[80px] h-[80px] bg-green-500 rounded-full flex items-center justify-center mx-auto mb-[16px] animate-bounce">
                <Check className="w-[40px] h-[40px] text-white" />
              </div>
              <h3 className="text-[24px] font-bold text-gray-800 mb-[8px]">
                Shared Successfully!
              </h3>
              <p className="text-gray-600">Post has been shared</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-[24px] border-b border-gray-200">
          <div className="flex items-center gap-[12px]">
            <div className="w-[40px] h-[40px] bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] rounded-full flex items-center justify-center">
              <Share2 className="w-[20px] h-[20px] text-white" />
            </div>
            <h2 className="text-[22px] font-bold text-gray-800">Share Post</h2>
          </div>
          <button
            onClick={onClose}
            className="p-[8px] hover:bg-gray-100 rounded-full transition-all duration-200"
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
          <div className="mb-[24px]">
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
                className={`px-[20px] py-[12px] rounded-[12px] font-medium transition-all duration-300 flex items-center gap-[8px] ${
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

          {/* Share Options */}
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-[12px]">
              Share via
            </label>
            <div className="grid grid-cols-5 gap-[12px]">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.onClick}
                  disabled={isPending}
                  className="flex flex-col items-center gap-[8px] group"
                >
                  <div
                    className={`w-[56px] h-[56px] ${option.color} rounded-full flex items-center justify-center transition-all duration-200 transform group-hover:scale-110 shadow-lg disabled:opacity-50`}
                  >
                    <option.icon className="w-[24px] h-[24px] text-white" />
                  </div>
                  <span className="text-[12px] text-gray-600 font-medium">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Share Info */}
          <div className="mt-[24px] p-[16px] bg-blue-50 border border-blue-100 rounded-[12px]">
            <p className="text-[13px] text-blue-800">
              <span className="font-semibold">Note:</span> Sharing will increase the post's share count and help more people discover this content.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-[24px] py-[20px] bg-gray-50 border-t border-gray-200 flex justify-end gap-[12px]">
          <button
            onClick={onClose}
            className="px-[24px] py-[10px] border border-gray-200 rounded-[12px] font-medium hover:bg-gray-100 transition-all duration-200"
          >
            Close
          </button>
          <button
            onClick={handleShare}
            disabled={isPending}
            className="px-[24px] py-[10px] bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF] text-white rounded-[12px] font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-[8px]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-[18px] h-[18px] animate-spin" />
                <span>Sharing...</span>
              </>
            ) : (
              <>
                <Share2 className="w-[18px] h-[18px]" />
                <span>Share Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePostModal;
