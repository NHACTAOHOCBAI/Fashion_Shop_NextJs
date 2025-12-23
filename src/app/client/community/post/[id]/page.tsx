"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
// 1. Thay thế import store cũ bằng useSelector của Redux
import { useSelector } from "react-redux"; 

import PostCard from "../../_components/PostCard";
import CommentSection from "../../_components/CommentSection";
import { usePost } from "@/hooks/queries/usePost";

const PostDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const postId = parseInt(params.id as string);

  // 2. Sửa cách lấy user từ Redux store
  // Giả định bạn đã config reducer tên là 'auth' trong store chung
  const user = useSelector((state: any) => state.auth.user);

  const { data: post, isLoading, error } = usePost(postId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F7F8] flex items-center justify-center">
        <Loader2 className="w-[50px] h-[50px] animate-spin text-[#40BFFF]" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F6F7F8]">
        <div className="w-[1240px] mx-auto py-[60px]">
          <div className="bg-white rounded-[16px] p-[60px] text-center">
            <p className="text-[24px] font-bold text-gray-800 mb-[16px]">
              Post Not Found
            </p>
            <p className="text-[16px] text-gray-600 mb-[32px]">
              This post may have been deleted or doesn't exist.
            </p>
            <button
              onClick={() => router.push("/client/community")}
              className="px-[32px] py-[14px] bg-[#40BFFF] text-white rounded-[12px] font-medium hover:bg-[#3AADEB] transition-all duration-200"
            >
              Back to Community
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F8]">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-[24px]">
        <div className="w-[1240px] mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-[12px] text-[16px] font-medium text-gray-700 hover:text-[#40BFFF] transition-all duration-200 group"
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
          <PostCard post={post} currentUserId={user?.id} />

          {/* Comment Section */}
          <div className="bg-white rounded-[16px] border border-gray-200 p-[24px] mt-[24px]">
            <CommentSection postId={postId} currentUser={user} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostDetailPage;