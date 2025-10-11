'use client'

import UpdateProfileSchema from "@/app/(client)/my-account/profile/create-user-schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMyProfile, useUpdateMyProfile } from "@/hooks/queries/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { toast } from "sonner"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import Content from "@/app/(client)/my-account/_components/Content"

const Profile = () => {
    const { data: myProfile } = useMyProfile()
    const { mutate: updateMyProfile, isPending } = useUpdateMyProfile()
    const [preview, setPreview] = useState<string | null>(null)

    const form = useForm<z.infer<typeof UpdateProfileSchema>>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: { fullName: "", avatar: [] },
    })

    // 🔁 Reset form khi có dữ liệu user
    const resetForm = useCallback(() => {
        if (!myProfile) return
        form.reset({
            fullName: myProfile.fullName,
            email: myProfile.email,
        })
        setPreview(myProfile.avatar || null)
    }, [form, myProfile])

    useEffect(() => {
        resetForm()
    }, [resetForm])

    // 📤 Hàm submit form
    const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
        updateMyProfile(
            {
                fullName: values.fullName,
                image: values.avatar && values.avatar[0] ? values.avatar[0] : undefined,
            },
            {
                onSuccess: () => {
                    toast.success("Profile has been updated", {
                        description: formatDateTimeWithAt(new Date()),
                    })
                },
                onError: (error) => {
                    toast.error(`Ohh!!! ${error.message}`, {
                        description: formatDateTimeWithAt(new Date()),
                    })
                },
            }
        )
    }

    // 📸 Khi chọn ảnh mới
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            form.setValue("avatar", [file])
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <Content title="My Profile">
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Avatar hiển thị */}
                    <div className="flex flex-col items-center gap-3">
                        <Image
                            width={200}
                            height={200}
                            alt="avatar"
                            src={
                                preview ||
                                "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"
                            }
                            className="rounded-full w-[200px] h-[200px] object-cover border"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-sm text-gray-500"
                        />
                    </div>

                    {/* Full name */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your full name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email (readonly) */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <div className="pt-4">
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Saving..." : "Save changes"}
                        </Button>
                    </div>
                </form>
            </Form>
        </Content>
    )
}

export default Profile
