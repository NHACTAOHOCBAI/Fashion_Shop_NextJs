import MyBreadcrumb from "@/app/client/_components/MyBreadcumb";
import { Heart, ShoppingCart, User } from "lucide-react";
import React from "react";
// Định nghĩa mảng ban đầu
const manCategories = [
  "T-Shirts",
  "Shirts & Blouses",
  "Dresses",
  "Jeans & Denim",
  "Pants & Trousers",
  "Shorts",
  "Outerwear (Jackets & Coats)",
  "Hoodies & Sweatshirts",
  "Sportswear",
  "Activewear",
  "Footwear",
  "Bags & Backpacks",
  "Accessories",
  "Jewelry",
  "Watches",
  "Sunglasses",
  "Underwear",
  "Collections",
];

const Content = () => {
  return (
    <div className="grid grid-cols-4 gap-y-3 gap-x-8">
      {manCategories.map((item) => (
        <div
          key={item}
          className="text-[18px] text-gray-700 hover:text-[#40BFFF] transition-colors font-normal cursor-pointer"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <div className="w-[1240px] mx-auto flex justify-end gap-[41px]   py-[20px] ">
        <Heart />
        <ShoppingCart />
        <User />
      </div>
      <div className="bg-[#FAFAFB] h-[1px]"></div>
      <div className="relative w-[1240px] mx-auto py-[28px]  flex items-center">
        <div>LOGO HERE</div>
        <div className=" flex-[1] w-full">
          <nav>
            <ul className="flex justify-center gap-[80px]">
              <SubCatgories content={<Content />}>
                <li className="uppercase text-[24px] font-medium">Home</li>
              </SubCatgories>
              <SubCatgories content={<Content />}>
                <li className="uppercase text-[24px] font-medium">Man</li>
              </SubCatgories>
              <SubCatgories content={<Content />}>
                <li className="uppercase text-[24px] font-medium">Woman</li>
              </SubCatgories>
              <SubCatgories content={<Content />}>
                <li className="uppercase text-[24px] font-medium">Kid</li>
              </SubCatgories>
            </ul>
          </nav>
        </div>
      </div>
      <div className="bg-[#F6F7F8]">
        <div className="w-[1240px] mx-auto py-[16px]">
          <MyBreadcrumb data={["Man", "Shoes"]} />
        </div>
      </div>
    </header>
  );
};
interface SubCatgoriesProps {
  children: React.ReactNode;
  content: React.ReactNode;
}
const SubCatgories = ({ children, content }: SubCatgoriesProps) => {
  return (
    <div className=" group inline-block">
      {children}
      <div
        className="
          absolute z-10 
          bg-white rounded-[10px] border-[#FAFAFB] border-[2px] p-[30px] 
          shadow-lg w-[1240px] 
          left-0 right-0 mx-auto 
          top-[64px]
          opacity-0 invisible 
          group-hover:opacity-100 group-hover:visible
          transition-opacity duration-400
          pointer-events-none group-hover:pointer-events-auto
        "
      >
        {content}
      </div>
    </div>
  );
};
export default Header;
