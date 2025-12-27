"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { getStockStatus } from "../_utils/productHelpers";

interface VariantsTableProps {
  variants: Variant[];
}

type StockFilter = "all" | "in-stock" | "low-stock" | "out-of-stock";

export function VariantsTable({ variants }: VariantsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");

  const filteredVariants = useMemo(() => {
    return variants.filter((variant) => {
      const attributeText = variant.variantAttributeValues
        .map((v) => v.attributeCategory.value.toLowerCase())
        .join(" ");
      const matchesSearch = attributeText.includes(searchTerm.toLowerCase());

      const status = getStockStatus(variant.remaining, variant.quantity);
      let matchesStock = true;

      if (stockFilter === "in-stock") matchesStock = status.label === "In Stock";
      if (stockFilter === "low-stock")
        matchesStock = status.label === "Low Stock";
      if (stockFilter === "out-of-stock")
        matchesStock = status.label === "Out of Stock";

      return matchesSearch && matchesStock;
    });
  }, [variants, searchTerm, stockFilter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Variants ({filteredVariants.length}/{variants.length})
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search variants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={stockFilter}
            onValueChange={(v) => setStockFilter(v as StockFilter)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Stock status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Attributes</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="text-right">Sold</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVariants.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    No variants found
                  </TableCell>
                </TableRow>
              ) : (
                filteredVariants.map((variant) => {
                  const status = getStockStatus(
                    variant.remaining,
                    variant.quantity
                  );
                  const sold = variant.quantity - variant.remaining;

                  return (
                    <TableRow key={variant.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Image
                          src={variant.imageUrl}
                          alt="Variant"
                          width={64}
                          height={64}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {variant.variantAttributeValues.map((v, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              {v.attributeCategory.attribute.name}:{" "}
                              {v.attributeCategory.value}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {variant.quantity}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {variant.remaining}
                      </TableCell>
                      <TableCell className="text-right font-medium text-muted-foreground">
                        {sold}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${status.dotColor}`}
                          />
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
