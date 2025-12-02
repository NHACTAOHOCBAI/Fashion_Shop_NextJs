import NormalButton from "@/app/client/_components/NormalButton";
import Image from "next/image";

const OrderNews = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[24px]">Order News</p>
          <p className="text-[18px] font-light mt-[11px]">
            Latest news about your orders status
          </p>
        </div>
        <div className="ml-auto mr-[53px]">
          <NormalButton>
            <p className="text-[14px] text-[#40BFFF]">Mark all as read</p>
          </NormalButton>
        </div>
      </div>
      <div className="flex flex-col gap-[35px] mt-[60px]">
        <OrderNewsItem />
        <OrderNewsItem />
      </div>
    </div>
  );
};
const OrderNewsItem = () => {
  return (
    <div className="bg-[#FAFAFB] flex items-center w-full px-[28px] py-[10px]">
      <Image
        height={94}
        width={138}
        alt="nothing"
        src="https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png"
        className="bg-[#F6F7F8] rounded-[8px] w-[138px] h-[94px] object-contain"
      />
      <div className="ml-[11px]">
        <p className="text-[18px]">Pending</p>
        <p className="font-light text-[14px]">
          Order 251103RTW31BBS has been completed. Please give feedbacks to our
          store to improve quality and service
        </p>
        <p className="text-[14px]">9:36 | 21-11-2025</p>
      </div>
      <div className="w-auto mt-auto">
        <NormalButton>
          <p className="text-[14px]">Cancel</p>
        </NormalButton>
      </div>
    </div>
  );
};
export default OrderNews;
