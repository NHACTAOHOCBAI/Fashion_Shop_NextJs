import { formatMessageTime } from "@/components/chat/chatWindow";
import clsx from "clsx";

interface Props {
  user: {
    id: number;
    fullName: string;
    avatar?: string;
    lastMessage?: string;
    lastTime?: string;
    unreadCount?: number;
  };
  active?: boolean;
  onClick: () => void;
}

export default function ChatUserItem({ user, active, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg",
        active ? "bg-blue-50" : "hover:bg-gray-100"
      )}
    >
      {/* Avatar */}
      <div className="relative">
        {user.avatar ? (
          <img
            src={user.avatar}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {user.fullName.charAt(0)}
          </div>
        )}

        {/* online dot (optional) */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium truncate">{user.fullName}</p>
          {user.lastTime && (
            <span className="text-xs text-gray-400">
              {formatMessageTime(user.lastTime)}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 truncate">
            {user.lastMessage || "Chưa có tin nhắn"}
          </p>

          {user.unreadCount ? (
            <span className="bg-blue-500 text-white text-xs px-2 rounded-full">
              {user.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
