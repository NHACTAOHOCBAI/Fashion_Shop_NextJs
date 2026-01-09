"use client";

import { useEffect, useRef, useState } from "react";
import { Livestream, LivestreamStatus } from "../../interfaces/livestream";
import { motion } from "framer-motion";
import { Eye, Volume2, VolumeX, Maximize, Loader2, Play } from "lucide-react";

interface LivestreamPlayerProps {
  livestream: Livestream;
  viewerCount: number;
}

export const LivestreamPlayer = ({
  livestream,
  viewerCount,
}: LivestreamPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted to allow autoplay
  const [error, setError] = useState<string | null>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false); // Track if user click needed

  const isLive = livestream.status === LivestreamStatus.Live;

  // Construct stream URL (HTTP-FLV from node-media-server)
  const streamUrl = isLive
    ? `http://localhost:8000/live/${livestream.streamKey}.flv`
    : livestream.recordingUrl || null;

  useEffect(() => {
    console.log("[LivestreamPlayer] Component mounted", {
      isLive,
      streamKey: livestream.streamKey,
      streamUrl,
      status: livestream.status
    });

    if (!streamUrl || !videoRef.current) {
      console.warn("[LivestreamPlayer] No stream URL or video ref");
      setIsLoading(false);
      return;
    }

    let flvPlayer: any = null;
    let mounted = true;

    // For FLV playback, you'll need flv.js library
    // Install: npm install flv.js @types/flv.js
    import("flv.js")
      .then((flvjs) => {
        if (!mounted) return;

        if (!flvjs.default.isSupported()) {
          setError("Browser does not support FLV playback.");
          setIsLoading(false);
          return;
        }

        if (!videoRef.current) {
          setIsLoading(false);
          return;
        }

        flvPlayer = flvjs.default.createPlayer({
          type: "flv",
          url: streamUrl,
          isLive: isLive,
          hasAudio: true,
          hasVideo: true,
          cors: true,
        });

        console.log("[LivestreamPlayer] FLV player created", { streamUrl, isLive });

        flvPlayer.attachMediaElement(videoRef.current);
        flvPlayer.load();

        console.log("[LivestreamPlayer] Player attached and loading...");

        // Set video to muted first to allow autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
        }

        // Event listeners
        flvPlayer.on(flvjs.default.Events.METADATA_ARRIVED, () => {
          console.log("[LivestreamPlayer] ✅ Stream metadata arrived");
          setIsLoading(false);
          // Try to play after metadata arrives
          attemptAutoplay();
        });

        flvPlayer.on(flvjs.default.Events.LOADING_COMPLETE, () => {
          console.log("[LivestreamPlayer] ✅ Loading complete");
          setIsLoading(false);
        });

        flvPlayer.on(flvjs.default.Events.ERROR, (errorType: string, errorDetail: string, errorInfo: any) => {
          console.error("[LivestreamPlayer] ❌ FLV Player error:", { errorType, errorDetail, errorInfo });
          
          let errorMessage = "Error loading stream.";
          
          if (errorType === 'NetworkError') {
            errorMessage = "Cannot connect to stream. Please check if backend is running on port 8000.";
          } else if (errorType === 'MediaError') {
            errorMessage = "Media playback error. The stream may not be ready yet.";
          }
          
          setError(errorMessage);
          setIsLoading(false);
        });

        // Attempt autoplay with error handling
        const attemptAutoplay = () => {
          if (!videoRef.current || !flvPlayer || !mounted) return;

          console.log("[LivestreamPlayer] Attempting autoplay...");
          
          videoRef.current
            .play()
            .then(() => {
              console.log("[LivestreamPlayer] ✅ Autoplay started successfully (muted)");
              setNeedsInteraction(false);
            })
            .catch((err: any) => {
              console.warn("[LivestreamPlayer] ⚠️ Autoplay prevented:", err.message);
              // Browser blocked autoplay - show "Click to Play" button
              setNeedsInteraction(true);
              setIsLoading(false);
            });
        };

        // Try autoplay after a longer delay to let stream buffer
        setTimeout(() => {
          attemptAutoplay();
        }, 1500); // Increased from 500ms to 1500ms
      })
      .catch((err) => {
        console.error("[LivestreamPlayer] Failed to load flv.js:", err);
        setError("Cannot load video player. Please install flv.js.");
        setIsLoading(false);
      });

    return () => {
      mounted = false;
      if (flvPlayer) {
        try {
          flvPlayer.pause();
          flvPlayer.unload();
          flvPlayer.detachMediaElement();
          flvPlayer.destroy();
        } catch (e) {
          console.error("Error destroying player:", e);
        }
      }
    };
  }, [streamUrl, isLive]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleUserPlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Keep muted for first play
      videoRef.current
        .play()
        .then(() => {
          console.log("Manual play successful");
          setNeedsInteraction(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Manual play failed:", err);
          setError("Cannot play video. Please refresh the page.");
        });
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  if (!isLive && !livestream.recordingUrl) {
    return (
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">📹</div>
          <h3 className="text-2xl font-bold mb-2">Livestream has not started yet</h3>
          <p className="text-gray-400">
            {livestream.scheduledAt
              ? `Scheduled: ${new Date(livestream.scheduledAt).toLocaleString("en-US")}`
              : "Please check back later"}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative aspect-video bg-gradient-to-br from-red-900 to-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold mb-2">Video Playback Error</h3>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden group">
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        playsInline
        muted={isMuted}
        onCanPlay={() => {
          console.log("[LivestreamPlayer] ✅ Video canPlay event - clearing loading");
          setIsLoading(false);
        }}
        onPlaying={() => {
          console.log("[LivestreamPlayer] ✅ Video playing event - clearing loading");
          setIsLoading(false);
        }}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-3" />
            <p className="text-lg">Loading livestream...</p>
          </div>
        </div>
      )}

      {/* Click to Play overlay (when browser blocks autoplay) */}
      {needsInteraction && !isLoading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
          <motion.button
            onClick={handleUserPlay}
            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Play className="w-6 h-6 fill-white" />
            Click to Play Stream
          </motion.button>
        </div>
      )}

      {/* Live badge */}
      {isLive && (
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            LIVE
          </motion.div>
        </div>
      )}

      {/* Viewer count */}
      <div className="absolute top-4 right-4 z-10 bg-black/70 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm">
        <Eye className="w-4 h-4" />
        <span>{viewerCount.toLocaleString()}</span>
      </div>

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
