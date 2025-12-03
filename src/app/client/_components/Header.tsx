"use client";
import TabbedContent from "@/app/client/products/_components/TabContent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetHeaderData } from "@/hooks/queries/useHome";
import { Heart, ShoppingCart, User } from "lucide-react";
import React from "react";
const NotificationItem = () => {
  return (
    <div className="flex gap-[13px] pt-[10px] pb-[20px] border-gray-100 border-b-[1px]">
      <div className="w-[35px] h-[35px] bg-gray-100"></div>
      <div className="flex gap-[5px] flex-col">
        <p className="font-medium">Order is shipping</p>
        <p className="text-[12px] font-light">
          Your order has been shipped. Watch out your phone
        </p>
        <p className="text-[12px] font-light">5 mins ago</p>
      </div>
    </div>
  );
};

const Content = ({
  items,
  origin,
}: {
  items: {
    id: number;
    name: string;
  }[];
  origin: string;
}) => {
  return (
    <div className="grid grid-cols-4 gap-y-3 gap-x-8">
      {items.map((item) => (
        <a // Thay div bằng a
          key={item.id}
          href={`/client/products/${origin}?category=${item.id}`}
          className="text-[18px] text-gray-700 hover:text-[#40BFFF] transition-colors font-normal cursor-pointer"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

const Header = () => {
  const { data: headerData } = useGetHeaderData();
  return (
    <header>
      <div className="w-[1240px] mx-auto flex justify-end gap-[41px]   py-[20px] ">
        <Heart />
        <ShoppingCart />
        <Popover>
          <PopoverTrigger>
            <User />
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[360px]">
            <Notification />
          </PopoverContent>
        </Popover>
      </div>
      <div className="bg-[#FAFAFB] h-[1px]"></div>
      <div className="relative w-[1240px] mx-auto py-[28px]  flex items-center">
        <div>LOGO HERE</div>
        <div className=" flex-[1] w-full">
          <nav>
            <ul className="flex justify-center gap-[80px]">
              <li className="uppercase text-[24px] font-medium cursor-pointer select-none">
                Home
              </li>
              {headerData?.map((department) => (
                <SubCatgories
                  key={department.department}
                  content={
                    <Content
                      items={department.categories}
                      origin={department.department}
                    />
                  }
                >
                  <li className="uppercase text-[24px] font-medium cursor-pointer select-none">
                    {department.department}
                  </li>
                </SubCatgories>
              ))}
            </ul>
          </nav>
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
        select-none
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
const productTabs = [
  {
    title: "All",
    content: (
      <div>
        <NotificationItem />
      </div>
    ),
  },
  {
    title: "Orders",
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
    title: "Discount",
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
    title: "Others",
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
const Notification = () => {
  return (
    <div className="w-[360px] px-[14px] py-[10px]">
      <TabbedContent tabs={productTabs} defaultTabTitle="All" />
    </div>
  );
};
export default Header;
