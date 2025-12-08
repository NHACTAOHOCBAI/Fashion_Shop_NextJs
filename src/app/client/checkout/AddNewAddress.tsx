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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
// THÊM: Import useState và useEffect
import { useState, useEffect } from "react";
import { address } from "@/constants/address";
import { useCreateAddress } from "@/hooks/queries/useAddress";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
const AddNewAddressSchema = z.object({
  fullName: z.string("full name is required"),
  phone: z.string("phone is required"),
  province: z.string("province is required"),
  district: z.string("district is required"),
  commune: z.string("commune is required"), // SỬA: communce -> commune
  detailAddress: z.string("detail address is required"),
  addressType: z.string("address type is required"),
  isDefault: z.boolean().optional(), // THÊM: Trường isDefault
});

interface AddNewAddressProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddNewAddress = ({ open, setOpen }: AddNewAddressProps) => {
  const { mutate: addAddress, isPending } = useCreateAddress();
  const form = useForm<z.infer<typeof AddNewAddressSchema>>({
    resolver: zodResolver(AddNewAddressSchema),
    // THÊM: Giá trị mặc định (Rất quan trọng cho Select và RadioGroup)
    defaultValues: {
      fullName: "",
      phone: "",
      province: "",
      district: "",
      commune: "",
      detailAddress: "",
      addressType: "",
      isDefault: false,
    },
  });

  const handleSubmit = (data: z.infer<typeof AddNewAddressSchema>) => {
    addAddress(
      {
        commune: data.commune,
        district: data.district,
        province: data.province,
        recipientName: data.fullName,
        recipientPhone: data.phone,
        type: data.addressType as "home" | "office",
        isDefault: data?.isDefault || false,
        detailAddress: data.detailAddress,
      },
      {
        onSuccess: () => {
          toast.success("You has added new address successfully!");
          // 1. Reset form về giá trị mặc định sau khi thành công
          form.reset(form.formState.defaultValues);

          // 2. Đóng Dialog
          setOpen(false);
        },
        onError: (error) => {
          toast.error(`Ohh!!! ${error.message}`);
        },
      }
    );
  };

  // LẤY GIÁ TRỊ HIỆN TẠI CỦA CÁC TRƯỜNG TỪ FORM STATE
  const selectedProvince = form.watch("province");
  const selectedDistrict = form.watch("district");

  // STATE ĐỂ LƯU DANH SÁCH HUYỆN VÀ XÃ TƯƠNG ỨNG
  const [availableDistricts, setAvailableDistricts] = useState<
    (typeof address)[0]["districts"]
  >([]);
  const [availableCommunes, setAvailableCommunes] = useState<
    (typeof address)[0]["districts"][0]["communes"]
  >([]);

  // EFFECT 1: CẬP NHẬT HUYỆN KHI TỈNH THAY ĐỔI
  useEffect(() => {
    // Reset District và Commune
    form.setValue("district", "");
    form.setValue("commune", "");
    setAvailableCommunes([]);

    const provinceData = address.find((p) => p.province === selectedProvince);
    if (provinceData) {
      setAvailableDistricts(provinceData.districts);
    } else {
      setAvailableDistricts([]);
    }
  }, [selectedProvince, form]); // form là dependency của useEffect khi dùng form.setValue

  // EFFECT 2: CẬP NHẬT XÃ KHI HUYỆN THAY ĐỔI
  useEffect(() => {
    // Reset Commune
    form.setValue("commune", "");

    const provinceData = address.find((p) => p.province === selectedProvince);

    if (provinceData) {
      const districtData = provinceData.districts.find(
        (d) => d.district === selectedDistrict
      );
      if (districtData) {
        setAvailableCommunes(districtData.communes);
      } else {
        setAvailableCommunes([]);
      }
    }
  }, [selectedDistrict, selectedProvince, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className=" max-h-[600px] flex flex-col">
          {/* ... (Tiêu đề và đường kẻ) ... */}
          <div className="flex justify-between ">
            <p className="font-medium">Add New Address</p>
          </div>
          <div className="bg-[#FAFAFB] h-[2px] w-full my-2" />

          <div className="overflow-y-auto pr-4">
            {" "}
            {/* Thêm overflow-y-auto để có thể cuộn */}
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="isDefault" // Đảm bảo 'isDefault' được thêm vào Zod Schema với kiểu boolean
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3">
                      {" "}
                      {/* Căn chỉnh toggle và label */}
                      <div className="flex-1">
                        {" "}
                        {/* Dùng div này nếu bạn muốn có Label bên cạnh */}
                        {/* <FormLabel>Đặt làm mặc định</FormLabel> */}
                      </div>
                      <FormControl>
                        {/* 1. Sử dụng 'pressed' thay vì 'value' 
          2. Sử dụng 'onPressedChange' thay vì 'onChange' 
        */}
                        <Toggle
                          pressed={field.value} // Gán giá trị boolean hiện tại của form
                          onPressedChange={field.onChange} // Gán hàm thay đổi giá trị của form
                          variant="default"
                          aria-label="Toggle default address"
                          className="data-[state=on]:text-red-400 w-[100px] ml-auto"
                        >
                          Default
                        </Toggle>
                      </FormControl>
                      {/* Thường thì FormMessage không cần thiết cho Toggle, nhưng giữ lại nếu cần 
        <FormMessage /> 
      */}
                    </FormItem>
                  )}
                />
                {/* Full name & Phone - Không thay đổi */}
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

                  {/* TRƯỜNG PROVINCE (TỈNH) */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Province</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange} // CẦN THIẾT CHO REACT HOOK FORM + SHADCN
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {address.map((p) => (
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
                </div>

                <div className="flex gap-[40px]">
                  {/* TRƯỜNG DISTRICT (HUYỆN) */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange} // CẦN THIẾT
                            disabled={availableDistricts.length === 0} // VÔ HIỆU HÓA NẾU CHƯA CHỌN TỈNH
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn Quận/Huyện" />
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
                  </div>

                  {/* TRƯỜNG COMMUNE (XÃ) */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="commune" // SỬA: communce -> commune
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commune</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange} // CẦN THIẾT
                            disabled={availableCommunes.length === 0} // VÔ HIỆU HÓA NẾU CHƯA CHỌN HUYỆN
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn Phường/Xã" />
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
                </div>

                {/* Detail address & Address type - Đã sửa lỗi RadioGroup */}
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
                          onValueChange={field.onChange} // CẦN THIẾT
                          value={field.value}
                          defaultValue={field.value}
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
          <div className="w-[80px] ml-auto mt-4">
            <NormalButton
              isLoading={isPending}
              onClick={form.handleSubmit(handleSubmit)}
            >
              <p className="text-[14px] text-[#40BFFF]">Add</p>
            </NormalButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewAddress;
