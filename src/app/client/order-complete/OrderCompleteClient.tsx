"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle, ShoppingBag, Receipt, WifiOff, XCircle } from "lucide-react";
import { useMyOrderById } from "@/hooks/queries/useOrder";
import { useAutoRedirect } from "./hooks/useAutoRedirect";
import { OrderSuccessHeader } from "./components/OrderSuccessHeader";
import { OrderSummarySection } from "./components/OrderSummarySection";
import { ShippingInfoSection } from "./components/ShippingInfoSection";
import { PaymentInfoSection } from "./components/PaymentInfoSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderCompleteClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const {
    data: order,
    isLoading,
    error,
  } = useMyOrderById(Number(orderId));

  const { countdown } = useAutoRedirect("/client/my-account/orders", 10);

  // 1. Edge case: No order ID in URL
  if (!orderId) {
    return <OrderNotFoundUI router={router} />;
  }

  // 2. Loading state
  if (isLoading) {
    return (
      <div className="w-full md:w-[1240px] mx-auto py-6 md:py-8 px-4">
        <Skeleton className="h-32 rounded-xl mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Skeleton className="h-96 rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-12 w-64 mx-auto mt-8 rounded-lg" />
      </div>
    );
  }

  // 3. Error state
  if (error) {
    const isNetworkError =
      error.message.includes("network") ||
      error.message.includes("Failed to fetch");

    return (
      <div className="w-full md:w-[1240px] mx-auto py-16 px-4 text-center">
        {isNetworkError ? (
          <WifiOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        ) : (
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        )}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {isNetworkError ? "Connection Error" : "Unable to Load Order"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {isNetworkError
            ? "Unable to load order details. Please check your connection and try again."
            : "This order could not be found or you don't have permission to view it."}
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
          <Button onClick={() => router.push("/client/my-account/orders")}>
            <Receipt className="w-4 h-4 mr-2" />
            View My Orders
          </Button>
        </div>
      </div>
    );
  }

  if (!order) {
     return <OrderNotFoundUI router={router} />;
  }

  return (
    <div className="w-full md:w-[1240px] mx-auto py-6 md:py-8 px-4 md:px-0">
      <OrderSuccessHeader orderId={order.id} countdown={countdown} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-8">
        <OrderSummarySection order={order} />

        <div className="space-y-6">
          <ShippingInfoSection order={order} />
          <PaymentInfoSection order={order} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/client/home")}
          className="w-full sm:w-auto"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>

        <Button
          size="lg"
          onClick={() => router.push("/client/my-account/orders")}
          className="w-full sm:w-auto bg-[#40BFFF] hover:bg-[#33A0DD]"
        >
          <Receipt className="w-4 h-4 mr-2" />
          View My Orders
        </Button>
      </div>
    </div>
  );
}

function OrderNotFoundUI({ router }: { router: any }) {
  return (
    <div className="w-full md:w-[1240px] mx-auto py-16 px-4 text-center">
      <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Order Not Found
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        No order information available. Please check your orders page.
      </p>
      <Button onClick={() => router.push("/client/my-account/orders")}>
        <Receipt className="w-4 h-4 mr-2" />
        View My Orders
      </Button>
    </div>
  );
}