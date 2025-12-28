import { useMemo } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import MyTag from "@/app/client/_components/MyTag";
import { Order } from "@/interfaces/order";

interface OrderSummarySectionProps {
  order: Order;
}

export function OrderSummarySection({ order }: OrderSummarySectionProps) {
  const subtotal = useMemo(
    () =>
      order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [order.items]
  );

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Package className="w-4 h-4 text-[#40BFFF]" />
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Order Summary
        </h3>
      </div>

      {/* Product List */}
      <div className="space-y-3 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <Image
              src={item.variant.imageUrl}
              alt={item.variant.product.name}
              width={80}
              height={80}
              className="rounded-lg object-cover bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                {item.variant.product.name}
              </p>
              <div className="flex gap-2 flex-wrap mb-2">
                {item.variant.variantAttributeValues.map((attr) => (
                  <MyTag key={attr.id} value={attr.attributeCategory.value} />
                ))}
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <MyTag value={`x${item.quantity}`} />
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(item.price * item.quantity)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatCurrency(item.price)} each
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Shipping Fee ({order.shippingMethod === "standard" ? "Standard" : "Express"})
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {order.shippingFee && order.shippingFee > 0
              ? formatCurrency(order.shippingFee)
              : "Free"}
          </span>
        </div>

        {order.discountAmount && order.discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Discount {order.couponCode && `(${order.couponCode})`}
            </span>
            <span className="font-medium text-[#FF4858]">
              -{formatCurrency(order.discountAmount)}
            </span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Total
          </span>
          <span className="text-2xl font-bold text-[#40BFFF]">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>
      </div>
    </Card>
  );
}
