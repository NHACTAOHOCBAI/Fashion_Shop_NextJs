"use client";

import { useEffect, useState } from "react";
import { LivestreamSocket } from "@/hooks/useLivestreamSocket";
import { ViewerJoinedEvent, ViewerLeftEvent } from "@/interfaces/livestream";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface ViewerCounterProps {
  initialCount: number;
  socket?: LivestreamSocket | null;
}

export const ViewerCounter = ({ initialCount, socket }: ViewerCounterProps) => {
  const [viewerCount, setViewerCount] = useState(initialCount);

  useEffect(() => {
    setViewerCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (!socket) return;

    const handleViewerJoined = (data: ViewerJoinedEvent) => {
      setViewerCount(data.viewerCount);
    };

    const handleViewerLeft = (data: ViewerLeftEvent) => {
      setViewerCount(data.viewerCount);
    };

    socket.on("viewer_joined", handleViewerJoined);
    socket.on("viewer_left", handleViewerLeft);

    return () => {
      socket.off("viewer_joined", handleViewerJoined);
      socket.off("viewer_left", handleViewerLeft);
    };
  }, [socket]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg"
    >
      <Eye className="w-5 h-5" />
      <motion.span
        key={viewerCount}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="font-bold text-lg"
      >
        {viewerCount.toLocaleString()}
      </motion.span>
      <span className="text-sm opacity-90">watching</span>
    </motion.div>
  );
};
