"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Package } from "lucide-react";
import { getStockStatus } from "../_utils/productHelpers";
import { motion } from "framer-motion";
import { staggerContainer, staggerItemFast } from "@/lib/animations";

interface VariantCardGridProps {
  variants: Variant[];
}

type StockFilter = "all" | "in-stock" | "low-stock" | "out-of-stock";
type ViewMode = "grid" | "list";

export function VariantCardGrid({ variants }: VariantCardGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [viewMode] = useState<ViewMode>("grid");

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
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by color, size, fit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={stockFilter}
          onValueChange={(v) => setStockFilter(v as StockFilter)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Stock status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Status</SelectItem>
            <SelectItem value="in-stock">In Stock Only</SelectItem>
            <SelectItem value="low-stock">Low Stock Only</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredVariants.length} of {variants.length} variants
        </span>
      </div>

      {/* Grid */}
      {filteredVariants.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              No variants found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredVariants.map((variant) => {
            const status = getStockStatus(variant.remaining, variant.quantity);
            const sold = variant.quantity - variant.remaining;
            const stockPercentage = (variant.remaining / variant.quantity) * 100;

            return (
              <motion.div key={variant.id} variants={staggerItemFast}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={variant.imageUrl}
                      alt="Variant"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={status.variant} className="shadow-md">
                        {status.label}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    {/* Attributes */}
                    <div className="flex flex-wrap gap-1">
                      {variant.variantAttributeValues.map((v, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {v.attributeCategory.attribute.name}:{" "}
                          {v.attributeCategory.value}
                        </Badge>
                      ))}
                    </div>

                    {/* Stock Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Stock</span>
                        <span className="font-semibold">
                          {variant.remaining}/{variant.quantity}
                        </span>
                      </div>
                      <Progress value={stockPercentage} className="h-2" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Sold</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {sold}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Available</p>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {variant.remaining}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
