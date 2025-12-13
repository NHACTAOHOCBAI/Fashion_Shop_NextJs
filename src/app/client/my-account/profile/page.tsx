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
        onSuccess: () => {
          toast.success("You have updated your profile sucessfully");
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
    <div>
      <p className="text-[24px]">My Profile</p>
      <p className="text-[18px] font-light mt-[11px]">
        Manage information for your profile
      </p>

      <div className="mt-[60px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* AVATAR */}
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>

                  <div className="flex items-center flex-col gap-4">
                    {avatarPreview && (
                      <Image
                        src={avatarPreview}
                        alt="avatar"
                        width={200}
                        height={200}
                        className="rounded-full object-cover"
                      />
                    )}

                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          field.onChange(file);
                          setAvatarPreview(URL.createObjectURL(file));
                        }}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FULL NAME */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SUBMIT */}
            <Button type="submit" className="mt-4">
              Update Profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MyProfile;
