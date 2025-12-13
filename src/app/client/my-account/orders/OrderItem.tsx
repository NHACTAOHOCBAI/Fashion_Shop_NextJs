import { OrderActions } from "@/app/client/my-account/orders/orderAction";
import { ProductItem } from "./ProductItem";
import {
  statusActionsMap,
  statusConfig,
} from "@/app/client/my-account/orders/constant";
import { OrderStatus } from "@/constants/status.enum";

export const OrderItem = ({ order }: { order: Order }) => {
  const status = order.status as OrderStatus;

  return (
    <div className="relative rounded-[10px] border bg-white px-[15px]">
      {order.items.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}

      <OrderActions order={order} actions={statusActionsMap[status]} />

      <p className={`absolute top-2 right-4 ${statusConfig[status].className}`}>
        {statusConfig[status].label}
      </p>
    </div>
  );
};
