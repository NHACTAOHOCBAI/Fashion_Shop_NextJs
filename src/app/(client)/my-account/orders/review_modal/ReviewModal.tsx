"use client";

import { Rating } from "@/app/(client)/my-account/orders/review_modal/start";
import useLocalReview from "@/app/(client)/my-account/orders/review_modal/use-local-review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Placeholder } from "@/constants/placeholder.num";
import Image from "next/image";
import React, { useState } from "react";

interface ReviewModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  reviewedItem: OrderItem | undefined;
}
export function ReviewModal({ open, setOpen, reviewedItem }: ReviewModalProps) {
  const [star, setStar] = useState(0);
  const { form, handleCancel, isPending, onSubmit } = useLocalReview(
    () => setOpen(false),
    star,
    reviewedItem?.variant.product.id || 0
  );
  const handleRating = (value: number) => {
    setStar(value);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md max-h-[98vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review</DialogTitle>
        </DialogHeader>
        <div className="flex gap-[10px] p-[20px]  items-center ">
          <Image
            width={150}
            height={100}
            alt="product"
            src={reviewedItem?.variant.imageUrl || ""}
            className="rounded-2xl w-[150px] h-[100px] object-cover "
          />
          <div>
            <p>{reviewedItem?.variant.product.name}</p>
            <div className="flex gap-[4px]  flex-wrap">
              {reviewedItem?.variant.variantAttributeValues.map((attribute) => (
                <Badge key={attribute.id} variant="secondary">
                  {`${attribute.attributeCategory.attribute.name}: ${attribute.attributeCategory.value}`}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Rating max={5} onChange={handleRating} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={isPending}
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={Placeholder.CategoryName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end mt-4">
              <Button
                disabled={isPending}
                type="button"
                onClick={handleCancel}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button onLoading={isPending} type="submit">
                Post
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
