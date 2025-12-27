import { CreditCard, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Order } from "@/interfaces/order";

interface PaymentInfoSectionProps {
  order: Order;
}

export function PaymentInfoSection({ order }: PaymentInfoSectionProps) {
  const isPaypal = order.paymentMethod === "paypal";
  const isPaid = order.paymentStatus === "paid";

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <CreditCard className="w-4 h-4 text-[#40BFFF]" />
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Payment Information
        </h3>
      </div>

      {/* Payment Method */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Payment Method
        </span>
        <div className="flex items-center gap-2">
          {isPaypal ? (
            <>
              <CreditCard className="w-4 h-4 text-[#0070BA]" />
              <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                PayPal
              </span>
            </>
          ) : (
            <>
              <Banknote className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                Cash on Delivery
              </span>
            </>
          )}
        </div>
      </div>

      <Separator className="my-3" />

      {/* Payment Status */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Payment Status
        </span>
        <Badge
          className={cn(
            "text-xs font-semibold",
            isPaid
              ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
              : "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
          )}
        >
          {isPaid ? "Paid" : "Pending"}
        </Badge>
      </div>
    </Card>
  );
}
