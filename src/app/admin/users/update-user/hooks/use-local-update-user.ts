/* eslint-disable @typescript-eslint/no-explicit-any */
import UpdateUserSchema from "@/app/admin/users/update-user/update-user-schema"
import { useUpdateUser } from "@/hooks/queries/useUser"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalUpdateUser = (updatedUser: User | undefined, closeDialog: () => void,) => {
    const { mutate: updateUser, isPending } = useUpdateUser()
    const [isImageLoading, setIsImageLoading] = useState(false)
    const form = useForm<z.infer<typeof UpdateUserSchema>>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: { fullName: "", email: "", role: undefined, avatar: [] }
    })
    function onSubmit(values: z.infer<typeof UpdateUserSchema>) {
        if (updatedUser) {
            updateUser({
                id: updatedUser.id,
                data: {
                    email: values.email,
                    fullName: values.fullName,
                    role: values.role,
                    image: values.avatar && values.avatar[0]
                }
            }, {
                onSuccess: () => {
                    toast.success("User has been updated", {
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
    const initializeImage = async (updatedUser: User) => {
        let fileArray: File[] = [];
        if (updatedUser.avatar) {
            setIsImageLoading(true)
            const response = await fetch(updatedUser.avatar);
            const blob = await response.blob()
            const file = new File([blob], "image", { type: blob.type });
            (file as any).preview = updatedUser.avatar;
            fileArray = [file]
            setIsImageLoading(false)
        }
        return fileArray
    }
    const resetForm = useCallback(async () => {
        if (!updatedUser) return;

        const fileArray = await initializeImage(updatedUser)
        form.reset({
            email: updatedUser.email,
            fullName: updatedUser.fullName,
            role: updatedUser.role,
            avatar: fileArray
        })
    }, [form, updatedUser])
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
export default useLocalUpdateUser