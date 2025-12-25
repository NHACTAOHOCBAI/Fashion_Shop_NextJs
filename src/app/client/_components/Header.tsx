"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDepartments } from "@/hooks/queries/useDepartment";
import { cn } from "@/lib/utils";
import { useSocket } from "@/providers/socketProvider";
import { getMyNotifications } from "@/services/notification.service";
import {
  Bell,
  Heart,
  ListOrdered,
  ShoppingBag,
  ShoppingCart,
  Tag,
  TicketPercent,
  User,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const accountMenus = [
  {
    href: "/client/my-account/order-news",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/client/my-account/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/client/my-account/orders",
    label: "Orders",
    icon: ListOrdered,
  },
  {
    href: "/client/my-account/coupons",
    label: "Coupons",
    icon: Tag,
  },
  {
    href: "/client/my-account/wishlist",
    label: "Wishlists",
    icon: Heart,
  },
];
const formatTimeAgo = (date: Date | string) => {
  const now = new Date().getTime();
  const past = new Date(date).getTime();
  const diff = Math.floor((now - past) / 1000); // seconds

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const Content = ({
  items,
  origin,
}: {
  items: {
    id: number;
    name: string;
  }[];
  origin: string;
}) => {
  return (
    <div className="grid grid-cols-4 gap-x-6 gap-y-2">
      {items.map((item) => (
        <a
          key={item.id}
          href={`/client/products/${origin}?category=${item.id}`}
          className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#40BFFF] hover:translate-x-1 transition-all font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

const Header = () => {
  // const { data: myNotification } = useGetNotification({ isRead: "false" });
  const router = useRouter();
  const { data: headerData } = useDepartments({});
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socket = useSocket();
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getMyNotifications({});
      const unreadCount = res.data.reduce((total, item) => {
        if (item.isRead === false) return total + 1;
        return total;
      }, 0);
      setNotifications(res.data);
      setUnreadCount(unreadCount);
    };

    fetchNotifications();
  }, []);
  useEffect(() => {
    if (!socket) return;

    socket.on("notification:new", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((c) => c + 1);
    });

    return () => {
      socket.off("notification:new");
    };
  }, [socket]);
  // console.log(notifications);
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Top Bar - Icons Row */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="w-[1240px] mx-auto flex justify-end gap-3 py-3">
          <button
            onClick={() => router.push("/client/my-account/wishlist")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#40BFFF] transition-colors"
          >
            <Heart size={20} />
          </button>

          <button
            onClick={() => router.push("/client/cart")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#40BFFF] transition-colors"
          >
            <ShoppingCart size={20} />
          </button>

          {/* Notification */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#40BFFF] transition-colors">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[360px]">
              <Notification notifications={notifications} />
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#40BFFF] transition-colors">
                <User size={20} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="px-3 py-2 flex gap-3 items-center border-b border-gray-100 dark:border-gray-800">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <UserIcon size={16} className="text-gray-500" />
                  </div>
                )}
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {user?.fullName}
                </p>
              </div>
              <div className="flex flex-col py-1">
                {accountMenus.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#40BFFF] rounded-md transition-colors"
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Main Header - Logo & Navigation */}
      <div className="w-[1240px] mx-auto py-4 flex items-center">
        <Link
          href="/client"
          className="text-2xl font-bold text-gray-800 dark:text-gray-100"
        >
          LOGO HERE
        </Link>

        <nav className="flex-1 ml-12">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href="/client"
                className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#40BFFF] transition-colors"
              >
                Home
              </Link>
            </li>
            {headerData?.data.map((department) => (
              <SubCatgories
                key={department.name}
                content={
                  <Content
                    items={department.categories}
                    origin={department.name}
                  />
                }
              >
                <li className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#40BFFF] transition-colors cursor-pointer">
                  {department.name}
                </li>
              </SubCatgories>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
interface SubCatgoriesProps {
  children: React.ReactNode;
  content: React.ReactNode;
}
const SubCatgories = ({ children, content }: SubCatgoriesProps) => {
  return (
    <div className="group inline-block ">
      {children}
      <div
        className="
        top-[105px]
          select-none
          absolute z-10
          bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6
          shadow-lg w-[1240px]
          left-0 right-0 mx-auto
           mt-0
          opacity-0 invisible translate-y-2
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
          transition-all duration-200 ease-out
          pointer-events-none group-hover:pointer-events-auto
        "
      >
        {content}
      </div>
    </div>
  );
};
const Notification = ({ notifications }: { notifications: Notification[] }) => {
  const myNotification = notifications.slice(0, 6);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const router = useRouter();

  return (
    <div className="w-[380px]">
      {/* Header */}
      <div className="px-4 py-3 w-[360px] border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center ">
          <div className="flex items-center gap-2 justify-between ">
            <h5 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Notifications
            </h5>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-[#40BFFF] text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="ml-[50px]">
            {notifications.length > 0 && (
              <button className="text-xs font-medium text-[#40BFFF] hover:text-[#33A0DD] transition-colors">
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-[420px] overflow-y-auto">
        {myNotification.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
              <Bell className="w-8 h-8 text-gray-400 dark:text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              No notifications yet
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We'll notify you when something arrives
            </p>
          </div>
        ) : (
          <>
            {myNotification.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                item={notification}
                index={index}
              />
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => router.push("/client/my-account/order-news")}
            className="w-full text-center text-sm font-medium text-[#40BFFF] hover:text-[#33A0DD] transition-colors py-1"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

const NotificationItem = ({
  item,
  index,
}: {
  item: Notification;
  index?: number;
}) => {
  const router = useRouter();

  const Icon = item.type === "ORDER" ? ShoppingBag : TicketPercent;

  const getNotificationStyle = () => {
    if (item.type === "ORDER") {
      return {
        iconBg:
          "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        borderColor: "border-blue-200 dark:border-blue-800",
      };
    }
    return {
      iconBg:
        "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-800",
    };
  };

  const style = getNotificationStyle();

  return (
    <div
      onClick={() => router.replace("/client/my-account/order-news")}
      className={cn(
        "group relative px-4 py-3.5 cursor-pointer transition-all duration-200",
        "hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent dark:hover:from-gray-800 dark:hover:to-transparent",
        !item.isRead &&
          "bg-gradient-to-r from-blue-50/30 to-transparent dark:from-blue-900/5 dark:to-transparent",
        "border-b border-gray-100 dark:border-gray-800 last:border-0"
      )}
      style={{
        animationDelay: `${(index || 0) * 50}ms`,
      }}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
            "group-hover:scale-105 transition-transform duration-200",
            style.iconBg
          )}
        >
          <Icon size={18} className={style.iconColor} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p
              className={cn(
                "text-sm leading-snug text-gray-800 dark:text-gray-200",
                !item.isRead ? "font-semibold" : "font-medium"
              )}
            >
              {item.title}
            </p>
            {!item.isRead && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="w-2 h-2 bg-[#40BFFF] rounded-full animate-pulse" />
              </div>
            )}
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {item.message}
          </p>

          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-[10px] text-gray-500 dark:text-gray-500">
              {formatTimeAgo(item.createdAt)}
            </p>
            {!item.isRead && (
              <>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-400" />
                <span className="text-[10px] font-medium text-[#40BFFF]">
                  New
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Unread indicator bar */}
      {!item.isRead && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#40BFFF] to-transparent rounded-r" />
      )}
    </div>
  );
};
export default Header;
