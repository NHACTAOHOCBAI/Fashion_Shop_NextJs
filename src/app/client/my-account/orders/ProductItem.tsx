"use client";

import { useState } from "react";
import Image from "next/image";
import MyTag from "@/app/client/_components/MyTag";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/constants/status.enum";
import { ReviewModal } from "./ReviewModal";

interface Props {
  item: OrderItem;
  orderStatus: OrderStatus;
  orderId: number;
}

export const ProductItem = ({ item, orderStatus, orderId }: Props) => {
  console.log(item);
  const { product, imageUrl, variantAttributeValues } = item.variant;
  console.log(product.id);
  const [openReview, setOpenReview] = useState(false);

  return (
    <>
      <div className="flex py-4 px-5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
        <div className="flex gap-4">
          <div className="relative">
            <Image
              src={imageUrl}
              alt={product.name}
              width={80}
              height={80}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg object-cover w-20 h-20 border border-gray-200 dark:border-gray-600"
            />
          </div>

          <div className="flex flex-col justify-between py-1">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-2 mb-2">
                {product.name}
              </p>
              <div className="flex gap-2 flex-wrap">
                {variantAttributeValues.map((a) => (
                  <MyTag key={a.id} value={a.attributeCategory.value} />
                ))}
                <MyTag value={`x${item.quantity}`}></MyTag>
              </div>
            </div>
            {item.isReviewed && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1 mt-1">
                ✓ Reviewed
              </span>
            )}
          </div>
        </div>

        {/* Review button */}
        {orderStatus === OrderStatus.DELIVERED && !item.isReviewed && (
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="border-[#40BFFF] text-[#40BFFF] hover:bg-[#40BFFF] hover:text-white transition-colors h-8"
              onClick={() => setOpenReview(true)}
            >
              Write Review
            </Button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        open={openReview}
        onClose={() => setOpenReview(false)}
        orderId={orderId}
        variantId={item.variant.id}
      />
    </>
  );
};
