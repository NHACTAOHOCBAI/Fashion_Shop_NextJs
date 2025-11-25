import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
const initialCoupons = [
  {
    id: 1,
    code: "FSHOP2025",
    discount: "Flat 10% off*",
    type: "percentage",
    value: 0.1,
    start: "23/11/2025",
    end: "30/11/2025",
  },
  {
    id: 2,
    code: "WINTER20",
    discount: "20% off all items",
    type: "percentage",
    value: 0.2,
    start: "01/12/2025",
    end: "31/12/2025",
  },
  {
    id: 3,
    code: "WINTER30",
    discount: "30% off all items",
    type: "percentage",
    value: 0.3,
    start: "01/12/2025",
    end: "31/12/2025",
  },
];
interface CouponList {
  selectedCouponId: number | undefined;
  handleCouponClick: (id: number) => void;
}
const CouponList = ({ handleCouponClick, selectedCouponId }: CouponList) => {
  return (
    <AlertDialogContent className="w-[600px] max-h-[600px] flex flex-col">
      <div className="flex justify-between ">
        <p className="font-medium">Choose coupon</p>
        <X className="cursor-pointer" />
      </div>
      <div className="bg-[#FAFAFB] h-[2px] w-full" />
      <div className="overflow-y-auto  flex-1 space-y-8">
        <div>
          <p className="mb-[16px] font-medium">Free Shipping</p>
          <div className="flex flex-col gap-[20px]">
            {/* ... Coupon map cho Free Shipping ... */}
            {initialCoupons.map((coupon) => {
              const isSelected = selectedCouponId === coupon.id;
              return (
                <div
                  key={coupon.id}
                  onClick={() => handleCouponClick(coupon.id)}
                  className={`
                  relative
                    rounded-[20px] 
                    bg-[#F6F7F8] 
                    flex 
                    overflow-hidden 
                    cursor-pointer
                    transition-all duration-200
                    ${
                      isSelected
                        ? "border-[2px] border-[#40BFFF]"
                        : "border-[2px] border-transparent"
                    }
                  `}
                >
                  <div className="bg-[#40BFFF] text-white text-[14px] font-bold flex items-center w-[50px] justify-center relative py-2">
                    <p className="-rotate-90 whitespace-nowrap absolute font-medium">
                      DISCOUNT
                    </p>
                  </div>
                  <div className="py-[9px] pl-[15px] flex-1">
                    {" "}
                    {/* Dùng flex-1 thay vì w-[xxx] để thích ứng */}
                    <p className="font-semibold text-base">{coupon.code}</p>
                    <p className="text-[12px] text-[#FF4858] font-semibold">
                      {coupon.discount}
                    </p>
                    {/* Giả định Progress là một component hợp lệ */}
                    <Progress className="mt-[10px]" value={33} />
                    <div className="flex gap-[40px] mt-[7px]">
                      <p className="text-[10px] font-light ">
                        Start date: {coupon.start}
                      </p>
                      <p className="text-[10px] font-light">
                        End date: {coupon.end}
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 m-2 h-fit px-[10px] py-[4px] text-[14px] font-semibold border-[2px] border-[#BCDDFE]">
                    x3
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Khu vực Discount */}
        <div>
          <p className="mb-[16px] font-medium">Discount</p>
          <div className="flex flex-col gap-[20px]">
            {/* ... Coupon map cho Discount ... */}
            {initialCoupons.map((coupon) => {
              const isSelected = selectedCouponId === coupon.id;
              return (
                <div
                  key={coupon.id}
                  onClick={() => handleCouponClick(coupon.id)}
                  className={`
                  relative
                    rounded-[20px] 
                    bg-[#F6F7F8] 
                    flex 
                    overflow-hidden 
                    cursor-pointer
                    transition-all duration-200
                    ${
                      isSelected
                        ? "border-[2px] border-[#40BFFF]"
                        : "border-[2px] border-transparent"
                    }
                  `}
                >
                  <div className="bg-[#40BFFF] text-white text-[14px] font-bold flex items-center w-[50px] justify-center relative py-2">
                    <p className="-rotate-90 whitespace-nowrap absolute font-medium">
                      DISCOUNT
                    </p>
                  </div>
                  <div className="py-[9px] pl-[15px] flex-1">
                    <p className="font-semibold text-base">{coupon.code}</p>
                    <p className="text-[12px] text-[#FF4858] font-semibold">
                      {coupon.discount}
                    </p>
                    <Progress className="mt-[10px]" value={33} />
                    <div className="flex gap-[40px] mt-[7px]">
                      <p className="text-[10px] font-light ">
                        Start date: {coupon.start}
                      </p>
                      <p className="text-[10px] font-light">
                        End date: {coupon.end}
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 m-2 h-fit px-[10px] py-[4px] text-[14px] font-semibold border-[2px] border-[#BCDDFE]">
                    x3
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Thêm các khu vực coupon khác nếu cần */}
      </div>
      {/* END OF SCROLLABLE AREA */}
      <AlertDialogFooter>
        <AlertDialogCancel>Save</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
export default CouponList;
