// app/(auth)/reset-password/page.tsx
"use client";
// schemas/reset-password.schema.ts
import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { resetPassword } from "@/services/auth.service";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Token is not valid</p>
      </div>
    );
  }

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await resetPassword({
        token,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });

      toast.success("Change password success");
      router.push("/login");
    } catch (error) {
      toast.error("Ohh, error?");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>New password</Label>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>Confirm password</Label>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Loading..." : "Reset password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
