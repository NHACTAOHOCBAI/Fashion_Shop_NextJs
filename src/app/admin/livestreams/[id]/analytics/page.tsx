"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetLivestreamAnalytics, useGetLivestream } from "@/hooks/queries/useLivestream";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  Users,
  MessageSquare,
  MousePointer,
  TrendingUp,
  Clock,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export default function AdminLivestreamAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const livestreamId = parseInt(params.id as string, 10);

  const { data: livestream, isLoading: isLoadingLivestream } = useGetLivestream(livestreamId);
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetLivestreamAnalytics(livestreamId);

  const isLoading = isLoadingLivestream || isLoadingAnalytics;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!livestream || !analytics) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-8xl mb-4">😞</div>
          <h2 className="text-3xl font-bold mb-2">
            Data not found
          </h2>
          <Link href="/admin/livestreams/view-livestreams">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all">
              Back to Livestreams
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const stats = [
    {
      icon: Eye,
      label: "Total Views",
      value: analytics.viewers.total.toLocaleString(),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Users,
      label: "Peak Viewers",
      value: analytics.viewers.peak.toLocaleString(),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      value: analytics.engagement.totalMessages.toLocaleString(),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: Clock,
      label: "Avg. Watch Duration",
      value: formatDuration(analytics.viewers.avgWatchDuration),
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: MousePointer,
      label: "Product Clicks",
      value: analytics.engagement.totalProductClicks.toLocaleString(),
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-950",
      iconColor: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/admin/livestreams/view-livestreams">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Livestreams
          </button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Livestream Analytics
          </h1>
          <p className="text-muted-foreground">{livestream.title}</p>
        </motion.div>
      </div>

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border rounded-xl shadow p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <p className="font-semibold">{analytics.livestream.status}</p>
          </div>
          {analytics.livestream.startedAt && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Started At</p>
              <p className="font-semibold">
                {format(new Date(analytics.livestream.startedAt), "PPp", { locale: enUS })}
              </p>
            </div>
          )}
          {analytics.livestream.endedAt && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ended At</p>
              <p className="font-semibold">
                {format(new Date(analytics.livestream.endedAt), "PPp", { locale: enUS })}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border rounded-xl shadow p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Products performance */}
      {analytics.products && analytics.products.length > 0 && (() => {
        // Deduplicate products by productId and sum metrics
        const productMap = new Map<number, { productId: number; productName: string; clicks: number }>();
        
        analytics.products.forEach(product => {
          const existing = productMap.get(product.productId);
          if (existing) {
            existing.clicks += product.clicks;
          } else {
            productMap.set(product.productId, {
              productId: product.productId,
              productName: product.productName,
              clicks: product.clicks,
            });
          }
        });
        
        const deduplicatedProducts = Array.from(productMap.values());
        
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border rounded-xl shadow p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">
                Product Performance
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold">
                      Product
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold">
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deduplicatedProducts.map((product) => {
                    return (
                      <tr key={product.productId} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <p className="font-medium">{product.productName}</p>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {product.clicks.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
}
