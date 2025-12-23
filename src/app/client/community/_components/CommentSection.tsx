"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, Loader2, Clock } from "lucide-react";
import { useComments, useAddComment } from "@/hooks/queries/usePost";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  postId: number;
  currentUser?: User;
}

const CommentSection = ({ postId, currentUser }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(1);

  const { data: commentsData, isLoading } = useComments(postId, page, 20);
  const { mutate: addComment, isPending: isSubmitting } = useAddComment();

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
        },
        onError: (error: any) => {
          alert(error?.message || "Failed to add comment");
        },
      }
    );
  };

  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return date;
    }
  };

  return (
    <div className="mt-[30px]">
      <h3 className="text-[24px] font-bold mb-[24px]">
        Comments ({commentsData?.pagination?.total || 0})
      </h3>

      {/* Add Comment Form */}
      {currentUser && (
        <form onSubmit={handleSubmit} className="mb-[30px]">
          <div className="flex gap-[16px]">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center">
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
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-[16px] border border-gray-200 rounded-[12px] resize-none focus:outline-none focus:border-[#40BFFF] transition-all duration-200 min-h-[80px]"
              />

              <div className="mt-[12px] flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !commentText.trim()}
                  className="flex items-center gap-[8px] px-[24px] py-[10px] bg-[#40BFFF] text-white rounded-[12px] font-medium hover:bg-[#3AADEB] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-[18px] h-[18px] animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-[18px] h-[18px]" />
                      <span>Comment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-[20px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-[40px]">
            <Loader2 className="w-[40px] h-[40px] animate-spin text-[#40BFFF]" />
          </div>
        ) : commentsData?.data && commentsData.data.length > 0 ? (
          <>
            {commentsData.data.map((comment) => (
              <div key={comment.id} className="flex gap-[16px]">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center">
                    {comment.user.avatar ? (
                      <Image
                        src={comment.user.avatar}
                        alt={comment.user.fullName}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold text-[16px]">
                        {comment.user.fullName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment Content */}
                <div className="flex-1">
                  <div className="bg-[#F6F7F8] rounded-[16px] p-[16px]">
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      <p className="font-semibold text-[15px]">
                        {comment.user.fullName}
                      </p>
                      <div className="flex items-center gap-[4px] text-[13px] text-gray-500">
                        <Clock className="w-[12px] h-[12px]" />
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Load More */}
            {commentsData.pagination &&
              commentsData.pagination.total >
                page * commentsData.pagination.limit && (
                <div className="flex justify-center pt-[20px]">
                  <button
                    onClick={() => setPage(page + 1)}
                    className="px-[32px] py-[12px] border-2 border-gray-200 rounded-[12px] font-medium hover:bg-gray-50 transition-all duration-200"
                  >
                    Load More Comments
                  </button>
                </div>
              )}
          </>
        ) : (
          <div className="text-center py-[40px]">
            <p className="text-[16px] text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
