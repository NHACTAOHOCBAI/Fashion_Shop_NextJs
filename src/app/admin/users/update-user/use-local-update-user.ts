import UpdateUserSchema from "@/app/admin/users/update-user/update-user-schema";
import { useUpdateUser } from "@/hooks/queries/useUser";
import { useInitializeImage } from "@/hooks/useInitializeImage";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const useLocalUpdateUser = (
  updatedItem: User | undefined,
  closeDialog: () => void
) => {
  const { mutate: updateItem, isPending } = useUpdateUser();
  const { fileArray, isImageLoading } = useInitializeImage(updatedItem?.avatar);
  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: { fullName: "", email: "", role: undefined, avatar: [] },
  });
  function onSubmit(values: z.infer<typeof UpdateUserSchema>) {
    if (updatedItem) {
      updateItem(
        {
          id: updatedItem.id,
          data: {
            email: values.email,
            fullName: values.fullName,
            role: values.role,
            image: values.avatar && values.avatar[0],
          },
        },
        {
          onSuccess: () => {
            toast.success("User has been updated", {
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
  }
  const handleCancel = () => {
    closeDialog();
    form.reset();
  };
  const resetForm = useCallback(async () => {
    if (!updatedItem) return;
    form.reset({
      email: updatedItem.email,
      fullName: updatedItem.fullName,
      role: updatedItem.role,
      avatar: fileArray,
    });
  }, [form, updatedItem, fileArray]);
  useEffect(() => {
    resetForm();
  }, [resetForm]);
  return {
    isImageLoading,
    form,
    isPending,
    onSubmit,
    handleCancel,
  };
};
export default useLocalUpdateUser;
