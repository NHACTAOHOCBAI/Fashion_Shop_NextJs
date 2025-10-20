import { Archive, Bell, Building, ChartPie, CircleUser, HeartPlus, Home, LogOut, MapPinHouse, Minus, Newspaper, Package, Plus, Shirt, SquarePen, Store, Trash, UsersRound } from "lucide-react";
import { IoColorFilterOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { FiPackage, FiUser } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
export const ICONS = {
   OVERVIEWS: <ChartPie />,
   USERS: <UsersRound />,
   CATEGORIES: <Archive />,
   DEPARTMENTS: <Newspaper />,
   BRANDS: <Store />,
   PRODUCTS: <Shirt />,
   ATTRIBUTES: <IoColorFilterOutline />,
   HEART: <FaHeart size={24} />,
   UN_HEART: <FaRegHeart size={24} className="text-[#6B6565]" />,
   CART: <BsCart3 size={20} />,
   MY_ACCOUNT: <FiUser size={20} />,
   STAR: <FaStar className="text-yellow-200 " size={20} />,
   DOLLAR: <BiDollar />,
   PLUS: <Plus size={14} />,
   MINUS: <Minus size={14} />,
   HEAER_SIDEBAR: <HeartPlus />,
   PROFILE: <CircleUser />,
   LOGOUT: <LogOut />,
   ADDRESS: <MapPinHouse />,
   ORDERS: <FiPackage size={22} />,
   EDIT: <SquarePen size={16} />,
   DELETE: <Trash size={16} />,
   OFFICE: <Building size={16} className="text-green-500" />,
   HOME: <Home size={16} className="text-blue-500" />,
   NOTIFICATION: <Bell />,
   // ORDER:<Package />
};