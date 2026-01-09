"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetLivestream } from "@/hooks/queries/useLivestream";
import { useLivestreamSocket } from "@/hooks/useLivestreamSocket";
import {
  LivestreamPlayer,
  LiveChatPanel,
  PinnedProductsCarousel,
  ViewerCounter,
} from "@/components/livestream";
import { LivestreamStatus } from "@/interfaces/livestream";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Loader2, Package } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export default function LivestreamViewerPage() {
  const params = useParams();
  const router = useRouter();
  const livestreamId = parseInt(params.id as string, 10);
  const user = useSelector((state: RootState) => state.auth.user);

  const [guestId, setGuestId] = useState<string>("");
  const [viewerCount, setViewerCount] = useState(0);

  const { data: livestream, isLoading, error } = useGetLivestream(livestreamId);
  const { joinLivestream, leaveLivestream, socket, isConnected, sendHeartbeat } = useLivestreamSocket({
    userId: user?.id,
  });

  const isHost = user && livestream && user.id === livestream.user.id;

  // Generate guest ID for non-authenticated users
  useEffect(() => {
    if (!user) {
      const existingGuestId = localStorage.getItem("livestream_guest_id");
      if (existingGuestId) {
        setGuestId(existingGuestId);
      } else {
        const newGuestId = `guest_${uuidv4()}`;
        localStorage.setItem("livestream_guest_id", newGuestId);
        setGuestId(newGuestId);
      }
    }
  }, [user]);

  // Join livestream when socket is connected
  useEffect(() => {
    if (!isConnected || !livestream || (!user && !guestId)) return;

    console.log("[ClientWatch] 🎯 Joining livestream:", livestream.id);
    joinLivestream({
      livestreamId: livestream.id,
      guestId: user ? undefined : guestId,
    });

    // Send heartbeat every 30 seconds to maintain session
    const heartbeatInterval = setInterval(() => {
      console.log("[ClientWatch] ❤️ Sending heartbeat for livestream:", livestream.id);
      sendHeartbeat(livestream.id);
    }, 30000); // 30 seconds

    // Listen for viewer count updates
    const handleViewerJoined = (data: any) => {
      console.log("[ClientWatch] Viewer joined:", data);
      setViewerCount(data.viewerCount);
    };

    const handleViewerLeft = (data: any) => {
      console.log("[ClientWatch] Viewer left:", data);
      setViewerCount(data.viewerCount);
    };

    const handleJoinedLivestream = (data: any) => {
      console.log("[ClientWatch] Joined livestream:", data);
      setViewerCount(data.viewerCount);
    };

    socket?.on("viewer_joined", handleViewerJoined);
    socket?.on("viewer_left", handleViewerLeft);
    socket?.on("joined_livestream", handleJoinedLivestream);

    // Leave on unmount
    return () => {
      console.log("[ClientWatch] 🚪 Leaving livestream:", livestream.id);
      clearInterval(heartbeatInterval);
      leaveLivestream({ livestreamId: livestream.id });
      socket?.off("viewer_joined", handleViewerJoined);
      socket?.off("viewer_left", handleViewerLeft);
      socket?.off("joined_livestream", handleJoinedLivestream);
    };
  }, [isConnected, livestream?.id, guestId, user?.id, joinLivestream, leaveLivestream, socket, sendHeartbeat]);

  // Initialize viewer count
  useEffect(() => {
    if (livestream) {
      setViewerCount(livestream.currentViewers);
    }
  }, [livestream]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-cyan-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading livestream...</p>
        </div>
      </div>
    );
  }

  if (error || !livestream) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">😞</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Livestream not found
          </h2>
          <p className="text-gray-600 mb-6">
            This livestream does not exist or has been deleted
          </p>
          <Link href="/client/livestreams">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Back to list
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const isLive = livestream.status === LivestreamStatus.Live;
  const isScheduled = livestream.status === LivestreamStatus.Scheduled;
  const isEnded = livestream.status === LivestreamStatus.Ended;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-cyan-600 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LivestreamPlayer livestream={livestream} viewerCount={viewerCount} />
            </motion.div>

            {/* Livestream info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              {/* Status badge */}
              <div className="mb-4">
                {isLive && <ViewerCounter initialCount={viewerCount} socket={socket} />}
                {isScheduled && (
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    <Calendar className="w-5 h-5" />
                    Scheduled
                  </div>
                )}
                {isEnded && (
                  <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
                    Ended
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {livestream.title}
              </h1>

              {/* Description */}
              {livestream.description && (
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {livestream.description}
                </p>
              )}

              {/* Host info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                {livestream.user.avatar ? (
                  <Image
                    src={livestream.user.avatar}
                    alt={livestream.user.fullName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {livestream.user.fullName}
                  </p>
                  <p className="text-sm text-gray-500">Host</p>
                </div>
              </div>

              {/* Schedule info */}
              {isScheduled && livestream.scheduledAt && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Scheduled to start:</p>
                  <p className="text-lg font-semibold text-blue-700">
                    {format(new Date(livestream.scheduledAt), "PPpp", { locale: enUS })}
                  </p>
                </div>
              )}

              {/* Products list */}
              {livestream.products && livestream.products.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Products in livestream ({livestream.products.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {livestream.products.slice(0, 6).map((product) => (
                      <Link
                        key={product.id}
                        href={`/client/products/${product.id}`}
                        className="group"
                      >
                        <div className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all">
                          <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-2">
                            {product.images && product.images[0] ? (
                              <Image
                                src={product.images[0].imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-4xl">
                                👕
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-800 line-clamp-2">
                            {product.name}
                          </p>
                          <p className="text-sm font-bold text-cyan-600 mt-1">
                            {product.price.toLocaleString()}$
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Pinned products */}
            {isLive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PinnedProductsCarousel livestreamId={livestream.id} socket={socket} />
              </motion.div>
            )}

            {/* Chat panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="h-[600px]"
            >
              <LiveChatPanel
                livestreamId={livestream.id}
                isHost={isHost || false}
                socket={socket}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
