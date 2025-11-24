"use client";
import AddToCartButton from "@/app/client/products/_components/AddToCartButton";
import DisplayImages from "@/app/client/products/_components/DisplayImage";
import DisplayStars from "@/app/client/products/_components/DisplayStars";
import QuantitySelector from "@/app/client/products/_components/MyCount";
import { CustomPagination } from "@/app/client/products/_components/MyPagination";
import ProductCard from "@/app/client/products/_components/ProductCard";
import TabbedContent from "@/app/client/products/_components/TabContent";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
const ReviewItem = () => {
  return (
    <div className="rounded-[16px] border-[#D0D5DD] py-[18px] px-[24px] border-[1px]">
      <div className="flex justify-between">
        <div className="flex gap-[12px] items-center">
          <div className="rounded-full w-[41px] h-[41px] bg-gray-400" />
          <div>
            <p className="text-[16px] font-semibold">Aspen Siphron</p>
            <p className="text-[14px]">May 12, 2024</p>
          </div>
        </div>
        <div className="flex gap-[5px]">
          <p>3.8</p>
          <FaStar className="text-yellow-300 mt-[3px]" />
        </div>
      </div>
      <div className="mt-[13px]">
        <Image
          height={100}
          width={100}
          alt={`Shoe view `}
          src={
            "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png"
          }
          className="w-[100px] h-[100px] object-contain rounded-[8px] bg-[#F6F7F8] " // Đảm bảo ảnh nhỏ vừa khung
        />
        <p className=" text-[16px] mt-[5px]">
          I've been using Nature's Best Vitamin C 1000 mg tablets for six
          months, and the results are fantastic. My immune system feels
          stronger—I haven't had a single cold this flu season. I've also
          noticed a boost in my energy levels throughout the day.
        </p>
      </div>
    </div>
  );
};
const productTabs = [
  {
    title: "Description",
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
    title: "Reviews",
    content: (
      <div>
        <ReviewItem />
        <div className="flex flex-col items-center gap-4 p-8">
          <CustomPagination
          // currentPage={page}
          // totalPages={totalPages}
          // onPageChange={handlePageChange}
          />
        </div>
      </div>
    ),
    count: 0, // Thêm count để hiển thị (0)
  },
];
const filterData = [
  {
    field: "Sizes",
    values: ["XL", "L", "M", "S"],
  },
  {
    field: "Color",
    values: ["Red", "Blue", "Green"],
  },
];
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="w-[1240px] mx-auto py-[50px] flex flex-col gap-[60px]">
      <div className="flex gap-[90px]">
        <DisplayImages images={SAMPLE_IMAGES} />
        <div className="flex-1">
          <p className="text-[36px] font-medium">Nike Airmax 270 React</p>
          <div className="flex gap-[40px] items-center mt-[20px]">
            <DisplayStars value={4.6} />
            <p className="text-[14px] font-thin">29 reviews</p>
          </div>
          <div className="bg-[#FAFAFB] h-[2px] my-[18px]" />
          <div className="flex flex-col gap-[21px]">
            <p>Brand: Nike</p>
            <p>Category: Shoes</p>
            <p>Availbility: 239</p>
          </div>
          <div className="bg-[#FAFAFB] h-[2px] my-[18px]" />
          <div className="flex flex-col gap-[20px]">
            {filterData.map((filter) => {
              return <OptionGroup key={filter.field} />;
            })}
          </div>
          <div className="bg-[#FAFAFB] h-[2px] mt-[18px]" />
          <p className="text-[36px] font-bold text-[#40BFFF]">$299.43</p>
          <div className="flex justify-between mt-[18px]">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <AddToCartButton />
          </div>
        </div>
      </div>

      <TabbedContent tabs={productTabs} defaultTabTitle="Đánh giá" />

      <div>
        <p className="text-[36px] font-medium text-center">Related Products</p>
        <div className="flex justify-between mt-[20px]">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};
const OptionGroup = () => {
  return (
    <div>
      <p>Color</p>
      <div className="flex gap-[28px] flex-wrap mt-[10px]">
        <div className="px-[22px] rounded-full border-[#40BFFF] py-[4px] font-medium border-[1px] text-[#40BFFF]">
          Red
        </div>
        <div className="px-[22px] rounded-full border-[#F6F7F8] py-[4px] font-thin border-[1px]">
          Green
        </div>
      </div>
    </div>
  );
};
// Dùng một mảng URL ảnh mẫu để component hoạt động
const SAMPLE_IMAGES = [
  "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
  "https://static.vecteezy.com/system/resources/thumbnails/046/323/598/small/pair-of-colorful-sports-shoes-for-active-lifestyle-png.png",
];

export default ProductDetail;
