"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";
import { staggerItem } from "@/lib/animations";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * EnhancedKpiCard - Enhanced KPI card with animations and trend indicators
 *
 * Improvements over basic KpiCard:
 * - Animated counter using useCountUp hook
 * - Optional trend indicators with up/down arrows
 * - Darker color palette (slate/indigo) for professional look
 * - Entrance animation with stagger effect
 * - Better visual hierarchy with improved spacing
 * - Larger, more prominent value display
 *
 * @example
 * <EnhancedKpiCard
 *   title="Revenue"
 *   value={1250}
 *   icon={<DollarSign size={24} />}
 *   color="from-slate-600 to-slate-700"
 *   prefix="$"
 *   trend={{ value: 12.5, isPositive: true }}
 *   index={0}
 * />
 */

interface EnhancedKpiCardProps {
  /** Card title */
  title: string;
  /** Numeric value to display (will be animated) */
  value?: number;
  /** Icon component to display */
  icon: React.ReactNode;
  /** Tailwind gradient color classes */
  color: string;
  /** Optional trend data */
  trend?: {
    value: number;
    isPositive: boolean;
  };
  /** Optional prefix for value (e.g., "$") */
  prefix?: string;
  /** Optional suffix for value (e.g., " items") */
  suffix?: string;
  /** Index for stagger animation */
  index: number;
  /** Whether this is a danger/warning indicator */
  danger?: boolean;
}

export function EnhancedKpiCard({
  title,
  value = 0,
  icon,
  color,
  trend,
  prefix = "",
  suffix = "",
  index,
  danger = false,
}: EnhancedKpiCardProps) {
  // Animated count from 0 to value
  const animatedValue = useCountUp(value, 1800);

  // Format the displayed value
  const formattedValue = `${prefix}${animatedValue.toLocaleString()}${suffix}`;

  return (
    <motion.div
      variants={staggerItem}
      custom={index}
      initial="hidden"
      animate="show"
    >
      <Card className="relative overflow-hidden border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
        {/* Background Gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-5",
            color
          )}
        />

        <CardContent className="relative p-5">
          <div className="flex items-start justify-between mb-3">
            {/* Icon */}
            <div
              className={cn(
                "rounded-xl p-3 shadow-sm bg-gradient-to-br",
                color
              )}
            >
              <div className="text-white">{icon}</div>
            </div>

            {/* Trend Indicator */}
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold",
                  trend.isPositive
                    ? "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>

          {/* Value */}
          <div className="space-y-1">
            <p
              className={cn(
                "text-3xl font-bold tracking-tight",
                danger
                  ? "text-red-600 dark:text-red-400"
                  : "text-slate-800 dark:text-slate-100"
              )}
            >
              {value === undefined ? "--" : formattedValue}
            </p>

            {/* Title */}
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {title}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
