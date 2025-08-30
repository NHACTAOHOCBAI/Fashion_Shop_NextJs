"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUpdateUser } from "@/hooks/queries/useUser"
import { Placeholder } from "@/constants/placeholder.num"
import { toast } from "sonner"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import UpdateUserSchema from "@/app/admin/users/update-user/update-user-schema"
import { useEffect, useState } from "react"
import { ImageUpload } from "@/components/image-upload/image-upload"
import { UpdateUserSkeleton } from "@/app/admin/users/update-user/update-user-skeleton"
interface UpdateUserFormProps {
    closeDialog: () => void,
    updatedUser: User | undefined
}
export function UpdateUserForm({ closeDialog, updatedUser }: UpdateUserFormProps) {
    const { mutate: UpdateUser, isPending } = useUpdateUser()
    const [isImageLoading, setIsImageLoading] = useState(false)
    const form = useForm<z.infer<typeof UpdateUserSchema>>({
        resolver: zodResolver(UpdateUserSchema),
    })
    function onSubmit(values: z.infer<typeof UpdateUserSchema>) {
        if (updatedUser) {
            UpdateUser({
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
    useEffect(() => {
        async function resetForm() {
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
        }

        resetForm()
    }, [updatedUser, form])
    if (isImageLoading)
        return (
            <UpdateUserSkeleton />
        )
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <ImageUpload disabled={isPending} field={field} label="Upload Images" numOfImage={1} />
                    )}
                />
                <FormField
                    disabled={isPending}
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                                <Input placeholder={Placeholder.FullName} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={isPending}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder={Placeholder.Email} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={isPending}
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Select  {...field}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={Placeholder.Role} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-3">
                    <Button onLoading={isPending} type="submit" className="w-full">
                        Save changes
                    </Button>
                    <Button disabled={isPending} type="button" onClick={handleCancel} variant={"outline"} className="w-full">
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}