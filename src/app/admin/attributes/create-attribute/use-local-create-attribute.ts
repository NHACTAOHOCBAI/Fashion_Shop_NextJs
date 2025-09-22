

import CreateAttributeSchema from "@/app/admin/attributes/create-attribute/create-attribute-schema"
import { useCreateAttribute } from "@/hooks/queries/useAttribute"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalCreateAttribute = (closeDialog: () => void) => {
    const { mutate: createItem, isPending } = useCreateAttribute()
    const form = useForm<z.infer<typeof CreateAttributeSchema>>({
        resolver: zodResolver(CreateAttributeSchema),
    })
    function onSubmit(values: z.infer<typeof CreateAttributeSchema>) {
        createItem({
            name: values.name,
        }, {
            onSuccess: () => {
                toast.success("Attribute has been created", {
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
    const handleCancel = () => {
        closeDialog()
        form.reset()
    }
    return {
        form,
        onSubmit,
        isPending,
        handleCancel
    }
}
export default useLocalCreateAttribute