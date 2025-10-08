'use client'
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ICONS } from "@/constants/icon.enum";
import { useAddToCart, useGetMyCart, useRemoveFromCart } from "@/hooks/queries/useCart";
import { formatMoney } from "@/lib/formatMoney";
import Image from "next/image";
import { useRouter } from "next/navigation";
const MyCart = () => {
    const { data: myCart } = useGetMyCart();
    const { mutate: addItem } = useAddToCart();
    const { mutate: removeItem } = useRemoveFromCart();

    const [selectedItems, setSelectedItems] = useState<{
        variant: Variant,
        quantity: number
    }[]>([]);

    const handleAddItem = (variantId: number) => {
        addItem({ variantId, quantity: 1 });
    };

    const handleRemoveItem = (variantId: number) => {
        removeItem({ variantId, quantity: 1 });
    };

    const handleToggleSelect = (variant: Variant, quantity: number) => {
        setSelectedItems((prev) => {
            const exists = prev.some((item) => item.variant.id === variant.id)
            if (exists) return prev.filter((item) => item.variant.id !== variant.id)
            return [...prev, { variant, quantity }]
        })
    }
    const selectedTotal =
        myCart?.items
            ?.filter((item) =>
                selectedItems.some((selected) => selected.variant.id === item.variant.id)
            )
            ?.reduce(
                (sum, item) => sum + item.variant.product.price * item.quantity,
                0
            ) ?? 0

    const router = useRouter();
    const handleCheckout = () => {
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems))
        router.push('/checkout')
    }

    return (
        <div>
            {myCart?.items.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.some(selected => selected.variant.id === item.variant.id)}
                    onToggleSelect={handleToggleSelect}
                    handleAddItem={handleAddItem}
                    handleRemoveItem={handleRemoveItem}
                />
            ))}

            <Fee handleCheckout={handleCheckout} total={selectedTotal} />
        </div>
    );
};

const CartItem = ({
    item,
    handleAddItem,
    handleRemoveItem,
    onToggleSelect,
    isSelected,
}: {
    item: CartItem;
    handleAddItem: (variantId: number) => void;
    handleRemoveItem: (variantId: number) => void;
    onToggleSelect: (variant: Variant, quantity: number) => void;
    isSelected: boolean;
}) => {
    return (
        <div className="flex border-b-[1px] items-center justify-between">
            <div className="flex gap-[10px] p-[20px] w-[500px] items-center ">
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onToggleSelect(item.variant, item.quantity)}
                />
                <Image
                    width={150}
                    height={100}
                    alt="product"
                    src={item.variant.imageUrl}
                    className="rounded-2xl w-[150px] h-[100px] object-cover "
                />
                <div>
                    <p>{item.variant.product.name}</p>
                    <div className="flex gap-[4px] w-[200px] flex-wrap">
                        {item.variant.variantAttributeValues.map((attribute) => (
                            <Badge key={attribute.id} variant="secondary">
                                {`${attribute.attributeCategory.attribute.name}: ${attribute.attributeCategory.value}`}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            <p>{formatMoney(item.variant.product.price)}</p>
            <IncrementBtn
                variantId={item.variant.id}
                quantity={item.quantity}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
            />
        </div>
    );
};

const IncrementBtn = ({
    variantId,
    quantity,
    handleAddItem,
    handleRemoveItem,
}: {
    variantId: number;
    quantity: number;
    handleAddItem: (variantId: number) => void;
    handleRemoveItem: (variantId: number) => void;
}) => {
    return (
        <div className="flex items-center rounded overflow-hidden bg-gray-100">
            <button
                onClick={() => handleRemoveItem(variantId)}
                className="px-3 py-3 transition-all hover:bg-gray-200 active:scale-95"
            >
                {ICONS.MINUS}
            </button>

            <div className="w-[40px] text-center font-medium">{quantity}</div>

            <button
                onClick={() => handleAddItem(variantId)}
                className="px-3 py-3 transition-all hover:bg-gray-200 active:scale-95"
            >
                {ICONS.PLUS}
            </button>
        </div>
    );
};

const Fee = ({ total, handleCheckout }: { total: number, handleCheckout: () => void }) => {
    return (
        <div className="w-[400px] ml-auto mt-[50px]">
            <div className="flex justify-between p-[10px]">
                <p>Subtotal</p>
                <p>{formatMoney(total)}</p>
            </div>
            <div className="border-b-[1px]" />
            <div className="flex justify-between font-medium p-[10px]">
                <p>TOTAL</p>
                <p>{formatMoney(total)}</p>
            </div>
            <Button
                onClick={handleCheckout}
                className="text-[18px] h-[40px] bg-app-primary w-full
             translate-y-2 group-hover:translate-y-0
             transition-all duration-300"
                disabled={total === 0}
            >
                Checkout
            </Button>
        </div>
    );
};

export default MyCart;
