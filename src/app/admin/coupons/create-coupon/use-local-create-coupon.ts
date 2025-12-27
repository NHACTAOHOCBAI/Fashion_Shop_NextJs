"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";

import CreateCouponSchema from "./create-coupon-schema";
import { useMutation } from "@tanstack/react-query";

import { formatDateTimeWithAt } from "@/lib/formatDate";
import { useCreateCoupon } from "@/hooks/queries/useCoupon";

const useLocalCreateCoupon = (closeDialog: () => void) => {
  const { mutate: createCoupon, isPending } = useCreateCoupon();

  const form = useForm<z.infer<typeof CreateCouponSchema>>({
    resolver: zodResolver(CreateCouponSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      discountType: "percentage",
      discountValue: 10,
      minOrderAmount: 0,
      usageLimit: 1,
      usageLimitPerUser: 1,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      targets: [],
    },
  });

  const handleCancel = () => {
    form.reset();
    closeDialog();
  };

  const onSubmit = (values: z.infer<typeof CreateCouponSchema>) => {
    const payload = {
      ...values,
      discountValue:
        values.discountType === "free_shipping"
          ? undefined
          : values.discountValue,
    };
    console.log(payload);
    createCoupon(payload, {
      onSuccess: () => {
        toast.success("Coupon has been created", {
          description: formatDateTimeWithAt(new Date()),
        });
        handleCancel();
      },
      onError: (error: any) => {
        toast.error(`Ohh!!! ${error.message}`, {
          description: formatDateTimeWithAt(new Date()),
        });
      },
    });
  };

  return { form, onSubmit, isPending, handleCancel };
};

export default useLocalCreateCoupon;
