
import UpdateAttributeSchema from "@/app/admin/attributes/update-attribute/update-attribute-schema"
import { useUpdateAttribute } from "@/hooks/queries/useAttribute"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalUpdateAttribute = (updatedItem: Attribute | undefined, closeDialog: () => void,) => {
    const { mutate: updateItem, isPending } = useUpdateAttribute()
    const form = useForm<z.infer<typeof UpdateAttributeSchema>>({
        resolver: zodResolver(UpdateAttributeSchema),
    })
    function onSubmit(values: z.infer<typeof UpdateAttributeSchema>) {
        if (updatedItem) {
            updateItem({
                id: updatedItem.id,
                data: {
                    name: values.name,
                }
            }, {
                onSuccess: () => {
                    toast.success("Attribute has been updated", {
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
                }
            })
        }
    }
    const handleCancel = () => {
        closeDialog()
        form.reset()
    }
    const resetForm = useCallback(async () => {
        if (!updatedItem) return;
        form.reset({
            name: updatedItem.name,
        });

    }, [form, updatedItem])
    useEffect(() => {
        resetForm()
    }, [resetForm])
    return {
        form,
        isPending,
        onSubmit,
        handleCancel,
    }
}
export default useLocalUpdateAttribute