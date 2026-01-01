"use client";

import { useState } from "react";
import { ReactionType as ReactionTypeEnum, REACTION_ICONS, REACTION_COLORS, REACTION_LABELS } from "@/constants/reaction.enum";
import { AnimatePresence } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactionPicker from "./ReactionPicker";

interface ReactionButtonProps {
  postId: number;
  currentReaction?: ReactionType | null;
  totalReactions: number;
  reactionCounts?: Record<ReactionType, number>;
  onReact: (postId: number, type: ReactionType) => void;
  isPending?: boolean;
}

const ReactionButton = ({
  postId,
  currentReaction,
  totalReactions,
  reactionCounts,
  onReact,
  isPending,
}: ReactionButtonProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleReact = (type: ReactionType) => {
    onReact(postId, type);
    setShowPicker(false);
  };

  const handleQuickReact = () => {
    // Quick react: Toggle LIKE if no reaction, remove if already reacted
    if (!currentReaction) {
      onReact(postId, 'LIKE');
    } else {
      onReact(postId, currentReaction); // Toggle off
    }
  };

  // Get top 3 reactions for display
  const getTopReactions = () => {
    if (!reactionCounts) return [];

    return Object.entries(reactionCounts)
      .filter(([_, count]) => count > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type as ReactionType);
  };

  const topReactions = getTopReactions();

  return (
    <div className="relative flex items-center gap-2">
      {/* Reaction Button */}
      <div className="relative">
        <button
          onClick={handleQuickReact}
          onMouseEnter={() => setShowPicker(true)}
          onMouseLeave={() => setShowPicker(false)}
          disabled={isPending}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
            currentReaction && REACTION_COLORS[currentReaction],
            isPending && "opacity-50 cursor-not-allowed"
          )}
        >
          {currentReaction ? (
            <>
              <span className="text-lg">{REACTION_ICONS[currentReaction]}</span>
              <span className="text-sm font-medium">
                {REACTION_LABELS[currentReaction]}
              </span>
            </>
          ) : (
            <>
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">Like</span>
            </>
          )}
        </button>

        {/* Reaction Picker */}
        <AnimatePresence>
          {showPicker && (
            <div
              onMouseEnter={() => setShowPicker(true)}
              onMouseLeave={() => setShowPicker(false)}
            >
              <ReactionPicker
                onReact={handleReact}
                currentReaction={currentReaction}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Reaction Count Display */}
      {totalReactions > 0 && (
        <div className="flex items-center gap-1">
          {topReactions.length > 0 && (
            <div className="flex items-center -space-x-1">
              {topReactions.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center justify-center w-5 h-5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700"
                  title={REACTION_LABELS[type]}
                >
                  <span className="text-xs">{REACTION_ICONS[type]}</span>
                </span>
              ))}
            </div>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {totalReactions}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReactionButton;
