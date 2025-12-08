"use client";

import NormalButton from "@/app/client/_components/NormalButton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { Toggle } from "@/components/ui/toggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect, useState } from "react";
import { address as addressData } from "@/constants/address";
import { useUpdateAddress } from "@/hooks/queries/useAddress";
import { toast } from "sonner";

/* ================= SCHEMA ================= */
const UpdateAddressSchema = z.object({
  fullName: z.string(),
  phone: z.string(),
  province: z.string(),
  district: z.string(),
  commune: z.string(),
  detailAddress: z.string(),
  addressType: z.enum(["home", "office"]),
  isDefault: z.boolean().optional(),
});

interface UpdateAddressProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  address: Address | null;
}

/* ================= COMPONENT ================= */
const UpdateAddress = ({ open, setOpen, address }: UpdateAddressProps) => {
  const { mutate: updateAddress, isPending } = useUpdateAddress();

  const form = useForm<z.infer<typeof UpdateAddressSchema>>({
    resolver: zodResolver(UpdateAddressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      province: "",
      district: "",
      commune: "",
      detailAddress: "",
      addressType: "home",
      isDefault: false,
    },
  });

  /* ====== LOAD DATA ====== */
  useEffect(() => {
    if (!address) return;

    form.reset({
      fullName: address.recipientName,
      phone: address.recipientPhone,
      province: address.province,
      district: address.district,
      commune: address.commune,
      detailAddress: address.detailAddress,
      addressType: address.type,
      isDefault: address.isDefault,
    });
  }, [address, form]);

  /* ====== LOCATION LOGIC ====== */
  const selectedProvince = form.watch("province");
  const selectedDistrict = form.watch("district");

  const [availableDistricts, setAvailableDistricts] = useState<
    (typeof addressData)[0]["districts"]
  >([]);

  const [availableCommunes, setAvailableCommunes] = useState<
    (typeof addressData)[0]["districts"][0]["communes"]
  >([]);

  useEffect(() => {
    const provinceData = addressData.find(
      (p) => p.province === selectedProvince
    );

    setAvailableDistricts(provinceData?.districts || []);
    form.setValue("district", "");
    form.setValue("commune", "");
  }, [selectedProvince, form]);

  useEffect(() => {
    const provinceData = addressData.find(
      (p) => p.province === selectedProvince
    );

    const districtData = provinceData?.districts.find(
      (d) => d.district === selectedDistrict
    );

    setAvailableCommunes(districtData?.communes || []);
    form.setValue("commune", "");
  }, [selectedDistrict, selectedProvince, form]);

  /* ====== SUBMIT ====== */
  const onSubmit = (data: z.infer<typeof UpdateAddressSchema>) => {
    if (!address) return;

    updateAddress(
      {
        id: address.id,
        data: {
          recipientName: data.fullName,
          recipientPhone: data.phone,
          province: data.province,
          district: data.district,
          commune: data.commune,
          detailAddress: data.detailAddress,
          type: data.addressType,
          isDefault: data.isDefault || false,
        },
      },
      {
        onSuccess: () => {
          toast.success("Address updated successfully!");
          setOpen(false);
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form className="space-y-4">
            {/* DEFAULT */}
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <Toggle pressed={field.value} onPressedChange={field.onChange}>
                  Default
                </Toggle>
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

            {/* PHONE */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {addressData.map((p) => (
                        <SelectItem key={p.province} value={p.province}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={availableDistricts.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableDistricts.map((d) => (
                        <SelectItem key={d.district} value={d.district}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commune"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commune</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={availableCommunes.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select commune" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCommunes.map((c) => (
                        <SelectItem key={c.commune} value={c.commune}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detail address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Street, building, house number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ADDRESS TYPE */}
            <FormField
              control={form.control}
              name="addressType"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="home" />
                    <Label>Home</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="office" />
                    <Label>Office</Label>
                  </div>
                </RadioGroup>
              )}
            />

            <NormalButton
              isLoading={isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              Update
            </NormalButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddress;
