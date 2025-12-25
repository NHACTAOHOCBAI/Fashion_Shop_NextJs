"use client";
import ProductCard from "@/app/client/products/_components/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/skeleton-variants";
import { EmptyWishlist } from "@/components/ui/empty-states";
import { useWishlists } from "@/hooks/queries/useWishlist";
import { Heart, Sparkles } from "lucide-react";

const MyWishlist = () => {
  const { data: myWishlist, isLoading } = useWishlists();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="grid grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const hasWishlistItems = myWishlist && myWishlist.length > 0;

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#40BFFF]/5 to-transparent rounded-lg p-4 border border-[#40BFFF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#40BFFF] flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h6 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                My Wishlist
                {hasWishlistItems && myWishlist.length > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-[#40BFFF] text-white rounded-full">
                    {myWishlist.length}
                  </span>
                )}
              </h6>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hasWishlistItems
                  ? `${myWishlist.length} ${
                      myWishlist.length === 1 ? "item" : "items"
                    } saved for later`
                  : "Save your favorite items here"}
              </p>
            </div>
          </div>
          {/* {hasWishlistItems && (
            <div className="flex items-center gap-1.5 text-xs text-[#40BFFF] font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Your Collection</span>
            </div>
          )} */}
        </div>
      </div>

      {/* Wishlist Grid */}
      {!hasWishlistItems ? (
        <EmptyWishlist />
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {myWishlist.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
