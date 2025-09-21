/* eslint-disable @typescript-eslint/no-explicit-any */
import UpdateBrandSchema from "@/app/admin/brands/update-brand/update-brand-schema"
import { useUpdateBrand } from "@/hooks/queries/useBrand"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalUpdateBrand = (updatedItem: Brand | undefined, closeDialog: () => void,) => {
    const { mutate: updateItem, isPending } = useUpdateBrand()
    const [isImageLoading, setIsImageLoading] = useState(false)
    const form = useForm<z.infer<typeof UpdateBrandSchema>>({
        resolver: zodResolver(UpdateBrandSchema),
        defaultValues: { image: [] }
    })
    function onSubmit(values: z.infer<typeof UpdateBrandSchema>) {
        if (updatedItem) {
            updateItem({
                id: updatedItem.id,
                data: {
                    name: values.name,
                    description: values.description,
                    image: values.image && values.image[0]
                }
            }, {
                onSuccess: () => {
                    toast.success("Brand has been updated", {
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
    const initializeImage = async (updatedItem: Brand) => {
        let fileArray: File[] = [];
        if (updatedItem.imageUrl) {
            setIsImageLoading(true)
            const response = await fetch(updatedItem.imageUrl);
            const blob = await response.blob()
            const file = new File([blob], "image", { type: blob.type });
            (file as any).preview = updatedItem.imageUrl;
            fileArray = [file]
            setIsImageLoading(false)
        }
        return fileArray
    }
    const resetForm = useCallback(async () => {
        if (!updatedItem) return;
        const fileArray = await initializeImage(updatedItem)
        form.reset({
            description: updatedItem.description ?? undefined,
            image: fileArray,
            name: updatedItem.name,
        });

    }, [form, updatedItem])
    useEffect(() => {
        resetForm()
    }, [resetForm])
    return {
        isImageLoading,
        form,
        isPending,
        onSubmit,
        handleCancel,
    }
}
export default useLocalUpdateBrand