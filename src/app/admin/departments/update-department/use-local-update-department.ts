/* eslint-disable @typescript-eslint/no-explicit-any */

import UpdateDepartmentSchema from "@/app/admin/departments/update-department/update-department-schema"
import { useUpdateDepartment } from "@/hooks/queries/useDepartment"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalUpdateDepartment = (updatedItem: Department | undefined, closeDialog: () => void,) => {
    const { mutate: updateItem, isPending } = useUpdateDepartment()
    const [isImageLoading, setIsImageLoading] = useState(false)
    const form = useForm<z.infer<typeof UpdateDepartmentSchema>>({
        resolver: zodResolver(UpdateDepartmentSchema),
        defaultValues: { image: [] }
    })
    function onSubmit(values: z.infer<typeof UpdateDepartmentSchema>) {
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
                    toast.success("Department has been updated", {
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
    const initializeImage = async (updatedItem: Department) => {
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
export default useLocalUpdateDepartment