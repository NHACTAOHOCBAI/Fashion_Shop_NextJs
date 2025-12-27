// app/admin/stocks/page.tsx
"use client";
import { stockColumns } from "@/app/admin/stocks/view-stocks/stock-column";
import CrudTable from "@/components/crud_table/crud-table";
import { Button } from "@/components/ui/button";
import { useStocks } from "@/hooks/queries/useStock";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Stocks() {
  const router = useRouter();
  return (
    <>
      <CrudTable<Stock>
        columns={stockColumns()} // hoặc columns chỉ để view, KHÔNG ACTION
        useQuery={useStocks}
        filterPlaceholder="Filter stock..."
      >
        <Button
          onClick={() => router.replace("/admin/stocks/in")}
          variant="outline"
          size="sm"
          className="h-8 ml-2"
        >
          <Plus />
          Add Stock
        </Button>
      </CrudTable>
    </>
  );
}
