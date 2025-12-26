"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Bell,
  User,
  ListOrdered,
  Tag,
  Heart,
  ChevronDown,
  MessageSquare,
  Package,
  LogOut,
} from "lucide-react";
import * as React from "react";
// Giả định sử dụng Next.js App Router hooks
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/hooks/queries/useAuth";

// --- I. Dữ liệu Menu ---

// Định nghĩa cấu trúc Item và Section
interface MenuItem {
  label: string;
  count?: number;
  href: string; // Thêm href
}

interface MenuSection {
  icon: React.ElementType;
  title: string;
  href: string; // Thêm href (base path)
  items: MenuItem[];
  isCollapsible: boolean;
}

const menuData: MenuSection[] = [
  {
    icon: Bell,
    title: "Notification",
    href: "/account/notifications",
    items: [
      {
        label: "Order News",
        count: 2,
        href: "/client/my-account/order-news",
      },
      {
        label: "Discount",
        count: 2,
        href: "/client/my-account/discount",
      },
    ],
    isCollapsible: true,
  },
  {
    icon: User,
    title: "My Account",
    href: "/account/profile",
    items: [
      {
        label: "Profile",
        href: "/client/my-account/profile",
      },
      {
        label: "Address",
        href: "/client/my-account/my-address",
      },
    ],
    isCollapsible: true,
  },
  {
    icon: Package,
    title: "Orders",
    href: "/account/orders",
    items: [
      {
        label: "Orders",
        href: "/client/my-account/orders",
      },
    ],
    isCollapsible: false,
  },
  {
    icon: Tag,
    title: "Coupons",
    href: "/account/coupons",
    items: [
      {
        label: "Coupons",
        href: "/client/my-account/coupons",
      },
    ],
    isCollapsible: false,
  },
  {
    icon: Heart,
    title: "Wishlist",
    href: "/account/wishlist",
    items: [
      {
        label: "Coupons",
        href: "/client/my-account/wishlist",
      },
    ],
    isCollapsible: false,
  },
  {
    icon: MessageSquare,
    title: "Chat",
    href: "/client/my-account/chat",
    items: [
      {
        label: "Coupons",
        href: "/client/my-account/chat",
      },
    ],
    isCollapsible: false,
  },
];

// --- II. Component cho mục menu có thể thu gọn (Collapsible) ---

interface CollapsibleMenuSectionProps {
  icon: React.ElementType;
  title: string;
  basePath: string;
  items: MenuItem[];
}

