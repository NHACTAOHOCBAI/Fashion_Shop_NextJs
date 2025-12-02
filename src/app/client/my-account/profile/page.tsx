"use client";
import { Calendar22 } from "@/app/client/my-account/profile/MyDatePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
const UpdateMyProfileSchema = z.object({
  fullName: z.string("full name is required"),
  email: z.string("email is required"),
  gender: z.string("gender is required"),
  dob: z.string("email is required"),
});

const MyProfile = () => {
  const form = useForm<z.infer<typeof UpdateMyProfileSchema>>({
    resolver: zodResolver(UpdateMyProfileSchema),
  });
  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[24px]">My Profile </p>
          <p className="text-[18px] font-light mt-[11px]">
            Manage information for your profile
          </p>
        </div>
      </div>
      <div className=" mt-[60px]">
        <Form {...form}>
          <form className="space-y-4">
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      defaultValue=""
                      className="flex gap-[20px]"
                    >
                      <div className="flex items-center gap-[14px]">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="font-light">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="font-light">
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
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
                    <Calendar22 />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
export default MyProfile;
