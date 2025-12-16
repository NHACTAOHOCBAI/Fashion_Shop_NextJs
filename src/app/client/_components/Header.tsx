"use client";
import TabbedContent from "@/app/client/products/_components/TabContent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDepartments } from "@/hooks/queries/useDepartment";
import { useGetHeaderData } from "@/hooks/queries/useHome";
import { useGetNotification } from "@/hooks/queries/useNotification";
import {
  Bell,
  Heart,
  ListOrdered,
  ShoppingCart,
  Tag,
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
const NotificationItem = ({ item }: { item: Notification }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.replace("/client/my-account/order-news")}
      className={`
        flex gap-[13px] pt-[10px] pb-[20px] border-b border-gray-100 cursor-pointer
        ${!item.isRead ? "bg-[#F5F9FF]" : "bg-white"}
      `}
    >
      {/* Unread dot */}
      {!item.isRead && (
        <div className="w-[8px] h-[8px] bg-[#40BFFF] rounded-full mt-[12px]" />
      )}

      {/* Icon */}
      <div className="w-[35px] h-[35px] bg-gray-100 rounded-full flex-shrink-0" />

      {/* Content */}
      <div className="flex gap-[5px] flex-col">
        <p
          className={`text-[14px] ${
            !item.isRead ? "font-semibold" : "font-medium"
          }`}
        >
          {item.title}
        </p>

        <p className="text-[12px] font-light">{item.message}</p>

        <p className="text-[12px] font-light text-gray-500">
          {formatTimeAgo(item.createdAt)}
        </p>
      </div>
    </div>
  );
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
    <div className="grid grid-cols-4 gap-y-3 gap-x-8">
      {items.map((item) => (
        <a // Thay div bằng a
          key={item.id}
          href={`/client/products/${origin}?category=${item.id}`}
          className="text-[18px] text-gray-700 hover:text-[#40BFFF] transition-colors font-normal cursor-pointer"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

const Header = () => {
  const { data: myNotification } = useGetNotification({});
  const router = useRouter();
  const { data: headerData } = useDepartments({});
  const unreadCount = myNotification?.data.length || 0;
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

  return (
    <header>
      <div className="w-[1240px] mx-auto flex justify-end gap-[41px]   py-[20px] ">
        <Heart className="cursor-pointer transition-transform duration-150 ease-out active:scale-90 active:opacity-70 hover:scale-105" />
        <ShoppingCart
          className="cursor-pointer transition-transform duration-150 ease-out active:scale-90 active:opacity-70 hover:scale-105"
          onClick={() => router.push("/client/cart")}
        />
        {/* Notification */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Bell className="cursor-pointer transition-transform duration-150 ease-out active:scale-90 active:opacity-70 hover:scale-105" />

              {/* Badge */}
              {unreadCount > 0 && (
                <span
                  className="
                  absolute -top-[6px] -right-[6px]
                  min-w-[18px] h-[18px]
                  bg-red-500 text-white text-[10px] font-semibold
                  rounded-full flex items-center justify-center
                "
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
          </PopoverTrigger>

          <PopoverContent className="p-0 w-[360px]">
            <Notification />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <User className="cursor-pointer transition-transform duration-150 ease-out active:scale-90 active:opacity-70 hover:scale-105" />
            </div>
          </PopoverTrigger>

          <PopoverContent className=" w-auto p-[5px]">
            <div className="cursor-pointer p-[10px] flex gap-[10px] items-center">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="
            rounded-full object-cover
            transition-transform duration-150
            hover:scale-105 active:scale-95
          "
                />
              ) : (
                <div className="w-[32px] h-[32px] rounded-full bg-gray-300"></div>
              )}
              <p className="text-[18x]">{user?.fullName}</p>
            </div>
            <div className="w-full bg-gray-200 h-[0.5px] my-[4px]"></div>
            <div className="flex flex-col">
              {accountMenus.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="
        flex items-center gap-[10px]
        px-[20px] py-[10px]
        text-sm
        transition-all duration-200
        hover:bg-gray-100 hover:text-primary
        rounded-md
      "
                >
                  <Icon
                    size={20}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="bg-[#FAFAFB] h-[1px]"></div>
      <div className="relative w-[1240px] mx-auto py-[28px]  flex items-center">
        <div>LOGO HERE</div>
        <div className=" flex-[1] w-full">
          <nav>
            <ul className="flex justify-center gap-[80px]">
              <li className="uppercase text-[24px] font-medium cursor-pointer select-none">
                Home
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
                  <li className="uppercase text-[24px] font-medium cursor-pointer select-none">
                    {department.name}
                  </li>
                </SubCatgories>
              ))}
            </ul>
          </nav>
        </div>
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
    <div className=" group inline-block">
      {children}
      <div
        className="
        select-none
          absolute z-10 
          bg-white rounded-[10px] border-[#FAFAFB] border-[2px] p-[30px] 
          shadow-lg w-[1240px] 
          left-0 right-0 mx-auto 
          top-[64px]
          opacity-0 invisible 
          group-hover:opacity-100 group-hover:visible
          transition-opacity duration-400
          pointer-events-none group-hover:pointer-events-auto
        "
      >
        {content}
      </div>
    </div>
  );
};
const Notification = () => {
  const { data: myNotification } = useGetNotification({
    limit: 5,
    page: 1,
  });
  return (
    <div className="w-[360px] px-[14px] py-[10px]">
      {myNotification?.data.map((notification) => (
        <NotificationItem key={notification.id} item={notification} />
      ))}
    </div>
  );
};
export default Header;
