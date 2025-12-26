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
  Package,
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
import { motion } from "framer-motion";
import { staggerContainer, staggerItemFast } from "@/lib/animations";
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
    icon: Package,
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
            <PopoverContent className="w-64 p-0">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Enhanced User Info Section */}
                <div className="px-4 py-3 bg-gradient-to-r from-[#40BFFF]/5 to-transparent border-b border-gray-100 dark:border-gray-800">
                  <div className="flex gap-3 items-center">
                    {user?.avatar ? (
                      <div className="relative">
                        <Image
                          src={user.avatar}
                          alt="User avatar"
                          width={40}
                          height={40}
                          className="rounded-full object-cover ring-2 ring-[#40BFFF]/20"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#40BFFF] to-[#33A0DD] flex items-center justify-center ring-2 ring-[#40BFFF]/20">
                        <UserIcon size={20} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items with Stagger Animation */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="py-2"
                >
                  {accountMenus.map(({ href, label, icon: Icon }) => (
                    <motion.div key={href} variants={staggerItemFast}>
                      <Link
                        href={href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#40BFFF]/10 hover:text-[#40BFFF] dark:hover:text-[#40BFFF] transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-[#40BFFF]/20 transition-colors">
                          <Icon
                            size={16}
                            className="group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <span className="font-medium">{label}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={staggerItemFast}>
                    <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#40BFFF]/10 hover:text-[#40BFFF] dark:hover:text-[#40BFFF] transition-all duration-200 group">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-[#40BFFF]/20 transition-colors">
                        <Package
                          size={16}
                          className="group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="font-medium">Logout</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Main Header - Logo & Navigation */}
      <div className="w-[1240px] mx-auto py-4 flex items-center">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={1000}
          height={1000}
          priority
          className=" object-cover w-[200px] h-[40px]"
        />

        <nav className="flex-1 ml-12">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href="/client/home"
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
            <li>
              <Link
                href="/client/community"
                className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#40BFFF] transition-colors"
              >
                Community
              </Link>
            </li>
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
        top-[110px]
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
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#40BFFF] flex-shrink-0" />
            <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
              Notifications
            </h6>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#40BFFF] text-white rounded-full flex-shrink-0">
                {unreadCount}
              </span>
            )}
          </div>
          {notifications.length > 0 && (
            <button className="text-xs font-medium text-[#40BFFF] hover:text-[#33A0DD] transition-colors mr-[20px]">
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-[400px] overflow-y-auto">
        {myNotification.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
              <Bell className="w-7 h-7 text-gray-400 dark:text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              No notifications
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We'll notify you when something new arrives
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
        <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30">
          <button
            onClick={() => router.push("/client/my-account/order-news")}
            className="w-full text-center text-xs font-semibold text-[#40BFFF] hover:text-[#33A0DD] transition-colors py-1.5 hover:bg-[#40BFFF]/5 rounded"
          >
            View All Notifications
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
        iconBg: "bg-[#40BFFF]/10",
        iconColor: "text-[#40BFFF]",
      };
    }
    return {
      iconBg: "bg-orange-100 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400",
    };
  };

  const style = getNotificationStyle();

  return (
    <div
      onClick={() => router.replace("/client/my-account/order-news")}
      className={cn(
        "group relative px-3.5 py-3 cursor-pointer transition-all duration-150",
        "hover:bg-gray-50 dark:hover:bg-gray-800/50",
        !item.isRead && "bg-[#40BFFF]/5 dark:bg-[#40BFFF]/5",
        "border-b border-gray-100 dark:border-gray-800 last:border-0"
      )}
    >
      <div className="flex gap-2.5">
        {/* Icon */}
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
            style.iconBg
          )}
        >
          <Icon size={16} className={style.iconColor} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p
              className={cn(
                "text-xs leading-tight text-gray-800 dark:text-gray-200",
                !item.isRead ? "font-semibold" : "font-medium"
              )}
            >
              {item.title}
            </p>
            {!item.isRead && (
              <span className="w-1.5 h-1.5 bg-[#40BFFF] rounded-full flex-shrink-0 mt-1" />
            )}
          </div>

          <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {item.message}
          </p>

          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-[10px] text-gray-500 dark:text-gray-500">
              {formatTimeAgo(item.createdAt)}
            </p>
            {!item.isRead && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[10px] font-semibold text-[#40BFFF]">
                  NEW
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
