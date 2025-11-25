import MyTag from "@/app/client/_components/MyTag";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building, House, X } from "lucide-react";
const initialAddress = [
  {
    id: 1,
    type: "home",
    address:
      "Dormitory B, VNU - HCMC, Dong Hoa Ward, Di An City, Binh Duong Province, Vietnam",
    name: "Zabit Magomedsharipov",
    phone: "0838609516",
  },
  {
    id: 2,
    type: "Office",
    address:
      "Dormitory B, VNU - HCMC, Dong Hoa Ward, Di An City, Binh Duong Province, Vietnam",
    name: "Zabit Magomedsharipov",
    phone: "0838609516",
  },
];
interface AddressListProps {
  selectedAddressId: number; // ID của địa chỉ đang được chọn
  onSelectAddress: (id: number) => void; // Hàm xử lý khi chọn địa chỉ
}
const AddressList = ({
  selectedAddressId,
  onSelectAddress,
}: AddressListProps) => {
  return (
    // Sử dụng component <AddressList /> làm nội dung AlertDialogContent
    <AlertDialogContent className="w-[600px] max-h-[600px] flex flex-col">
      <div className="flex justify-between ">
        <p className="font-medium">My Address</p>
      </div>
      <div className="bg-[#FAFAFB] h-[2px] w-full" />
      <div className="overflow-y-auto p-4">
        {" "}
        {/* Thêm scrollbar cho khu vực địa chỉ */}
        {/* 🆕 Dùng RadioGroup có controlled state */}
        <RadioGroup
          value={String(selectedAddressId)} // Gán giá trị đang chọn
          onValueChange={(value) => onSelectAddress(Number(value))} // Gán hàm xử lý
        >
          {initialAddress.map((option) => {
            const type = (
              <div>
                {option.type === "home" ? (
                  <House size={16} strokeWidth={1} />
                ) : (
                  <Building size={16} strokeWidth={1} />
                )}
              </div>
            );
            return (
              // 🆕 Dùng <label> và thêm CSS loại bỏ focus ring để khắc phục lỗi nhấp nháy
              <label
                htmlFor={String(option.id)}
                key={option.id}
                className="
                  flex py-[15px] px-[19px] mb-2 rounded-[4px] border-[1px] cursor-pointer 
                  hover:bg-gray-50 transition-colors 
                  ${selectedAddressId === option.id ? 'border-[#40BFFF] bg-[#E8EFFA]' : 'border-gray-100'} 
                "
              >
                <RadioGroupItem
                  value={String(option.id)}
                  id={String(option.id)}
                  className="
                      mt-[4px] 
                      data-[state=checked]:border-[#40BFFF] 
                      data-[state=checked]:text-[#40BFFF]
                      text-gray-400
                      // 🌟 KHẮC PHỤC LỖI NHẤP NHÁY: Tắt Focus Ring
                      focus-visible:ring-0
                      focus-visible:ring-offset-0
                      ring-offset-0
                    "
                />
                <div className="flex flex-col gap-[4px] ml-[8px]">
                  <div className="flex gap-[8px]">
                    <p className="font-medium">{option.name}</p>
                    <p>|</p>
                    <p>{option.phone}</p>
                  </div>
                  <p>{option.address}</p>
                  <div className="flex justify-between">
                    <MyTag
                      value={
                        <div className="flex gap-[4px] items-center">
                          {type}
                          <p>{option.type}</p>
                        </div>
                      }
                    />
                    <MyTag value={<p className="text-[#FF4858]">Default</p>} />
                  </div>
                </div>
              </label>
            );
          })}
        </RadioGroup>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Save</AlertDialogCancel>
      </AlertDialogFooter>
      {/* END OF SCROLLABLE AREA */}
    </AlertDialogContent>
  );
};
export default AddressList;
