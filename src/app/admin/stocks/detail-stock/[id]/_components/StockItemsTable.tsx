"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Package } from "lucide-react";

interface StockItemsTableProps {
  items: Stock["items"];
  stockType: StockLogType;
}

export function StockItemsTable({ items, stockType }: StockItemsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;

    return items.filter((item) => {
      const productName = item.variant.product?.name?.toLowerCase() || "";
      const searchLower = searchTerm.toLowerCase();
      return productName.includes(searchLower);
    });
  }, [items, searchTerm]);

  const isStockIn = stockType === "IN";

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Stock Items ({filteredItems.length}/{items.length})
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Detailed list of variants in this stock log
            </p>
          </div>
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Current Stock</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-8"
                  >
                    {searchTerm ? "No items match your search" : "No items found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {item.variant.product?.name || "Unknown Product"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Variant ID: {item.variant.id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={isStockIn ? "default" : "destructive"}
                        className="font-semibold"
                      >
                        {isStockIn ? "+" : "-"}
                        {item.quantity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="font-medium">{item.variant.quantity}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="space-y-1">
                        <p className="font-medium">{item.variant.remaining}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round(
                            (item.variant.remaining / item.variant.quantity) * 100
                          )}
                          % available
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary Footer */}
        {filteredItems.length > 0 && (
          <div className="mt-4 p-4 rounded-lg bg-muted/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-sm font-medium">Total in this log:</p>
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Items: </span>
                  <span className="font-semibold">{filteredItems.length}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Quantity: </span>
                  <Badge
                    variant={isStockIn ? "default" : "destructive"}
                    className="font-semibold ml-1"
                  >
                    {isStockIn ? "+" : "-"}
                    {filteredItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
