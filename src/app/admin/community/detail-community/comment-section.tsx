"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Loader2,
  Clock,
  MoreHorizontal,
  Edit2,
  Trash2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import {
  useComments,
  useAddComment,
  useUpdateComment,
  useDeleteComment,
} from "@/hooks/queries/usePost";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface CommentSectionProps {
  postId: number;
  currentUser?: User;
}

const CommentSection = ({ postId, currentUser }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(1);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [showMenuForComment, setShowMenuForComment] = useState<number | null>(
    null
  );
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: commentsData, isLoading } = useComments(postId, page, 20);
  const { mutate: addComment, isPending: isSubmitting } = useAddComment();
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

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

  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return date;
    }
  };

  const handleEdit = (comment: PostComment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.content);
    setShowMenuForComment(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleUpdateSubmit = (commentId: number) => {
    if (!editingText.trim()) return;

    updateComment(
      {
        postId,
        commentId,
        data: { content: editingText.trim() },
      },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setEditingText("");
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to update comment");
        },
      }
    );
  };

  const handleDelete = (commentId: number) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    deleteComment(
      { postId, commentId },
      {
        onSuccess: () => {
          setShowMenuForComment(null);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to delete comment");
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

      {/* Comments List */}
      <div className="space-y-[24px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-[60px]">
            <Loader2 className="w-[48px] h-[48px] animate-spin text-[#40BFFF] mb-[16px]" />
            <p className="text-gray-500 text-[14px]">Loading comments...</p>
          </div>
        ) : commentsData?.data && commentsData.data.length > 0 ? (
          <>
            {commentsData.data.map((comment, index) => {
              const isOwnComment = currentUser?.id === comment.user.id;
              const isEditing = editingCommentId === comment.id;

              return (
                <div
                  key={comment.id}
                  className="flex gap-[16px] animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Avatar */}
                  <Link
                    href={`/client/profile/${comment.user.id}`}
                    className="flex-shrink-0"
                  >
                    <div className="w-[44px] h-[44px] rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer ring-2 ring-white">
                      {comment.user.avatar ? (
                        <Image
                          src={comment.user.avatar}
                          alt={comment.user.fullName}
                          width={44}
                          height={44}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-[16px]">
                          {comment.user.fullName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-[#F6F7F8] to-[#FAFBFC] rounded-[18px] p-[18px] relative hover:shadow-md transition-all duration-300 border border-gray-100">
                      <div className="flex items-center justify-between gap-[8px] mb-[10px]">
                        <div className="flex items-center gap-[10px] flex-wrap">
                          <Link
                            href={`/client/profile/${comment.user.id}`}
                            className="font-semibold text-[15px] hover:text-[#40BFFF] transition-colors duration-200"
                          >
                            {comment.user.fullName}
                          </Link>
                          <div className="flex items-center gap-[6px] text-[12px] text-gray-500 bg-white px-[8px] py-[4px] rounded-full">
                            <Clock className="w-[12px] h-[12px]" />
                            <span>{formatDate(comment.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Editing Mode */}
                      {isEditing ? (
                        <div className="space-y-[12px]">
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full p-[14px] border-2 border-[#40BFFF] bg-white rounded-[12px] resize-none focus:outline-none focus:ring-2 focus:ring-[#40BFFF]/20 transition-all duration-200 min-h-[80px] text-[15px]"
                            autoFocus
                          />
                          <div className="flex gap-[8px]">
                            <button
                              onClick={() => handleUpdateSubmit(comment.id)}
                              disabled={isUpdating || !editingText.trim()}
                              className="px-[20px] py-[8px] bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF] text-white rounded-[10px] text-[13px] font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isUpdating ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              disabled={isUpdating}
                              className="px-[20px] py-[8px] border-2 border-gray-200 rounded-[10px] text-[13px] font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

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
