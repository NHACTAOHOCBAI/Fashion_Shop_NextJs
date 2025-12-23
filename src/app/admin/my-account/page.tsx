"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  useChangePassword,
  useMyProfile,
  useUpdateMyProfile,
} from "@/hooks/queries/useAuth";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const UpdateProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password confirmation does not match",
  });

export default function AdminMyAccountPage() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { data: user, isLoading } = useMyProfile();
  const { mutate: updateProfile, isPending } = useUpdateMyProfile();
  const { mutate: changePassword } = useChangePassword();

  /* ---------------- PROFILE FORM ---------------- */
  const profileForm = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({ fullName: user.fullName });
    }
  }, [user, profileForm]);

  const onUpdateProfile = (values: z.infer<typeof UpdateProfileSchema>) => {
    updateProfile(
      {
        fullName: values.fullName,
        image: avatarFile as File,
      },
      {
        onSuccess: () =>
          toast.success("Profile updated", {
            description: formatDateTimeWithAt(new Date()),
          }),
      }
    );
  };

  /* ---------------- PASSWORD FORM ---------------- */
  const passwordForm = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onChangePassword = (values: z.infer<typeof ChangePasswordSchema>) => {
    changePassword(
      {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password changed successfully");
          passwordForm.reset();
        },
      }
    );
  };

  if (isLoading || !user) return null;

  return (
    <div className="w-[500px] space-y-6 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile header */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} />
                ) : (
                  <AvatarImage src={user.avatar} />
                )}
                <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
              </Avatar>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="avatar-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setAvatarFile(file);
                  setAvatarPreview(URL.createObjectURL(file));
                }}
              />

              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-primary p-1 text-white text-xs"
              >
                ✎
              </label>
            </div>

            <div>
              <h3 className="text-lg font-semibold">{user.fullName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge variant="secondary" className="mt-2">
                {user.role}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* UPDATE PROFILE */}
          <form
            onSubmit={profileForm.handleSubmit(onUpdateProfile)}
            className="space-y-3"
          >
            <h4 className="font-medium">Personal Information</h4>

            <Input
              {...profileForm.register("fullName")}
              placeholder="Full name"
            />
            {profileForm.formState.errors.fullName && (
              <p className="text-sm text-red-500">
                {profileForm.formState.errors.fullName.message}
              </p>
            )}

            <Button type="submit" disabled={isPending}>
              Save profile
            </Button>
          </form>

          <Separator />

          {/* CHANGE PASSWORD */}
          <form
            onSubmit={passwordForm.handleSubmit(onChangePassword)}
            className="space-y-3"
          >
            <h4 className="font-medium">Change Password</h4>

            <Input
              type="password"
              placeholder="Current password"
              {...passwordForm.register("currentPassword")}
            />
            <p className="text-sm text-red-500">
              {passwordForm.formState.errors.currentPassword?.message}
            </p>

            <Input
              type="password"
              placeholder="New password"
              {...passwordForm.register("newPassword")}
            />
            <p className="text-sm text-red-500">
              {passwordForm.formState.errors.newPassword?.message}
            </p>

            <Input
              type="password"
              placeholder="Confirm new password"
              {...passwordForm.register("confirmPassword")}
            />
            <p className="text-sm text-red-500">
              {passwordForm.formState.errors.confirmPassword?.message}
            </p>

            <Button variant="outline" type="submit">
              Change password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
