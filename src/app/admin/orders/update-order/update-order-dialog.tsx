"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogSkeleton } from "@/components/skeleton/dialog-skeleton";
import useLocalUpdateOrder, {
  ORDER_STATUS_LABEL,
} from "./use-local-update-order";
import { Order } from "@/interfaces/order";

interface UpdateOrderDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  updatedItem: Order | undefined;
  setUpdatedItem: React.Dispatch<React.SetStateAction<Order | undefined>>;
}

export function UpdateOrderDialog({
  open,
  setOpen,
  updatedItem,
  setUpdatedItem,
}: UpdateOrderDialogProps) {
  const closeDialog = () => {
    setOpen(false);
    setUpdatedItem(undefined);
  };

  const {
    form,
    isPending,
    currentStatus,
    nextStatuses,
    onSubmit,
    handleCancel,
  } = useLocalUpdateOrder(updatedItem, closeDialog);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <h6>Update Order Status</h6>
          <DialogDescription>
            You can only move the order to the next valid step.
          </DialogDescription>
        </DialogHeader>

        {!updatedItem ? (
          <DialogSkeleton />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Current status */}
              <div className="text-sm">
                Current status:{" "}
                <span className="font-semibold">
                  {ORDER_STATUS_LABEL[currentStatus!]}
                </span>
              </div>

              {/* Next status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next status</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isPending || nextStatuses.length === 0}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select next step" />
                        </SelectTrigger>

                        <SelectContent>
                          {nextStatuses.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-muted-foreground">
                              This order can no longer be updated
                            </div>
                          ) : (
                            nextStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {ORDER_STATUS_LABEL[status]}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  onLoading={isPending}
                  disabled={isPending || nextStatuses.length === 0}
                >
                  Update
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleCancel}
                  disabled={isPending}
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
