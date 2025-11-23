import ReviewModalSchema from "@/app/(client)/my-account/orders/review_modal/review-modal-schema";
import { useCreateReview } from "@/hooks/queries/useReview";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const useLocalReview = (
  closeDialog: () => void,
  star: number,
  productId: number
) => {
  const { mutate: createItem, isPending } = useCreateReview();
  const form = useForm<z.infer<typeof ReviewModalSchema>>({
    resolver: zodResolver(ReviewModalSchema),
  });
  function onSubmit(values: z.infer<typeof ReviewModalSchema>) {
    createItem(
      {
        comment: values.comment,
        rating: star,
        productId: productId,
      },
      {
        onSuccess: () => {
          toast.success("You has posted this review", {
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
      }
    );
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
export default useLocalReview;
