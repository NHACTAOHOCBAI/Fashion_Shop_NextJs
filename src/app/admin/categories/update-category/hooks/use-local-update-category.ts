/* eslint-disable @typescript-eslint/no-explicit-any */
import UpdateCategorySchema from "@/app/admin/categories/update-category/update-category-schema"
import { useCategorySelections, useUpdateCategory } from "@/hooks/queries/useCategory"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalUpdateCategory = (updatedCategory: Category | undefined, closeDialog: () => void,) => {
    const { mutate: updateCategory, isPending } = useUpdateCategory()
    const { data } = useCategorySelections()
    const categorySelections = data
        ?.filter(category => category.id !== updatedCategory?.id)
        .map(category => ({
            value: category.id,
            label: category.name,
        }))

    const [isImageLoading, setIsImageLoading] = useState(false)
    const form = useForm<z.infer<typeof UpdateCategorySchema>>({
        resolver: zodResolver(UpdateCategorySchema),
        defaultValues: { name: "", description: "", parentId: undefined, image: [] }
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
        form.reset()
    }
    const initializeImage = async (updatedCategory: Category) => {
        let fileArray: File[] = [];
        if (updatedCategory.imageUrl) {
            setIsImageLoading(true)
            const response = await fetch(updatedCategory.imageUrl);
            const blob = await response.blob()
            const file = new File([blob], "image", { type: blob.type });
            (file as any).preview = updatedCategory.imageUrl;
            fileArray = [file]
            setIsImageLoading(false)
        }
        return fileArray
    }
    const resetForm = useCallback(async () => {
        if (!updatedCategory) return;
        const fileArray = await initializeImage(updatedCategory)
        form.reset({
            description: updatedCategory.description ?? undefined,
            image: fileArray,
            name: updatedCategory.name,
            parentId: updatedCategory.parentId ?? undefined,
        });

    }, [form, updatedCategory])
    useEffect(() => {
        resetForm()
    }, [resetForm])
    return {
        isImageLoading,
        form,
        isPending,
        onSubmit,
        handleCancel,
        categorySelections
    }
}
export default useLocalUpdateCategory