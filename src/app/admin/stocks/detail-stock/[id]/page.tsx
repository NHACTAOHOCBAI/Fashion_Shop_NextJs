"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetStockById } from "@/hooks/queries/useStock";
import { StockHeader } from "./_components/StockHeader";
import { StockSummaryCard } from "./_components/StockSummaryCard";
import { StockItemsTable } from "./_components/StockItemsTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function StockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const stockId = Number(params.id);

  const { data: stock, isLoading, isError, error } = useGetStockById(stockId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="text-lg text-muted-foreground">Loading stock details...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive font-medium mb-2">Error loading stock</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Stock not found"}
            </p>
          </CardContent>
        </Card>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/stocks/view-stocks")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stocks
        </Button>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="text-lg text-muted-foreground">No stock data found</div>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/stocks/view-stocks")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stocks
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <StockHeader stock={stock} />

      {/* Summary Cards */}
      <StockSummaryCard stock={stock} />

      {/* Items Table */}
      <StockItemsTable items={stock.items} stockType={stock.type} />
    </div>
  );
}
