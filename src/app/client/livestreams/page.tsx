"use client";

import { useState } from "react";
import { useGetActiveLivestreams, useGetAllLivestreams } from "@/hooks/queries/useLivestream";
import { LivestreamCard } from "@/components/livestream";
import { LivestreamStatus } from "../../../interfaces/livestream";
import { motion } from "framer-motion";
import { Radio, Calendar, Clock, Loader2 } from "lucide-react";
import Link from "next/link";

type FilterTab = "all" | "live" | "scheduled" | "ended";

export default function LivestreamsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("live");
  const [page, setPage] = useState(1);

  const { data: activeLivestreams, isLoading: isLoadingActive } = useGetActiveLivestreams();
  const { data: allLivestreams, isLoading: isLoadingAll } = useGetAllLivestreams({
    page,
    limit: 12,
    status: activeTab === "all" ? undefined :
           activeTab === "live" ? LivestreamStatus.Live :
           activeTab === "scheduled" ? LivestreamStatus.Scheduled :
           LivestreamStatus.Ended,
  });

  const isLoading = activeTab === "live" ? isLoadingActive : isLoadingAll;
  const livestreams = activeTab === "live" ? activeLivestreams : allLivestreams?.data;

  const tabs = [
    { id: "live" as FilterTab, label: "Live", icon: Radio, color: "text-red-600" },
    { id: "scheduled" as FilterTab, label: "Scheduled", icon: Calendar, color: "text-blue-600" },
    { id: "ended" as FilterTab, label: "Ended", icon: Clock, color: "text-gray-600" },
    { id: "all" as FilterTab, label: "All", icon: null, color: "text-gray-800" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Livestream FShop
            </h1>
            <p className="text-gray-600 text-lg">
              Discover the latest livestreams and shop live
            </p>
          </motion.div>

          {/* Active livestreams count */}
          {activeLivestreams && activeLivestreams.length > 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 bg-white rounded-full"
                />
                <span className="font-bold text-lg">
                  {activeLivestreams.length} livestreams are currently live
                </span>
              </div>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setPage(1);
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:shadow-md hover:scale-102"
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab.icon && <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-white" : tab.color}`} />}
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading livestreams...</p>
            </div>
          </div>
        ) : livestreams && livestreams.length > 0 ? (
          <>
            {/* Livestream grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            >
              {livestreams.map((livestream, index) => (
                <motion.div
                  key={livestream.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <LivestreamCard livestream={livestream} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {allLivestreams && allLivestreams.meta && allLivestreams.meta.totalPages > 1 && activeTab !== "live" && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-white text-gray-700 font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, allLivestreams.meta.totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          page === pageNum
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(allLivestreams.meta.totalPages, p + 1))}
                  disabled={page === allLivestreams.meta.totalPages}
                  className="px-4 py-2 rounded-lg bg-white text-gray-700 font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-4">📹</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No livestreams available
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === "live" && "No livestreams are currently live"}
              {activeTab === "scheduled" && "No livestreams are scheduled"}
              {activeTab === "ended" && "No livestreams have ended"}
              {activeTab === "all" && "Please check back later"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
