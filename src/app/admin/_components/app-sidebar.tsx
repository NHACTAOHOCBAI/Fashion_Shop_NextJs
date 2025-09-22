"use client"

import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/app/admin/_components/nav-main"
import { NavUser } from "@/app/admin/_components/nav-user"
import { ICONS } from "@/constants/icon.enum"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
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
        {
          title: "Reports",
          url: "/admin/overviews/reports",
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
        {
          title: "Update Product",
          url: "/admin/products/update-product",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
  )
}
