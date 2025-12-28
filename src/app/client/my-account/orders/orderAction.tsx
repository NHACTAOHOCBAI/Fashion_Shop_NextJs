"use client";
import { OrderAction } from "@/app/client/my-account/orders/constant";
import { Button } from "@/components/ui/button";
import { useConfirmOrder, useDeleteOrder } from "@/hooks/queries/useOrder";
import { Order } from "@/interfaces/order";
import { useRouter } from "next/navigation";

type Props = {
  order: Order;
  actions: OrderAction[];
};

export const OrderActions = ({ order, actions }: Props) => {
  const router = useRouter();
  const { mutate: receiveOrder, isPending } = useConfirmOrder();
  const { mutate: cancelOrder } = useDeleteOrder();

  const handleReceive = () => {
    receiveOrder(order.id);
  };

  const handleRebuy = () => {
    const data: { quantity: number; variant: Variant }[] = order.items.map(
      (item) => {
        return {
          quantity: item.quantity,
          variant: item.variant,
        };
      }
    );
    localStorage.setItem("products", JSON.stringify(data));
    router.replace("/client/checkout");
  };

  const handleCancel = () => cancelOrder(order.id);
  const handleInbox = () => router.push("/client/my-account/chat");

  const renderAction = (action: OrderAction) => {
    switch (action) {
      case "received":
        return (
          <Button
            onClick={handleReceive}
            disabled={isPending}
            size="sm"
            className="bg-[#40BFFF] hover:bg-[#33A0DD] text-white h-8"
          >
            {isPending ? "Processing..." : "Confirm Receipt"}
          </Button>
        );

      case "rebuy":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRebuy}
            className="h-8"
          >
            Rebuy
          </Button>
        );

      case "cancel":
        return (
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-300 hover:bg-red-50 dark:hover:bg-red-950 h-8"
            onClick={handleCancel}
          >
            Cancel Order
          </Button>
        );

      case "inbox":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={handleInbox}
            className="h-8"
          >
            Contact Seller
          </Button>
        );
    }
  };

  return (
    <div className="flex gap-3 justify-end px-5 py-3 bg-gray-50/50 dark:bg-gray-700/20 border-t border-gray-100 dark:border-gray-700">
      {actions.map((action) => (
        <span key={action}>{renderAction(action)}</span>
      ))}
    </div>
  );
};
