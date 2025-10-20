"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogSkeleton } from "@/components/skeleton/dialog-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useLocalUpdateOrder from "@/app/admin/orders/update-order/use-local-update-order";

interface UpdateOrderDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  updatedItem: Order | undefined;
  setUpdatedItem: React.Dispatch<React.SetStateAction<Order | undefined>>;
}

export function UpdateOrderDialog({
  open,
  setUpdatedItem,
  updatedItem,
  setOpen,
}: UpdateOrderDialogProps) {
  const closeDialog = () => {
    setOpen(false);
    setUpdatedItem(undefined);
  };

  const { form, isPending, isLoading, onSubmit, handleCancel } =
    useLocalUpdateOrder(updatedItem, closeDialog);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Choose a new status for this order below.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <DialogSkeleton />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                disabled={isPending}
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            className="min-w-[300px]"
                            placeholder="Select order status"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                          <SelectItem value="return_requested">
                            Return_requested
                          </SelectItem>
                          <SelectItem value="returned">Returned</SelectItem>
                          <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3">
                <Button onLoading={isPending} type="submit" className="w-full">
                  Update
                </Button>
                <Button
                  disabled={isPending}
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
