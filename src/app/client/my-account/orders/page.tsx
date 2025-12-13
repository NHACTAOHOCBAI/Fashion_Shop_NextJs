"use client";

import { OrderList } from "@/app/client/my-account/orders/OrderList";
import TabbedContent from "@/app/client/products/_components/TabContent";
import { OrderStatus } from "@/constants/status.enum";
export default function OrdersPage() {
  return (
    <div>
      <p className="text-[24px]">Orders</p>
      <p className="text-[18px] font-light mt-[11px]">
        Manage your orders more efficiently
      </p>

      <div className="mt-[60px]">
        <TabbedContent tabs={orderTabs} defaultTabTitle="All" />
      </div>
    </div>
  );
}
const orderTabs = [
  { title: "All", content: <OrderList /> },
  { title: "Pending", content: <OrderList status={OrderStatus.PENDING} /> },
  { title: "Confirmed", content: <OrderList status={OrderStatus.CONFIRMED} /> },
  {
    title: "Processing",
    content: <OrderList status={OrderStatus.PROCESSING} />,
  },
  { title: "Shipped", content: <OrderList status={OrderStatus.SHIPPED} /> },
  { title: "Delivered", content: <OrderList status={OrderStatus.DELIVERED} /> },
  { title: "Canceled", content: <OrderList status={OrderStatus.CANCELED} /> },
];
