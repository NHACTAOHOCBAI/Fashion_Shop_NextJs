"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Tag, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useDeletePost } from "@/hooks/queries/usePost";
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

interface AdminPostCardProps {
  post: Post;
}

const AdminPostCard = ({ post }: AdminPostCardProps) => {
  const [openDelete, setOpenDelete] = useState(false);

  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return date;
    }
  };

  if (!post.user) return null;

  return (
    <div className="bg-white rounded-[16px] border border-gray-200 p-[24px] hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-[20px]">
        <div className="flex gap-[12px]">
          <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-gray-200">
            {post.user.avatar ? (
              <Image
                src={post.user.avatar}
                alt={post.user.fullName}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full font-semibold">
                {post.user.fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <p className="font-semibold text-[16px]">{post.user.fullName}</p>
            <div className="flex items-center gap-[6px] text-[14px] text-gray-500">
              <Clock className="w-[14px] h-[14px]" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
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
                href={`/admin/products/${pp.product.id}`}
                className="flex-shrink-0"
              >
                <div className="flex items-center gap-[12px] bg-gray-100 rounded-[12px] p-[12px] min-w-[200px]">
                  {pp.product.images?.[0] && (
                    <div className="w-[50px] h-[50px] rounded-[8px] overflow-hidden bg-white">
                      <Image
                        src={pp.product.images[0].imageUrl}
                        alt={pp.product.name}
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[14px] font-medium line-clamp-1">
                      {pp.product.name}
                    </p>
                    <p className="text-[14px] text-blue-600 font-semibold">
                      ${pp.product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Stats */}
      <div className="flex items-center gap-[24px] pt-[16px] border-t border-gray-200 text-[14px] text-gray-600">
        <div className="flex items-center gap-[6px]">
          <span className="font-medium">{post.totalLikes}</span>
          <span>Likes</span>
        </div>

        <div className="flex items-center gap-[6px]">
          <span className="font-medium">{post.totalComments}</span>
          <span>Comments</span>
        </div>

        <div className="flex items-center gap-[6px]">
          <span className="font-medium">{post.totalShares}</span>
          <span>Shares</span>
        </div>
      </div>
    </div>
  );
};

export default AdminPostCard;
