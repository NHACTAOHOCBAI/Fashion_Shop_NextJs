"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import RegisterSchema from "@/app/(auth)/register/register-schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/app/client/_components/Loading";
import Link from "next/link";
import { useRegister } from "@/hooks/queries/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
/* ================= REGISTER PAGE ================= */
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="w-[1200px] bg-white rounded-xl shadow-lg grid grid-cols-1 lg:grid-cols-2 overflow-hidden h-[640px]">
        {/* Left Illustration */}
        <div className="flex items-center justify-center p-10">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl font-bold">
                Create your <span className="text-primary">Account</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RegisterForm />

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Form */}
        <div className="hidden lg:flex items-center justify-center bg-[#f4f5ff]">
          <Loading />
        </div>
      </div>
    </div>
  );
}

/* ================= REGISTER FORM ================= */
function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const router = useRouter();
  const { mutate: register } = useRegister();
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    register(
      {
        email: values.email,
        fullName: values.fullName,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/register/success");
        },
        onError: (error) => {
          toast.error(`Ohh!!! ${error.message}`);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-[#40BFFF] hover:bg-[#40BFFF]/70"
        >
          Create account
        </Button>
      </form>
    </Form>
  );
}
