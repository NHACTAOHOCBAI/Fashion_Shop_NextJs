"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Share2,
  MoreHorizontal,
  Tag,
  Clock,
} from "lucide-react";
import {
  useToggleReaction,
  useToggleBookmark,
  useDeletePost,
} from "@/hooks/queries/usePost";
import { formatDistanceToNow } from "date-fns";
import SharePostModal from "./SharePostModal";
import ReactionButton from "@/components/reactions/ReactionButton";
import BookmarkButton from "@/components/reactions/BookmarkButton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
  currentUserId?: number;
}

const PostCard = ({ post, currentUserId }: PostCardProps) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { mutate: toggleReaction, isPending: isReacting } =
    useToggleReaction();
  const { mutate: toggleBookmark, isPending: isBookmarking } =
    useToggleBookmark();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const isOwnPost = currentUserId === post.user?.id;

  const handleReact = (postId: number, type: ReactionType) => {
    toggleReaction(
      { postId, type },
      {
        onError: (error: any) => {
          toast.error(error?.message || "Failed to react");
        },
      }
    );
  };

  const handleBookmark = (postId: number) => {
    toggleBookmark(postId, {
      onSuccess: (data) => {
        toast.success(
          data.action === "bookmarked"
            ? "Post saved to bookmarks"
            : "Post removed from bookmarks"
        );
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to bookmark");
      },
    });
  };

  const handleDelete = () => {
    deletePost(post.id, {
      onSuccess: () => {
        toast.success("You have deleted the post successfully");
        setOpenDelete(false);
        setShowMoreMenu(false);
      },
    });
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return date;
    }
  };

  if (!post.user) return null;

  return (
    <div className="bg-white rounded-[16px] border border-gray-200 p-[24px] hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-[20px]">
        <Link
          href={`/client/profile/${post.user.id}`}
          className="flex items-center gap-[12px] group"
        >
          <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center">
            {post.user.avatar ? (
              <Image
                src={post.user.avatar}
                alt={post.user.fullName}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-[18px]">
                {post.user.fullName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <p className="font-semibold text-[16px] group-hover:text-[#40BFFF]">
              {post.user.fullName}
            </p>
            <div className="flex items-center gap-[6px] text-[14px] text-gray-500">
              <Clock className="w-[14px] h-[14px]" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </Link>

        {isOwnPost && (
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-[8px] hover:bg-gray-100 rounded-full"
            >
              <MoreHorizontal className="w-[20px] h-[20px] text-gray-600" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-[8px] bg-white border border-gray-200 rounded-[12px] shadow-lg py-[8px] min-w-[150px] z-10">
                <button
                  onClick={() => {
                    setOpenDelete(true);
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-[16px] py-[10px] hover:bg-red-50 text-[14px] text-red-600"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <p className="text-[16px] text-gray-800 leading-relaxed mb-[16px] whitespace-pre-wrap">
        {post.content}
      </p>

      {/* Images */}
      {post.images?.length > 0 && (
        <div
          className={`grid gap-[8px] mb-[16px] ${
            post.images.length === 1
              ? "grid-cols-1"
              : post.images.length === 2
              ? "grid-cols-2"
              : post.images.length === 3
              ? "grid-cols-3"
              : "grid-cols-2"
          }`}
        >
          {post.images.slice(0, 4).map((image, index) => (
            <div
              key={image.id}
              className="relative w-full h-[250px] rounded-[12px] overflow-hidden bg-gray-100"
            >
              <Image
                src={image.imageUrl}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
              />
              {index === 3 && post.images.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-[24px] font-bold">
                    +{post.images.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tagged Products */}
      {post.postProducts?.length > 0 && (
        <div className="mb-[16px]">
          <div className="flex items-center gap-[8px] mb-[12px] text-[14px] text-gray-600">
            <Tag className="w-[16px] h-[16px]" />
            <span className="font-medium">
              Tagged Products ({post.postProducts.length})
            </span>
          </div>

          <div className="flex gap-[12px] overflow-x-auto pb-[8px]">
            {post.postProducts.map((pp) => (
              <Link
                key={pp.id}
                href={`/client/products/product-detail/${pp.product.id}`}
                className="flex-shrink-0 group"
              >
                <div className="flex items-center gap-[12px] bg-[#F6F7F8] hover:bg-gray-200 rounded-[12px] p-[12px] border border-gray-200 min-w-[200px]">
                  {pp.product.images?.[0] && (
                    <div className="w-[50px] h-[50px] rounded-[8px] overflow-hidden bg-white flex-shrink-0">
                      <Image
                        src={pp.product.images[0].imageUrl}
                        alt={pp.product.name}
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium line-clamp-1 group-hover:text-[#40BFFF]">
                      {pp.product.name}
                    </p>
                    <p className="text-[14px] text-[#40BFFF] font-semibold">
                      ${pp.product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-[16px] border-t border-gray-200">
        <div className="flex items-center gap-[16px]">
          <ReactionButton
            postId={post.id}
            currentReaction={post.userReaction}
            totalReactions={post.totalReactions || post.totalLikes}
            reactionCounts={post.reactionCounts}
            onReact={handleReact}
            isPending={isReacting}
          />

          <Link
            href={`/client/community/post/${post.id}`}
            className="flex items-center gap-[8px] text-[14px] font-medium hover:text-[#40BFFF] px-3 py-1.5 rounded-lg hover:bg-gray-100"
          >
            <MessageCircle className="w-[18px] h-[18px] text-gray-600" />
            <span className="text-gray-700">
              {post.totalComments > 0 && `${post.totalComments} `}
              Comment
            </span>
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-[8px] text-[14px] font-medium hover:text-[#40BFFF] px-3 py-1.5 rounded-lg hover:bg-gray-100"
          >
            <Share2 className="w-[18px] h-[18px] text-gray-600" />
            <span className="text-gray-700">
              {post.totalShares > 0 && `${post.totalShares} `}
              Share
            </span>
          </button>
        </div>

        <BookmarkButton
          postId={post.id}
          isBookmarked={post.isBookmarkedByCurrentUser}
          onToggle={handleBookmark}
          isPending={isBookmarking}
          showLabel={false}
        />
      </div>

      <SharePostModal
        post={post}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      {/* Delete Confirm Dialog */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent className="w-[500px]">
          <AlertDialogHeader>
            <h6>Are you absolutely sure?</h6>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently delete this
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostCard;
