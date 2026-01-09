"use client";

import { Livestream, LivestreamStatus } from "../../interfaces/livestream";
import Image from "next/image";
import Link from "next/link";
import { Eye, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

interface LivestreamCardProps {
  livestream: Livestream;
}

export const LivestreamCard = ({ livestream }: LivestreamCardProps) => {
  const isLive = livestream.status === LivestreamStatus.Live;
  const isScheduled = livestream.status === LivestreamStatus.Scheduled;
  const isEnded = livestream.status === LivestreamStatus.Ended;

  const getStatusBadge = () => {
    if (isLive) {
      return (
        <div className="absolute top-3 left-3 z-10">
          <motion.div
            className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </motion.div>
        </div>
      );
    }

    if (isScheduled) {
      return (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <Calendar className="w-3 h-3" />
              Scheduled
          </div>
        </div>
      );
    }

    if (isEnded) {
      return (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Ended
          </div>
        </div>
      );
    }

    return null;
  };

  const getTimeInfo = () => {
    if (isLive) {
      return (
        <div className="flex items-center gap-1 text-red-600 font-semibold">
          <Eye className="w-4 h-4" />
          <span>{livestream.currentViewers.toLocaleString()} viewers</span>
        </div>
      );
    }

    if (isScheduled && livestream.scheduledAt) {
      return (
        <div className="flex items-center gap-1 text-blue-600 text-sm">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDistanceToNow(new Date(livestream.scheduledAt), {
              addSuffix: true,
              locale: enUS,
            })}
          </span>
        </div>
      );
    }

    if (isEnded && livestream.endedAt) {
      return (
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Eye className="w-4 h-4" />
          <span>{livestream.totalViews.toLocaleString()} views</span>
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/client/livestreams/${livestream.id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 overflow-hidden">
            {getStatusBadge()}

            {livestream.thumbnailUrl ? (
              <Image
                src={livestream.thumbnailUrl}
                alt={livestream.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl text-cyan-300">🎥</div>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
              {livestream.title}
            </h3>

            {/* Description */}
            {livestream.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {livestream.description}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              {/* Host info */}
              <div className="flex items-center gap-2">
                {livestream.user.avatar ? (
                  <Image
                    src={livestream.user.avatar}
                    alt={livestream.user.fullName}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="text-sm text-gray-700 font-medium">
                  {livestream.user.fullName}
                </span>
              </div>

              {/* Time/Viewer info */}
              <div className="text-sm">{getTimeInfo()}</div>
            </div>

            {/* Products count */}
            {livestream.products && livestream.products.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>🏷️</span>
                  <span>{livestream.products.length} products</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
