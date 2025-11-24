import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";

// --- Components Radix UI Gốc (Giữ lại nhưng chỉ sử dụng các phần cần thiết) ---

function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(
        // Loại bỏ các kiểu dáng không cần thiết cho phân trang, giữ lại flex container
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}{" "}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list" // Sử dụng gap-1 để tạo khoảng cách giữa các nút
      className={cn(
        "group flex list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

// --- Styles cho Phân trang (Pagination Styles) ---

// Base style cho tất cả các nút (số, mũi tên)
const paginationItemStyle = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground hover:bg-accent/80", // Style cho nút điều hướng (mũi tên), màu nền xanh
        primary: "bg-[#40BFFF] text-white hover:bg-[#3399FF]/80", // Style cho nút số không phải trang hiện tại
        outline:
          " border-gray-200 bg-background text-foreground hover:bg-accent hover:text-accent-foreground", // Style cho nút trang hiện tại
        current: " border-[#40BFFF] bg-white text-[#40BFFF] hover:bg-accent/50", // Style cho dấu ba chấm
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        // Kích thước của các nút phân trang
        default: "h-9 w-9 p-0",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Component Link/Button dùng cho các số trang
function PaginationLink({
  className,
  isActive,
  isDisabled,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link> & {
  isActive?: boolean;
  isDisabled?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="pagination-link"
      className={cn(
        paginationItemStyle({
          // Dựa vào isActive để chọn kiểu dáng (current cho trang hiện tại, outline cho các trang khác)
          variant: isActive ? "current" : "outline",
        }), // Tùy chỉnh bo góc cho các nút số
        "rounded-md border ",
        className
      )}
      data-disabled={isDisabled}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}{" "}
    </NavigationMenuPrimitive.Link>
  );
}

// Component cho nút điều hướng (mũi tên)
function PaginationButton({
  className,
  direction,
  isDisabled,
  ...props
}: React.ComponentProps<"button"> & {
  direction: "prev" | "next";
  isDisabled?: boolean;
}) {
  return (
    <button
      data-slot={`pagination-${direction}-button`}
      className={cn(
        paginationItemStyle({ variant: "primary" }), // Màu nền xanh cho nút mũi tên // Bo góc đầy đủ cho nút mũi tên
        "rounded-md",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {" "}
      {direction === "prev" ? (
        <ChevronLeftIcon className="size-4" />
      ) : (
        <ChevronRightIcon className="size-4" />
      )}{" "}
    </button>
  );
}

// Component cho dấu ba chấm
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4 text-black/80" />{" "}
    </span>
  );
}

// --- Ví dụ sử dụng để tạo ra giao diện như hình ảnh ---
function PaginationExample() {
  return (
    // NavigationMenu để bọc toàn bộ component phân trang
    <NavigationMenu>
      {" "}
      <NavigationMenuList>
        {/* Nút quay lại (Prev) - Màu nền xanh, không bị disabled */}{" "}
        <NavigationMenuItem>
          <PaginationButton direction="prev" />{" "}
        </NavigationMenuItem>
        {/* Trang 1 (Hiện tại) - Border xanh, chữ xanh, nền trắng */}{" "}
        <NavigationMenuItem>
          {" "}
          <PaginationLink href="#" isActive>
            1{" "}
          </PaginationLink>{" "}
        </NavigationMenuItem>
        {/* Trang 2 (Bình thường) - Border xám, chữ đen, nền trắng */}{" "}
        <NavigationMenuItem>
          <PaginationLink href="#">2</PaginationLink>{" "}
        </NavigationMenuItem>
        {/* Dấu ba chấm */}{" "}
        <NavigationMenuItem>
          <PaginationEllipsis />{" "}
        </NavigationMenuItem>
        {/* Trang 9 (Bình thường) */}{" "}
        <NavigationMenuItem>
          <PaginationLink href="#">9</PaginationLink>{" "}
        </NavigationMenuItem>
        {/* Trang 10 (Bình thường) */}{" "}
        <NavigationMenuItem>
          <PaginationLink href="#">10</PaginationLink>{" "}
        </NavigationMenuItem>
        {/* Nút tiếp theo (Next) - Màu nền xanh */}{" "}
        <NavigationMenuItem>
          <PaginationButton direction="next" />{" "}
        </NavigationMenuItem>{" "}
      </NavigationMenuList>{" "}
    </NavigationMenu>
  );
}

// --- Xuất các component mới và các component Radix UI đã điều chỉnh ---

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem, // Bỏ đi NavigationMenuContent, NavigationMenuTrigger, NavigationMenuViewport, v.v. vì chúng không cần thiết cho Phân trang
  PaginationLink,
  PaginationButton,
  PaginationEllipsis,
  PaginationExample, // Dùng để xem kết quả trực quan
  CustomPagination,
};

// (Thay đổi đường dẫn này)
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Logic hiển thị các trang xung quanh trang hiện tại (ví dụ: hiển thị 2 trang trước và 2 trang sau)
  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Nút Trang 1
    pages.push(
      <NavigationMenuItem key={1}>
        <PaginationLink
          href="#"
          onClick={() => onPageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </NavigationMenuItem>
    );

    // Dấu ba chấm đầu tiên (nếu cần)
    if (startPage > 2) {
      pages.push(
        <NavigationMenuItem key="ellipsis-start">
          <PaginationEllipsis />
        </NavigationMenuItem>
      );
    }

    // Các trang xung quanh trang hiện tại
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        // Đảm bảo không trùng với trang 1 và trang cuối
        pages.push(
          <NavigationMenuItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </NavigationMenuItem>
        );
      }
    }

    // Dấu ba chấm cuối cùng (nếu cần)
    if (endPage < totalPages - 1) {
      pages.push(
        <NavigationMenuItem key="ellipsis-end">
          <PaginationEllipsis />
        </NavigationMenuItem>
      );
    }

    // Nút Trang cuối
    if (totalPages > 1) {
      pages.push(
        <NavigationMenuItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </NavigationMenuItem>
      );
    }

    return pages;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Nút Quay Lại */}
        <NavigationMenuItem>
          <PaginationButton
            direction="prev"
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          />
        </NavigationMenuItem>

        {renderPageNumbers()}

        {/* Nút Tiếp Theo */}
        <NavigationMenuItem>
          <PaginationButton
            direction="next"
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
