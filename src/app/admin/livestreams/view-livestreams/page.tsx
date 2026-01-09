"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useGetMyLivestreams,
  useDeleteLivestream,
  useEndLivestream,
} from "@/hooks/queries/useLivestream";
import { LivestreamStatus } from "@/interfaces/livestream";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Loader2,
  Calendar,
  Eye,
  Edit,
  Trash2,
  StopCircle,
  BarChart3,
  Copy,
  Check,
  HelpCircle,
  X,
  Radio,
  Video,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { toast } from "sonner";

export default function AdminLivestreamsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedStatus, setSelectedStatus] = useState<LivestreamStatus | "all">("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showOBSGuide, setShowOBSGuide] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, isLoading, refetch } = useGetMyLivestreams({
    status: selectedStatus === "all" ? undefined : selectedStatus,
  });

  // Auto-refresh every 5 seconds to check for status changes
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    toast.success("Refreshed!");
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const deleteMutation = useDeleteLivestream();
  const endMutation = useEndLivestream();

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this livestream?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Livestream cancelled successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleEnd = async (id: number) => {
    if (!confirm("Are you sure you want to end this livestream?")) return;

    try {
      await endMutation.mutateAsync(id);
      toast.success("Livestream ended successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const copyStreamKey = (streamKey: string) => {
    navigator.clipboard.writeText(streamKey);
    setCopiedKey(streamKey);
    toast.success("Stream key copied");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getStatusBadge = (status: LivestreamStatus) => {
    const styles = {
      [LivestreamStatus.Live]: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      [LivestreamStatus.Scheduled]: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      [LivestreamStatus.Ended]: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
      [LivestreamStatus.Cancelled]: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    };

    const labels = {
      [LivestreamStatus.Live]: "Live",
      [LivestreamStatus.Scheduled]: "Scheduled",
      [LivestreamStatus.Ended]: "Ended",
      [LivestreamStatus.Cancelled]: "Cancelled",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading livestreams...</p>
        </div>
      </div>
    );
  }

  const livestreams = data?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Livestreams</h1>
          <p className="text-muted-foreground">
            Create and manage your livestream sessions • Auto-refreshes every 5s
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
            title="Refresh now"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setShowOBSGuide(true)}
            className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg font-semibold flex items-center gap-2"
          >
            <HelpCircle className="w-5 h-5" />
            How to Stream
          </button>
          <Link href="/admin/livestreams/create-livestream">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Livestream
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { value: "all", label: "All" },
          { value: LivestreamStatus.Live, label: "Live" },
          { value: LivestreamStatus.Scheduled, label: "Scheduled" },
          { value: LivestreamStatus.Ended, label: "Ended" },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedStatus(filter.value as any)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedStatus === filter.value
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {livestreams.length > 0 ? (
        <div className="space-y-4">
          {livestreams.map((livestream) => (
            <motion.div
              key={livestream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border rounded-xl p-6 shadow hover:shadow-lg transition-all"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  {livestream.thumbnailUrl ? (
                    <Image
                      src={livestream.thumbnailUrl}
                      alt={livestream.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      🎥
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">
                        {livestream.title}
                      </h3>
                      {getStatusBadge(livestream.status)}
                    </div>
                  </div>

                  {livestream.description && (
                    <p className="text-muted-foreground line-clamp-2 mb-3">
                      {livestream.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>
                        {livestream.status === LivestreamStatus.Live
                          ? `${livestream.currentViewers} watching NOW 🔴`
                          : `${livestream.totalViews} views`}
                      </span>
                    </div>
                    {livestream.scheduledAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(livestream.scheduledAt), "dd/MM/yyyy HH:mm", {
                            locale: enUS,
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stream Key */}
                  {(livestream.status === LivestreamStatus.Scheduled ||
                    livestream.status === LivestreamStatus.Live) && (
                    <div className="mb-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <p className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                          Stream Configuration
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">RTMP Server URL:</p>
                          <code className="block text-sm font-mono bg-background px-3 py-2 rounded border">
                            rtmp://localhost:1935/live
                          </code>
                        </div>
                        <div>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Stream Key:</p>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 text-sm font-mono bg-background px-3 py-2 rounded border">
                              {livestream.streamKey}
                            </code>
                            <button
                              onClick={() => copyStreamKey(livestream.streamKey)}
                              className="p-2 hover:bg-background rounded transition-colors"
                              title="Copy stream key"
                            >
                              {copiedKey === livestream.streamKey ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      {livestream.status === LivestreamStatus.Scheduled && (
                        <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                          <p className="text-xs text-blue-700 dark:text-blue-400">
                            💡 <strong>To start streaming:</strong> Open OBS Studio, configure with the settings above, 
                            and click "Start Streaming". The status will automatically change to "Live".
                          </p>
                        </div>
                      )}
                      {livestream.status === LivestreamStatus.Live && (
                        <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              <span className="text-xs font-semibold text-red-600 dark:text-red-400">STREAMING LIVE</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {livestream.status === LivestreamStatus.Live && (
                      <Link href={`/admin/livestreams/${livestream.id}/watch`}>
                        <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-colors flex items-center gap-2 shadow-lg">
                          <Eye className="w-4 h-4" />
                          Watch & Manage
                        </button>
                      </Link>
                    )}
                    
                    {livestream.status !== LivestreamStatus.Live && (
                      <Link href={`/client/livestreams/${livestream.id}`} target="_blank">
                        <button className="px-4 py-2 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 rounded-lg font-semibold hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                      </Link>
                    )}

                    <Link href={`/admin/livestreams/${livestream.id}/analytics`}>
                      <button className="px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </button>
                    </Link>

                    {(livestream.status === LivestreamStatus.Scheduled || 
                      livestream.status === LivestreamStatus.Cancelled) && (
                      <Link href={`/admin/livestreams/${livestream.id}/edit`}>
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </Link>
                    )}

                    {livestream.status === LivestreamStatus.Live && (
                      <button
                        onClick={() => handleEnd(livestream.id)}
                        disabled={endMutation.isPending}
                        className="px-4 py-2 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 rounded-lg font-semibold hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        <StopCircle className="w-4 h-4" />
                        End Stream
                      </button>
                    )}

                    {livestream.status === LivestreamStatus.Scheduled && (
                      <button
                        onClick={() => handleDelete(livestream.id)}
                        disabled={deleteMutation.isPending}
                        className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card border rounded-xl">
          <div className="text-8xl mb-4">📹</div>
          <h3 className="text-2xl font-bold mb-2">
            No livestreams yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Create your first livestream to get started
          </p>
          <Link href="/admin/livestreams/create-livestream">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl">
              Create Livestream
            </button>
          </Link>
        </div>
      )}
      
      {/* OBS Streaming Guide Modal */}
      <AnimatePresence>
        {showOBSGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowOBSGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-card border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">How to Start Livestream</h2>
                    <p className="text-sm text-muted-foreground">Complete guide for streaming with OBS</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOBSGuide(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Important Note */}
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Radio className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-300">
                      <p className="font-semibold mb-1">Important: No "Start" Button Needed!</p>
                      <p>
                        The livestream automatically starts when you begin broadcasting through OBS. 
                        The status will change from "Scheduled" to "Live" automatically.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 1 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-lg font-bold">Create a Livestream</h3>
                  </div>
                  <p className="text-muted-foreground ml-10">
                    Click "Create Livestream" button above and fill in the details (title, description, schedule time, etc.)
                  </p>
                </div>

                {/* Step 2 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-lg font-bold">Get Your Stream Key</h3>
                  </div>
                  <p className="text-muted-foreground ml-10">
                    After creating, you'll see a <strong>Stream Key</strong> (e.g., <code className="text-xs bg-muted px-2 py-1 rounded">live_a1b2c3d4</code>). 
                    Click the copy button to save it.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="text-lg font-bold">Download OBS Studio</h3>
                  </div>
                  <p className="text-muted-foreground ml-10">
                    If you haven't already, download OBS Studio from{" "}
                    <a 
                      href="https://obsproject.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      obsproject.com
                    </a>
                  </p>
                </div>

                {/* Step 4 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      4
                    </div>
                    <h3 className="text-lg font-bold">Configure OBS Settings</h3>
                  </div>
                  <div className="ml-10 space-y-3">
                    <p className="text-muted-foreground">
                      In OBS, go to <strong>Settings → Stream</strong>:
                    </p>
                    <div className="bg-muted rounded-lg p-4 space-y-2 font-mono text-sm">
                      <div>
                        <strong>Service:</strong> Custom
                      </div>
                      <div>
                        <strong>Server:</strong> <code className="text-primary">rtmp://localhost:1935/live</code>
                      </div>
                      <div>
                        <strong>Stream Key:</strong> <code className="text-primary">[Your Stream Key]</code>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      💡 Replace "localhost" with your backend server IP if streaming remotely
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      5
                    </div>
                    <h3 className="text-lg font-bold">Start Broadcasting</h3>
                  </div>
                  <div className="ml-10 space-y-3">
                    <p className="text-muted-foreground">
                      In OBS, click <strong>"Start Streaming"</strong> button
                    </p>
                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        ✅ The livestream status will automatically change to <strong>"Live"</strong> and viewers can start watching!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      6
                    </div>
                    <h3 className="text-lg font-bold">End the Stream</h3>
                  </div>
                  <p className="text-muted-foreground ml-10">
                    When you're done, either:
                  </p>
                  <ul className="ml-10 space-y-2 text-muted-foreground">
                    <li>• Click <strong>"Stop Streaming"</strong> in OBS</li>
                    <li>• OR click the <strong>"End Stream"</strong> button on this page</li>
                  </ul>
                </div>

                {/* Troubleshooting */}
                <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <h3 className="font-bold mb-2 text-orange-800 dark:text-orange-300">
                    Troubleshooting
                  </h3>
                  <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-400">
                    <li>• <strong>Stream won't start?</strong> Check your Stream Key is correct</li>
                    <li>• <strong>Connection failed?</strong> Verify RTMP server URL and port (1935)</li>
                    <li>• <strong>Status not updating?</strong> Refresh the page after starting OBS</li>
                  </ul>
                </div>
              </div>

              <div className="sticky bottom-0 bg-card border-t px-6 py-4">
                <button
                  onClick={() => setShowOBSGuide(false)}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
