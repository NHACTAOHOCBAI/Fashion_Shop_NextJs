"use client";
import { ShoppingCart } from "lucide-react";

const AddToCartButton = () => {
  return (
    <div
      className="flex gap-[10px] text-[#40BFFF] bg-[#33A0FF]/10 py-[12px] px-[14px] rounded-[5px] cursor-pointer 
    hover:bg-[#40BFFF] hover:text-white duration-300 active:scale-90"
    >
      <ShoppingCart />
      <p>Add To Cart</p>
    </div>
  );
};
export default AddToCartButton;
