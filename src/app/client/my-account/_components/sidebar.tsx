import { Card, CardContent } from "@/components/ui/card";
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

// Dữ liệu cho các mục menu
const menuData = [
  {
    icon: Bell,
    title: "Notification",
    items: [
      { label: "Order News", count: 2, isHighlighted: true },
      { label: "Discount", count: 2, isHighlighted: false },
    ],
    isCollapsible: true,
  },
  {
    icon: User,
    title: "My Account",
    items: [
      { label: "Profile", count: 1, isHighlighted: true },
      { label: "Address", count: 2, isHighlighted: false },
    ],
    isCollapsible: true,
  },
  {
    icon: ListOrdered,
    title: "Orders",
    items: [{ label: "Orders", count: 2, isHighlighted: false }],
    isCollapsible: false, // Mục này không có submenu và được render như một nút đơn
  },
  {
    icon: Tag,
    title: "Coupons",
    items: [{ label: "Coupons", count: 2, isHighlighted: false }],
    isCollapsible: false, // Mục này không có submenu và được render như một nút đơn
  },
];

// Component cho mục menu có thể thu gọn (Collapsible)
interface CollapsibleMenuSectionProps {
  icon: React.ElementType;
  title: string;
  items: { label: string; count: number; isHighlighted: boolean }[];
}

const CollapsibleMenuSection: React.FC<CollapsibleMenuSectionProps> = ({
  icon: Icon,
  title,
  items,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
      {/* Trigger (Phần có thể click) */}
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-auto p-3 justify-start text-base font-semibold text-gray-700 hover:bg-gray-100/70"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Icon className="mr-3 h-5 w-5 text-gray-500" />
              <span>{title}</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </Button>
      </CollapsibleTrigger>

      {/* Content (Nội dung sẽ được thu gọn/mở rộng) */}
      <CollapsibleContent className="space-y-1 ml-4 pl-4 border-l border-gray-200">
        {items.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`w-full h-auto p-2 justify-start transition-colors ${
              item.isHighlighted
                ? "bg-blue-100 text-blue-700 font-medium hover:bg-blue-100/80"
                : "hover:bg-gray-50 text-gray-600"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{item.label}</span>
              <Badge
                variant="secondary"
                className={`h-5 w-5 justify-center rounded-full text-xs font-semibold ${
                  item.isHighlighted
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {item.count}
              </Badge>
            </div>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

// Component cho mục menu đơn (Orders, Coupons)
interface SimpleMenuSectionProps {
  icon: React.ElementType;
  title: string;
  count: number;
}

const SimpleMenuSection: React.FC<SimpleMenuSectionProps> = ({
  icon: Icon,
  title,
  count,
}) => (
  <Button
    variant="ghost"
    className="w-full h-auto p-3 justify-start text-base font-semibold text-gray-700 hover:bg-gray-100/70"
  >
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Icon className="mr-3 h-5 w-5 text-gray-500" />
        <span>{title}</span>
      </div>
      <Badge
        variant="secondary"
        className="h-5 w-5 justify-center rounded-full text-xs font-semibold bg-gray-200 text-gray-600"
      >
        {count}
      </Badge>
    </div>
  </Button>
);

// Component chính
export function MyAccountSidebar() {
  const wishlistCount = 3;

  return (
    <div className="w-[250px] rounded-[15px] overflow-hidden border bg-white">
      {/* Phần Thông tin người dùng */}
      <div className="bg-[#40BFFF]/60 p-5 flex items-center space-x-3 rounded-t-2xl">
        <Avatar className="h-12 w-12 border-2 border-white">
          <AvatarImage src="/placeholder-user.jpg" alt="Nobi Nobita" />
          <AvatarFallback className="bg-blue-500/50 text-white font-bold text-lg">
            NN
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-[18px] ">Nobi Nobita</h3>
          <p className="font-light text-[12px]">nobi@gmail.com</p>
        </div>
      </div>

      <div className="p-4 space-y-1">
        {menuData.map((section) => {
          if (section.isCollapsible) {
            return (
              <CollapsibleMenuSection
                key={section.title}
                icon={section.icon}
                title={section.title}
                items={section.items}
              />
            );
          } else {
            // Lấy count từ mục đầu tiên (mặc định)
            const count = section.items[0]?.count || 0;
            return (
              <SimpleMenuSection
                key={section.title}
                icon={section.icon}
                title={section.title}
                count={count}
              />
            );
          }
        })}

        {/* Nút Wishlist (Mục riêng) - Tương tự như SimpleMenuSection nhưng với màu đặc biệt */}
        <Button
          variant="ghost"
          className="w-full h-auto p-3 justify-start bg-blue-500/90 text-white hover:bg-blue-600 hover:text-white rounded-lg transition-colors mt-4"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Heart className="mr-3 h-5 w-5 fill-white" />
              <span className="text-base font-semibold">Wishlist</span>
            </div>
            <Badge
              variant="secondary"
              className="h-5 w-5 justify-center rounded-full text-xs font-semibold bg-red-500 text-white"
            >
              {wishlistCount}
            </Badge>
          </div>
        </Button>
      </div>
    </div>
  );
}
