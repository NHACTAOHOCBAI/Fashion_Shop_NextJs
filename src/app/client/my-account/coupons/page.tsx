"use client";

// Giả định imports
import TabbedContent from "@/app/client/products/_components/TabContent";
import { Progress } from "@/components/ui/progress";
// Giả định MyTag component đã tồn tại
import MyTag from "@/app/client/_components/MyTag";
import { useCoupons, useMyCoupons } from "@/hooks/queries/useCoupon";

// Giả định Coupon interface và useCoupons/useMyCoupons hook từ câu trả lời trước
// (Cần định nghĩa lại Coupon interface ở đây để đảm bảo kiểu dữ liệu)

enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  FREE_SHIPPING = "free_shipping",
}

// Hàm format ngày (lặp lại ở đây để đảm bảo CouponItem hoạt động độc lập)
const formatDate = (isoString: string) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (e) {
    return "N/A";
  }
};

// ===============================================
// 1. COUPON ITEM (SỬA DỤNG DỮ LIỆU ĐỘNG)
// ===============================================

interface CouponItemProps {
  coupon: Coupon;
}

const CouponItem = ({ coupon }: CouponItemProps) => {
  const usedCount = coupon.usageCount || 0;
  const totalLimit = coupon.usageLimit || 1;
  // Đảm bảo không chia cho 0
  const progressValue = totalLimit > 0 ? (usedCount / totalLimit) * 100 : 0;

  const remainingUsage =
    coupon.usageLimitPerUser > 0 ? `x${coupon.usageLimitPerUser}` : "∞";

  // Định dạng hiển thị giảm giá dựa trên DiscountType
  let discountDisplay: string;
  let mainDiscountText: string;
  let tag: React.ReactNode | null = null;
  let opacityClass = "";

  switch (coupon.discountType) {
    case DiscountType.PERCENTAGE:
      discountDisplay = `${coupon.discountValue}% OFF`;
      mainDiscountText = `Save ${coupon.discountValue}%`;
      break;
    case DiscountType.FIXED_AMOUNT:
      discountDisplay = `SAVE $${Number(coupon.discountValue).toFixed(2)}`;
      mainDiscountText = `Save $${Number(coupon.discountValue).toFixed(
        2
      )} Fixed`;
      break;
    case DiscountType.FREE_SHIPPING:
      discountDisplay = "FREE SHIPPING";
      mainDiscountText = "Free Standard Shipping";
      break;
    default:
      discountDisplay = "DISCOUNT";
      mainDiscountText = "Special Offer";
  }

  if (coupon.status !== "active") {
    opacityClass = "opacity-50 pointer-events-none"; // Làm mờ và vô hiệu hóa click

    tag = (
      <div className="absolute top-0 right-0 z-10 translate-x-[50%] translate-y-[-50%]"></div>
    );
  }

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
                ${opacityClass}
            `}
    >
      {/* Tag trạng thái */}
      {tag}

      <div className="bg-[#40BFFF] text-white text-[14px] font-bold flex items-center w-[50px] justify-center relative py-2">
        <p className="-rotate-90 whitespace-nowrap absolute font-medium">
          COUPON
        </p>
      </div>
      <div className="py-[9px] px-[15px] flex-1">
        <p className="font-semibold text-base">{coupon.code}</p>
        <p className="text-[12px] text-[#FF4858] font-semibold">
          {coupon.name || discountDisplay}
        </p>

        {/* Progress Bar (chỉ hiển thị nếu có giới hạn tổng thể) */}
        {coupon.usageLimit > 0 && (
          <>
            <Progress className="mt-[10px] h-1.5" value={progressValue} />
            <p className="text-[10px] text-gray-500 mt-[4px]">
              Used {usedCount}/{totalLimit} times globally
            </p>
          </>
        )}

        <div className="flex gap-[40px] mt-[7px]">
          <p className="text-[10px] font-light ">
            Start date: {formatDate(coupon.startDate)}
          </p>
          <p className="text-[10px] font-light">
            End date: {formatDate(coupon.endDate)}
          </p>
        </div>
        {/* Điều kiện Min Order */}
        {parseFloat(coupon.minOrderAmount) > 0 && (
          <p className="text-[10px] font-medium text-gray-600 mt-[5px]">
            Min. Order: ${parseFloat(coupon.minOrderAmount).toFixed(2)}
          </p>
        )}
      </div>
      <div className="absolute right-0 top-0 h-fit px-[10px] py-[4px] text-[14px] font-semibold border-[2px] border-[#BCDDFE] bg-white">
        {/* Giới hạn sử dụng cá nhân */}
        {remainingUsage}
      </div>
    </div>
  );
};

// ===============================================
// 2. MAIN PAGE COMPONENT (SỬ DỤNG HOOK)
// ===============================================

const Coupons = () => {
  const { data: allCoupons, isLoading } = useCoupons({});

  // Phân loại coupons để tạo nội dung cho các tab
  const filteredCoupons = allCoupons?.data || [];

  const percentageCoupons = filteredCoupons.filter(
    (c) => c.discountType === DiscountType.PERCENTAGE
  );
  const amountOffCoupons = filteredCoupons.filter(
    (c) => c.discountType === DiscountType.FIXED_AMOUNT
  );
  const freeShippingCoupons = filteredCoupons.filter(
    (c) => c.discountType === DiscountType.FREE_SHIPPING
  );

  // Hàm render nội dung tab
  const renderCouponList = (coupons: Coupon[]) => (
    <div className="flex flex-col gap-[20px]">
      {coupons.length > 0 ? (
        coupons.map((coupon) => (
          <div key={coupon.id}>
            <CouponItem coupon={coupon} />
          </div>
        ))
      ) : (
        <p className="text-[#9098B1] py-8 text-center">
          No coupons available in this category.
        </p>
      )}
    </div>
  );

  // Xây dựng cấu trúc tabs
  const productTabs = [
    {
      title: `All (${filteredCoupons.length})`,
      content: renderCouponList(filteredCoupons),
    },
    {
      title: `Percentage (${percentageCoupons.length})`,
      content: renderCouponList(percentageCoupons),
    },
    {
      title: `Amount Off (${amountOffCoupons.length})`,
      content: renderCouponList(amountOffCoupons),
    },
    {
      title: `Free Shipping (${freeShippingCoupons.length})`,
      content: renderCouponList(freeShippingCoupons),
    },
  ];

  return (
    <div className=" mx-auto ">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[24px]">My Coupons</p>
          <p className="text-[18px] font-light mt-[11px]">
            Manage your coupons to get more discount and promotions
          </p>
        </div>
      </div>

      <div className="mt-[60px]">
        {isLoading ? (
          <p className="text-[#9098B1] text-center py-20">Loading coupons...</p>
        ) : (
          <TabbedContent
            tabs={productTabs}
            defaultTabTitle={`All (${filteredCoupons.length})`}
          />
        )}
      </div>
    </div>
  );
};

export default Coupons;
