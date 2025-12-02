import MyTag from "@/app/client/_components/MyTag";
import NormalButton from "@/app/client/_components/NormalButton";
import { PencilLine, Trash2 } from "lucide-react";

const MyAddress = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[24px]">My Address</p>
          <p className="text-[18px] font-light mt-[11px]">
            Manage your shipping address
          </p>
        </div>
        <div className="ml-auto mr-[53px]">
          <NormalButton>
            <p className="text-[14px] text-[#40BFFF]">Add new address </p>
          </NormalButton>
        </div>
      </div>
      <div className="flex flex-col gap-[35px] mt-[60px]">
        <MyAddressItem />
        <MyAddressItem />
      </div>
    </div>
  );
};
const MyAddressItem = () => {
  return (
    <div className=" flex w-full h-[120px] justify-between">
      <div className="h-full  flex flex-col justify-between">
        <div>
          <span className="text-[18px] font-medium">
            Zabit Magomedsharipov{" "}
          </span>
          <span className="text-[18px] font-medium mx-[20px]">|</span>
          <span className="text-[18px]">0838609516</span>
          <p>
            Dormitory B, VNU - HCMC, Dong Hoa Ward, Di An City, Binh Duong
            Province, Vietnam
          </p>
        </div>
        <div className="w-[100px] ">
          <MyTag value={<p>Default</p>} />
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="flex gap-2">
          <PencilLine size={16} />
          <Trash2 size={16} />
        </div>
        <NormalButton>
          <p className="text-[14px] text-[#FF4858]">Set Default </p>
        </NormalButton>
      </div>
    </div>
  );
};
export default MyAddress;
