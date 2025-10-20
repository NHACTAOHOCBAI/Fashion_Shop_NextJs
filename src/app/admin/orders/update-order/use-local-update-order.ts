import UpdateOrderSchema from "@/app/admin/orders/update-order/update-order-schema"
import { OrderStatus } from "@/constants/status.enum"
import { useUpdateOrder } from "@/hooks/queries/useOrder"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalUpdateOrder = (
    updatedItem: Order | undefined,
    closeDialog: () => void
) => {
    const { mutate: updateItem, isPending } = useUpdateOrder()

    const form = useForm<z.infer<typeof UpdateOrderSchema>>({
        resolver: zodResolver(UpdateOrderSchema),
        defaultValues: {
            status: OrderStatus.PENDING,
        },
    })

    function onSubmit(values: z.infer<typeof UpdateOrderSchema>) {
        if (updatedItem) {
            updateItem(
                {
                    id: updatedItem.id,
                    data: {
                        status: values.status,
                    },
                },
                {
                    onSuccess: () => {
                        toast.success("Order has been updated", {
                            description: formatDateTimeWithAt(new Date()),
                        })
                    },
                    onError: (error) => {
                        toast.error(`Ohh!!! ${error.message}`, {
                            description: formatDateTimeWithAt(new Date()),
                        })
                    },
                    onSettled: () => {
                        handleCancel()
                    },
                }
            )
        }
    }

    const handleCancel = () => {
        closeDialog()
        form.reset()
    }

    const resetForm = useCallback(() => {
        if (!updatedItem) return
        form.reset({
            status: updatedItem.status,
        })
    }, [form, updatedItem])

    useEffect(() => {
        resetForm()
    }, [resetForm])

    return {
        form,
        isPending,
        isLoading: isPending, // có thể dùng isPending làm trạng thái loading dialog
        onSubmit,
        handleCancel,
    }
}

export default useLocalUpdateOrder
