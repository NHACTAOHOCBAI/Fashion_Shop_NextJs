import { Suspense } from "react";
import OrderCompleteClient from "./OrderCompleteClient";
import { Skeleton } from "@/components/ui/skeleton";

function OrderCompleteLoading() {
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

export default function Page() {
  return (
    <Suspense fallback={<OrderCompleteLoading />}>
      <OrderCompleteClient />
    </Suspense>
  );
}
