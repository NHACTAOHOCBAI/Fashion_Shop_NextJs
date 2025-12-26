"use client";

import dynamic from "next/dynamic";
import Loading2 from "@/app/client/_components/Loading2";

// Import component chứa useSearchParams theo cách dynamic với ssr: false
const PaypalSuccessClient = dynamic(() => import("./PaypalSuccessClient"), {
  ssr: false,
  loading: () => <Loading2 />,
});

export default function PaypalSuccessWrapper() {
  return <PaypalSuccessClient />;
}
