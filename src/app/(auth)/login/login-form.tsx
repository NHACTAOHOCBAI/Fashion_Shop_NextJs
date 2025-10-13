"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import LoginSchema from "@/app/(auth)/login/login-schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Placeholder } from "@/constants/placeholder.num"
import { useLogin } from "@/hooks/queries/useAuth"
import { toast } from "sonner"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader } from "lucide-react"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/store/authSlice"
import { connectSocket } from "@/lib/socket"


export function LoginForm({
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false);

  const { mutate: login, isPending } = useLogin()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  })
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    login(values, {
      onSuccess: ({ user }) => {
        dispatch(setCredentials({ user: user }))
        toast.success("Login success", {
          description: formatDateTimeWithAt(new Date()),
        })
        setIsNavigating(true)  // 👈 bật trạng thái loading

        connectSocket(user.id);
        router.push('/admin/users/view-users')
      },
      onError: (error) => {
        toast.error(`Ohh!!! ${error.message}`, {
          description: formatDateTimeWithAt(new Date()),
        })
      },
    })
  }
  if (isNavigating)
    return (
      <div className="flex justify-center items-center gap-2">
        <Loader className="h-5 w-5 animate-spin" />
        Loading...
      </div>
    )
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
        <FormField
          disabled={isPending}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <FormControl>
                <Input type="password" placeholder={Placeholder.Password} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          <Button onLoading={isPending} type="submit" className="w-full">
            Create
          </Button>
          <Button disabled={isPending} type="button" variant={"outline"} className="w-full">
            Cancel
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </Form>
  )
}
