"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePaypal } from "@/hooks/queries/usePayment";

export default function PaypalSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token"); // PayPal orderId

  const { mutate: capturePaypal, isPending } = usePaypal();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid PayPal token");
      return;
    }
    capturePaypal(
      { token },
      {
        onSuccess: () => {
          toast.success("Payment successful!");
          router.replace("/orders");
        },
        onError: () => {
          toast.error("Payment failed!");
          router.replace("/client/cart");
        },
      }
    );
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen">
      {isPending ? "Processing payment..." : "Redirecting..."}
    </div>
  );
}
