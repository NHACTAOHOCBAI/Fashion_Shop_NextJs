import UpdateCategorySchema from "@/app/admin/categories/update-category/update-category-schema"
import { useUpdateCategory } from "@/hooks/queries/useCategory"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalUpdateCategory = (updatedCategory: Category | undefined, closeDialog: () => void,) => {
    const { mutate: updateCategory, isPending } = useUpdateCategory()
    const [isImageLoading, setIsImageLoading] = useState(false)
    const form = useForm<z.infer<typeof UpdateCategorySchema>>({
        resolver: zodResolver(UpdateCategorySchema),
    })
    function onSubmit(values: z.infer<typeof UpdateCategorySchema>) {
        if (updatedCategory) {
            updateCategory({
                id: updatedCategory.id,
                data: {
                    name: values.name,
                    description: values.description,
                    parentId: values.parentId,
                    image: values.image && values.image[0]
                }
            }, {
                onSuccess: () => {
                    toast.success("Category has been updated", {
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
    }
    const resetForm = useCallback(async () => {
        if (!updatedCategory) return;

        let fileArray: File[] = [];
        if (updatedCategory.imageUrl) {
            setIsImageLoading(true)
            const response = await fetch(updatedCategory.imageUrl)
            const blob = await response.blob()
            const file = new File([blob], "avatar.jpg", { type: blob.type })
            fileArray = [file]
            setIsImageLoading(false)
        }
        form.reset({
            description: updatedCategory.description,
            image: fileArray,
            name: updatedCategory.name,
            parentId: updatedCategory.parentId
        })
    }, [form, updatedCategory])
    useEffect(() => {
        resetForm()
    }, [resetForm])
    return {
        isImageLoading,
        form,
        isPending,
        onSubmit,
        handleCancel
    }
}
export default useLocalUpdateCategory