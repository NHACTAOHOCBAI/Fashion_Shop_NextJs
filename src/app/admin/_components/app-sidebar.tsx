"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/app/admin/_components/nav-main";
import { NavUser } from "@/app/admin/_components/nav-user";
import { ICONS } from "@/constants/icon.enum";
import { Boxes, Tag, UsersRound } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((state: RootState) => state.auth);
  const data = {
    user: {
      name: user?.fullName,
      email: user?.email,
      avatar: user?.avatar,
    },
    navMain: [
      {
        title: "Overviews",
        icon: ICONS.OVERVIEWS,
        items: [
          {
            title: "Dashboard",
            url: "/admin/overviews/dashboard",
          },
        ],
      },
      {
        title: "Users",
        icon: ICONS.USERS,
        items: [
          {
            title: "View Users",
            url: "/admin/users/view-users",
          },
        ],
      },
      {
        title: "Categories",
        icon: ICONS.CATEGORIES,
        items: [
          {
            title: "View Categories",
            url: "/admin/categories/view-categories",
          },
          {
            title: "Create Category",
            url: "/admin/categories/create-category",
          },
        ],
      },
      {
        title: "Departments",
        icon: ICONS.DEPARTMENTS,
        items: [
          {
            title: "View Departments",
            url: "/admin/departments/view-departments",
          },
        ],
      },
      {
        title: "Brands",
        icon: ICONS.BRANDS,
        items: [
          {
            title: "View Brands",
            url: "/admin/brands/view-brands",
          },
        ],
      },
      {
        title: "Attributes",
        icon: ICONS.ATTRIBUTES,
        items: [
          {
            title: "View Attributes",
            url: "/admin/attributes/view-attributes",
          },
        ],
      },
      {
        title: "Products",
        icon: ICONS.PRODUCTS,
        items: [
          {
            title: "View Products",
            url: "/admin/products/view-products",
          },
          {
            title: "Create Product",
            url: "/admin/products/create-product",
          },
        ],
      },
      {
        title: "Orders",
        icon: ICONS.ORDERS,
        items: [
          {
            title: "View Orders",
            url: "/admin/orders/view-orders",
          },
        ],
      },
      {
        title: "Coupons",
        icon: <Tag />,
        items: [
          {
            title: "View Coupons",
            url: "/admin/coupons/view-coupons",
          },
        ],
      },
      {
        title: "Stock",
        icon: <Boxes />,
        items: [
          {
            title: "View Stocks",
            url: "/admin/stocks/view-stocks",
          },
          {
            title: "Stock In",
            url: "/admin/stocks/in",
          },
        ],
      },
      {
        title: "Community",
        icon: <UsersRound />,
        items: [
          {
            title: "View Community",
            url: "/admin/community/view-community",
          },
        ],
      },
    ],
  };
  // <UsersRound />;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