const CollapsibleMenuSection: React.FC<CollapsibleMenuSectionProps> = ({
  icon: Icon,
  title,
  items,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  // Kiểm tra nếu bất kỳ mục con nào active thì mở mục cha
  const isAnyChildActive = items.some((item) => item.href === pathname);
  const [isOpen, setIsOpen] = React.useState(isAnyChildActive);

  // Kiểm tra xem mục cha có nên được highlight không (nếu bất kỳ mục con nào active)
  // Sử dụng startsWith để highlight cả base path (ví dụ: /account/notifications)
  const isParentActive = items.some(
    (item) => pathname.startsWith(item.href) || pathname === item.href
  );

  // Xử lý click cho mục cha (chỉ mở/đóng)
  const handleParentClick = () => {
    setIsOpen(!isOpen);
    // Tùy chọn: chuyển hướng đến base path nếu muốn mục cha cũng là một trang
    // router.push(basePath);
  };

  const handleChildClick = (href: string) => {
    router.push(href);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
      {/* Trigger (Phần có thể click) */}
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full h-auto p-2.5 justify-start text-gray-700 dark:text-gray-300 text-sm hover:text-[#40BFFF] font-medium transition-colors rounded-md ${
            isParentActive
              ? "bg-[#40BFFF]/10 text-[#40BFFF] hover:bg-[#40BFFF]/15"
              : "hover:bg-gray-100/70 dark:hover:bg-gray-700/50"
          }`}
          onClick={handleParentClick}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <Icon
                className={`h-4 w-4 ${isParentActive ? "text-[#40BFFF]" : ""}`}
              />
              <span>{title}</span>
            </div>
            <ChevronDown
              className={`h-3.5 w-3.5 ${
                isParentActive ? "text-[#40BFFF]" : ""
              } transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </Button>
      </CollapsibleTrigger>

      {/* Content (Nội dung sẽ được thu gọn/mở rộng) */}
      <CollapsibleContent className="text-gray-700 dark:text-gray-300 space-y-0.5 ml-3 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
        {items.map((item) => {
          const isItemActive = item.href === pathname;
          return (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full h-auto p-2 justify-start text-sm transition-colors hover:text-[#40BFFF] rounded-md ${
                isItemActive
                  ? "bg-[#40BFFF]/10 text-[#40BFFF] font-medium hover:bg-[#40BFFF]/15"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
              onClick={() => handleChildClick(item.href)}
            >
              <div className="flex items-center justify-between w-full">
                <span>{item.label}</span>
              </div>
            </Button>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

// --- III. Component cho mục menu đơn (Simple) ---
const LogoutComponent = () => {
  const { mutate: logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  const isActive = false;
  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={`text-gray-700 dark:text-gray-300 w-full h-auto p-2.5 justify-start text-sm font-medium transition-colors rounded-md ${
        isActive
          ? "bg-[#40BFFF]/10 hover:bg-[#40BFFF]/15 text-[#40BFFF]"
          : "hover:text-red-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/50"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          <LogOut className={`h-4 w-4 ${isActive ? "text-[#40BFFF]" : ""}`} />
          <span>Logout</span>
        </div>
      </div>
    </Button>
  );
};
interface SimpleMenuSectionProps {
  icon: React.ElementType;
  title: string;
  count: number;
  href: string;
}

const SimpleMenuSection: React.FC<SimpleMenuSectionProps> = ({
  icon: Icon,
  title,
  href,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  const handleClick = () => {
    router.push(href);
  };
  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={`text-gray-700 dark:text-gray-300 w-full h-auto p-2.5 justify-start text-sm font-medium transition-colors rounded-md ${
        isActive
          ? "bg-[#40BFFF]/10 hover:bg-[#40BFFF]/15 text-[#40BFFF]"
          : "hover:text-[#40BFFF] hover:bg-gray-100/70 dark:hover:bg-gray-700/50"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          <Icon className={`h-4 w-4 ${isActive ? "text-[#40BFFF]" : ""}`} />
          <span>{title}</span>
        </div>
      </div>
    </Button>
  );
};

// --- IV. Component chính ---

export function MyAccountSidebar() {
  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
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
    <div className="w-[250px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow">
      {/* User Info Section - Enhanced */}
      <div className="bg-gradient-to-br from-[#40BFFF] to-[#33A0DD] p-4 flex items-center gap-3 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <Avatar className="h-11 w-11 border-2 border-white shadow-sm relative z-10">
          <AvatarImage
            src={user?.avatar}
            className="object-cover"
            alt={user?.fullName || "User"}
          />
          <AvatarFallback className="bg-white/20 text-white font-semibold text-base">
            {user?.fullName?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 relative z-10">
          <h6 className="text-base font-semibold truncate">
            {user?.fullName || "User"}
          </h6>
          <p className="text-xs text-white/90 truncate">{user?.email}</p>
        </div>
      </div>

      <div className="p-3 space-y-0.5">
        {/* Render menu items */}
        {menuData.map((section) => {
          if (section.isCollapsible) {
            return (
              <CollapsibleMenuSection
                key={section.title}
                icon={section.icon}
                title={section.title}
                basePath={section.href}
                items={section.items}
              />
            );
          } else {
            const count = section.items[0]?.count || 0;
            const href = section.items[0]?.href || "#";
            return (
              <SimpleMenuSection
                key={section.title}
                icon={section.icon}
                title={section.title}
                count={count}
                href={href}
              />
            );
          }
        })}
        <LogoutComponent />
      </div>
    </div>
  );
}
