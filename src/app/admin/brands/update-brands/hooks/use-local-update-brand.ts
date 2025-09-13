/* eslint-disable @typescript-eslint/no-explicit-any */
import UpdateBrandSchema from "@/app/admin/brands/update-brands/update-brand-shema"
import { useUpdateBrand } from "@/hooks/queries/useBrand"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalUpdateBrand = (updatedBrand: Brand | undefined, closeDialog: () => void,) => {
    const { mutate: updateCategory, isPending } = useUpdateBrand()
    const [isImageLoading, setIsImageLoading] = useState(false)
    const form = useForm<z.infer<typeof UpdateBrandSchema>>({
        resolver: zodResolver(UpdateBrandSchema),
        defaultValues: { image: [] }
    })
    function onSubmit(values: z.infer<typeof UpdateBrandSchema>) {
        if (updatedBrand) {
            updateCategory({
                id: updatedBrand.id,
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
    const initializeImage = async (updatedBrand: Brand) => {
        let fileArray: File[] = [];
        if (updatedBrand.imageUrl) {
            setIsImageLoading(true)
            const response = await fetch(updatedBrand.imageUrl);
            const blob = await response.blob()
            const file = new File([blob], "image", { type: blob.type });
            (file as any).preview = updatedBrand.imageUrl;
            fileArray = [file]
            setIsImageLoading(false)
        }
        return fileArray
    }
    const resetForm = useCallback(async () => {
        if (!updatedBrand) return;
        const fileArray = await initializeImage(updatedBrand)
        form.reset({
            description: updatedBrand.description ?? undefined,
            image: fileArray,
            name: updatedBrand.name,
        });

    }, [form, updatedBrand])
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