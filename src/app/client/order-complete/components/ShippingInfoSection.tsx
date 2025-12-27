import { MapPin, User, Phone, Truck, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/interfaces/order";

interface ShippingInfoSectionProps {
  order: Order;
}

function calculateExpectedDelivery(
  createdAt: string,
  shippingMethod: string
) {
  const minDays = shippingMethod === "standard" ? 10 : 5;
  const maxDays = shippingMethod === "standard" ? 15 : 10;
  const randomDays =
    Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

  const expectedDate = new Date(
    new Date(createdAt).getTime() + randomDays * 24 * 60 * 60 * 1000
  );

  return expectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function ShippingInfoSection({ order }: ShippingInfoSectionProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-[#40BFFF]" />
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Shipping Information
        </h3>
      </div>

      {/* Recipient */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {order.recipientName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {order.recipientPhone}
          </span>
        </div>
      </div>

      <Separator className="my-3" />

      {/* Address */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        {order.detailAddress}, {order.commune}, {order.district},{" "}
        {order.province}
      </p>

      <Separator className="my-3" />

      {/* Shipping Method */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Shipping Method
          </span>
        </div>
        <Badge className="bg-[#40BFFF]/10 text-[#40BFFF] border-[#40BFFF]/20 hover:bg-[#40BFFF]/10">
          {order.shippingMethod === "standard"
            ? "Standard Delivery (10-20 days)"
            : "Fast Delivery (5-10 days)"}
        </Badge>
      </div>

      {/* Expected Delivery */}
      <div className="flex items-center gap-2 text-sm">
        <Clock className="w-4 h-4 text-[#40BFFF]" />
        <span className="text-gray-600 dark:text-gray-400">
          Expected delivery:
        </span>
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {calculateExpectedDelivery(order.createdAt, order.shippingMethod)}
        </span>
      </div>
    </Card>
  );
}
