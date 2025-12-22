"use client";

export default function ChatHeader({ title }: { title: string }) {
  return (
    <div className="h-14 flex items-center px-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          {title.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-green-500">Đang hoạt động</div>
        </div>
      </div>
    </div>
  );
}
