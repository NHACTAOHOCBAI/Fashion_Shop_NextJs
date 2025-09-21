

import CreateBrandSchema from "@/app/admin/brands/create-brand/create-brand-schema"
import { useCreateBrand } from "@/hooks/queries/useBrand"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalCreateBrand = (closeDialog: () => void) => {
    const { mutate: createItem, isPending } = useCreateBrand()
    const form = useForm<z.infer<typeof CreateBrandSchema>>({
        resolver: zodResolver(CreateBrandSchema),
        defaultValues: { image: [] }
    })
    function onSubmit(values: z.infer<typeof CreateBrandSchema>) {
        createItem({
            name: values.name,
            description: values.description,
            image: values.image && values.image[0]
        }, {
            onSuccess: () => {
                toast.success("Brand has been created", {
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
export default useLocalCreateBrand