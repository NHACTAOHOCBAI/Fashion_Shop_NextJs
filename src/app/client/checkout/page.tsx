"use client";
import MyTag from "@/app/client/_components/MyTag";
import NormalButton from "@/app/client/_components/NormalButton";
import AddressList from "@/app/client/checkout/AddressList";
import CouponList from "@/app/client/checkout/CouponList";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMyAddress } from "@/hooks/queries/useAddress";
import { useAvailable } from "@/hooks/queries/useCoupon";
import { usePlaceOrder } from "@/hooks/queries/useOrder";
import { createPaypal } from "@/services/payment.service";
import { Box, CreditCard, MapPinHouse, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import { RiCoupon3Line } from "react-icons/ri";
import { toast } from "sonner";

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

const shippingOptions: ShippingOption[] = [
  {
    value: "standard",
    price: 10.0,
    delivery: "(10-20 days)",
    name: "Standard Delivery",
    logo: "Logo A",
  },
  {
    value: "express",
    price: 20.0,
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
      "You will be redirected to the PayPal website to complete your purchase.",
    logo: "Logo A",
  },
  {
    name: "Cash On Delivery (COD)",
    value: "cod",
    description: "Pay with cash upon delivery of your order.",
    logo: "Logo A",
  },
];

// ===============================================
// 3. HÀM LOGIC TÍNH TOÁN
// ===============================================

const calculateOrderSummary = (
  items: CartItem[],
  selectedShippingValue: string,
  allAvailableCoupons: Coupon[] | undefined,
  selectedCouponId?: number
): OrderSummary => {
  if (items.length === 0) {
    return { subtotal: 0, shippingFee: 0, discountAmount: 0, total: 0 };
  }

  // 1. Tính Subtotal
  const subtotal = items.reduce((sum, item) => {
    const price =
      typeof item.variant.product.price === "string"
        ? parseFloat(item.variant.product.price)
        : item.variant.product.price;
    return sum + price * item.quantity;
  }, 0);

  // 2. Tính Shipping Fee cơ bản
  const shippingInfo = shippingOptions.find(
    (opt) => opt.value === selectedShippingValue
  );
  let shippingFee = shippingInfo ? shippingInfo.price : 0;

  // 3. Tính Discount
  let discountAmount = 0;
  const selectedCoupon = allAvailableCoupons?.find(
    (coupon) => coupon.id === selectedCouponId
  );

  // Đảm bảo coupon đang active và minOrderAmount được đáp ứng
  if (selectedCoupon && selectedCoupon.status === "active") {
    const minOrderAmount = parseFloat(selectedCoupon.minOrderAmount);

    if (subtotal >= minOrderAmount) {
      if (
        selectedCoupon.discountType === "percentage" &&
        selectedCoupon.discountValue !== null
      ) {
        // Giảm giá không được lớn hơn Subtotal
        const calculatedDiscount =
          subtotal * (selectedCoupon.discountValue / 100);
        discountAmount =
          calculatedDiscount > subtotal ? subtotal : calculatedDiscount;
      } else if (
        selectedCoupon.discountType === "fixed_amount" &&
        selectedCoupon.discountValue !== null
      ) {
        // Giảm giá cố định không được lớn hơn Subtotal
        discountAmount =
          selectedCoupon.discountValue > subtotal
            ? subtotal
            : selectedCoupon.discountValue;
      } else if (selectedCoupon.discountType === "free_shipping") {
        // Miễn phí vận chuyển
        shippingFee = 0;
        discountAmount = 0; // Đặt về 0 để Total tính đúng
      }
    } else {
      // Coupon không đủ điều kiện (giữ nguyên phí và discount = 0)
    }
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

const Checkout = () => {
  const router = useRouter();
  // Hooks
  const { mutate: placeOrder, isPending } = usePlaceOrder();
  const { data: myAddresses } = useMyAddress();
  const [products, setProducts] = useState<CartItem[] | undefined>();
  const test2 = products?.map((product) => {
    return {
      variantId: product.variant.id,
      quantity: product.quantity,
    };
  });
  const { data: myCoupons } = useAvailable({
    items: test2 || [],
  });

  // States
  const [note, setNote] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<
    number | undefined
  >(undefined);
  const [selectedCouponId, setSelectedCouponId] = useState<number | undefined>(
    undefined
  );
  const [selectedShipping, setSelectedShipping] = useState<string>(
    shippingOptions[0].value
  );
  const [selectedPayment, setSelectedPayment] = useState<string>(
    paymentMethodOptions[0].value
  );

  // Auto-select logic
  useEffect(() => {
    if (myAddresses && myAddresses.length > 0) {
      const defaultAddress = myAddresses.find((addr) => addr.isDefault);
      setSelectedAddressId(
        defaultAddress ? defaultAddress.id : myAddresses[0].id
      );
    } else {
      setSelectedAddressId(undefined);
    }
  }, [myAddresses]);

  useEffect(() => {
    if (
      myCoupons &&
      myCoupons.data.length > 0 &&
      selectedCouponId === undefined
    ) {
      const defaultCoupon = myCoupons.data.find((c) => c.status === "active");
      if (defaultCoupon) {
        // Tùy chọn: Không tự động chọn, để người dùng tự chọn
        // setSelectedCouponId(defaultCoupon.id);
      }
    }
  }, [myCoupons, selectedCouponId]);

  // Load products from localStorage
  useEffect(() => {
    const test = localStorage.getItem("products");
    if (test) {
      try {
        const rawProducts = JSON.parse(test) as CartItem[];
        setProducts(rawProducts);
      } catch (error) {
        console.error("Error parsing products from localStorage:", error);
      }
    }
  }, []);

  // Memoized Order Summary Calculation
  const orderSummary = useMemo(
    () =>
      calculateOrderSummary(
        products || [],
        selectedShipping,
        myCoupons?.data,
        selectedCouponId
      ),
    [products, selectedShipping, selectedCouponId, myCoupons]
  );

  // Functions
  const handleCouponClick = (id: number) => {
    // 🌟 Sửa logic: Nếu coupon được click đã chọn, thì bỏ chọn
    setSelectedCouponId(selectedCouponId === id ? undefined : id);
  };

  const handleSelectAddress = (id: number) => {
    setSelectedAddressId(id);
    // Logic đóng dialog có thể thêm ở đây nếu cần
  };

  // Data needed for rendering and checkout
  const selectedAddress = myAddresses?.find(
    (addr) => addr.id === selectedAddressId
  );
  const currentCoupon = myCoupons?.data.find(
    (coupon) => coupon.id === selectedCouponId
  );
  const selectedShippingInfo = shippingOptions.find(
    (opt) => opt.value === selectedShipping
  );
  const selectedPaymentInfo = paymentMethodOptions.find(
    (opt) => opt.value === selectedPayment
  );

  // Hàm tổng hợp dữ liệu Checkout
  const handleCheckout = useCallback(() => {
    if (!selectedAddress) {
      alert("Please select a shipping address.");
      return;
    }
    if (!products || products.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const checkoutData = {
      shippingAddressId: selectedAddress.id,
      shippingMethod: selectedShipping,
      paymentMethod: selectedPayment,
      couponId: selectedCouponId,
      orderItems: (products || []).map((item) => ({
        variantId: item.variant.product.id, // Giả định dùng name là ID
        quantity: item.quantity,
      })),
      summary: {
        ...orderSummary,
        // Lấy thông tin chi tiết về coupon
        appliedCoupon: currentCoupon
          ? {
              id: currentCoupon.id,
              code: currentCoupon.code,
              discountType: currentCoupon.discountType,
              discountApplied: orderSummary.discountAmount,
            }
          : null,
      },
    };

    console.log("--- CHECKOUT DATA READY ---");
    console.log(checkoutData);
    placeOrder(
      {
        addressId: checkoutData.shippingAddressId,
        couponCode: checkoutData.summary.appliedCoupon?.code,
        items: checkoutData.orderItems,
        paymentMethod: checkoutData.paymentMethod,
        shippingMethod: checkoutData.shippingMethod,
        note: note,
      },
      {
        onSuccess: async (order) => {
          console.log(order);
          // order = response từ BE (phải có order.id)
          if (selectedPayment === "paypal") {
            try {
              const res = await createPaypal({
                orderId: order.id,
              });

              // 🚨 BẮT BUỘC redirect browser
              window.location.href = res.approveUrl;
            } catch (err: any) {
              toast.error("Cannot redirect to PayPal");
            }
            return;
          }

          // ✅ COD / BANK
          toast.success("Order placed successfully!");
          // router.push(`/orders/${order.id}`);
        },

        onError: (error: any) => {
          toast.error(error.message || "Checkout failed");
        },
      }
    );
  }, [
    selectedAddress,
    selectedShipping,
    selectedPayment,
    selectedCouponId,
    products,
    orderSummary,
    currentCoupon,
    note,
  ]);

  // Rendering Helpers
  const renderAddressContent = () => {
    if (!myAddresses) {
      return <p className="font-thin">Loading address...</p>;
    }
    if (myAddresses.length === 0) {
      return (
        <p className="font-thin text-[#FF4858]">
          Please add a shipping address.
        </p>
      );
    }
    if (selectedAddress) {
      const fullAddress = `${selectedAddress.detailAddress}, ${selectedAddress.commune}, ${selectedAddress.district}, ${selectedAddress.province}`;
      return (
        <p className="font-thin">
          <span className="font-medium">
            {selectedAddress.recipientName} ({selectedAddress.recipientPhone}){" "}
          </span>
          {fullAddress}
        </p>
      );
    }
    return <p className="font-thin">Please select a shipping address.</p>;
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        // Đã chuyển sang EN
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return "N/A";
    }
  };

  return (
    <div className="w-[1240px] mx-auto py-[50px]">
      {/* Shipping Address */}
      <div>
        <div className="flex gap-[10px]">
          <MapPinHouse />
          <p className="font-medium">Shipping Address</p>
        </div>
        <div className="flex justify-between items-end mt-[13px]">
          {renderAddressContent()}
          <AlertDialog>
            <AlertDialogTrigger disabled={!myAddresses}>
              <NormalButton>
                <p className="text-[14px] text-[#40BFFF]">
                  {myAddresses && myAddresses.length === 0
                    ? "Add New"
                    : "Change"}
                </p>
              </NormalButton>
            </AlertDialogTrigger>
            {myAddresses && (
              <AddressList
                selectedAddressId={selectedAddressId}
                onSelectAddress={handleSelectAddress}
                myAddresses={myAddresses}
              />
            )}
          </AlertDialog>
        </div>
        <div className="bg-[#FAFAFB] h-[2px] my-[18px]" />
      </div>

      {/* Shipping Method */}
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

      {/* Products */}
      <div className="mt-[30px]">
        <div className="flex gap-[10px]">
          <Box />
          <p className="font-medium">Products</p>
        </div>
        <div className="mt-[22px]">
          {products && products.length > 0 ? (
            products.map((item) => {
              return <ProductItem item={item} key={item.id} />;
            })
          ) : (
            <p className="text-gray-500 py-4">Your cart is empty.</p>
          )}
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
              <p className="text-sm text-gray-500 ml-2">
                {currentCoupon
                  ? `Applied: ${currentCoupon.code}`
                  : "No coupon applied"}
              </p>
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
                    availableCoupons={myCoupons?.data}
                  />
                </AlertDialog>
              </div>
            </div>
            <div className="mt-[22px] flex gap-[20px] flex-wrap">
              {myCoupons &&
                myCoupons.data.slice(0, 3).map((coupon) => {
                  const isSelected = selectedCouponId === coupon.id;
                  const isActive = coupon.status === "active";
                  const discountText =
                    coupon.discountType === "percentage"
                      ? `${coupon.discountValue}% off`
                      : coupon.discountType === "fixed_amount"
                      ? `Save $${Number(coupon.discountValue).toFixed(2)}`
                      : "Free Shipping";

                  const inactiveClasses = !isActive
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : "";

                  return (
                    <div
                      key={coupon.id}
                      onClick={() => isActive && handleCouponClick(coupon.id)} // Chỉ cho phép click nếu active
                      className={`
                                                relative
                                                rounded-[20px] 
                                                bg-[#F6F7F8] 
                                                flex 
                                                overflow-hidden 
                                                transition-all duration-200
                                                ${
                                                  isActive
                                                    ? "cursor-pointer"
                                                    : inactiveClasses
                                                }
                                                ${
                                                  isSelected && isActive
                                                    ? "border-[2px] border-[#40BFFF]"
                                                    : "border-[2px] border-transparent"
                                                }
                                            `}
                    >
                      <div className="bg-[#40BFFF] text-white text-[14px] font-bold flex items-center w-[50px] justify-center relative py-2">
                        <p className="-rotate-90 whitespace-nowrap absolute font-medium">
                          DISCOUNT
                        </p>
                      </div>
                      <div className="py-[9px] pl-[15px] w-[190px]">
                        <p className="text-[12px] text-[#FF4858] font-semibold">
                          {coupon.name || discountText}
                        </p>
                        <p className="font-semibold text-base">{coupon.code}</p>
                        <p className="text-[10px] font-light mt-[7px]">
                          Start date: {formatDate(coupon.startDate)}
                        </p>
                        <p className="text-[10px] font-light">
                          End date: {formatDate(coupon.endDate)}
                        </p>
                      </div>
                      {/* Tag Inactive/Expired cho hiển thị nhanh */}
                      {!isActive && (
                        <div className="absolute top-1 right-1">
                          <MyTag
                            value={
                              <p className="text-xs text-red-500">
                                {coupon.status === "expired"
                                  ? "Expired"
                                  : "Inactive"}
                              </p>
                            }
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              {!myCoupons && (
                <p className="text-gray-500">Loading coupons...</p>
              )}
              {myCoupons && myCoupons.data.length === 0 && (
                <p className="text-gray-500">You have no coupons available.</p>
              )}
            </div>
          </div>
          {/* End Coupons */}

          {/* Payment Method */}
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
                        <div className="text-[16px] font-semibold">
                          {option.name}
                          <p className="font-thin text-[14px] mt-[4px]">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <p className="ml-auto">Logo here</p>
                    </label>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          {/* End Payment Method */}
        </div>

        {/* Summary */}
        <div className="w-[286px]">
          <h3 className="font-medium text-lg mb-4">Order Summary</h3>
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>${orderSummary.subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mt-[17px]">
            <p>Shipping fee</p>
            <p>
              {orderSummary.shippingFee > 0
                ? `$${orderSummary.shippingFee.toFixed(2)}`
                : "Free"}
            </p>
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
          <NoteInput value={note} onChange={setNote} />
          <PlaceOrderButton onClick={handleCheckout} />
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 5. CÁC COMPONENT PHỤ (CẬP NHẬT TIẾNG ANH)
// ===============================================

interface ProductItemProps {
  item: CartItem;
}
const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { quantity } = item;
  const { product, imageUrl, variantAttributeValues } = item.variant;
  const name = product.name;
  const unitPrice =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;
  const itemTotal = unitPrice * quantity;

  const attributes = variantAttributeValues.map(
    (v) => v.attributeCategory.value
  );

  return (
    <div className="flex py-[20px] px-[30px] items-center border-b-[1px] border-[#F6F7F8] justify-between">
      <div className="flex items-center">
        <div className="flex gap-[17px] ">
          <Image
            height={94}
            width={138}
            alt={name}
            src={imageUrl}
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

interface PlaceOrderButtonProps {
  onClick: () => void;
}
const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({ onClick }) => {
  return (
    <div
      className="text-white cursor-pointer bg-[#40BFFF] rounded-[4px] py-[10px] w-full text-center duration-300 active:scale-90 mt-[16px]"
      onClick={onClick}
    >
      <p>Place Order</p>
    </div>
  );
};

const NoteInput = ({
  onChange,
  value,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <textarea
      onChange={(e) => onChange(e.target.value)}
      value={value}
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
      placeholder="Order Notes (Optional)"
    />
  );
};

export default Checkout;
