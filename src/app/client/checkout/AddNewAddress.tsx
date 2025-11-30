"use client";
import NormalButton from "@/app/client/_components/NormalButton";
import { AlertDialogContent } from "@/components/ui/alert-dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const AddNewAddressSchema = z.object({
  fullName: z.string("full name is required"),
  phone: z.string("phone is required"),
  province: z.string("province is required"),
  district: z.string("district is required"),
  communce: z.string("communce is required"),
  detailAddress: z.string("detail address is required"),
  addressType: z.string("address type is required"),
});

const AddNewAddress = () => {
  const form = useForm<z.infer<typeof AddNewAddressSchema>>({
    resolver: zodResolver(AddNewAddressSchema),
  });
  return (
    <AlertDialogContent className="w-[600px] max-h-[600px] flex flex-col">
      <div className="flex justify-between ">
        <p className="font-medium">Add New Address</p>
        <AlertDialogPrimitive.Cancel>
          <X />
        </AlertDialogPrimitive.Cancel>
      </div>
      <div className="bg-[#FAFAFB] h-[2px] w-full" />
      <div>
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
            <div className="flex gap-[40px]">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Select value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"Da nang"}>Da Nang</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-[40px]">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dicstrict</FormLabel>
                      <FormControl>
                        <Select value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"Da nang"}>Da Nang</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Communce</FormLabel>
                      <FormControl>
                        <Select value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"Da nang"}>Da Nang</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="detailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detail address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      defaultValue=""
                      className="flex gap-[20px]"
                    >
                      <div className="flex items-center gap-[14px]">
                        <RadioGroupItem value="home" id="home" />
                        <Label
                          htmlFor="home"
                          className=" h-[26px] bg-gray-100 rounded-[5px] px-[20px] font-light"
                        >
                          Home
                        </Label>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <RadioGroupItem value="office" id="office" />
                        <Label
                          htmlFor="office"
                          className=" h-[26px] bg-gray-100 rounded-[5px] px-[20px] font-light"
                        >
                          Office
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="w-[80px] ml-auto mt-[100px]">
        <NormalButton>
          <p className="text-[14px] text-[#40BFFF]">Add</p>
        </NormalButton>
      </div>
      {/* END OF SCROLLABLE AREA */}
    </AlertDialogContent>
  );
};
export default AddNewAddress;
