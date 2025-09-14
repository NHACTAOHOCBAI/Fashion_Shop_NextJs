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
import { Archive, ChartPie, Shirt, Store, UsersRound } from "lucide-react"

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
      icon: <ChartPie />,
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
      icon: <UsersRound />,
      items: [
        {
          title: "View Users",
          url: "/admin/users/view-users",
        },
      ],
    },
    {
      title: "Categories",
      icon: <Archive />,
      items: [
        {
          title: "View Categories",
          url: "/admin/categories/view-categories",
        },
      ],
    },
    {
      title: "Brands",
      icon: <Store />,
      items: [
        {
          title: "View Brands",
          url: "/admin/brands/view-brands",
        },
      ],
    },
    {
      title: "Products",
      icon: <Shirt />,
      items: [
        {
          title: "View Products",
          url: "/admin/products/view-products",
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
