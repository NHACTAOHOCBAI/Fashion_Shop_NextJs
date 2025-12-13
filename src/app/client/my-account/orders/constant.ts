import { OrderStatus } from "@/constants/status.enum";

export const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  [OrderStatus.PENDING]: {
    label: "Pending",
    className: "text-yellow-500",
  },
  [OrderStatus.PROCESSING]: {
    label: "Processing",
    className: "text-orange-500",
  },
  [OrderStatus.CONFIRMED]: {
    label: "Confirmed",
    className: "text-blue-500",
  },
  [OrderStatus.SHIPPED]: {
    label: "Shipping",
    className: "text-purple-500",
  },
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    className: "text-green-500",
  },
  [OrderStatus.CANCELED]: {
    label: "Canceled",
    className: "text-red-500",
  },
};
export type OrderAction = "review" | "rebuy" | "cancel" | "inbox";

export const statusActionsMap: Record<OrderStatus, OrderAction[]> = {
  [OrderStatus.DELIVERED]: ["review", "rebuy", "inbox"],

  [OrderStatus.PENDING]: ["cancel", "inbox"],
  [OrderStatus.CONFIRMED]: ["cancel", "inbox"],

  [OrderStatus.PROCESSING]: ["inbox"],
  [OrderStatus.SHIPPED]: ["inbox"],
  [OrderStatus.CANCELED]: ["inbox"],
};
