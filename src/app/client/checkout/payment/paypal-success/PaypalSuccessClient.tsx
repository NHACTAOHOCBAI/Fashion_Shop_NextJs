"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePaypal } from "@/hooks/queries/usePayment";
import Loading2 from "@/app/client/_components/Loading2";

export default function PaypalSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [isMounted, setIsMounted] = useState(false);

  const { mutate: capturePaypal, isPending } = usePaypal();

  // Đảm bảo component chỉ thực thi logic sau khi đã mount vào DOM (Client-side)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !token) return;

    capturePaypal(
      { token },
      {
        onSuccess: () => {
          const orderId = sessionStorage.getItem("pendingOrderId");
          sessionStorage.removeItem("pendingOrderId");

          toast.success("Payment successful!");

          if (orderId) {
            router.replace(`/client/order-complete?orderId=${orderId}`);
          } else {
            router.replace("/client/my-account/orders");
          }
        },
        onError: () => {
          toast.error("Payment failed!");
          router.replace("/client/cart");
        },
      }
    );
  }, [token, isMounted, capturePaypal, router]);

  // Nếu chưa mount hoặc đang xử lý api thì hiện Loading
  if (!isMounted || isPending) return <Loading2 />;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="mb-2">Processing your payment...</p>
        <Loading2 />
      </div>
    </div>
  );
}
