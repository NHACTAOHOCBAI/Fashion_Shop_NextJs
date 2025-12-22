"use client";

import { Send } from "lucide-react";

export default function ChatInput({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="p-3 bg-white flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Aa"
        className="flex-1 rounded-full bg-gray-100 px-4 py-2 outline-none text-sm"
      />
      <button
        onClick={onSend}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white"
      >
        <Send size={16} />
      </button>
    </div>
  );
}
