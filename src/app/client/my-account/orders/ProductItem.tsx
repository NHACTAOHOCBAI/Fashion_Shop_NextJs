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
      <div className="flex py-[20px] px-[30px] border-b border-[#F6F7F8] justify-between">
        <div className="flex gap-[17px]">
          <Image
            src={imageUrl}
            alt={product.name}
            width={100}
            height={100}
            className="bg-[#F6F7F8] rounded-[8px] object-contain w-[100px] h-[100px]"
          />

          <div>
            <p>{product.name}</p>
            <div className="flex gap-[17px] mt-[10px] flex-wrap">
              {variantAttributeValues.map((a) => (
                <MyTag key={a.id} value={a.attributeCategory.value} />
              ))}
              <MyTag value={`x ${item.quantity}`} />
            </div>
          </div>
        </div>

        {/* Review button */}
        {orderStatus === OrderStatus.DELIVERED && (
          <div className="flex items-center">
            <Button variant="outline" onClick={() => setOpenReview(true)}>
              Review
            </Button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        open={openReview}
        onClose={() => setOpenReview(false)}
        orderId={orderId}
        productId={product.id}
      />
    </>
  );
};
