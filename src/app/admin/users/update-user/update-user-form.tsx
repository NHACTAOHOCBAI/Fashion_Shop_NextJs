"use client"

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
import { Placeholder } from "@/constants/placeholder.num"
import { ImageUpload } from "@/components/image-upload/image-upload"
import { DialogSkeleton } from "@/components/skeleton/dialog-skeleton"
import useLocalUpdateUser from "@/app/admin/users/update-user/hooks/use-local-update-user"
interface UpdateUserFormProps {
    closeDialog: () => void,
    updatedUser: User | undefined
}
export function UpdateUserForm({ closeDialog, updatedUser }: UpdateUserFormProps) {
    const { form, isImageLoading, isPending, onSubmit, handleCancel } = useLocalUpdateUser(updatedUser, closeDialog)
    if (isImageLoading)
        return (
            <DialogSkeleton />
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