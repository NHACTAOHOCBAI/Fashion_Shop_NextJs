"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Plus, TrendingUp, Clock, Loader2, Search, Filter } from "lucide-react";
import PostCard from "./_components/PostCard";
import CreatePostModal from "./_components/CreatePostModal";
import { usePosts } from "@/hooks/queries/usePost";

const CommunityPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortType, setSortType] = useState<"newest" | "popular">("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // 2. Sửa đoạn lấy user từ Redux Store
  // Giả định store của bạn cấu hình reducer auth tên là 'auth'
  const user = useSelector((state: any) => state.auth.user);

  // Fetch posts
  const { data: postsData, isLoading } = usePosts({
    page,
    limit: 10,
    sortType,
    search: searchQuery,
  });

  return (
    <div className="min-h-screen bg-[#F6F7F8]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF] py-[60px]">
        <div className="w-[1240px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[48px] font-bold text-white">
                Community Feed
              </h1>
              <p className="text-[20px] text-white/90 mt-[12px]">
                Share your style, discover trends, and connect with fashion
                lovers
              </p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-[12px] px-[32px] py-[16px] bg-white text-[#40BFFF] rounded-[12px] font-semibold text-[18px] hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <Plus className="w-[24px] h-[24px]" />
              Create Post
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-[40px]">
        <div className="w-[1240px] mx-auto">
          <div className="grid grid-cols-12 gap-[30px]">
            {/* Left Sidebar - Filters */}
            <div className="col-span-3">
              <div className="bg-white rounded-[16px] p-[24px] sticky top-[20px]">
                <div className="flex items-center gap-[10px] mb-[20px]">
                  <Filter className="w-[24px] h-[24px] text-[#40BFFF]" />
                  <h3 className="text-[20px] font-bold">Filters</h3>
                </div>

                <div className="space-y-[12px]">
                  <button
                    onClick={() => setSortType("newest")}
                    className={`w-full flex items-center gap-[12px] p-[14px] rounded-[12px] transition-all duration-200 ${
                      sortType === "newest"
                        ? "bg-[#40BFFF] text-white"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <Clock className="w-[20px] h-[20px]" />
                    <span className="font-medium">Newest First</span>
                  </button>

                  <button
                    onClick={() => setSortType("popular")}
                    className={`w-full flex items-center gap-[12px] p-[14px] rounded-[12px] transition-all duration-200 ${
                      sortType === "popular"
                        ? "bg-[#40BFFF] text-white"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <TrendingUp className="w-[20px] h-[20px]" />
                    <span className="font-medium">Most Popular</span>
                  </button>
                </div>

                {/* Search */}
                <div className="mt-[24px]">
                  <h3 className="text-[16px] font-bold mb-[12px]">Search Posts</h3>
                  <div className="relative">
                    <Search className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search posts..."
                      className="w-full pl-[42px] pr-[16px] py-[12px] border border-gray-200 rounded-[12px] focus:outline-none focus:border-[#40BFFF] transition-all duration-200 text-[14px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="col-span-9">
              {isLoading ? (
                <div className="flex items-center justify-center py-[100px]">
                  <Loader2 className="w-[50px] h-[50px] animate-spin text-[#40BFFF]" />
                </div>
              ) : postsData?.data && postsData.data.length > 0 ? (
                <>
                  <div className="space-y-[24px]">
                    {postsData.data.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        currentUserId={user?.id}
                      />
                    ))}
                  </div>

                  {/* Pagination Logic Giữ Nguyên */}
                   {postsData.pagination &&
                    postsData.pagination.total > postsData.pagination.limit && (
                      <div className="mt-[40px] flex justify-center gap-[12px]">
                         {/* ... Phần Pagination giữ nguyên ... */}
                      </div>
                    )}
                </>
              ) : (
                <div className="bg-white rounded-[16px] p-[60px] text-center">
                  <p className="text-[18px] text-gray-500 mb-[20px]">
                    No posts found. Be the first to share something!
                  </p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-[32px] py-[14px] bg-[#40BFFF] text-white rounded-[12px] font-medium hover:bg-[#3AADEB] transition-all duration-200"
                  >
                    Create Your First Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUser={user}
      />
    </div>
  );
};

export default CommunityPage;