import { Archive, ChartPie, Newspaper, Shirt, Store, UsersRound } from "lucide-react";
import { IoColorFilterOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export const ICONS = {
   OVERVIEWS: <ChartPie />,
   USERS: <UsersRound />,
   CATEGORIES: <Archive />,
   DEPARTMENTS: <Newspaper />,
   BRANDS: <Store />,
   PRODUCTS: <Shirt />,
   ATTRIBUTES: <IoColorFilterOutline />,
   HEART: <FaHeart size={24} />,
   UN_HEART: <FaRegHeart size={24} className="text-[#6B6565]" />
};