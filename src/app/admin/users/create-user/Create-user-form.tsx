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
import CreateUserSchema from "@/app/admin/users/create-user/create-user-schema"
import { useCreateUser } from "@/hooks/queries/useUser"
import { Placeholder } from "@/constants/placeholder.num"
import { toast } from "sonner"
import { formatDateTimeWithAt } from "@/lib/formatDate"
interface CreateUserFormProps {
    closeDialog: () => void
}
export function CreateUserForm({ closeDialog }: CreateUserFormProps) {
    const { mutate: createUser, isPending } = useCreateUser()
    const form = useForm<z.infer<typeof CreateUserSchema>>({
        resolver: zodResolver(CreateUserSchema),
    })
    function onSubmit(values: z.infer<typeof CreateUserSchema>) {
        createUser({
            email: values.email,
            fullName: values.fullName,
            password: values.password,
            role: values.role
        }, {
            onSuccess: () => {
                toast("User has been created", {
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
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder={Placeholder.Password} {...field} />
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
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
                        Create
                    </Button>
                    <Button disabled={isPending} type="button" onClick={handleCancel} variant={"outline"} className="w-full">
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}