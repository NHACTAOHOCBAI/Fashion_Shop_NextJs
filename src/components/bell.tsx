"use client";
import { useEffect, useState } from "react";
import { connectSocket } from "../lib/socket";

export default function NotificationBell({ userId }: { userId: number | undefined }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (!userId)
            return;
        const socket = connectSocket(userId);

        socket.on("notification:new", (data: Notification) => {
            setNotifications((prev) => [data, ...prev]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    const unread = notifications.filter((n) => !n.isRead).length;

    return (
        <div className="relative">
            <button className="relative text-2xl">
                🔔
                {unread > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                        {unread}
                    </span>
                )}
            </button>

            <div className="absolute right-0 mt-3 bg-white shadow-md w-80 rounded-lg">
                {notifications.map((n) => (
                    <div key={n.id} className="p-3 border-b hover:bg-gray-100">
                        <div className="font-medium text-sm">
                            {n.title}
                        </div>
                        <p className="text-xs text-gray-500">{n.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
