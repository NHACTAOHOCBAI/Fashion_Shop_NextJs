"use client";
import QuantitySelector from "@/app/client/products/_components/MyCount";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";

// --- Định nghĩa Interface cho dữ liệu giỏ hàng ---
interface CartItemData {
  id: number;
  name: string;
  image: string;
  attributes: string[];
  unitPrice: number;
}

// --- Combined State Type ---
interface CartStateItem extends CartItemData {
  quantity: number; // Thêm quantity vào state
}

// --- Dữ liệu giỏ hàng (Tĩnh) ---
const initialCartItems: CartStateItem[] = [
  {
    id: 1,
    name: "Nike Airmax 270 react",
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    attributes: ["Red", "XL"],
    quantity: 2,
    unitPrice: 499.0,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21",
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    attributes: ["Blue", "L"],
    quantity: 1,
    unitPrice: 350.0,
  },
];

const SHIPPING_FEE = 20.0;

const Cart = () => {
  // State chính lưu trữ toàn bộ dữ liệu giỏ hàng (bao gồm quantity)
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>(
    initialCartItems.map((item) => item.id)
  );

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
    setSelectedItemIds([]);
  };

  // Tính toán Subtotal và Total động (Giữ nguyên logic cũ)
  const { subtotal, total } = useMemo(() => {
    const selectedItems = cartItems.filter((item) =>
      selectedItemIds.includes(item.id)
    );
    const calculatedSubtotal = selectedItems.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0
    );
    const calculatedTotal = calculatedSubtotal + SHIPPING_FEE;
    return { subtotal: calculatedSubtotal, total: calculatedTotal };
  }, [cartItems, selectedItemIds]);

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
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            isSelected={selectedItemIds.includes(item.id)}
            onToggleSelect={handleToggleSelect}
            // TRUYỀN HÀM SETTER ĐƯỢC TẠO RA ĐỂ PHÙ HỢP VỚI QuantitySelectorProps
            setQuantity={createQuantitySetter(item.id)}
          />
        ))}
      </div>
      {/* Phần Tóm Tắt Thanh Toán... (Giữ nguyên) */}
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
        <CheckoutButton subtotal={subtotal} />
      </div>
    </div>
  );
};

export default Cart;

// --- Component CartItem (Sửa để truyền props đúng) ---
interface CartItemProps {
  item: CartStateItem; // Dữ liệu item (có quantity)
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  // Thêm setQuantity vào props để truyền xuống QuantitySelector
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  isSelected,
  onToggleSelect,
  setQuantity, // Nhận hàm setter từ Cart
}) => {
  const { id, name, image, attributes, quantity, unitPrice } = item;
  const itemTotal = unitPrice * quantity;

  return (
    <div className="flex py-[20px] px-[30px] items-center border-b-[1px] border-[#F6F7F8] justify-between">
      <div className="flex items-center">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(id)}
          className="data-[state=checked]:bg-[#40BFFF] data-[state=checked]:border-[#40BFFF]"
        />
        <div className="flex gap-[17px] ml-[35px]">
          <Image
            height={94}
            width={138}
            alt={name}
            src={image}
            className="bg-[#F6F7F8] rounded-[8px] w-[138px] h-[94px] object-contain"
          />
          <div>
            <p>{name}</p>
            <div className="flex gap-[17px] mt-[10px]">
              {attributes.map((attr) => (
                <Tag key={attr} value={attr} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <div className="w-[120px] text-right">${itemTotal.toFixed(2)}</div>
      </div>
    </div>
  );
};

// --- Các Component Phụ Khác (Giữ nguyên) ---

const Tag = ({ value }: { value: string }) => {
  return (
    <div className="bg-[#FAFAFB] border-[#F6F7F8] border-[1px] text-[14px] font-light px-[18px] py-[4px] rounded-[5px]">
      {value}
    </div>
  );
};

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

const CheckoutButton = ({ subtotal }: { subtotal: number }) => {
  const handleClick = () => {
    const totalAmount = subtotal + SHIPPING_FEE;
    if (subtotal > 0) {
      alert(
        `Proceeding to checkout with total amount: $${totalAmount.toFixed(2)}`
      );
    } else {
      alert("Your cart is empty. Please select items to checkout.");
    }
  };
  return (
    <div
      onClick={handleClick}
      className="text-white cursor-pointer bg-[#40BFFF] rounded-[4px] py-[10px] w-full text-center duration-300 active:scale-90 "
    >
      <p>Checkout</p>
    </div>
  );
};
