import { CheckCircle2, Package, Clock } from "lucide-react";

interface OrderSuccessHeaderProps {
  orderId: number;
  countdown: number;
}

export function OrderSuccessHeader({
  orderId,
  countdown,
}: OrderSuccessHeaderProps) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-cyan-50 to-white dark:from-cyan-950/20 dark:to-gray-900 border border-cyan-100 dark:border-cyan-900 shadow-sm p-6 md:p-8 text-center">
      <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-[#40BFFF] mx-auto mb-4" />

      <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Order Placed Successfully!
      </h1>

      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm mb-4">
        <Package className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Order #{orderId.toString().padStart(6, "0")}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        <Clock className="inline w-4 h-4 mr-1" />
        Redirecting to My Orders in{" "}
        <span className="font-semibold text-[#40BFFF]">{countdown}</span>{" "}
        seconds...
      </p>
    </div>
  );
}
