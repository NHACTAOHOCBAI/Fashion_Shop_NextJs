"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { usePost } from "@/hooks/queries/usePost";
import { useAuthInit } from "@/hooks/useAuthInit";
import PostCard from "@/app/client/community/_components/PostCard";
import CommentSection from "@/app/admin/community/detail-community/comment-section";
import AdminPostCard from "@/app/admin/community/detail-community/content";

const PostDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const postId = parseInt(params.id as string);

  const { data: post, isLoading, error } = usePost(postId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-[50px] h-[50px] animate-spin text-[#40BFFF]" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-[1240px] mx-auto py-[60px]">
          <div className="bg-white rounded-[16px] p-[60px] text-center">
            <p className="text-[24px] font-bold text-gray-800 mb-[16px]">
              Post Not Found
            </p>
            <p className="text-[16px] text-gray-600 mb-[32px]">
              This post may have been deleted or doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-white border-gray-200 py-[24px]">
        <div className="w-[1240px] mx-auto">
          <button
            onClick={() => router.push("/admin/community/view-community")}
            className="flex items-center gap-[12px] text-[16px] font-medium text-gray-700 transition-all duration-200 group"
          >
            <ArrowLeft className="w-[20px] h-[20px] group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Feed
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-[40px]">
        <div className="w-[900px] mx-auto">
          {/* Post Card */}
          <AdminPostCard post={post} />

          {/* Comment Section */}
          <div className="bg-white rounded-[16px] border border-gray-200 p-[24px] mt-[24px]">
            <CommentSection postId={postId} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostDetailPage;
