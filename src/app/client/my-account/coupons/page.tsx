import TabbedContent from "@/app/client/products/_components/TabContent";
import { Progress } from "@/components/ui/progress";
const CouponItem = ({ coupon }: CouponItemProps) => {
  return (
    <div
      className={`
                  relative
                    rounded-[20px] 
                    bg-[#F6F7F8] 
                    flex 
                    overflow-hidden 
                    cursor-pointer
                    transition-all duration-200
                        border-[2px] border-transparent
                  `}
    >
      <div className="bg-[#40BFFF] text-white text-[14px] font-bold flex items-center w-[50px] justify-center relative py-2">
        <p className="-rotate-90 whitespace-nowrap absolute font-medium">
          DISCOUNT
        </p>
      </div>
      <div className="py-[9px] px-[15px] flex-1">
        {" "}
        {/* Dùng flex-1 thay vì w-[xxx] để thích ứng */}
        <p className="font-semibold text-base">{coupon.code}</p>
        <p className="text-[12px] text-[#FF4858] font-semibold">
          {coupon.discount}
        </p>
        {/* Giả định Progress là một component hợp lệ */}
        <Progress className="mt-[10px]" value={33} />
        <div className="flex gap-[40px] mt-[7px]">
          <p className="text-[10px] font-light ">Start date: {coupon.start}</p>
          <p className="text-[10px] font-light">End date: {coupon.end}</p>
        </div>
      </div>
      <div className="absolute right-0 top-0  h-fit px-[10px] py-[4px] text-[14px] font-semibold border-[2px] border-[#BCDDFE]">
        x3
      </div>
    </div>
  );
};
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
const Coupons = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[24px]">Coupons</p>
          <p className="text-[18px] font-light mt-[11px]">
            Manage your coupons to get more discount and promotions
          </p>
        </div>
      </div>
      <div className="mt-[60px]">
        <TabbedContent tabs={productTabs} defaultTabTitle="Đánh giá" />
      </div>
    </div>
  );
};
export default Coupons;
const productTabs = [
  {
    title: "All",
    content: (
      <div className="flex flex-col gap-[20px]">
        {initialCoupons.map((coupon) => (
          <div key={coupon.id}>
            <CouponItem coupon={coupon} />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Percentage",
    content: (
      <p className="text-[#9098B1]">
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites. air max are always very comfortable fit,
        clean and just perfect in every way. just the box was too small and
        scrunched the sneakers up a little bit, not sure if the box was always
        this small but the 90s are and will always be one of my favorites.
      </p>
    ),
  },
  {
    title: "Amount Off",
    content: (
      <p className="text-[#9098B1]">
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites. air max are always very comfortable fit,
        clean and just perfect in every way. just the box was too small and
        scrunched the sneakers up a little bit, not sure if the box was always
        this small but the 90s are and will always be one of my favorites.
      </p>
    ),
  },
  {
    title: "Free Shipping",
    content: (
      <p className="text-[#9098B1]">
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites. air max are always very comfortable fit,
        clean and just perfect in every way. just the box was too small and
        scrunched the sneakers up a little bit, not sure if the box was always
        this small but the 90s are and will always be one of my favorites.
      </p>
    ),
  },
];
interface CouponItemProps {
  coupon: {
    id: number;
    code: string;
    discount: string;
    type: string;
    value: number;
    start: string;
    end: string;
  };
}
