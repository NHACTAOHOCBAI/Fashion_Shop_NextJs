import MyTag from "@/app/client/_components/MyTag";
import NormalButton from "@/app/client/_components/NormalButton";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building, House, X } from "lucide-react";
import AddNewAddress from "@/app/client/checkout/AddNewAddress";
import { useState } from "react";

interface AddressListProps {
  selectedAddressId: number | undefined; // Có thể là undefined nếu chưa chọn
  onSelectAddress: (id: number) => void; // Hàm xử lý khi chọn địa chỉ
  myAddresses: Address[]; // Dữ liệu địa chỉ từ hook useMyAddress
}

// XÓA initialAddress
const AddressList = ({
  selectedAddressId,
  onSelectAddress,
  myAddresses, // NHẬN DỮ LIỆU THỰC TẾ
}: AddressListProps) => {
  const [open, setOpen] = useState(false);

  // Xử lý khi danh sách rỗng (hoặc đang tải nếu có trạng thái loading)
  if (!myAddresses || myAddresses.length === 0) {
    return (
      <>
        <AddNewAddress open={open} setOpen={setOpen} />
        <AlertDialogContent className="w-[600px] max-h-[400px] flex flex-col">
          <div className="flex justify-between ">
            <p className="font-medium">My Address</p>
            <AlertDialogPrimitive.Cancel>
              <X />
            </AlertDialogPrimitive.Cancel>
          </div>
          <div className="bg-[#FAFAFB] h-[2px] w-full mb-4" />
          <p className="text-center py-10 text-gray-500">
            Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ mới.
          </p>
          <div className="ml-auto mt-auto">
            <NormalButton onClick={() => setOpen(true)}>
              <p className="text-[14px] text-[#40BFFF]">Add New Address</p>
            </NormalButton>
          </div>
        </AlertDialogContent>
      </>
    );
  }

  return (
    <>
      <AddNewAddress open={open} setOpen={setOpen} />
      <AlertDialogContent className="w-[600px] max-h-[600px] flex flex-col">
        <div className="flex justify-between ">
          <p className="font-medium">My Address ({myAddresses.length})</p>
          <AlertDialogPrimitive.Cancel>
            <X />
          </AlertDialogPrimitive.Cancel>
        </div>
        <div className="bg-[#FAFAFB] h-[2px] w-full" />
        <div className="overflow-y-auto pt-4">
          <RadioGroup
            // Đảm bảo value là string
            value={
              selectedAddressId !== undefined ? String(selectedAddressId) : ""
            }
            onValueChange={(value) => onSelectAddress(Number(value))} // Gán hàm xử lý
          >
            {myAddresses.map((address) => {
              // Tạo chuỗi địa chỉ đầy đủ
              const fullAddress = `${address.detailAddress}, ${address.commune}, ${address.district}, ${address.province}`;

              const typeIcon = (
                <div>
                  {address.type === "home" ? (
                    <House size={16} strokeWidth={1} />
                  ) : (
                    <Building size={16} strokeWidth={1} />
                  )}
                </div>
              );

              return (
                <label
                  htmlFor={String(address.id)}
                  key={address.id}
                  className={`
                                        flex py-[15px] px-[19px] mb-2 rounded-[4px] border-[1px] cursor-pointer 
                                        hover:bg-gray-50 transition-colors 
                                        ${
                                          selectedAddressId === address.id
                                            ? "border-[#40BFFF] bg-[#E8EFFA]"
                                            : "border-gray-100"
                                        } 
                                    `}
                >
                  <RadioGroupItem
                    value={String(address.id)}
                    id={String(address.id)}
                    className="
                                            mt-[4px] 
                                            data-[state=checked]:border-[#40BFFF] 
                                            data-[state=checked]:text-[#40BFFF]
                                            text-gray-400
                                            focus-visible:ring-0
                                            focus-visible:ring-offset-0
                                            ring-offset-0
                                        "
                  />
                  <div className="flex flex-col gap-[4px] ml-[8px] flex-1">
                    <div className="flex gap-[8px] items-center">
                      <p className="font-medium">{address.recipientName}</p>
                      <p>|</p>
                      <p>{address.recipientPhone}</p>
                      {/* Hiển thị tag Default nếu là địa chỉ mặc định */}
                      {address.isDefault && (
                        <MyTag
                          value={<p className="text-[#FF4858]">Default</p>}
                        />
                      )}
                    </div>
                    <p>{fullAddress}</p>
                    <div className="flex justify-start">
                      <MyTag
                        value={
                          <div className="flex gap-[4px] items-center">
                            {typeIcon}
                            <p>{address.type}</p>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </label>
              );
            })}
          </RadioGroup>
        </div>
        <div className="ml-auto mt-4">
          <NormalButton onClick={() => setOpen(true)}>
            <p className="text-[14px] text-[#40BFFF]">Add New Address</p>
          </NormalButton>
        </div>
        {/* END OF SCROLLABLE AREA */}
      </AlertDialogContent>
    </>
  );
};
export default AddressList;
