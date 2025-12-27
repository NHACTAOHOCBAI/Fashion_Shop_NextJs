"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Layers, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface StockSummaryCardProps {
  stock: Stock;
}

export function StockSummaryCard({ stock }: StockSummaryCardProps) {
  const totalQuantity = stock.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalVariants = stock.items.length;
  const uniqueProducts = new Set(
    stock.items.map((item) => item.variant.product?.id)
  ).size;

  const isStockIn = stock.type === "IN";

  const cards = [
    {
      title: "Total Items",
      value: totalVariants,
      icon: Layers,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Total Quantity",
      value: totalQuantity,
      icon: Package,
      color: isStockIn
        ? "text-green-600 dark:text-green-400"
        : "text-red-600 dark:text-red-400",
      bgColor: isStockIn
        ? "bg-green-50 dark:bg-green-950/30"
        : "bg-red-50 dark:bg-red-950/30",
    },
    {
      title: "Products Affected",
      value: uniqueProducts,
      icon: isStockIn ? TrendingUp : TrendingDown,
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {cards.map((card) => (
        <motion.div key={card.title} variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {card.value.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
