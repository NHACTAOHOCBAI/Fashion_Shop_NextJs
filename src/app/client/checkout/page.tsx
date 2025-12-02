"use client";
import MyTag from "@/app/client/_components/MyTag";
import NormalButton from "@/app/client/_components/NormalButton";
import AddressList from "@/app/client/checkout/AddressList";
import CouponList from "@/app/client/checkout/CouponList";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Box, CreditCard, MapPinHouse, Truck } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { RiCoupon3Line } from "react-icons/ri";
interface CartItem {
  id: number;
  name: string;
  image: string;
  attributes: string[];
  quantity: number;
  unitPrice: number;
}

interface Coupon {
  id: number;
  code: string;
  discount: string;
  type: "percentage"; // Chỉ hỗ trợ kiểu percentage trong ví dụ này
  value: number; // Giá trị giảm giá (ví dụ: 0.1 cho 10%)
  start: string;
  end: string;
}

interface ShippingOption {
  value: string;
  price: number;
  delivery: string;
  name: string;
  logo: string;
}

interface PaymentMethodOption {
  name: string;
  value: string;
  description: string;
  logo: string;
}

interface OrderSummary {
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
}

const initialCartItems: CartItem[] = [
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

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: "FSHOP2025",
    discount: "Flat 10% off*",
    type: "percentage",
    value: 0.1,
    start: "23/11/2025",
    end: "30/11/2025",
  },
  {
    id: 2,
    code: "WINTER20",
    discount: "20% off all items",
    type: "percentage",
    value: 0.2,
    start: "01/12/2025",
    end: "31/12/2025",
  },
  {
    id: 3,
    code: "WINTER30",
    discount: "30% off all items",
    type: "percentage",
    value: 0.3,
    start: "01/12/2025",
    end: "31/12/2025",
  },
];

const shippingOptions: ShippingOption[] = [
  {
    value: "standard",
    price: 5.0,
    delivery: "(10-20 days)",
    name: "Standard Delivery",
    logo: "Logo A",
  },
  {
    value: "fast",
    price: 9.0,
    delivery: "(5-10 days)",
    name: "Fast Delivery",
    logo: "Logo B",
  },
];

const paymentMethodOptions: PaymentMethodOption[] = [
  {
    name: "PayPal",
    value: "paypal",
    description:
      "You will be redirected to the PayPal website after submitting your order",
    logo: "Logo A",
  },
  {
    name: "Cash On Delivery (COD)",
    value: "cod",
    description: "Pay after receiving your order",
    logo: "Logo A",
  },
];

// ===============================================
// 3. HÀM LOGIC TÍNH TOÁN
// ===============================================

const calculateOrderSummary = (
  items: CartItem[],
  selectedShippingValue: string,
  selectedCouponId?: number
): OrderSummary => {
  // 1. Tính Subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  // 2. Tính Shipping Fee
  const shippingInfo = shippingOptions.find(
    (opt) => opt.value === selectedShippingValue
  );
  const shippingFee = shippingInfo ? shippingInfo.price : 0;

  // 3. Tính Discount
  let discountAmount = 0;
  const selectedCoupon = initialCoupons.find(
    (coupon) => coupon.id === selectedCouponId
  );

  if (selectedCoupon && selectedCoupon.type === "percentage") {
    discountAmount = subtotal * selectedCoupon.value;
  }

  // 4. Tính Total
  const total = subtotal + shippingFee - discountAmount;

  return {
    subtotal,
    shippingFee,
    discountAmount,
    total,
  };
};

