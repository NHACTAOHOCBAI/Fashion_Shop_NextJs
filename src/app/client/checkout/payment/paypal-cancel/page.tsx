"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaypalCancelPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: auto redirect sau vài giây
    const timer = setTimeout(() => {
      router.replace("/client/cart");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow">
        <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />

        <h1 className="text-xl font-semibold text-gray-900">
          Payment Cancelled
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          You have cancelled the PayPal payment. No money was charged.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={() => router.push("/cart")}>Back to Cart</Button>

          <Button variant="outline" onClick={() => router.push("/checkout")}>
            Try Again
          </Button>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          You will be redirected to the cart automatically.
        </p>
      </div>
    </div>
  );
}
