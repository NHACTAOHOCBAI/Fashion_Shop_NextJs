"use client";

import { MessageCircle } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function ChatFloatingButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
