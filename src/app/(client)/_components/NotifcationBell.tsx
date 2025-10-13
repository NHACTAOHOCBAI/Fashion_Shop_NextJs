"use client";
import * as React from "react";
import { Bell } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface Notification {
    id: number;
    image: string;
    title: string;
    message: string;
    isRead: boolean;
    time: string
};
const notifications: Notification[] = [
    {
        id: 1,
        image: "/avatar1.jpg",
        title: "Dennis Nedry",
        message: "commented on Isla Nublar SOC2 compliance report",
        time: "Last Wednesday at 9:42 AM",
        isRead: false,
    },
    {
        id: 2,
        image: "/avatar2.jpg",
        title: "Ellie Sattler",
        message: "updated Dinosaur Habitat checklist",
        time: "Yesterday at 3:15 PM",
        isRead: true,
    },
];

export default function NotificationBell() {
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full shadow">
                        {unreadCount}
                    </span>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-96 bg-white rounded-2xl shadow-lg p-0 overflow-hidden">
                <DropdownMenuLabel className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-700">
                    Notifications
                </DropdownMenuLabel>

                {notifications.length === 0 && (
                    <DropdownMenuItem className="px-4 py-3 text-gray-400 text-center cursor-default hover:bg-white">
                        No new notifications
                    </DropdownMenuItem>
                )}

                {notifications.map((n) => (
                    <DropdownMenuItem
                        key={n.id}
                        className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${n.isRead ? "" : "bg-gray-50"
                            }`}
                    >
                        <img
                            src={n.image}
                            alt={n.title}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 flex flex-col gap-1">
                            <span className="text-gray-800 text-sm">
                                <span className="font-semibold">{n.title}</span> {n.message}
                            </span>
                            <span className="text-gray-400 text-xs">{n.time}</span>
                        </div>
                    </DropdownMenuItem>
                ))}

                <DropdownMenuItem className="px-4 py-2 border-t border-gray-200 text-center text-blue-600 hover:bg-gray-50 font-medium">
                    View all
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
