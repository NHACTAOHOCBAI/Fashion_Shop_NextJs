"use client";

import { ReactionType as ReactionTypeEnum, REACTION_ICONS, REACTION_LABELS } from "@/constants/reaction.enum";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReactionPickerProps {
  onReact: (type: ReactionType) => void;
  currentReaction?: ReactionType | null;
  className?: string;
}

const ReactionPicker = ({ onReact, currentReaction, className }: ReactionPickerProps) => {
  const reactions: ReactionType[] = [
    'LIKE',
    'LOVE',
    'HAHA',
    'WOW',
    'SAD',
    'ANGRY',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "absolute bottom-full left-0 mb-2 flex items-center gap-1 rounded-full bg-white dark:bg-gray-800 px-3 py-2 shadow-lg border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {reactions.map((reaction, index) => (
        <motion.button
          key={reaction}
          onClick={() => onReact(reaction)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.3, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "relative group flex items-center justify-center w-10 h-10 rounded-full transition-all",
            currentReaction === reaction && "bg-gray-100 dark:bg-gray-700"
          )}
          title={REACTION_LABELS[reaction]}
        >
          <span className="text-2xl">{REACTION_ICONS[reaction]}</span>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-1 hidden group-hover:block">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {REACTION_LABELS[reaction]}
            </div>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ReactionPicker;
