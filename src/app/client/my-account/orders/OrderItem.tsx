"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { OrderActions } from "@/app/client/my-account/orders/orderAction";
import { ProductItem } from "./ProductItem";
import {
  statusActionsMap,
  statusConfig,
} from "@/app/client/my-account/orders/constant";
import { OrderStatus } from "@/constants/status.enum";
import { Button } from "@/components/ui/button";

export const OrderItem = ({ order }: { order: Order }) => {
  const status = order.status as OrderStatus;
  const [open, setOpen] = useState(false);

  const firstItem = order.items[0];
  const restItems = order.items.slice(1);

  // Get status badge color
  const getStatusColor = () => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case OrderStatus.PROCESSING:
        return "bg-orange-100 text-orange-700 border-orange-200";
      case OrderStatus.CONFIRMED:
        return "bg-[#40BFFF]/10 text-[#40BFFF] border-[#40BFFF]/20";
      case OrderStatus.SHIPPED:
        return "bg-purple-100 text-purple-700 border-purple-200";
      case OrderStatus.DELIVERED:
        return "bg-green-100 text-green-700 border-green-200";
      case OrderStatus.CANCELED:
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor()}`}>
          {statusConfig[status].label}
        </span>
      </div>

      {/* First Product */}
      <ProductItem item={firstItem} orderStatus={status} orderId={order.id} />

      {/* Collapsible Additional Products */}
      {restItems.length > 0 && (
        <>
          {open && (
            <div>
              {restItems.map((item) => (
                <ProductItem
                  orderId={order.id}
                  key={item.id}
                  item={item}
                  orderStatus={status}
                />
              ))}
            </div>
          )}

          <div className="flex justify-center py-2 border-t border-gray-100 dark:border-gray-700">
            <Button
              variant="ghost"
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-[#40BFFF] h-8"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <span className="flex items-center gap-1">
                  Show Less <ChevronUp size={14} />
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  Show {restItems.length} More {restItems.length === 1 ? 'Product' : 'Products'} <ChevronDown size={14} />
                </span>
              )}
            </Button>
          </div>
        </>
      )}

      {/* Order Actions */}
      <OrderActions order={order} actions={statusActionsMap[status]} />
    </div>
  );
};
