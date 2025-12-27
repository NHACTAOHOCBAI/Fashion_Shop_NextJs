"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { getStockStatus } from "../_utils/productHelpers";
import { Plus, Minus, Package2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface VariantStockManagerProps {
  variants: Variant[];
}

export function VariantStockManager({ variants }: VariantStockManagerProps) {
  const [stockAdjustments, setStockAdjustments] = useState<
    Record<number, number>
  >({});

  const handleAdjustment = (variantId: number, change: number) => {
    setStockAdjustments((prev) => ({
      ...prev,
      [variantId]: (prev[variantId] || 0) + change,
    }));
  };

  const handleApplyAdjustment = (variantId: number) => {
    const adjustment = stockAdjustments[variantId] || 0;
    if (adjustment === 0) {
      toast.error("No adjustment to apply");
      return;
    }

    // TODO: Integrate with backend API
    toast.success(
      `Stock ${adjustment > 0 ? "increased" : "decreased"} by ${Math.abs(
        adjustment
      )} units`,
      {
        description: new Date().toLocaleString(),
      }
    );

    // Reset adjustment
    setStockAdjustments((prev) => ({
      ...prev,
      [variantId]: 0,
    }));
  };

  const handleResetAdjustment = (variantId: number) => {
    setStockAdjustments((prev) => ({
      ...prev,
      [variantId]: 0,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package2 className="h-5 w-5" />
          Stock Management
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Adjust stock levels for each variant
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead className="text-center">Stock Level</TableHead>
                <TableHead className="text-right">Current</TableHead>
                <TableHead className="text-center">Adjustment</TableHead>
                <TableHead className="text-right">New Stock</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant) => {
                const status = getStockStatus(variant.remaining, variant.quantity);
                const adjustment = stockAdjustments[variant.id] || 0;
                const newStock = variant.remaining + adjustment;
                const stockPercentage =
                  (variant.remaining / variant.quantity) * 100;

                return (
                  <TableRow key={variant.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Image
                        src={variant.imageUrl}
                        alt="Variant"
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex flex-wrap gap-1">
                          {variant.variantAttributeValues.map((v, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {v.attributeCategory.value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 min-w-[120px]">
                        <Progress value={stockPercentage} className="h-2" />
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${status.dotColor}`}
                          />
                          <Badge variant={status.variant} className="text-xs">
                            {status.label}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="space-y-1">
                        <p className="font-semibold text-lg">
                          {variant.remaining}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          / {variant.quantity}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleAdjustment(variant.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={adjustment}
                          onChange={(e) =>
                            setStockAdjustments((prev) => ({
                              ...prev,
                              [variant.id]: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-20 text-center"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleAdjustment(variant.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: adjustment !== 0 ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <p
                          className={`font-bold text-lg ${
                            adjustment > 0
                              ? "text-green-600 dark:text-green-400"
                              : adjustment < 0
                              ? "text-red-600 dark:text-red-400"
                              : ""
                          }`}
                        >
                          {newStock}
                        </p>
                        {adjustment !== 0 && (
                          <p className="text-xs text-muted-foreground">
                            ({adjustment > 0 ? "+" : ""}
                            {adjustment})
                          </p>
                        )}
                      </motion.div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="default"
                          size="sm"
                          disabled={adjustment === 0}
                          onClick={() => handleApplyAdjustment(variant.id)}
                        >
                          Apply
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={adjustment === 0}
                          onClick={() => handleResetAdjustment(variant.id)}
                        >
                          Reset
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Quick Stats Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Package2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Stock</p>
                  <p className="text-2xl font-bold">
                    {variants.reduce((sum, v) => sum + v.remaining, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold">
                    {
                      variants.filter(
                        (v) =>
                          v.remaining < v.quantity * 0.2 && v.remaining > 0
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold">
                    {variants.filter((v) => v.remaining === 0).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
