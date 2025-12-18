"use client";
import { OrderAction } from "@/app/client/my-account/orders/constant";
import { Button } from "@/components/ui/button";
import { useConfirmOrder, useDeleteOrder } from "@/hooks/queries/useOrder";
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
  const handleInbox = () => console.log("Inbox", order.id);

  const renderAction = (action: OrderAction) => {
    switch (action) {
      case "received":
        return (
          <Button onClick={handleReceive} disabled={isPending}>
            {isPending ? "Đang xử lý..." : "Nhận hàng"}
          </Button>
        );

      case "rebuy":
        return (
          <Button variant="outline" onClick={handleRebuy}>
            Rebuy
          </Button>
        );

      case "cancel":
        return (
          <Button
            variant="outline"
            className="text-red-500 border-red-300"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        );

      case "inbox":
        return (
          <Button variant="outline" onClick={handleInbox}>
            Inbox
          </Button>
        );
    }
  };

  return (
    <div className="flex gap-[24px] justify-end mt-[22px] mb-[20px]">
      {actions.map((action) => (
        <span key={action}>{renderAction(action)}</span>
      ))}
    </div>
  );
};
