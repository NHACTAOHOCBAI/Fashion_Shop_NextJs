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

  return (
    <div className="relative rounded-[10px] border bg-white px-[15px]">
      {/* product đầu tiên */}
      <ProductItem item={firstItem} orderStatus={status} orderId={order.id} />

      {/* collapse */}
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

          <div className="flex justify-center py-3">
            <Button
              variant="ghost"
              className="text-sm text-gray-600"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <>
                  Compact <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Load more {restItems.length} products{" "}
                  <ChevronDown size={16} />
                </>
              )}
            </Button>
          </div>
        </>
      )}

      {/* action chung của order */}
      <OrderActions order={order} actions={statusActionsMap[status]} />

      {/* status */}
      <p className={`absolute top-2 right-4 ${statusConfig[status].className}`}>
        {statusConfig[status].label}
      </p>
    </div>
  );
};
