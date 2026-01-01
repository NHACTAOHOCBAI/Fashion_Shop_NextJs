"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Send,
  Loader2,
  MessageSquare,
} from "lucide-react";
import {
  useComments,
  useAddComment,
} from "@/hooks/queries/usePost";
import { toast } from "sonner";
import CommentItem from "./CommentItem";

interface CommentSectionProps {
  postId: number;
  currentUser?: User;
}

const CommentSection = ({ postId, currentUser }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: commentsData, isLoading } = useComments(postId, page, 20);
  const { mutate: addComment, isPending: isSubmitting } = useAddComment();

  useEffect(() => {
    if (textareaRef.current && isFocused) {
      textareaRef.current.focus();
    }
  }, [isFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    addComment(
      {
        id: postId,
        data: { content: commentText.trim() },
      },
      {
        onSuccess: () => {
          setCommentText("");
          setIsFocused(false);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to add comment");
        },
      }
    );
  };


  return (
    <div className="mt-[20px]">
      {/* Header with gradient */}
      <div className="flex items-center gap-[12px] mb-[32px]">
        <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] rounded-full flex items-center justify-center shadow-lg">
          <MessageSquare className="w-[24px] h-[24px] text-white" />
        </div>
        <div>
          <h6 className="text-[26px] font-bold text-gray-800">Comments</h6>
          <p className="text-[14px] text-gray-500">
            {commentsData?.pagination?.total || 0}{" "}
            {commentsData?.pagination?.total === 1 ? "comment" : "comments"}
          </p>
        </div>
      </div>

      {/* Add Comment Form */}
      {currentUser && (
        <form onSubmit={handleSubmit} className="mb-[36px]">
          <div
            className={`flex gap-[16px] p-[20px] rounded-[20px] border-2 ${
              isFocused
                ? "border-[#40BFFF]  shadow-lg"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center ring-2 ring-white shadow-md">
                {currentUser.avatar ? (
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-[18px]">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => !commentText && setIsFocused(false)}
                placeholder={`Share your thoughts, ${
                  currentUser.fullName.split(" ")[0]
                }...`}
                className="w-full p-[16px] border-0 bg-transparent rounded-[12px] resize-none focus:outline-none min-h-[80px] text-[15px] placeholder:text-gray-400"
              />

              <div
                className={`mt-[12px] flex items-center justify-between ${
                  isFocused || commentText ? "block" : "hidden"
                }`}
              >
                <p className="text-[13px] text-gray-500">
                  {commentText.length > 0 && `${commentText.length} characters`}
                </p>
                <div className="flex gap-[8px]">
                  {commentText && (
                    <button
                      type="button"
                      onClick={() => {
                        setCommentText("");
                        setIsFocused(false);
                      }}
                      className="px-[20px] py-[10px] border border-gray-200 rounded-[12px] font-medium hover:bg-gray-50 text-[14px]"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting || !commentText.trim()}
                    className="flex items-center gap-[8px] px-[24px] py-[10px] bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF] text-white rounded-[12px] font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-[18px] h-[18px]" />
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-[18px] h-[18px]" />
                        <span className="text-[16px]">Comment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-[24px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-[60px]">
            <Loader2 className="w-[48px] h-[48px] animate-spin text-[#40BFFF] mb-[16px]" />
            <p className="text-gray-500 text-[14px]">Loading comments...</p>
          </div>
        ) : commentsData?.data && commentsData.data.length > 0 ? (
          <>
            {commentsData.data.map((comment: PostComment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={postId}
                currentUser={currentUser}
                depth={0}
              />
            ))}

            {/* Load More */}
            {commentsData.pagination &&
              commentsData.pagination.total >
                page * commentsData.pagination.limit && (
                <div className="flex justify-center pt-[24px]">
                  <button
                    onClick={() => setPage(page + 1)}
                    className="px-[40px] py-[14px] border-2 border-[#40BFFF] text-[#40BFFF] rounded-[14px] font-medium hover:bg-[#40BFFF] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg"
                  >
                    Load More Comments
                  </button>
                </div>
              )}
          </>
        ) : (
          <div className="text-center py-[60px]">
            <h4 className="text-[18px] font-semibold text-gray-800 mb-[8px]">
              No comments yet
            </h4>
            <p className="text-[15px] text-gray-500 mb-[24px]">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CommentSection;
