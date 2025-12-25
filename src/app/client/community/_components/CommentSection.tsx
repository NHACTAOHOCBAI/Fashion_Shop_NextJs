"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, Loader2, Clock, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { useComments, useAddComment, useUpdateComment, useDeleteComment } from "@/hooks/queries/usePost";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  postId: number;
  currentUser?: User;
}

const CommentSection = ({ postId, currentUser }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(1);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [showMenuForComment, setShowMenuForComment] = useState<number | null>(null);

  const { data: commentsData, isLoading } = useComments(postId, page, 20);
  const { mutate: addComment, isPending: isSubmitting } = useAddComment();
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

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
          alert(error?.message || "Failed to update comment");
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
          alert(error?.message || "Failed to delete comment");
        },
      }
    );
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
            {commentsData.data.map((comment) => {
              const isOwnComment = currentUser?.id === comment.user.id;
              const isEditing = editingCommentId === comment.id;

              return (
                <div key={comment.id} className="flex gap-[16px]">
                  {/* Avatar */}
                  <Link
                    href={`/client/profile/${comment.user.id}`}
                    className="flex-shrink-0"
                  >
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center hover:shadow-lg transition-all duration-200 cursor-pointer">
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
                  </Link>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="bg-[#F6F7F8] rounded-[16px] p-[16px] relative">
                      <div className="flex items-center justify-between gap-[8px] mb-[8px]">
                        <div className="flex items-center gap-[8px]">
                          <Link
                            href={`/client/profile/${comment.user.id}`}
                            className="font-semibold text-[15px] hover:text-[#40BFFF] transition-colors duration-200"
                          >
                            {comment.user.fullName}
                          </Link>
                          <div className="flex items-center gap-[4px] text-[13px] text-gray-500">
                            <Clock className="w-[12px] h-[12px]" />
                            <span>{formatDate(comment.createdAt)}</span>
                          </div>
                        </div>

                        {/* Edit/Delete Menu */}
                        {isOwnComment && !isEditing && (
                          <div className="relative">
                            <button
                              onClick={() =>
                                setShowMenuForComment(
                                  showMenuForComment === comment.id ? null : comment.id
                                )
                              }
                              className="p-[4px] hover:bg-gray-200 rounded-full transition-all duration-200"
                            >
                              <MoreHorizontal className="w-[16px] h-[16px] text-gray-600" />
                            </button>

                            {showMenuForComment === comment.id && (
                              <div className="absolute right-0 top-full mt-[4px] bg-white border border-gray-200 rounded-[8px] shadow-lg py-[4px] min-w-[120px] z-10">
                                <button
                                  onClick={() => handleEdit(comment)}
                                  className="w-full flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-gray-50 text-[13px] transition-all duration-200"
                                >
                                  <Edit2 className="w-[14px] h-[14px]" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleDelete(comment.id)}
                                  disabled={isDeleting}
                                  className="w-full flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-red-50 text-[13px] text-red-600 transition-all duration-200 disabled:opacity-50"
                                >
                                  <Trash2 className="w-[14px] h-[14px]" />
                                  <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Editing Mode */}
                      {isEditing ? (
                        <div className="space-y-[12px]">
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full p-[12px] border border-gray-200 rounded-[8px] resize-none focus:outline-none focus:border-[#40BFFF] transition-all duration-200 min-h-[60px]"
                          />
                          <div className="flex gap-[8px]">
                            <button
                              onClick={() => handleUpdateSubmit(comment.id)}
                              disabled={isUpdating || !editingText.trim()}
                              className="px-[16px] py-[6px] bg-[#40BFFF] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#3AADEB] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isUpdating ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              disabled={isUpdating}
                              className="px-[16px] py-[6px] border border-gray-200 rounded-[8px] text-[13px] font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
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
