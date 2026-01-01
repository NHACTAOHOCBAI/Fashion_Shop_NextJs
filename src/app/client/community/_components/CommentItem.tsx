"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MoreHorizontal,
  Edit2,
  Trash2,
  Reply as ReplyIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  useUpdateComment,
  useDeleteComment,
  useReplies,
} from "@/hooks/queries/usePost";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import ReplyInput from "./ReplyInput";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface CommentItemProps {
  comment: PostComment;
  postId: number;
  currentUser?: User;
  depth?: number;
  maxDepth?: number;
}

const CommentItem = ({
  comment,
  postId,
  currentUser,
  depth = 0,
  maxDepth = 10, // Prevent infinite nesting visually
}: CommentItemProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(comment.content);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  // Fetch replies when expanded
  const { data: repliesData } = useReplies(
    postId,
    comment.id,
    1,
    100,
  );

  const isOwnComment = currentUser?.id === comment.user?.id;

  // Calculate indentation (max out at maxDepth)
  const indentLevel = Math.min(depth, maxDepth);

  // Tailwind class mapping for indentation (can't use template literals with Tailwind)
  const getIndentClass = (level: number): string => {
    const indentMap: Record<number, string> = {
      0: "",
      1: "ml-12",
      2: "ml-24",
      3: "ml-36",
      4: "ml-48",
    };
    // Cap at ml-48 for levels >= 4
    return indentMap[Math.min(level, 4)] || "ml-48";
  };

  const indentClass = getIndentClass(indentLevel);

  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return date;
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingText(comment.content);
  };

  const handleUpdateSubmit = () => {
    if (!editingText.trim()) return;

    updateComment(
      {
        postId,
        commentId: comment.id,
        data: { content: editingText.trim() },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Comment updated successfully");
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to update comment");
        },
      }
    );
  };

  const handleDelete = () => {
    deleteComment(
      { postId, commentId: comment.id },
      {
        onSuccess: (data: any) => {
          const deletedCount = data?.deletedCount || 1;
          toast.success(
            deletedCount > 1
              ? `Comment and ${deletedCount - 1} replies deleted`
              : "Comment deleted successfully"
          );
          setDeleteDialogOpen(false);
          setShowMenu(false);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to delete comment");
        },
      }
    );
  };

  const replies = repliesData?.data || [];

  return (
    <div className={depth > 0 ? indentClass : ""}>
      <div className="flex gap-3 mb-3">
        {/* Avatar */}
        <Link
          href={`/client/profile/${comment.user.id}`}
          className="flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ring-2 ring-white">
            {comment.user.avatar ? (
              <Image
                src={comment.user.avatar}
                alt={comment.user.fullName}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-sm">
                {comment.user.fullName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </Link>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-gradient-to-br from-[#F6F7F8] to-[#FAFBFC] rounded-2xl p-4 relative hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/client/profile/${comment.user.id}`}
                  className="font-semibold text-sm hover:text-[#40BFFF] transition-colors duration-200"
                >
                  {comment.user.fullName}
                </Link>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(comment.createdAt)}</span>
                </div>
              </div>

              {/* Edit/Delete Menu */}
              {isOwnComment && !isEditing && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1.5 hover:bg-white rounded-full transition-all duration-200"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 min-w-[120px] z-10 animate-slide-down">
                      <button
                        onClick={handleEdit}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-blue-50 text-xs transition-all duration-200 text-gray-700 hover:text-[#40BFFF]"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteDialogOpen(true)}
                        disabled={isDeleting}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-xs text-red-600 transition-all duration-200 disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Editing Mode */}
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-full p-3 border-2 border-[#40BFFF] bg-white rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#40BFFF]/20 transition-all duration-200 min-h-[60px] text-sm"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateSubmit}
                    disabled={isUpdating || !editingText.trim()}
                    className="px-4 py-1.5 bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF] text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isUpdating}
                    className="px-4 py-1.5 border-2 border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          {!isEditing && (
            <div className="flex items-center gap-4 mt-2 ml-3">
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#40BFFF] font-medium transition-colors"
              >
                <ReplyIcon className="w-3.5 h-3.5" />
                Reply
              </button>

              {comment.replyCount > 0 && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="flex items-center gap-1.5 text-xs text-[#40BFFF] hover:text-[#3AADEB] font-medium"
                >
                  {showReplies ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                  {showReplies ? "Hide" : "View"} {comment.replyCount}{" "}
                  {comment.replyCount === 1 ? "reply" : "replies"}
                </button>
              )}
            </div>
          )}

          {/* Reply Input */}
          {showReplyInput && currentUser && (
            <div className="mt-3">
              <ReplyInput
                postId={postId}
                commentId={comment.id}
                commentAuthorName={comment.user.fullName}
                currentUser={currentUser}
                onCancel={() => setShowReplyInput(false)}
                onSuccess={() => {
                  setShowReplyInput(false);
                  setShowReplies(true); // Auto-expand replies to show the new reply
                }}
              />
            </div>
          )}

          {/* Nested Replies - Recursive */}
          {showReplies && replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {replies.map((reply: PostComment) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  currentUser={currentUser}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="w-[500px]">
          <AlertDialogHeader>
            <h6>Delete Comment</h6>
            <AlertDialogDescription>
              {comment.replyCount > 0
                ? `This will also delete ${comment.replyCount} ${
                    comment.replyCount === 1 ? "reply" : "replies"
                  }. This action cannot be undone.`
                : "Are you sure you want to delete this comment? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CommentItem;
