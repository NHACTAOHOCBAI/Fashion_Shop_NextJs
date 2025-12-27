"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import LoginSchema from "@/app/(auth)/login/login-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Placeholder } from "@/constants/placeholder.num";
import { useLogin } from "@/hooks/queries/useAuth";
import { toast } from "sonner";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";
import { connectSocket } from "@/lib/socket";
import Link from "next/link";
export function LoginForm({}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    login(values, {
      onSuccess: ({ user, token, access_token }) => {
        const authToken = token || access_token;
        dispatch(setCredentials({ user: user, token: authToken as string }));
        localStorage.setItem("user", JSON.stringify(user));
        if (authToken) {
          localStorage.setItem("token", authToken);
        }
        toast.success("Login success", {
          description: formatDateTimeWithAt(new Date()),
        });
        connectSocket(user.id);
        router.push("/admin/users/view-users");
      },
      onError: (error) => {
        toast.error(`Ohh!!! ${error.message}`);
      },
    });
  }
  // const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          disabled={isPending}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
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
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder={Placeholder.Password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          <Button
            onLoading={isPending}
            type="submit"
            className="w-full bg-[#40BFFF] hover:bg-[#40BFFF]/70"
          >
            Login
          </Button>
          <Button
            disabled={isPending}
            type="button"
            variant={"outline"}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
