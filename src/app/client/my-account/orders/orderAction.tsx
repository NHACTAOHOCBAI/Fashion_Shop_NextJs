import { OrderAction } from "@/app/client/my-account/orders/constant";
import { Button } from "@/components/ui/button";

type Props = {
  order: Order;
  actions: OrderAction[];
};

export const OrderActions = ({ order, actions }: Props) => {
  const handleReview = () => console.log("Review", order.id);
  const handleRebuy = () => console.log("Rebuy", order.id);
  const handleCancel = () => console.log("Cancel", order.id);
  const handleInbox = () => console.log("Inbox", order.id);

  const renderAction = (action: OrderAction) => {
    switch (action) {
      case "review":
        return (
          <Button variant="outline" onClick={handleReview}>
            Review
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
