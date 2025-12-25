"use client";

import { OrderList } from "@/app/client/my-account/orders/OrderList";
import TabbedContent from "@/app/client/products/_components/TabContent";
import { OrderStatus } from "@/constants/status.enum";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  Home,
  XCircle,
} from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#40BFFF]/5 to-transparent rounded-lg p-4 border border-[#40BFFF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#40BFFF] flex items-center justify-center shadow-sm">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h6 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                My Orders
              </h6>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track and manage your orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <TabbedContent tabs={orderTabs} defaultTabTitle="All" />
      </div>
    </div>
  );
}

const orderTabs = [
  {
    title: "All",
    content: <OrderList />,
    icon: Package,
  },
  {
    title: "Pending",
    content: <OrderList status={OrderStatus.PENDING} />,
    icon: Clock,
  },
  {
    title: "Confirmed",
    content: <OrderList status={OrderStatus.CONFIRMED} />,
    icon: CheckCircle,
  },
  {
    title: "Processing",
    content: <OrderList status={OrderStatus.PROCESSING} />,
    icon: Package,
  },
  {
    title: "Shipped",
    content: <OrderList status={OrderStatus.SHIPPED} />,
    icon: Truck,
  },
  {
    title: "Delivered",
    content: <OrderList status={OrderStatus.DELIVERED} />,
    icon: Home,
  },
  {
    title: "Canceled",
    content: <OrderList status={OrderStatus.CANCELED} />,
    icon: XCircle,
  },
];
