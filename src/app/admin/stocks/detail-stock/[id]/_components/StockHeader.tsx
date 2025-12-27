"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowDownToLine, ArrowUpFromLine, Calendar, User } from "lucide-react";
import Link from "next/link";
import { formatDateTimeWithAt } from "@/lib/formatDate";

interface StockHeaderProps {
  stock: Stock;
}

export function StockHeader({ stock }: StockHeaderProps) {
  const isStockIn = stock.type === "IN";

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/stocks/view-stocks">Stock Logs</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Stock #{stock.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Stock Log #{stock.id}
            </h1>
            <Badge
              variant={isStockIn ? "default" : "destructive"}
              className="gap-1.5 px-3 py-1"
            >
              {isStockIn ? (
                <ArrowDownToLine className="h-4 w-4" />
              ) : (
                <ArrowUpFromLine className="h-4 w-4" />
              )}
              {stock.type}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>
                {stock.createdBy?.fullName || stock.createdBy?.email || "System"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDateTimeWithAt(new Date(stock.createdAt))}</span>
            </div>
          </div>

          {stock.note && (
            <div className="mt-2 p-3 rounded-lg bg-muted">
              <p className="text-sm">
                <span className="font-semibold">Note: </span>
                {stock.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
