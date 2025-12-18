// app/admin/stocks/in/page.tsx
"use client";

import StockInForm from "@/app/admin/stocks/in/stock-in-form";

export default function StockInPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Stock In – By Product</h1>
      <StockInForm />
    </div>
  );
}
