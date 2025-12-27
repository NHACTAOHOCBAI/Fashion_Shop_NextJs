"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { calculateProductStats } from "../_utils/productHelpers";
import { Package, TrendingDown, AlertCircle } from "lucide-react";

interface StockAnalyticsProps {
  product: Product;
}

const COLORS = {
  inStock: "#22c55e",
  lowStock: "#f59e0b",
  outOfStock: "#ef4444",
};

const PIE_COLORS = ["#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4", "#64748b"];

export function StockAnalytics({ product }: StockAnalyticsProps) {
  const stats = calculateProductStats(product);

  // Stock distribution data
  const stockDistribution = [
    {
      name: "In Stock",
      value: product.variants.filter(
        (v) => v.remaining > v.quantity * 0.2 && v.remaining > 0
      ).length,
      color: COLORS.inStock,
    },
    {
      name: "Low Stock",
      value: stats.lowStockCount,
      color: COLORS.lowStock,
    },
    {
      name: "Out of Stock",
      value: stats.outOfStockCount,
      color: COLORS.outOfStock,
    },
  ];

  // Top 5 variants by stock remaining
  const topVariants = [...product.variants]
    .sort((a, b) => b.remaining - a.remaining)
    .slice(0, 5)
    .map((v) => ({
      name: v.variantAttributeValues
        .map((attr) => attr.attributeCategory.value)
        .join(" / "),
      remaining: v.remaining,
      sold: v.quantity - v.remaining,
    }));

  // Bottom 5 variants (lowest stock)
  const lowStockVariants = [...product.variants]
    .filter((v) => v.remaining > 0)
    .sort((a, b) => a.remaining - b.remaining)
    .slice(0, 5)
    .map((v) => ({
      name: v.variantAttributeValues
        .map((attr) => attr.attributeCategory.value)
        .join(" / "),
      remaining: v.remaining,
      quantity: v.quantity,
      percentage: Math.round((v.remaining / v.quantity) * 100),
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stock Distribution Pie Chart */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Stock Distribution
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Variants grouped by stock status
          </p>
        </CardHeader>
        <CardContent className="h-[320px] flex flex-col">
          <ResponsiveContainer width="100%" height="75%">
            <PieChart>
              <Pie
                data={stockDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={60}
                animationBegin={200}
                animationDuration={800}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {stockDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Custom Legend */}
          <div className="flex justify-center gap-4 mt-4">
            {stockDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Stock Variants Bar Chart */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Top 5 Variants by Stock
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Variants with highest remaining stock
          </p>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topVariants} layout="vertical">
              <XAxis type="number" stroke="#94a3b8" style={{ fontSize: "12px" }} />
              <YAxis
                type="category"
                dataKey="name"
                width={100}
                stroke="#94a3b8"
                style={{ fontSize: "11px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
              <Bar
                dataKey="remaining"
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Low Stock Warning List */}
      <Card className="lg:col-span-2 border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/20">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Low Stock Alerts
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Variants that need restocking soon
          </p>
        </CardHeader>
        <CardContent>
          {lowStockVariants.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              All variants have sufficient stock
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockVariants.map((variant, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-900"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{variant.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {variant.remaining} of {variant.quantity} remaining
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${variant.percentage}%`,
                            backgroundColor:
                              variant.percentage < 10
                                ? COLORS.outOfStock
                                : variant.percentage < 20
                                ? COLORS.lowStock
                                : COLORS.inStock,
                          }}
                        />
                      </div>
                    </div>
                    <Badge
                      variant={
                        variant.percentage < 10 ? "destructive" : "secondary"
                      }
                    >
                      {variant.percentage}% left
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
