'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ICONS } from "@/constants/icon.enum";
import { formatMoney } from "@/lib/formatMoney";
import Image from "next/image"
import { useState } from "react";
const myCart: CartItem[] = [
    {
        id: 1,
        quantity: 2,
        cart: {} as Cart,
        variant: {
            id: 101,
            imageUrl:
                "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/wvt2sxtj3fbxcmzlgj5a/air-max-270-mens-shoes-KkLcGR.png",
            publicId: "nike-airmax-270-red",
            quantity: 100,
            remaining: 80,
            variantAttributeValues: [
                {
                    id: 1001,
                    attributeCategory: {
                        id: 2001,
                        attribute: {
                            id: 3001,
                            name: "Color",
                        } as Attribute,
                        category: {
                            id: 4001,
                            name: "Shoes",
                        } as Category,
                        value: "Red",
                    },
                },
                {
                    id: 1002,
                    attributeCategory: {
                        id: 2002,
                        attribute: {
                            id: 3002,
                            name: "Size",
                        } as Attribute,
                        category: {
                            id: 4001,
                            name: "Shoes",
                        } as Category,
                        value: "42",
                    },
                },
            ],
        },
    },
    {
        id: 2,
        quantity: 1,
        cart: {
            id: 1,
        } as Cart,
        variant: {
            id: 102,
            imageUrl:
                "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/oxc4tbk1k5uwvl4w6nnd/air-max-270-mens-shoes-KkLcGR.png",
            publicId: "nike-airmax-270-multi",
            quantity: 150,
            remaining: 120,
            variantAttributeValues: [
                {
                    id: 1003,
                    attributeCategory: {
                        id: 2003,
                        attribute: {
                            id: 3001,
                            name: "Color",
                        } as Attribute,
                        category: {
                            id: 4001,
                            name: "Shoes",
                        } as Category,
                        value: "Multi",
                    },
                },
                {
                    id: 1004,
                    attributeCategory: {
                        id: 2004,
                        attribute: {
                            id: 3002,
                            name: "Size",
                        } as Attribute,
                        category: {
                            id: 4001,
                            name: "Shoes",
                        } as Category,
                        value: "43",
                    },
                },
            ],
        },
    },
];
const MyCart = () => {
    return (
        <div>
            {
                myCart.map((item) =>
                    <CartItem key={item.id} item={item} />
                )
            }
            <Fee />
        </div>
    )
}
const CartItem = ({ item }: { item: CartItem }) => {
    return (
        <div className="flex border-b-[1px] items-center justify-between">
            <div className="flex gap-[10px] p-[20px] w-[500px] items-center ">
                <Checkbox id="terms" />
                <Image
                    width={150} height={100} alt="shoes" src={"https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"}
                    className="rounded-2xl w-[150px] h-[100px] object-cover "
                />
                <div>
                    <p>Nike Shoes</p>
                    <div className="flex gap-[4px] w-[200px] flex-wrap">
                        {item.variant.variantAttributeValues.map((attribute) => {
                            return (
                                <Badge key={attribute.id} variant="secondary">
                                    <span key={attribute.id}>{`${attribute.attributeCategory.attribute.name} : ${attribute.attributeCategory.value}`}</span>
                                </Badge>

                            )
                        })}
                    </div>
                </div>
            </div>
            <p>{formatMoney(200)}</p>
            <IncrementBtn />
        </div>
    )
}
const IncrementBtn = () => {
    const [count, setCount] = useState(4);

    return (
        <div className="flex items-center rounded overflow-hidden bg-gray-100">
            {/* Minus */}
            <button
                onClick={() => setCount((prev) => Math.max(0, prev - 1))}
                className="px-3 py-3 transition-all hover:bg-gray-200 active:scale-95"
            >
                {ICONS.MINUS}
            </button>

            {/* Count */}
            <div className="w-[40px] text-center font-medium">{count}</div>

            {/* Plus */}
            <button
                onClick={() => setCount((prev) => prev + 1)}
                className=" px-3 py-3 transition-all hover:bg-gray-200 active:scale-95"
            >
                {ICONS.PLUS}
            </button>
        </div>
    );
};
const Fee = () => {
    return (
        <div className="w-[400px] ml-auto mt-[50px]">
            <div className="flex justify-between p-[10px]">
                <p>Subtotal</p>
                <p>{formatMoney(200)}</p>
            </div>
            <div className="border-b-[1px]"></div>
            <div className="flex justify-between  font-medium p-[10px]">
                <p>TOTAL</p>
                <p>{formatMoney(200)}</p>
            </div>
            <Button
                className="text-[18px] h-[40px] bg-app-primary w-full
             translate-y-2 group-hover:translate-y-0
             transition-all duration-300"
            >
                Checkout
            </Button>

        </div>
    )
}
export default MyCart