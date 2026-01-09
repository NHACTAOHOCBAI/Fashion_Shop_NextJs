"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  JoinStreamDto,
  SendMessageDto,
  PinProductDto,
  UnpinProductDto,
  TrackProductClickDto,
  LeaveStreamDto,
  ViewerJoinedEvent,
  ViewerLeftEvent,
  NewLiveMessageEvent,
  ProductPinnedEvent,
  ProductUnpinnedEvent,
  MessageDeletedEvent,
  MessagePinnedEvent,
  LivestreamStartedEvent,
  LivestreamEndedEvent,
} from "@/interfaces/livestream";

const SOCKET_URL = process.env.NEXT_PUBLIC_BE_BASE_URL?.replace('/api/v1', '') || "http://localhost:4000";

interface LivestreamSocketEvents {
  // Outgoing events
  join_livestream: (data: JoinStreamDto) => void;
  leave_livestream: (data: LeaveStreamDto) => void;
  send_live_message: (data: SendMessageDto) => void;
  pin_live_product: (data: PinProductDto) => void;
  unpin_live_product: (data: UnpinProductDto) => void;
  track_product_click: (data: TrackProductClickDto) => void;
  delete_live_message: (data: { messageId: number; livestreamId: number }) => void;
  pin_live_message: (data: { messageId: number; livestreamId: number }) => void;
  viewer_heartbeat: (data: { livestreamId: number }) => void;

  // Incoming events
  viewer_joined: (data: ViewerJoinedEvent) => void;
  viewer_left: (data: ViewerLeftEvent) => void;
  new_live_message: (data: NewLiveMessageEvent) => void;
  product_pinned: (data: ProductPinnedEvent) => void;
  product_unpinned: (data: ProductUnpinnedEvent) => void;
  message_deleted: (data: MessageDeletedEvent) => void;
  message_pinned: (data: MessagePinnedEvent) => void;
  livestream_started: (data: LivestreamStartedEvent) => void;
  livestream_ended: (data: LivestreamEndedEvent) => void;
  joined_livestream: (data: { success: boolean; message: string; viewerCount: number }) => void;
  error: (data: { success: false; message: string }) => void;
  product_click_tracked: (data: { success: boolean; productId: number }) => void;
}

export type LivestreamSocket = Socket<LivestreamSocketEvents, LivestreamSocketEvents>;

interface UseLivestreamSocketOptions {
  userId?: number;
  autoConnect?: boolean;
}

export const useLivestreamSocket = (options?: UseLivestreamSocketOptions) => {
  const { userId, autoConnect = true } = options || {};
  const [socket, setSocket] = useState<LivestreamSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<LivestreamSocket | null>(null);

  useEffect(() => {
    if (!autoConnect) return;

    // Create socket connection to /livestreams namespace
    const s = io(`${SOCKET_URL}/livestreams`, {
      withCredentials: true,
      transports: ["websocket"],
      auth: userId ? { userId: userId.toString() } : undefined,
      query: userId ? { userId: userId.toString() } : undefined,
    }) as LivestreamSocket;

    socketRef.current = s;
    setSocket(s);

    // Connection event handlers
    s.on("connect", () => {
      console.log("✅ Connected to livestream socket");
      setIsConnected(true);
    });

    s.on("disconnect", () => {
      console.log("❌ Disconnected from livestream socket");
      setIsConnected(false);
    });

    s.on("error", (error) => {
      console.error("⚠️ Livestream socket error:", error);
    });

    return () => {
      s.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    };
  }, [userId, autoConnect]);

  const joinLivestream = useCallback((data: JoinStreamDto) => {
    console.log("[Socket] 🚪 Joining livestream:", data);
    socketRef.current?.emit("join_livestream", data);
  }, []);

  const leaveLivestream = useCallback((data: LeaveStreamDto) => {
    console.log("[Socket] 🚪 Leaving livestream:", data);
    socketRef.current?.emit("leave_livestream", data);
  }, []);

  const sendMessage = useCallback((data: SendMessageDto) => {
    console.log("[Socket] 💬 Sending message:", data);
    socketRef.current?.emit("send_live_message", data);
  }, []);

  const pinProduct = useCallback((data: PinProductDto) => {
    socketRef.current?.emit("pin_live_product", data);
  }, []);

  const unpinProduct = useCallback((data: UnpinProductDto) => {
    socketRef.current?.emit("unpin_live_product", data);
  }, []);

  const trackProductClick = useCallback((data: TrackProductClickDto) => {
    socketRef.current?.emit("track_product_click", data);
  }, []);

  const deleteMessage = useCallback((messageId: number, livestreamId: number) => {
    socketRef.current?.emit("delete_live_message", { messageId, livestreamId });
  }, []);

  const pinMessage = useCallback((messageId: number, livestreamId: number) => {
    socketRef.current?.emit("pin_live_message", { messageId, livestreamId });
  }, []);

  const sendHeartbeat = useCallback((livestreamId: number) => {
    socketRef.current?.emit("viewer_heartbeat", { livestreamId });
  }, []);

  return {
    socket,
    isConnected,
    // Helper methods
    joinLivestream,
    leaveLivestream,
    sendMessage,
    pinProduct,
    unpinProduct,
    trackProductClick,
    deleteMessage,
    pinMessage,
    sendHeartbeat,
  };
};
