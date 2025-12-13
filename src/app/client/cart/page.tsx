"use client";
import MyTag from "@/app/client/_components/MyTag";
import QuantitySelector from "@/app/client/products/_components/MyCount";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetMyCart, useRemoveFromCart } from "@/hooks/queries/useCart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react"; // ✨ THÊM useEffect

// Thêm các Interface cần thiết vào file này để code chạy

// END Interfaces

const SHIPPING_FEE = 20.0;

const Cart = () => {
  const { data: myCart, isLoading } = useGetMyCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  // State chứa dữ liệu giỏ hàng được quản lý (khởi tạo là mảng rỗng)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  // ✨ useEffect để khởi tạo state khi myCart load xong
  useEffect(() => {
    if (myCart?.items) {
      // Khởi tạo cartItems từ dữ liệu API
      setCartItems(myCart.items);
    }
  }, [myCart]); // Chạy lại khi myCart thay đổi

  if (isLoading || !myCart) {
    return <div className="w-[1240px] mx-auto py-[50px]">Loading cart...</div>;
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
      (acc, item) => acc + item.variant.product.price * item.quantity,
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
    <div className="w-[1240px] mx-auto py-[50px]">
      <div className="flex justify-between items-center h-[50px] ">
        {selectedCount > 0 && (
          <p>
            {selectedCount} item{selectedCount !== 1 ? "s" : ""} chosen
          </p>
        )}
        {selectedCount > 0 && <DeleteButton onClick={handleDeleteSelected} />}
      </div>
      <div className="mt-[17px]">
        {/* ✨ SỬ DỤNG cartItems state để render thay vì myCart?.items */}
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

      {/* Phần Tóm Tắt Thanh Toán... */}
      <div className="w-[286px] ml-auto mt-[44px]">
        <div className="flex justify-between items-center">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center mt-[17px]">
          <p>Shipping fee</p>
          <p>${SHIPPING_FEE.toFixed(2)}</p>
        </div>
        <div className="bg-[#FAFAFB] h-[2px] my-[17px]" />
        <div className="flex justify-between items-center mt-[17px] text-[30px] font-medium mb-[28px]">
          <p>TOTAL</p>
          <p>${total.toFixed(2)}</p>
        </div>
        {/* ✨ TRUYỀN selectedItems XUỐNG CheckoutButton */}
        <CheckoutButton subtotal={subtotal} selectedItems={selectedItems} />
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
  // ✨ TÍNH itemTotal DỰA TRÊN CẤU TRÚC DỮ LIỆU MỚI
  const itemTotal = item.quantity * item.variant.product.price;

  return (
    <div className="flex py-[20px] px-[30px] items-center border-b-[1px] border-[#F6F7F8] justify-between">
      <div className="flex items-center">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(item.id)}
          className="data-[state=checked]:bg-[#40BFFF] data-[state=checked]:border-[#40BFFF]"
        />
        <div className="flex gap-[17px] ml-[35px]">
          <Image
            height={94}
            width={138}
            alt={item.variant.product.name}
            src={item.variant.imageUrl}
            className="bg-[#F6F7F8] rounded-[8px] w-[138px] h-[94px] object-contain"
          />
          <div>
            <p>{item.variant.product.name}</p>
            <div className="flex gap-[17px] mt-[10px]">
              {item.variant.variantAttributeValues.map((attr) => (
                <MyTag key={attr.id} value={attr.attributeCategory.value} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <QuantitySelector
          quantity={item.quantity}
          setQuantity={setQuantity}
          maxQuantity={item.variant.remaining} // Tồn kho của biến thể
        />
        <div className="w-[120px] text-right">${itemTotal.toFixed(2)}</div>
      </div>
    </div>
  );
};

// --- Các Component Phụ Khác (Giữ nguyên) ---

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className=" flex gap-[4px] text-white cursor-pointer bg-[#FF4C4C] rounded-[4px] py-[10px] px-[20px] text-center duration-300 active:scale-90 "
    >
      <p>Delete selected</p>
      <Trash2 />
    </div>
  );
};

const CheckoutButton = ({
  subtotal,
  selectedItems,
  disabled = false, // Prop disabled từ bên ngoài
}: {
  subtotal: number;
  selectedItems: CartItem[];
  disabled?: boolean;
}) => {
  // Tính toán trạng thái disable: Disabled từ prop HOẶC không có mục nào được chọn
  const isDisabled = disabled || selectedItems.length === 0;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) {
      event.preventDefault();
      console.log(
        "Checkout button is disabled: No items selected or external lock."
      );
      return;
    }

    // Lọc ra danh sách variantId và quantity
    const checkoutData = selectedItems.map((item) => ({
      variantId: item.variant.id,
      quantity: item.quantity,
    }));

    const totalAmount = subtotal + SHIPPING_FEE;

    localStorage.setItem("products", JSON.stringify(selectedItems));
  };

  return (
    <div
      onClick={handleClick}
      aria-disabled={isDisabled}
      role="button"
      className={`
        text-white rounded-[4px] py-[10px] w-full text-center duration-300 select-none
        ${
          isDisabled
            ? // STYLE KHI DISABLED
              "bg-gray-400 cursor-not-allowed opacity-70"
            : // STYLE KHI ACTIVE
              "bg-[#40BFFF] cursor-pointer active:scale-90 hover:bg-[#33A0FF]"
        }
      `}
    >
      <p>Checkout</p>
    </div>
  );
};