// ===============================================
// 4. COMPONENT CHÍNH
// ===============================================
const initialAddress = [
  {
    id: 1,
    type: "home",
    address:
      "Dormitory B, VNU - HCMC, Dong Hoa Ward, Di An City, Binh Duong Province, Vietnam",
    name: "Zabit Magomedsharipov",
    phone: "0838609516",
  },
  {
    id: 2,
    type: "Office",
    address:
      "Dormitory B, VNU - HCMC, Dong Hoa Ward, Di An City, Binh Duong Province, Vietnam",
    name: "Zabit Magomedsharipov 2",
    phone: "0838609516",
  },
];
const Checkout = () => {
  // State mới: ID của địa chỉ đã chọn
  const [selectedAddressId, setSelectedAddressId] = useState<number>(
    initialAddress[0].id // Mặc định chọn địa chỉ đầu tiên
  );

  // State: Đã gán kiểu union type cho id: number | undefined
  const [selectedCouponId, setSelectedCouponId] = useState<number | undefined>(
    initialCoupons[0].id
  );

  // State: Đã gán kiểu string
  const [selectedShipping, setSelectedShipping] = useState<string>(
    shippingOptions[0].value
  );

  // State: Đã gán kiểu string
  const [selectedPayment, setSelectedPayment] = useState<string>(
    paymentMethodOptions[0].value
  );

  // Tính toán Tóm tắt đơn hàng bằng useMemo
  const orderSummary = useMemo(
    () =>
      calculateOrderSummary(
        initialCartItems,
        selectedShipping,
        selectedCouponId
      ),
    [selectedShipping, selectedCouponId]
  );

  // Hàm xử lý khi click vào coupon
  const handleCouponClick = (id: number) => {
    if (selectedCouponId === id) {
      setSelectedCouponId(undefined); // Bỏ chọn
    } else {
      setSelectedCouponId(id); // Chọn mới
    }
  };
  // 🆕 Lấy thông tin địa chỉ đã chọn
  const selectedAddress = initialAddress.find(
    (addr) => addr.id === selectedAddressId
  );

  // 🆕 Hàm xử lý chọn địa chỉ trong dialog
  const handleSelectAddress = (id: number) => {
    setSelectedAddressId(id);
    // Logic đóng dialog sau khi chọn (nếu cần)
    // Cần truyền setter cho AlertDialog state từ component cha nếu muốn đóng ngay lập tức
  };
  return (
    <div className="w-[1240px] mx-auto py-[50px]">
      {/* address */}
      <div>
        <div className="flex gap-[10px]">
          <MapPinHouse />
          <p className="font-medium">Shipping Address</p>
        </div>
        <div className="flex justify-between items-end mt-[13px]">
          <p className="font-thin">
            {/* 🆕 HIỂN THỊ ĐỊA CHỈ ĐÃ CHỌN Ở ĐÂY */}
            <span className="font-medium">
              {selectedAddress?.name} ({selectedAddress?.phone}){" "}
            </span>
            {selectedAddress?.address}
          </p>
          <AlertDialog>
            <AlertDialogTrigger></AlertDialogTrigger>
            {/* 🆕 TRUYỀN PROPS XUỐNG COMPONENT CON */}
            <AddressList
              selectedAddressId={selectedAddressId}
              onSelectAddress={handleSelectAddress}
            />
          </AlertDialog>
        </div>
        <div className="bg-[#FAFAFB] h-[2px] my-[18px]" />
      </div>

      {/* shipping method */}
      <div className="mt-[30px]">
        <div className="flex gap-[10px]">
          <Truck />
          <p className="font-medium">Shipping Method</p>
        </div>
        <div className="mt-[22px]">
          <RadioGroup
            value={selectedShipping}
            onValueChange={setSelectedShipping}
          >
            {shippingOptions.map((option) => {
              const isSelected = selectedShipping === option.value;
              return (
                <label
                  htmlFor={option.value}
                  key={option.value}
                  className={`flex py-[15px] px-[19px] rounded-[4px] border-[1px] cursor-pointer ${
                    isSelected
                      ? "bg-[#E8EFFA] border-[#40BFFF]"
                      : "border-gray-100"
                  }`}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="
                      mt-[4px] 
                      data-[state=checked]:border-[#40BFFF] 
                      data-[state=checked]:text-[#40BFFF]
                      text-gray-400
                    "
                  />
                  <p className="text-[16px] font-semibold ml-[8px]">
                    ${option.price.toFixed(2)}
                  </p>
                  <div className="font-thin text-[14px] ml-[22px]">
                    <p>{option.name}</p>
                    <p>{option.delivery}</p>
                  </div>
                  <p className="ml-auto">Logo here</p>
                </label>
              );
            })}
          </RadioGroup>
        </div>
        <div className="bg-[#FAFAFB] h-[2px] my-[18px]" />
      </div>

      {/* products */}
      <div className="mt-[30px]">
        <div className="flex gap-[10px]">
          <Box />
          <p className="font-medium">Products</p>
        </div>
        <div className="mt-[22px]">
          {initialCartItems.map((item) => {
            return <ProductItem item={item} key={item.id} />;
          })}
        </div>
        <div className="bg-[#FAFAFB] h-[2px] my-[18px]" />
      </div>

      <div className="flex mt-[30px] gap-[62px] ">
        <div className="flex-1">
          {/* Coupons */}
          <div>
            <div className="flex gap-[10px] items-center">
              <RiCoupon3Line />
              <p className="font-medium">Coupons</p>
              <div className="ml-auto">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <NormalButton>
                      <p className="text-[14px] text-[#40BFFF]">Load More</p>
                    </NormalButton>
                  </AlertDialogTrigger>
                  <CouponList
                    handleCouponClick={handleCouponClick}
                    selectedCouponId={selectedCouponId}
                  />
                </AlertDialog>
              </div>
            </div>
            <div className="mt-[22px] flex gap-[20px] flex-wrap">
              {initialCoupons.map((coupon) => {
                const isSelected = selectedCouponId === coupon.id;

                return (
                  <div
                    key={coupon.id}
                    onClick={() => handleCouponClick(coupon.id)}
                    className={`
                      rounded-[20px] 
                      bg-[#F6F7F8] 
                      flex 
                      overflow-hidden 
                      cursor-pointer
                      transition-all duration-200
                      ${
                        isSelected
                          ? "border-[2px] border-[#40BFFF]"
                          : "border-[2px] border-transparent"
                      }
                    `}
                  >
                    <div className="bg-[#40BFFF] text-white text-[14px] font-bold flex items-center w-[50px] justify-center relative py-2">
                      {/* Đã sửa lỗi xoay chữ */}
                      <p className="-rotate-90 whitespace-nowrap absolute font-medium">
                        DISCOUNT
                      </p>
                    </div>
                    <div className="py-[9px] pl-[15px] w-[190px]">
                      <p className="text-[12px] text-[#FF4858] font-semibold">
                        {coupon.discount}
                      </p>
                      <p className="font-semibold text-base">{coupon.code}</p>
                      <p className="text-[10px] font-light mt-[7px]">
                        Start date: {coupon.start}
                      </p>
                      <p className="text-[10px] font-light">
                        End date: {coupon.end}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Hết Coupons */}

          {/* payment method */}
          <div className=" mt-[30px]">
            <div className="flex gap-[10px]">
              <CreditCard />
              <p className="font-medium">Payment Method</p>
            </div>
            <div className="mt-[22px] w-full">
              <RadioGroup
                value={selectedPayment}
                onValueChange={setSelectedPayment}
              >
                {paymentMethodOptions.map((option) => {
                  const isSelected = selectedPayment === option.value;
                  return (
                    <label
                      htmlFor={option.value}
                      key={option.value}
                      className={` py-[15px] px-[19px] rounded-[4px] border-[1px] mb-[15px] flex items-start cursor-pointer ${
                        isSelected
                          ? "bg-[#E8EFFA] border-[#40BFFF]"
                          : "border-gray-100"
                      }`}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="
                          mt-[4px] 
                          data-[state=checked]:border-[#40BFFF] 
                          data-[state=checked]:text-[#40BFFF]
                          text-gray-400
                        "
                      />
                      <div className="ml-[8px] flex-1">
                        <p className="text-[16px] font-semibold">
                          {option.name}
                          <p className="font-thin text-[14px] mt-[4px]">
                            {option.description}
                          </p>
                        </p>
                      </div>
                      <p className="ml-auto">Logo here</p>
                    </label>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          {/* Hết payment method */}
        </div>

        {/* summary */}
        <div className="w-[286px]">
          <h3 className="font-medium text-lg mb-4">Order Summary</h3>
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>${orderSummary.subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mt-[17px]">
            <p>Shipping fee</p>
            <p>${orderSummary.shippingFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mt-[17px]">
            <p>Discount</p>
            <p className="text-[#FF4858]">
              -${orderSummary.discountAmount.toFixed(2)}
            </p>
          </div>
          <div className="bg-[#FAFAFB] h-[2px] my-[17px]" />
          <div className="flex justify-between items-center mt-[17px] text-[30px] font-medium mb-[28px]">
            <p>TOTAL</p>
            <p>${orderSummary.total.toFixed(2)}</p>
          </div>
          <NoteInput />
          <PlaceOrderButton />
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 5. CÁC COMPONENT PHỤ
// ===============================================

interface ProductItemProps {
  item: CartItem; // Sử dụng interface đã định nghĩa
}
const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { name, image, attributes, quantity, unitPrice } = item;
  const itemTotal = unitPrice * quantity;

  return (
    <div className="flex py-[20px] px-[30px] items-center border-b-[1px] border-[#F6F7F8] justify-between">
      <div className="flex items-center">
        <div className="flex gap-[17px] ">
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
                <MyTag key={attr} value={attr} />
              ))}
              <p className="text text-gray-200">|</p>
              <MyTag
                value={<div className="font-medium">{`x ${quantity}`}</div>}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[120px] text-right font-medium">
          ${itemTotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
};
const PlaceOrderButton = () => {
  return (
    <div className="text-white cursor-pointer bg-[#40BFFF] rounded-[4px] py-[10px] w-full text-center duration-300 active:scale-90 ">
      <p>Checkout</p>
    </div>
  );
};
const NoteInput = () => {
  return (
    <textarea
      rows={3}
      className="
      text-[16px]
        w-full 
        rounded-[4px] 
        border 
        border-gray-200 
        px-[14px] 
        py-[12px] 
        placeholder:text-gray-300 
        focus:outline-none 
        focus:border-[#40BFFF] 
      "
      placeholder="Type here..."
    />
  );
};

export default Checkout;
