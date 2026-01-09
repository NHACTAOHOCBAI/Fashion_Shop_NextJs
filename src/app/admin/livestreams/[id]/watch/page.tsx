"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetLivestream, useGetPinnedProducts, usePinProduct, useUnpinProduct } from "@/hooks/queries/useLivestream";
import { useLivestreamSocket } from "@/hooks/useLivestreamSocket";
import { LivestreamPlayer, LiveChatPanel, ViewerCounter } from "@/components/livestream";
import { LivestreamStatus } from "@/interfaces/livestream";
import { motion } from "framer-motion";
import { ArrowLeft, Users, MessageSquare, Package, TrendingUp, Loader2, Pin, PinOff, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminWatchLivestreamPage() {
  const params = useParams();
  const router = useRouter();
  const livestreamId = parseInt(params.id as string, 10);
  const user = useSelector((state: RootState) => state.auth.user);

  const [viewerCount, setViewerCount] = useState(0);
  const [showProductsList, setShowProductsList] = useState(false);

  const { data: livestream, isLoading, error } = useGetLivestream(livestreamId);
  const { data: pinnedProducts = [] } = useGetPinnedProducts(livestreamId);
  const pinMutation = usePinProduct();
  const unpinMutation = useUnpinProduct();

  const { joinLivestream, leaveLivestream, socket, isConnected, sendHeartbeat } = useLivestreamSocket({
    userId: user?.id,
  });

  // Check if user is the owner
  const isOwner = user && livestream && user.id === livestream.user.id;

  // Redirect if not owner
  useEffect(() => {
    if (!isLoading && livestream && !isOwner) {
      toast.error("You don't have permission to access this page");
      router.push(`/client/livestreams/${livestreamId}`);
    }
  }, [isLoading, livestream, isOwner, router, livestreamId]);

  // Join livestream when socket is connected
  useEffect(() => {
    if (!isConnected || !livestream) return;

    console.log("[AdminWatch] 🎯 Joining livestream:", livestream.id);
    joinLivestream({
      livestreamId: livestream.id,
    });

    // Send heartbeat every 30 seconds to maintain session
    const heartbeatInterval = setInterval(() => {
      console.log("[AdminWatch] ❤️ Sending heartbeat for livestream:", livestream.id);
      sendHeartbeat(livestream.id);
    }, 30000); // 30 seconds

    // Listen for viewer count updates
    const handleViewerJoined = (data: any) => {
      console.log("[AdminWatch] Viewer joined:", data);
      setViewerCount(data.viewerCount);
    };

    const handleViewerLeft = (data: any) => {
      console.log("[AdminWatch] Viewer left:", data);
      setViewerCount(data.viewerCount);
    };

    const handleJoinedLivestream = (data: any) => {
      console.log("[AdminWatch] Joined livestream:", data);
      setViewerCount(data.viewerCount);
    };

    socket?.on("viewer_joined", handleViewerJoined);
    socket?.on("viewer_left", handleViewerLeft);
    socket?.on("joined_livestream", handleJoinedLivestream);

    // Leave on unmount
    return () => {
      console.log("[AdminWatch] 🚪 Leaving livestream:", livestream.id);
      clearInterval(heartbeatInterval);
      leaveLivestream({ livestreamId: livestream.id });
      socket?.off("viewer_joined", handleViewerJoined);
      socket?.off("viewer_left", handleViewerLeft);
      socket?.off("joined_livestream", handleJoinedLivestream);
    };
  }, [isConnected, livestream?.id, joinLivestream, leaveLivestream, socket, sendHeartbeat]);

  // Initialize viewer count
  useEffect(() => {
    if (livestream) {
      setViewerCount(livestream.currentViewers);
      console.log("[AdminWatch] Livestream data:", {
        id: livestream.id,
        title: livestream.title,
        currentViewers: livestream.currentViewers,
        peakViewers: livestream.peakViewers,
        totalViews: livestream.totalViews,
        messageCount: livestream.messageCount,
        productsCount: livestream.products?.length || 0,
      });
    }
  }, [livestream]);

  const handlePinProduct = async (productId: number) => {
    if (!livestream) return;

    try {
      await pinMutation.mutateAsync({
        livestreamId: livestream.id,
        productId,
      });
      toast.success("Product pinned successfully!");
    } catch (error: any) {
      toast.error(error?.message || "Failed to pin product");
    } 
  };

  const handleUnpinProduct = async (productId: number) => {
    if (!livestream) return;

    try {
      await unpinMutation.mutateAsync({
        livestreamId: livestream.id,
        productId,
      });
      toast.success("Product unpinned successfully!");
    } catch (error: any) {
      toast.error(error?.message || "Failed to unpin product");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading livestream...</p>
        </div>
      </div>
    );
  }

  if (error || !livestream) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Livestream Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The livestream you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/admin/livestreams/view-livestreams">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Back to Livestreams
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const pinnedProductIds = pinnedProducts.map((p) => p.product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/livestreams/view-livestreams">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Stream Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {livestream.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {livestream.status === LivestreamStatus.Live && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">LIVE</span>
                </div>
              )}
              <Link href={`/client/livestreams/${livestream.id}`} target="_blank">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View as Viewer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column: Video + Stats */}
          <div className="xl:col-span-2 space-y-6">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <LivestreamPlayer livestream={livestream} viewerCount={viewerCount} />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Viewers</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{viewerCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Messages</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{livestream.messageCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Peak Viewers</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{livestream.peakViewers}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h3>
                </div>
                <button
                  onClick={() => setShowProductsList(!showProductsList)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {showProductsList ? "Hide" : "Show All"} ({livestream.products?.length || 0})
                </button>
              </div>

              {/* Currently Pinned Products */}
              {pinnedProducts.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Currently Pinned:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pinnedProducts.map((pinned) => (
                      <div
                        key={pinned.id}
                        className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                      >
                        <Image
                          src={pinned.product.images[0].imageUrl || "/placeholder.png"}
                          alt={pinned.product.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                            {pinned.product.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {pinned.clickCount} clicks
                          </p>
                        </div>
                        <button
                          onClick={() => handleUnpinProduct(pinned.product.id)}
                          disabled={unpinMutation.isPending}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
                          title="Unpin product"
                        >
                          <PinOff className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Products List */}
              {showProductsList && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    All Products ({livestream.products?.length || 0}):
                  </p>
                  <div className="max-h-[400px] overflow-y-auto space-y-2">
                    {livestream.products?.map((product) => {
                      const isPinned = pinnedProductIds.includes(product.id);
                      return (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Image
                            src={product.thumbnail || product.images?.[0]?.imageUrl || "/placeholder.png"}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.png";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {product.price}$
                            </p>
                          </div>
                          <button
                            onClick={() => isPinned ? handleUnpinProduct(product.id) : handlePinProduct(product.id)}
                            disabled={pinMutation.isPending || unpinMutation.isPending}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                              isPinned
                                ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {isPinned ? "Unpin" : "Pin"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {(!livestream.products || livestream.products.length === 0) && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No products added to this livestream yet.</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Live Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="xl:col-span-1"
          >
            <div className="sticky top-6">
              <LiveChatPanel
                livestreamId={livestream.id}
                socket={socket}
                isHost={true}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
