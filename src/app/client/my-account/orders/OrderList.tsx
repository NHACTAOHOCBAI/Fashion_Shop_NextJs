import Loading from "@/app/client/_components/Loading";
import { useMyOrders } from "@/hooks/queries/useOrder";
import { OrderItem } from "./OrderItem";
import { OrderStatus } from "@/constants/status.enum";
import { Package } from "lucide-react";

export const OrderList = ({ status }: { status?: OrderStatus }) => {
  const { data, isLoading } = useMyOrders({ status });

  if (isLoading) return <Loading />;

  const hasOrders = data?.data && data.data.length > 0;

  if (!hasOrders) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
          No orders found
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {status ? "No orders with this status yet" : "You haven't placed any orders yet"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto mt-2">
      {data.data.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};
