"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  FileText,
  Settings,
  Loader2,
  Heart,
  TrendingUp,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import PostCard from "../../community/_components/PostCard";
import { useAuthorProfile, useAuthorPosts } from "@/hooks/queries/usePost";
import { formatDistanceToNow } from "date-fns";

const UserProfilePage = () => {
  const params = useParams();
  const userId = Number(params.id);
  const [page, setPage] = useState(1);

  // Get current user from Redux
  const currentUser = useSelector((state: any) => state.auth.user);
  const currentUserId = currentUser?.id;
  const isOwnProfile = currentUserId === userId;

  // Fetch author profile and posts
  const { data: authorProfile, isLoading: isLoadingProfile, error: profileError } = useAuthorProfile(userId);
  const { data: postsData, isLoading: isLoadingPosts } = useAuthorPosts(userId, page, 10);

  // Debug logging
  console.log('🎯 User ID:', userId);
  console.log('🎯 Current User ID:', currentUserId);
  console.log('🎯 Is Own Profile:', isOwnProfile);
  console.log('🎯 Author Profile Data:', authorProfile);
  console.log('🎯 Profile Error:', profileError);
  console.log('🎯 Posts Data:', postsData);

  // Loading state
  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-[#F6F7F8] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-[64px] h-[64px] animate-spin text-[#40BFFF] mx-auto mb-[24px]" />
          <p className="text-[18px] text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (profileError || !authorProfile) {
    return (
      <div className="min-h-screen bg-[#F6F7F8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-[80px] h-[80px] bg-red-100 rounded-full flex items-center justify-center mx-auto mb-[24px]">
            <span className="text-[36px]">😕</span>
          </div>
          <h2 className="text-[24px] font-bold text-gray-800 mb-[12px]">Author Not Found</h2>
          <p className="text-[16px] text-gray-600 mb-[24px]">
            The author you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/client/community"
            className="inline-flex items-center gap-[8px] px-[24px] py-[12px] bg-[#40BFFF] text-white rounded-[12px] font-medium hover:bg-[#3AADEB] transition-all duration-200"
          >
            <ArrowLeft className="w-[18px] h-[18px]" />
            <span>Back to Community</span>
          </Link>
        </div>
      </div>
    );
  }

  const joinDate = authorProfile.createdAt
    ? formatDistanceToNow(new Date(authorProfile.createdAt), { addSuffix: true })
    : "Recently";

  // Safe getter for fullName
  const fullName = authorProfile.fullName || authorProfile.email || "User";
  const firstLetter = fullName.charAt(0).toUpperCase();

  // Safe stats with defaults
  const totalPosts = authorProfile.stats?.totalPosts || 0;
  const totalLikes = authorProfile.stats?.totalLikes || 0;
  const avgLikesPerPost = totalPosts > 0 ? Math.round(totalLikes / totalPosts) : 0;

  return (
    <div className="min-h-screen bg-[#F6F7F8]">
      {/* Cover Photo with gradient overlay */}
      <div className="relative h-[320px] bg-gradient-to-r from-[#40BFFF] via-[#5ECCFF] to-[#40BFFF] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#40BFFF] via-[#5ECCFF] to-[#40BFFF] animate-gradient-x" />
        {/* Decorative elements */}
        <div className="absolute top-[20px] right-[100px] w-[200px] h-[200px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[20px] left-[100px] w-[150px] h-[150px] bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Profile Section */}
      <div className="w-[1240px] mx-auto">
        <div className="relative">
          {/* Avatar with ring animation */}
          <div className="absolute -top-[80px] left-[40px]">
            <div className="w-[160px] h-[160px] rounded-full border-[6px] border-white overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center shadow-2xl ring-4 ring-[#40BFFF]/20">
              {authorProfile.avatar ? (
                <Image
                  src={authorProfile.avatar}
                  alt={fullName}
                  width={160}
                  height={160}
                  className="object-cover"
                />
              ) : (
                <span className="text-white font-bold text-[64px]">
                  {firstLetter}
                </span>
              )}
            </div>
          </div>

          {/* Profile Header */}
          <div className="bg-white rounded-b-[24px] pt-[100px] pb-[32px] px-[40px] shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-[40px] font-bold text-gray-900 mb-[12px]">
                  {fullName}
                </h1>
                {authorProfile.bio && (
                  <p className="text-[18px] text-gray-600 mb-[20px] max-w-[700px] leading-relaxed">
                    {authorProfile.bio}
                  </p>
                )}

                {/* User Meta Info */}
                <div className="flex flex-wrap items-center gap-[24px] text-[14px] text-gray-500 mb-[28px]">
                  {authorProfile.email && (
                    <div className="flex items-center gap-[6px] bg-gray-50 px-[12px] py-[6px] rounded-full">
                      <MapPin className="w-[14px] h-[14px]" />
                      <span>{authorProfile.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-[6px] bg-gray-50 px-[12px] py-[6px] rounded-full">
                    <Calendar className="w-[14px] h-[14px]" />
                    <span>Joined {joinDate}</span>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="flex items-center gap-[20px]">
                  <div className="flex items-center gap-[16px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[16px] px-[24px] py-[16px] border border-blue-100">
                    <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] rounded-full flex items-center justify-center">
                      <FileText className="w-[24px] h-[24px] text-white" />
                    </div>
                    <div>
                      <div className="text-[28px] font-bold text-gray-900">
                        {totalPosts}
                      </div>
                      <div className="text-[14px] text-gray-600">Total Posts</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-[16px] bg-gradient-to-br from-pink-50 to-red-50 rounded-[16px] px-[24px] py-[16px] border border-pink-100">
                    <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#FF4858] to-[#FF6B78] rounded-full flex items-center justify-center">
                      <Heart className="w-[24px] h-[24px] text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-[28px] font-bold text-[#FF4858]">
                        {totalLikes.toLocaleString()}
                      </div>
                      <div className="text-[14px] text-gray-600">Likes Received</div>
                    </div>
                  </div>

                  {/* Engagement Rate */}
                  {totalPosts > 0 && (
                    <div className="flex items-center gap-[16px] bg-gradient-to-br from-yellow-50 to-orange-50 rounded-[16px] px-[24px] py-[16px] border border-yellow-100">
                      <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#FFD470] to-[#FFA94D] rounded-full flex items-center justify-center">
                        <TrendingUp className="w-[24px] h-[24px] text-white" />
                      </div>
                      <div>
                        <div className="text-[28px] font-bold text-orange-600">
                          {avgLikesPerPost}
                        </div>
                        <div className="text-[14px] text-gray-600">Avg. Likes/Post</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {isOwnProfile && (
                <div className="flex items-center gap-[12px]">
                  <Link
                    href="/client/my-account/profile"
                    className="flex items-center gap-[8px] px-[24px] py-[12px] bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF] text-white rounded-[12px] font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <Settings className="w-[18px] h-[18px]" />
                    <span>Edit Profile</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Posts Header */}
            <div className="flex items-center gap-[10px] mt-[36px] border-t border-gray-200 pt-[20px]">
              <div className="w-[32px] h-[32px] bg-[#40BFFF]/10 rounded-full flex items-center justify-center">
                <FileText className="w-[16px] h-[16px] text-[#40BFFF]" />
              </div>
              <span className="text-[#40BFFF] font-semibold text-[16px]">
                Recent Posts
              </span>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="py-[40px]">
          {isLoadingPosts ? (
            <div className="flex flex-col items-center justify-center py-[80px]">
              <Loader2 className="w-[48px] h-[48px] animate-spin text-[#40BFFF] mb-[16px]" />
              <p className="text-gray-500 text-[15px]">Loading posts...</p>
            </div>
          ) : postsData?.data && postsData.data.length > 0 ? (
            <>
              <div className="space-y-[24px]">
                {postsData.data.map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PostCard post={post} currentUserId={currentUserId} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {postsData.pagination &&
                postsData.pagination.total > page * postsData.pagination.limit && (
                  <div className="flex justify-center mt-[32px]">
                    <button
                      onClick={() => setPage(page + 1)}
                      className="px-[40px] py-[14px] bg-white border-2 border-[#40BFFF] text-[#40BFFF] rounded-[14px] font-medium hover:bg-[#40BFFF] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                      Load More Posts
                    </button>
                  </div>
                )}

              {/* End of posts message */}
              {postsData.pagination &&
                postsData.pagination.total <= page * postsData.pagination.limit && (
                  <div className="text-center mt-[32px] py-[24px]">
                    <Sparkles className="w-[40px] h-[40px] text-gray-300 mx-auto mb-[12px]" />
                    <p className="text-[15px] text-gray-500">
                      You've reached the end of {isOwnProfile ? 'your' : `${fullName.split(' ')[0]}'s`} posts
                    </p>
                  </div>
                )}
            </>
          ) : (
            <div className="bg-white rounded-[20px] p-[80px] text-center shadow-sm">
              <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#40BFFF]/10 to-[#5ECCFF]/10 rounded-full flex items-center justify-center mx-auto mb-[24px]">
                <FileText className="w-[48px] h-[48px] text-[#40BFFF]/50" />
              </div>
              <h3 className="text-[22px] font-bold text-gray-800 mb-[12px]">
                No Posts Yet
              </h3>
              <p className="text-[16px] text-gray-500 mb-[28px] max-w-[400px] mx-auto">
                {isOwnProfile
                  ? "Start sharing your thoughts and experiences with the community!"
                  : `${fullName.split(" ")[0]} hasn't shared any posts yet. Check back later!`}
              </p>
              {isOwnProfile && (
                <Link
                  href="/client/community"
                  className="inline-flex items-center gap-[8px] px-[32px] py-[14px] bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF] text-white rounded-[12px] font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Sparkles className="w-[18px] h-[18px]" />
                  <span>Create Your First Post</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default UserProfilePage;
