"use client";

import ChatUserItem from "./ChatUserItem";

interface Props {
  users: any[];
  selectedUserId?: number;
  onSelect: (userId: number) => void;
}

export default function AdminChatSidebar({
  users,
  selectedUserId,
  onSelect,
}: Props) {
  return (
    <div className="w-[320px] border-r bg-white flex flex-col">
      <div className="p-3 border-b font-semibold">Khách hàng</div>

      <div className="flex-1 overflow-y-auto space-y-1 p-2">
        {users.map((u) => (
          <ChatUserItem
            key={u.id}
            user={u}
            active={u.id === selectedUserId}
            onClick={() => onSelect(u.id)}
          />
        ))}
      </div>
    </div>
  );
}
