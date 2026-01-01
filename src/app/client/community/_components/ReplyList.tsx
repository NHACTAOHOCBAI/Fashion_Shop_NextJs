"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Loader2 } from "lucide-react";
import { useReplies, useDeleteComment } from "@/hooks/queries/usePost";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ReplyListProps {
  postId: number;
  commentId: number;
  currentUserId?: number;
}

const ReplyList = ({ postId, commentId, currentUserId }: ReplyListProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [deleteReplyId, setDeleteReplyId] = useState<number | null>(null);
  const [showMenuForReply, setShowMenuForReply] = useState<number | null>(null);

  const { data, isLoading, error } = useReplies(postId, commentId, page, limit);
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  const handleDeleteReply = (replyId: number) => {
    deleteComment(
      { postId, commentId: replyId },
      {
        onSuccess: () => {
          toast.success("Reply deleted successfully");
          setDeleteReplyId(null);
          setShowMenuForReply(null);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to delete reply");
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

  if (isLoading && page === 1) {
    return (
      <div className="ml-12 mt-3 flex items-center justify-center py-4">
        <Loader2 className="w-5 h-5 animate-spin text-[#40BFFF]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-12 mt-3 text-sm text-red-500">
        Failed to load replies
      </div>
    );
  }

  const replies = data?.data || [];
  const total = data?.pagination?.total || 0;
  const hasMore = replies.length < total;

  if (replies.length === 0) {
    return null;
  }

  return (
    <div className="ml-12 mt-3 space-y-3">
      {replies.map((reply: PostComment) => {
        const isOwnReply = currentUserId === reply.user?.id;

        return (
          <div key={reply.id} className="flex items-start gap-3">
            {/* Reply Author Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center flex-shrink-0">
              {reply.user?.avatar ? (
                <img
                  src={reply.user.avatar}
                  alt={reply.user.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-xs">
                  {reply.user?.fullName?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* Reply Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">
                    {reply.user?.fullName}
                  </p>
                  {isOwnReply && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowMenuForReply(
                            showMenuForReply === reply.id ? null : reply.id
                          )
                        }
                        className="p-1 hover:bg-gray-200 rounded-full"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </button>

                      {showMenuForReply === reply.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-10">
                          <button
                            onClick={() => {
                              setDeleteReplyId(reply.id);
                              setShowMenuForReply(null);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-red-50 text-sm text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                  {reply.content}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-3">
                {formatDate(reply.createdAt)}
              </p>
            </div>
          </div>
        );
      })}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isLoading}
            variant="ghost"
            size="sm"
            className="text-[#40BFFF] hover:text-[#3AADEB]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              `View more replies (${total - replies.length})`
            )}
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteReplyId !== null}
        onOpenChange={(open) => !open && setDeleteReplyId(null)}
      >
        <AlertDialogContent className="w-[500px]">
          <AlertDialogHeader>
            <h6>Delete Reply</h6>
            <AlertDialogDescription>
              Are you sure you want to delete this reply? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteReplyId && handleDeleteReply(deleteReplyId)}
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

export default ReplyList;
