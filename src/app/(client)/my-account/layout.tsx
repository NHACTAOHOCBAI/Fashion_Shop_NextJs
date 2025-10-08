'use client'
import * as React from "react"
import { ICONS } from "@/constants/icon.enum"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
    { key: "orders", label: "Orders", icon: ICONS.ORDER, href: "/my-account/orders" },
    { key: "addresses", label: "Addresses", icon: ICONS.ADDRESS, href: "/my-account/addresses" },
    { key: "profile", label: "Profile", icon: ICONS.PROFILE, href: "/my-account/profile" },
    { key: "wishlist", label: "Wishlist", icon: ICONS.HEAER_SIDEBAR, href: "/my-account/wishlist" },
    { key: "notifications", label: "Notifications", icon: ICONS.NOTIFICATION, href: "/my-account/notifications" },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const urls = pathname.split("/")
    const currentTab = urls[2] // ví dụ: /my-account/orders => urls[2] = "orders"

    return (
        <div className="flex gap-[10px]">
            <aside className="w-[240px] border-r bg-white shadow-sm rounded-xl">
                <div className="p-4">
                    <nav className="flex flex-col gap-1">
                        {menuItems.map((item) => {
                            const isActive = currentTab === item.key
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive
                                        ? "bg-yellow-300 text-black font-semibold"
                                        : "text-gray-600 hover:bg-yellow-100"
                                        }`}
                                >
                                    <span className="text-xl w-6 text-center">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </aside>
            <main className="flex-1 border-r bg-white shadow-sm rounded-xl p-[10px]">
                {children}
            </main>
        </div>
    )
}
