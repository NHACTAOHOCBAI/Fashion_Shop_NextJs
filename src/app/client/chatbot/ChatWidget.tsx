"use client";

import { AnimatePresence, motion } from "framer-motion";
import ChatBox from "./ChatBox";
import { X } from "lucide-react";
import ChatbotWindow from "@/app/client/chatbot/ChatBotWindow";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChatWidget({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[95vw]"
        >
          <div className="relative rounded-2xl border bg-background shadow-xl max-h-[80vh] flex flex-col">
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <ChatbotWindow />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
