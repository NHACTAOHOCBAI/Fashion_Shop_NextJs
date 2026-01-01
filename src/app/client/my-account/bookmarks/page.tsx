"use client";

import { useState } from "react";
import { useBookmarkedPosts } from "@/hooks/queries/usePost";
import { useSelector } from "react-redux";
import PostCard from "../../community/_components/PostCard";
import { Bookmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookmarksPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const user = useSelector((state: any) => state.auth.user);
  const { data, isLoading, error } = useBookmarkedPosts(page, limit);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#40BFFF]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500">Failed to load bookmarked posts</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const posts = data?.data || [];
  const total = data?.pagination?.total || 0;
  const hasMore = posts.length < total;
  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#40BFFF]/5 to-transparent rounded-lg p-4 border border-[#40BFFF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#40BFFF] flex items-center justify-center shadow-sm">
              <Bookmark className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h6 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                Saved Posts
                {data && data.data.length > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-[#40BFFF] text-white rounded-full">
                    {data.data.length}
                  </span>
                )}
              </h6>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {data
                  ? `${data.data.length} ${
                      data.data.length === 1 ? "item" : "items"
                    } saved for later`
                  : "No posts saved yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} currentUserId={user?.id} />
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                variant="outline"
                className="min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang tải...
                  </>
                ) : (
                  "Xem thêm"
                )}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Bookmark className="w-16 h-16 text-gray-300" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No posts saved yet
            </h3>
            <p className="text-gray-500 mb-4">
              Save your favorite posts to view them later
            </p>
            <Button
              onClick={() => (window.location.href = "/client/community")}
              className="bg-[#40BFFF] hover:bg-[#3BA8E0]"
            >
              Khám phá Community
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
