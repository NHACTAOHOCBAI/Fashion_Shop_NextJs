'use client'
import UpdateProfileSchema from "@/app/(client)/my-account/profile/create-user-schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import z from "zod"

const Profile = () => {
    const form = useForm<z.infer<typeof UpdateProfileSchema>>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: { fullName: "", avatar: [] }
    })
    return (
        <Form {...form} >
            <form className="space-y-4" >
                <Image
                    width={250} height={250} alt="shoes" src={"https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"}
                    className="rounded-full w-[200px] h-[200px] object-cover mx-auto drop-shadow-xl"
                />
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="email"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </form>
        </Form>
    )
}
export default Profile