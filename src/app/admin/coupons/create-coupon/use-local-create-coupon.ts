import CreateCouponSchema from "@/app/admin/coupons/create-coupon/create-coupon-schema";
import { useCreateCoupon } from "@/hooks/queries/useCoupon";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const useLocalCreateCoupon = (closeDialog: () => void) => {
  const { mutate: createItem, isPending } = useCreateCoupon();

  const form = useForm<z.infer<typeof CreateCouponSchema>>({
    resolver: zodResolver(CreateCouponSchema),
    defaultValues: {
      code: "",
      description: "",
      discountValue: 0,
      minOrderAmount: 0,
      usageLimit: 1,
      usageLimitPerUser: 1,
    },
  });

  function onSubmit(values: z.infer<typeof CreateCouponSchema>) {
    createItem(values, {
      onSuccess: () => {
        toast.success("Coupon has been created", {
          description: formatDateTimeWithAt(new Date()),
        });
      },
      onError: (error) => {
        toast.error(`Ohh!!! ${error.message}`, {
          description: formatDateTimeWithAt(new Date()),
        });
      },
      onSettled: () => {
        handleCancel();
      },
    });
  }

  const handleCancel = () => {
    closeDialog();
    form.reset();
  };

  return {
    form,
    onSubmit,
    isPending,
    handleCancel,
  };
};

export default useLocalCreateCoupon;
