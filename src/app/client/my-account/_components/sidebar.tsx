"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Bell, User, ListOrdered, Tag, Heart, ChevronDown } from "lucide-react";
import * as React from "react";
// Giả định sử dụng Next.js App Router hooks
import { usePathname, useRouter } from "next/navigation";

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
    icon: ListOrdered,
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
          className={`w-full h-auto p-3 justify-start text-gray-700  text-base hover:text-[#40BFFF] font-medium transition-colors ${
            isParentActive
              ? "bg-blue-100/70 text-[#40BFFF] hover:bg-blue-100/80"
              : " hover:bg-gray-100/70 "
          }`}
          onClick={handleParentClick}
        >
          <div className=" flex items-center justify-between w-full">
            <div className="flex items-center">
              <Icon
                className={`mr-3 h-5 w-5 ${
                  isParentActive ? "text-[#40BFFF]" : ""
                }`}
              />
              <span>{title}</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 ${
                isParentActive ? "text-[#40BFFF]" : ""
              } transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </Button>
      </CollapsibleTrigger>

      {/* Content (Nội dung sẽ được thu gọn/mở rộng) */}
      <CollapsibleContent className="text-gray-700 space-y-1 ml-4 pl-4 border-l border-gray-200">
        {items.map((item) => {
          const isItemActive = item.href === pathname;
          return (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full h-auto p-2 justify-start transition-colors hover:text-[#40BFFF] ${
                isItemActive
                  ? "bg-blue-100 text-[#40BFFF] font-medium hover:bg-blue-100/80"
                  : "hover:bg-gray-50 "
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
      className={`text-gray-700 w-full h-auto p-3 justify-start text-base font-medium transition-colors ${
        isActive
          ? "bg-blue-100/70 hover:bg-blue-100/70 hover:text-[#40BFFF]   text-[#40BFFF] "
          : "  hover:text-[#40BFFF] hover:bg-gray-100/70 "
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Icon
            className={`mr-3 h-5 w-5 ${isActive ? "text-[#40BFFF]" : ""}`}
          />
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
    <div className="w-[250px] rounded-[15px] overflow-hidden border bg-white shadow-lg">
      {/* Phần Thông tin người dùng */}
      <div className="bg-[#40BFFF]/60 p-5 flex items-center space-x-3 rounded-t-2xl text-white">
        <Avatar className="h-12 w-12 border-2 border-white">
          {/* Thay đổi src ảnh placeholder nếu cần */}
          <AvatarImage src={user?.avatar} alt="Nobi Nobita" />
          <AvatarFallback className="bg-blue-500/50 text-white font-bold text-lg"></AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-[18px] font-semibold">{user?.fullName}</h3>
          <p className="font-light text-[12px]">{user?.email}</p>
        </div>
      </div>

      <div className="p-4 space-y-1">
        {/* Render các mục Menu chính */}
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
            // Lấy count và href từ mục đầu tiên cho SimpleMenuSection
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
      </div>
    </div>
  );
}
