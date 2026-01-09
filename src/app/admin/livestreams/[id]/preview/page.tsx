"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetLivestream } from "@/hooks/queries/useLivestream";
import {
  LivestreamPlayer,
  PinnedProductsCarousel,
  LiveChatPanel,
} from "@/components/livestream";
import { LivestreamStatus } from "@/interfaces/livestream";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Loader2, Package, Eye, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

export default function AdminPreviewLivestreamPage() {
  const params = useParams();
  const router = useRouter();
  const livestreamId = parseInt(params.id as string, 10);
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: livestream, isLoading, error } = useGetLivestream(livestreamId);

  // Check if user is the owner
  useEffect(() => {
    if (!isLoading && livestream && user && user.id !== livestream.user.id) {
      router.push("/admin/livestreams/view-livestreams");
    }
  }, [isLoading, livestream, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error || !livestream) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">😞</div>
          <h2 className="text-3xl font-bold mb-2">
            Livestream not found
          </h2>
          <p className="text-muted-foreground mb-6">
            This livestream does not exist or has been deleted
          </p>
          <Link href="/admin/livestreams/view-livestreams">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all">
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/livestreams/view-livestreams")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Livestreams
          </button>
          
          <div className="h-6 w-px bg-border" />
          
          <h1 className="text-2xl font-bold">Preview Mode</h1>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          {isLive && (
            <Link href={`/admin/livestreams/${livestream.id}/watch`}>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Watch & Manage
              </button>
            </Link>
          )}
          
          <Link href={`/admin/livestreams/${livestream.id}/analytics`}>
            <button className="px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </Link>
        </div>
      </div>

      {/* Preview banner */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-blue-900 dark:text-blue-300">
              Preview Mode - How viewers will see your livestream
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              This is a read-only preview. Changes won't affect the actual livestream.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <LivestreamPlayer livestream={livestream} viewerCount={livestream.currentViewers} />
          </motion.div>

          {/* Livestream info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border rounded-xl p-6 shadow"
          >
            {/* Status badge */}
            <div className="mb-4">
              {isLive && (
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-4 py-2 rounded-full font-semibold">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Live • {livestream.currentViewers} watching
                </div>
              )}
              {isScheduled && (
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-4 py-2 rounded-full font-semibold">
                  <Calendar className="w-5 h-5" />
                  Scheduled
                </div>
              )}
              {isEnded && (
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-4 py-2 rounded-full font-semibold">
                  Ended • {livestream.totalViews} total views
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-3">
              {livestream.title}
            </h1>

            {/* Description */}
            {livestream.description && (
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {livestream.description}
              </p>
            )}

            {/* Host info */}
            <div className="flex items-center gap-3 pt-4 border-t">
              {livestream.user.avatar ? (
                <Image
                  src={livestream.user.avatar}
                  alt={livestream.user.fullName}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
              )}
              <div>
                <p className="font-semibold">
                  {livestream.user.fullName}
                </p>
                <p className="text-sm text-muted-foreground">Host</p>
              </div>
            </div>

            {/* Schedule info */}
            {isScheduled && livestream.scheduledAt && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-muted-foreground mb-1">Scheduled to start:</p>
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                  {format(new Date(livestream.scheduledAt), "PPpp", { locale: enUS })}
                </p>
              </div>
            )}

            {/* Stats */}
            {isEnded && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{livestream.totalViews}</p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{livestream.peakViewers}</p>
                  <p className="text-xs text-muted-foreground">Peak Viewers</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{livestream.messageCount || 0}</p>
                  <p className="text-xs text-muted-foreground">Messages</p>
                </div>
              </div>
            )}

            {/* Products list */}
            {livestream.products && livestream.products.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Featured Products ({livestream.products.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {livestream.products.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      className="group cursor-default"
                    >
                      <div className="bg-muted rounded-lg p-3 hover:shadow-md transition-all">
                        <div className="relative aspect-square bg-background rounded-lg overflow-hidden mb-2">
                          {product.images && product.images[0] ? (
                            <Image
                              src={product.images[0].imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">
                              👕
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-medium line-clamp-2">
                          {product.name}
                        </p>
                        <p className="text-sm font-bold text-primary mt-1">
                          ${product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {livestream.products.length > 6 && (
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    + {livestream.products.length - 6} more products
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Pinned products preview */}
          {isLive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PinnedProductsCarousel livestreamId={livestream.id} socket={null} />
            </motion.div>
          )}

          {/* Chat history */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border rounded-xl shadow overflow-hidden"
          >
            <div className="p-4 border-b bg-muted/30">
              <h3 className="font-bold">Chat History</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Read-only preview of messages
              </p>
            </div>
            <LiveChatPanel
              livestreamId={livestream.id}
              isPreviewMode={true}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
