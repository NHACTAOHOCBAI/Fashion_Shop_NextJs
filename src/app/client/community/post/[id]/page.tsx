"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import PostCard from "../../_components/PostCard";
import CommentSection from "../../_components/CommentSection";
import { usePost } from "@/hooks/queries/usePost";
import { useAuthInit } from "@/hooks/useAuthInit";

const PostDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const postId = parseInt(params.id as string);

  // Initialize auth on mount
  useAuthInit();

  const reduxUser = useSelector((state: any) => state.auth.user);
  const [user, setUser] = useState<User | null>(null);

  // Fallback to localStorage if Redux user is null
  useEffect(() => {
    if (reduxUser) {
      setUser(reduxUser);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      }
    }
  }, [reduxUser]);

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
            onClick={() => router.push("/client/community")}
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
            <CommentSection postId={postId} currentUser={user as User} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostDetailPage;
