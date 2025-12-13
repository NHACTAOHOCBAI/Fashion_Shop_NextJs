import Loading from "@/app/client/_components/Loading";
import { useMyOrders } from "@/hooks/queries/useOrder";
import { OrderItem } from "./OrderItem";
import { OrderStatus } from "@/constants/status.enum";

export const OrderList = ({ status }: { status?: OrderStatus }) => {
  const { data, isLoading } = useMyOrders({ status });

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-[10px]">
      {data?.data.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};
