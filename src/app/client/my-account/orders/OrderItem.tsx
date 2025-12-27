"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  DollarSign,
  Package,
  Clock,
} from "lucide-react";
import { OrderActions } from "@/app/client/my-account/orders/orderAction";
import { ProductItem } from "./ProductItem";
import {
  statusActionsMap,
  statusConfig,
} from "@/app/client/my-account/orders/constant";
import { OrderStatus } from "@/constants/status.enum";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Order } from "@/interfaces/order";

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

  // Format full address
  const fullAddress = `${order.detailAddress}, ${order.commune}, ${order.district}, ${order.province}`;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Order Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Left: Order Info */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Order ID:
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                #{order.id.toString().padStart(6, "0")}
              </span>
            </div>

            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatDate(order.createdAt)}
              </span>
            </div>

            {order.items.length > 1 && (
              <>
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {order.items.length} items
                </span>
              </>
            )}
          </div>

          {/* Right: Status Badge */}
          <div>
            <span
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${getStatusColor()}`}
            >
              {statusConfig[status].label}
            </span>
          </div>
        </div>

        {/* Expected Delivery (if shipped or processing) */}
        {(status === OrderStatus.SHIPPED ||
          status === OrderStatus.PROCESSING) && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-[#40BFFF]" />
            <span className="text-gray-600 dark:text-gray-400">
              Expected delivery:
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {(() => {
                const minDays = order.shippingMethod === "standard" ? 10 : 5;
                const maxDays = order.shippingMethod === "standard" ? 15 : 10;

                const randomDays =
                  Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

                const expectedDate = new Date(
                  new Date(order.createdAt).getTime() +
                    randomDays * 24 * 60 * 60 * 1000
                );

                return expectedDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                });
              })()}
            </span>
          </div>
        )}
      </div>

      {/* Products List */}
      <div>
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
                    Show {restItems.length} More{" "}
                    {restItems.length === 1 ? "Product" : "Products"}{" "}
                    <ChevronDown size={14} />
                  </span>
                )}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Order Summary Footer */}
      <div className="bg-gray-50/50 dark:bg-gray-800/50 px-5 py-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
        {/* Shipping Address */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Shipping to: {order.recipientName} ({order.recipientPhone})
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
              {fullAddress}
            </p>
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Amount:
            </span>
          </div>
          <span className="text-lg font-bold text-[#40BFFF]">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>
      </div>

      {/* Order Actions */}
      <OrderActions order={order} actions={statusActionsMap[status]} />
    </div>
  );
};
