'use client'

import React from "react"
import { Bell, Package, Tag, Info } from "lucide-react"
import Content from "@/app/(client)/my-account/_components/Content"

const notifications = [
    {
        id: 1,
        type: "order",
        title: "Your order has been shipped",
        message: "The order #15673 has been shipped. You can track it now.",
        time: "5 minutes ago",
        read: false,
    },
    {
        id: 2,
        type: "promo",
        title: "New promotion: 20% off on sushi 🍣",
        message: "Enjoy 20% discount on all Japanese sushi this weekend only!",
        time: "2 hours ago",
        read: true,
    },
    {
        id: 3,
        type: "system",
        title: "System maintenance notice",
        message: "We'll be performing scheduled maintenance on Oct 10, 1 AM–3 AM.",
        time: "1 day ago",
        read: true,
    },
]

// Hàm chọn icon theo type
const getIconByType = (type: string) => {
    switch (type) {
        case "order":
            return <Package className="w-5 h-5 text-blue-500" />
        case "promo":
            return <Tag className="w-5 h-5 text-green-500" />
        case "system":
            return <Info className="w-5 h-5 text-red-500" />
        default:
            return <Bell className="w-5 h-5 text-gray-400" />
    }
}

export default function NotificationsPage() {
    return (
        <Content title="My Notifications">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        Mark all as read
                    </button>
                </div>

                {/* Notifications list */}
                <div className="flex flex-col divide-y divide-gray-100 bg-white rounded-xl border border-gray-100 shadow-sm">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-all duration-200 ${!n.read ? "bg-yellow-50" : ""
                                }`}
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 flex-shrink-0">
                                {getIconByType(n.type)}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <h3
                                        className={`text-sm font-semibold ${n.read ? "text-gray-700" : "text-gray-900"
                                            }`}
                                    >
                                        {n.title}
                                    </h3>
                                    {!n.read && (
                                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-1"></span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                                <span className="text-xs text-gray-400 mt-1 block">{n.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Content>

    )
}
