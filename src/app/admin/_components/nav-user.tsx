"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSocket } from "@/providers/socketProvider";
import { getMyNotifications } from "@/services/notification.service";
import { useLogout } from "@/hooks/queries/useAuth";

export function NavUser({
  user,
}: {
  user: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}) {
  const { mutate: logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  const { isMobile } = useSidebar();
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
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    className="object-cover"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/admin/my-notification"
                  className="relative flex items-center gap-2"
                >
                  <div className="relative">
                    <Bell className="h-5 w-5" />

                    {unreadCount > 0 && (
                      <span
                        className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] 
        rounded-full bg-red-500 text-white text-[11px] font-medium
        flex items-center justify-center px-1"
                      >
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="relative">Notifications</div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/admin/my-account"} className="flex gap-[10px]">
                  <UserRound />
                  My Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleClick()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
