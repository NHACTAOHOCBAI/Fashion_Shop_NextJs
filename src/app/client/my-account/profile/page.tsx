"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateMyProfile } from "@/hooks/queries/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

/* =======================
 * SCHEMA
 * ======================= */
const UpdateMyProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.instanceof(File).optional(),
});

type UpdateMyProfileForm = z.infer<typeof UpdateMyProfileSchema>;

const MyProfile = () => {
  const { mutate: updateMyProfile, isPending } = useUpdateMyProfile();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  /* =======================
   * FORM
   * ======================= */
  const form = useForm<UpdateMyProfileForm>({
    resolver: zodResolver(UpdateMyProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  /* =======================
   * LOAD USER
   * ======================= */
  useEffect(() => {
    const item = localStorage.getItem("user");
    if (!item) return;

    const user = JSON.parse(item) as {
      avatar?: string;
      fullName: string;
      email: string;
    };

    form.reset({
      fullName: user.fullName,
      email: user.email,
    });

    if (user.avatar) {
      setAvatarPreview(user.avatar);
    }
  }, [form]);

  /* =======================
   * SUBMIT
   * ======================= */
  const onSubmit = (values: UpdateMyProfileForm) => {
    const formData = new FormData();

    formData.append("fullName", values.fullName);
    formData.append("email", values.email);

    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }
    updateMyProfile(
      {
        fullName: values.fullName,
        image: values.avatar,
      },
      {
        onSuccess: (data) => {
          toast.success("You have updated your profile sucessfully");
          localStorage.setItem("user", JSON.stringify(data));
        },
        onError: (error) => {
          toast.error(`Ohh!!! ${error.message}`);
        },
      }
    );

    // TODO:
    // await updateProfile(formData)
    // toast.success("Profile updated")
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#40BFFF]/5 to-transparent rounded-lg p-4 border border-[#40BFFF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#40BFFF] flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                My Profile
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your personal information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* AVATAR */}
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Profile Picture
                  </FormLabel>

                  <div className="flex items-center flex-col gap-4">
                    {avatarPreview ? (
                      <div className="relative">
                        <Image
                          src={avatarPreview}
                          alt="avatar"
                          width={200}
                          height={200}
                          className="rounded-full object-cover w-28 h-28 border-2 border-gray-200 dark:border-gray-700 shadow"
                        />
                        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#40BFFF] flex items-center justify-center shadow">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="w-14 h-14 text-gray-400" />
                      </div>
                    )}

                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          className="cursor-pointer text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 dark:file:bg-gray-700 dark:file:text-gray-300"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            field.onChange(file);
                            setAvatarPreview(URL.createObjectURL(file));
                          }}
                        />
                      </div>
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="h-px bg-gray-200 dark:bg-gray-700 my-5" />

            {/* FULL NAME */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 rounded-lg border-gray-300 dark:border-gray-600 focus:border-[#40BFFF] focus:ring-[#40BFFF]"
                      placeholder="Enter your full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="h-10 rounded-lg bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Email cannot be changed
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SUBMIT */}
            <div>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-10 bg-[#40BFFF] hover:bg-[#33A0DD] text-white rounded-lg font-medium text-sm shadow transition-colors"
              >
                {isPending ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MyProfile;
