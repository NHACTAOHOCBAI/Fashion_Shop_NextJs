import UpdateOrderSchema from "./update-order-schema";
import { OrderStatus } from "@/constants/status.enum";
import { useUpdateOrder } from "@/hooks/queries/useOrder";
import { Order } from "@/interfaces/order";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const ORDER_STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELED],

  [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELED],

  [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELED],

  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],

  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELED]: [],
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pending",
  [OrderStatus.CONFIRMED]: "Confirmed",
  [OrderStatus.PROCESSING]: "Processing",
  [OrderStatus.SHIPPED]: "Shipped",
  [OrderStatus.DELIVERED]: "Delivered",
  [OrderStatus.CANCELED]: "Canceled",
};
const useLocalUpdateOrder = (
  updatedItem: Order | undefined,
  closeDialog: () => void
) => {
  const { mutate: updateOrder, isPending } = useUpdateOrder();

  const form = useForm<z.infer<typeof UpdateOrderSchema>>({
    resolver: zodResolver(UpdateOrderSchema),
  });

  const currentStatus = updatedItem?.status as OrderStatus | undefined;

  const nextStatuses = useMemo(() => {
    if (!currentStatus) return [];
    return ORDER_STATUS_FLOW[currentStatus];
  }, [currentStatus]);

  useEffect(() => {
    if (!updatedItem) return;
    form.reset({
      status: undefined,
    });
  }, [updatedItem, form]);

  const onSubmit = (values: z.infer<typeof UpdateOrderSchema>) => {
    if (!updatedItem) return;

    updateOrder(
      {
        id: updatedItem.id,
        data: { status: values.status },
      },
      {
        onSuccess: () => {
          toast.success("Order updated successfully", {
            description: formatDateTimeWithAt(new Date()),
          });
        },
        onError: (error) => {
          toast.error(`Update failed`, {
            description: error.message,
          });
        },
        onSettled: () => {
          handleCancel();
        },
      }
    );
  };

  const handleCancel = () => {
    closeDialog();
    form.reset();
  };

  return {
    form,
    isPending,
    currentStatus,
    nextStatuses,
    onSubmit,
    handleCancel,
  };
};

export default useLocalUpdateOrder;
