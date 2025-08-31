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
    }
    const resetForm = useCallback(async () => {
        if (!updatedUser) return;

        let fileArray: File[] = [];
        if (updatedUser.avatar) {
            setIsImageLoading(true)
            const response = await fetch(updatedUser.avatar)
            const blob = await response.blob()
            const file = new File([blob], "avatar.jpg", { type: blob.type })
            fileArray = [file]
            setIsImageLoading(false)
        }
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