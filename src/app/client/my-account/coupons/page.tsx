"use client";

import TabbedContent from "@/app/client/products/_components/TabContent";
import { CouponList } from "@/app/client/my-account/coupons/CouponList";
import { Tag } from "lucide-react";

enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  FREE_SHIPPING = "free_shipping",
}

const Coupons = () => {
  const productTabs = [
    {
      title: "All",
      content: <CouponList />,
    },
    {
      title: "Percentage",
      content: <CouponList discountType={DiscountType.PERCENTAGE} />,
    },
    {
      title: "Amount Off",
      content: <CouponList discountType={DiscountType.FIXED_AMOUNT} />,
    },
    {
      title: "Free Shipping",
      content: <CouponList discountType={DiscountType.FREE_SHIPPING} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#40BFFF]/5 to-transparent rounded-lg p-4 border border-[#40BFFF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#40BFFF] flex items-center justify-center shadow-sm">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h6 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                My Coupons
              </h6>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your coupons to get more discounts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div>
        <TabbedContent tabs={productTabs} defaultTabTitle="All" />
      </div>
    </div>
  );
};

export default Coupons;
