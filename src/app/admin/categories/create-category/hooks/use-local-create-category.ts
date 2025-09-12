
import CreateCategorySchema from "@/app/admin/categories/create-category/create-category-schema"
import { useCreateCategory } from "@/hooks/queries/useCategory"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalCreateCategory = (closeDialog: () => void) => {
    const { mutate: createCategory, isPending } = useCreateCategory()
    const form = useForm<z.infer<typeof CreateCategorySchema>>({
        resolver: zodResolver(CreateCategorySchema),
    })
    function onSubmit(values: z.infer<typeof CreateCategorySchema>) {
        createCategory({
            name: values.name,
            description: values.description,
            parentId: values.parentId,
            image: values.image && values.image[0]
        }, {
            onSuccess: () => {
                toast.success("Category has been created", {
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
    }
    return {
        form,
        onSubmit,
        isPending,
        handleCancel
    }
}
export default useLocalCreateCategory