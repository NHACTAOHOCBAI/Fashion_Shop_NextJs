"use client";
import MyTag from "@/app/client/_components/MyTag";
import QuantitySelector from "@/app/client/products/_components/MyCount";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetMyCart, useRemoveFromCart } from "@/hooks/queries/useCart";
import { EmptyCart } from "@/components/ui/empty-states";
import {
  Trash2,
  ShoppingBag,
  Tag,
  TruckIcon,
  Shield,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const SHIPPING_FEE = 0;

const Cart = () => {
  const { data: myCart, isLoading } = useGetMyCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  // State chứa dữ liệu giỏ hàng được quản lý (khởi tạo là mảng rỗng)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  useEffect(() => {
    if (myCart?.items) {
      setCartItems(myCart.items);
    }
  }, [myCart]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-[1240px] mx-auto py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no items in cart
  if (!myCart || cartItems.length === 0) {
    return <EmptyCart />;
  }

  // --- Handlers Cập nhật Quantity TRỰC TIẾP ---
  const createQuantitySetter = (itemId: number) => {
    // Tạo một hàm giống hệt signature của React.Dispatch<React.SetStateAction<number>>
    const setQuantityForId: React.Dispatch<React.SetStateAction<number>> = (
      action
    ) => {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === itemId) {
            // Xác định newQuantity
            const newQuantity =
              typeof action === "function" ? action(item.quantity) : action;
            // Đảm bảo số lượng không nhỏ hơn 1
            return { ...item, quantity: Math.max(1, newQuantity) };
          }
          return item;
        })
      );
    };
    return setQuantityForId;
  };

  const handleToggleSelect = (id: number) => {
    setSelectedItemIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((itemId) => itemId !== id)
        : [...prevIds, id]
    );
  };

  const handleDeleteSelected = () => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !selectedItemIds.includes(item.id))
    );
    removeFromCart(selectedItemIds);
    setSelectedItemIds([]);
  };

  // Tính toán Subtotal và Total động (Đã sửa logic tính giá)
  const caculate = () => {
    const selectedItems = cartItems.filter((item) =>
      selectedItemIds.includes(item.id)
    );
    const calculatedSubtotal = selectedItems.reduce(
      // ✨ SỬ DỤNG GIÁ TỪ PRODUCT: item.variant.product.price
      (acc, item) => acc + Number(item.variant.product.price) * item.quantity,
      0
    );
    const calculatedTotal = calculatedSubtotal + SHIPPING_FEE;
    return {
      subtotal: calculatedSubtotal,
      total: calculatedTotal,
      selectedItems,
    };
  };
  const { subtotal, total, selectedItems } = caculate();
  const selectedCount = selectedItemIds.length;

  return (
    <div className="min-h-screen bg-white dark:from-gray-900">
      <div className="w-[1240px] mx-auto py-10">
        {/* Header */}
        <div className="mb-6">
          <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
            {/* <ShoppingBag className="w-6 h-6 text-[#40BFFF]" /> */}
            Shopping Cart
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="flex gap-6">
          {/* Cart Items */}
          <div className="flex-1">
            {/* Selection Bar */}
            {selectedCount > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4 border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#40BFFF]" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {selectedCount} item{selectedCount !== 1 ? "s" : ""}{" "}
                    selected
                  </span>
                </div>
                <DeleteButton onClick={handleDeleteSelected} />
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItemIds.includes(item.id)}
                  onToggleSelect={handleToggleSelect}
                  setQuantity={createQuantitySetter(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Order Summary - Sticky */}
          <div className="w-80">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Order Summary
                </h4>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Subtotal ({selectedCount} items)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700 my-4" />

                <div className="flex justify-between items-center mb-5">
                  <span className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[#40BFFF]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <CheckoutButton
                  subtotal={subtotal}
                  selectedItems={selectedItems}
                />

                {/* Trust Badges */}
                <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Shield className="w-4 h-4 text-[#40BFFF]" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// --- Component CartItem (Đã sửa) ---
interface CartItemProps {
  item: CartItem; // Sử dụng CartItem interface đã định nghĩa
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  isSelected,
  onToggleSelect,
  setQuantity,
}) => {
  const itemTotal = item.quantity * Number(item.variant.product.price);
  const stockLow = item.variant.remaining <= 5;

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border transition-colors",
        isSelected ? "border-[#40BFFF]" : "border-gray-200 dark:border-gray-700"
      )}
    >
      <div className="flex gap-4">
        {/* Checkbox */}
        <div className="flex items-start pt-1">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(item.id)}
            className="data-[state=checked]:bg-[#40BFFF] data-[state=checked]:border-[#40BFFF]"
          />
        </div>

        {/* Product Image */}
        <div className="relative">
          <Image
            height={100}
            width={120}
            alt={item.variant.product.name}
            src={item.variant.imageUrl}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg w-32 h-24 object-cover"
          />
          {stockLow && (
            <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              Low Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h5 className="text-base font-medium text-gray-800 dark:text-gray-100 mb-2">
            {item.variant.product.name}
          </h5>

          {/* Variant Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {item.variant.variantAttributeValues.map((attr) => (
              <MyTag
                key={attr.id}
                value={attr.attributeCategory.value}
                variant="primary"
              />
            ))}
          </div>

          {/* Stock Info */}
          <div className="flex items-center gap-1 text-xs">
            {item.variant.remaining > 10 ? (
              <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                In Stock ({item.variant.remaining})
              </span>
            ) : (
              <span className="text-orange-600 dark:text-orange-400 font-medium">
                Only {item.variant.remaining} left!
              </span>
            )}
          </div>
        </div>

        {/* Quantity & Price */}
        <div className="flex flex-col items-end justify-between min-w-[160px]">
          <div className="text-right mb-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
              Price
            </p>
            <p className="text-xl font-semibold text-[#40BFFF]">
              ${itemTotal.toFixed(2)}
            </p>
          </div>

          <QuantitySelector
            quantity={item.quantity}
            setQuantity={setQuantity}
            maxQuantity={item.variant.remaining}
          />
        </div>
      </div>
    </div>
  );
};

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
      <span>Delete</span>
    </button>
  );
};

const CheckoutButton = ({
  subtotal,
  selectedItems,
  disabled = false,
}: {
  subtotal: number;
  selectedItems: CartItem[];
  disabled?: boolean;
}) => {
  const router = useRouter();
  const isDisabled = disabled || selectedItems.length === 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    const checkoutData = selectedItems.map((item) => ({
      variantId: item.variant.id,
      quantity: item.quantity,
    }));

    const totalAmount = subtotal + SHIPPING_FEE;

    localStorage.setItem("products", JSON.stringify(selectedItems));
    router.replace("/client/checkout");
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "w-full py-3 rounded-lg font-semibold transition-colors",
        isDisabled
          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
          : "bg-[#40BFFF] text-white hover:bg-[#33A0DD]"
      )}
    >
      {isDisabled ? "Select items to checkout" : "Proceed to Checkout"}
    </button>
  );
};
