"use client";

import NormalButton from "@/app/client/_components/NormalButton";
import { BaseModal } from "@/components/modals/BaseModal";
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
import { MapPin } from "lucide-react";

const UpdateAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone is required"),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  commune: z.string().min(1, "Commune is required"),
  detailAddress: z.string().min(1, "Detail address is required"),
  addressType: z.enum(["home", "office"]),
  isDefault: z.boolean().optional(),
});

interface UpdateAddressProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  address: Address | null;
}

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

  // Load data when address prop changes
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

    // Set initial districts and communes based on loaded address
    const provinceData = addressData.find((p) => p.province === address.province);
    if (provinceData) {
      setAvailableDistricts(provinceData.districts);

      const districtData = provinceData.districts.find((d) => d.district === address.district);
      if (districtData) {
        setAvailableCommunes(districtData.communes);
      }
    }
  }, [address, form]);

  // Cascading location logic
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

    // Only reset if province actually changed (not initial load)
    if (address && selectedProvince !== address.province) {
      form.setValue("district", "");
      form.setValue("commune", "");
      setAvailableCommunes([]);
    }
  }, [selectedProvince, form, address]);

  useEffect(() => {
    const provinceData = addressData.find(
      (p) => p.province === selectedProvince
    );

    const districtData = provinceData?.districts.find(
      (d) => d.district === selectedDistrict
    );

    setAvailableCommunes(districtData?.communes || []);

    // Only reset if district actually changed (not initial load)
    if (address && selectedDistrict !== address.district) {
      form.setValue("commune", "");
    }
  }, [selectedDistrict, selectedProvince, form, address]);

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
    <BaseModal
      open={open}
      onOpenChange={setOpen}
      title="Update Address"
      description="Update your shipping address details below"
      icon={<MapPin size={20} />}
      footer={
        <>
          <NormalButton onClick={() => setOpen(false)}>
            <p className="text-sm text-gray-600 dark:text-gray-300">Cancel</p>
          </NormalButton>
          <NormalButton
            isLoading={isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            <p className="text-sm text-[#40BFFF] font-medium">
              {isPending ? "Updating..." : "Update Address"}
            </p>
          </NormalButton>
        </>
      }
      className="space-y-5"
    >
      <Form {...form}>
        <form className="space-y-5">
          {/* Default Toggle */}
          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0 rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-gray-50/50 dark:bg-gray-800/50">
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Set as default address
                </FormLabel>
                <FormControl>
                  <Toggle
                    pressed={field.value}
                    onPressedChange={field.onChange}
                    variant="default"
                    aria-label="Toggle default address"
                    className="data-[state=on]:bg-[#40BFFF] data-[state=on]:text-white h-8 px-3"
                  >
                    {field.value ? "Default" : "Set Default"}
                  </Toggle>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Full Name */}
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
                    placeholder="Enter full name"
                    className="h-10 rounded-lg border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone and Province in a row */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter phone number"
                      className="h-10 rounded-lg border-gray-300 dark:border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Province/City
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-10 rounded-lg border-gray-300 dark:border-gray-600">
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
          </div>

          {/* District and Commune in a row */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    District
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={availableDistricts.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10 rounded-lg border-gray-300 dark:border-gray-600 disabled:opacity-50">
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
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Commune/Ward
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={availableCommunes.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10 rounded-lg border-gray-300 dark:border-gray-600 disabled:opacity-50">
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
          </div>

          {/* Detail Address */}
          <FormField
            control={form.control}
            name="detailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Detailed Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Street name, building, house number"
                    className="h-10 rounded-lg border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Type */}
          <FormField
            control={form.control}
            name="addressType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address Type
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home-update" />
                      <Label
                        htmlFor="home-update"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Home
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="office" id="office-update" />
                      <Label
                        htmlFor="office-update"
                        className="text-sm font-normal cursor-pointer"
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
    </BaseModal>
  );
};

export default UpdateAddress;
