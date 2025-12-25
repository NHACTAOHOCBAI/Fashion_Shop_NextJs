"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";
import PostCard from "../../community/_components/PostCard";

const UserProfilePage = () => {
  const params = useParams();
  const userId = Number(params.id);

  // Mock data - will be replaced with real API data
  const user = {
    id: userId,
    fullName: "Sarah Johnson",
    avatar: "",
    coverImage: "",
    bio: "Fashion enthusiast | Style blogger | Living my best life through fashion 💫",
    location: "New York, USA",
    joinDate: "2024-01-15",
    stats: {
      postsCount: 156,
      totalLikes: 15680,
    },
  };

  const currentUserId = 1; // From Redux/Auth
  const isOwnProfile = currentUserId === userId;

  // Mock posts data
  const userPosts: Post[] = [
    // Posts will be fetched from API
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F8]">
      {/* Cover Photo */}
      <div className="relative h-[320px] bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF]">
        {user.coverImage ? (
          <Image
            src={user.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF]" />
        )}
      </div>

      {/* Profile Section */}
      <div className="w-[1240px] mx-auto">
        <div className="relative">
          {/* Avatar */}
          <div className="absolute -top-[80px] left-[40px]">
            <div className="w-[160px] h-[160px] rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.fullName}
                  width={160}
                  height={160}
                  className="object-cover"
                />
              ) : (
                <span className="text-white font-bold text-[64px]">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Profile Header */}
          <div className="bg-white rounded-b-[20px] pt-[100px] pb-[30px] px-[40px]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-[36px] font-bold text-gray-900 mb-[8px]">
                  {user.fullName}
                </h1>
                <p className="text-[18px] text-gray-600 mb-[16px] max-w-[600px]">
                  {user.bio}
                </p>

                {/* User Meta Info */}
                <div className="flex flex-wrap items-center gap-[24px] text-[14px] text-gray-500">
                  {user.location && (
                    <div className="flex items-center gap-[6px]">
                      <MapPin className="w-[16px] h-[16px]" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-[6px]">
                    <Calendar className="w-[16px] h-[16px]" />
                    <span>
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-[32px] mt-[24px]">
                  <div className="flex flex-col">
                    <span className="text-[24px] font-bold text-gray-900">
                      {user.stats.postsCount}
                    </span>
                    <span className="text-[14px] text-gray-600">Posts</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[24px] font-bold text-[#FF4858]">
                      {user.stats.totalLikes.toLocaleString()}
                    </span>
                    <span className="text-[14px] text-gray-600">Likes Received</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-[12px]">
                {isOwnProfile && (
                  <button className="flex items-center gap-[8px] px-[24px] py-[12px] bg-[#40BFFF] text-white rounded-[12px] font-medium hover:bg-[#3AADEB] transition-all duration-200">
                    <Settings className="w-[18px] h-[18px]" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            {/* Posts Header */}
            <div className="flex items-center gap-[8px] mt-[32px] border-t border-gray-200 pt-[16px]">
              <FileText className="w-[18px] h-[18px] text-[#40BFFF]" />
              <span className="text-[#40BFFF] font-semibold">Posts</span>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="py-[40px]">
          {userPosts.length > 0 ? (
            <div className="space-y-[24px]">
              {userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[16px] p-[60px] text-center">
              <FileText className="w-[64px] h-[64px] text-gray-300 mx-auto mb-[16px]" />
              <p className="text-[18px] text-gray-500">
                {isOwnProfile
                  ? "You haven't posted anything yet."
                  : `${user.fullName.split(" ")[0]} hasn't posted anything yet.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
