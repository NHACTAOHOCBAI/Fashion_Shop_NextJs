"use client";

import { useState } from "react";
import {
  useDashboardOverview,
  useDashboardRevenue,
  useDashboardOrderStatus,
  useDashboardTopProducts,
  useRecentOrders,
} from "@/hooks/queries/useDashboard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
} from "lucide-react";
import { EnhancedKpiCard } from "@/app/admin/overviews/dashboard/_components/EnhancedKpiCard";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

dayjs.extend(relativeTime);

/* ================= RANGE OPTIONS ================= */
const RANGES = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

const PIE_COLORS = ["#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4", "#64748b"];

export default function DashboardPage() {
  const [range, setRange] = useState("7d");

  const { data: overview } = useDashboardOverview(range);
  const { data: revenue } = useDashboardRevenue(range);
  const { data: orderStatus } = useDashboardOrderStatus(range);
  const { data: topProducts } = useDashboardTopProducts(range);
  const { data: recentOrders } = useRecentOrders();

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black rounded-xl p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-slate-300 mt-1">
              Overview of sales, orders and customers
            </p>
          </div>

          <div className="flex gap-2">
            {RANGES.map((r) => (
              <Button
                key={r.value}
                size="sm"
                variant={range === r.value ? "secondary" : "outline"}
                onClick={() => setRange(r.value)}
                className={
                  range === r.value
                    ? "bg-white text-slate-900 hover:bg-slate-100"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              >
                {r.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= KPI ================= */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <EnhancedKpiCard
          title="Revenue"
          value={overview?.revenue}
          icon={<DollarSign size={24} />}
          color="from-slate-600 to-slate-700"
          prefix="$"
          index={0}
        />
        <EnhancedKpiCard
          title="Orders"
          value={overview?.totalOrders}
          icon={<ShoppingCart size={24} />}
          color="from-indigo-600 to-indigo-700"
          index={1}
        />
        <EnhancedKpiCard
          title="Products Sold"
          value={overview?.productsSold}
          icon={<Package size={24} />}
          color="from-blue-600 to-blue-700"
          index={2}
        />
        <EnhancedKpiCard
          title="New Customers"
          value={overview?.newCustomers}
          icon={<Users size={24} />}
          color="from-violet-600 to-violet-700"
          index={3}
        />
        <EnhancedKpiCard
          title="Low Stock"
          value={overview?.lowStockVariants}
          icon={<AlertTriangle size={24} />}
          color="from-red-600 to-red-700"
          index={4}
          danger
        />
      </motion.div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue */}
        <Card className="lg:col-span-2 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-slate-100">
              Revenue Trend
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Daily revenue performance over selected period
            </p>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                  }}
                />
                <Line
                  dataKey="total"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                  fill="url(#colorRevenue)"
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-slate-100">
              Order Status
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Distribution of order statuses
            </p>
          </CardHeader>
          <CardContent className="h-[320px] flex flex-col">
            <ResponsiveContainer width="100%" height="75%">
              <PieChart>
                <Pie
                  data={orderStatus}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={85}
                  innerRadius={55}
                  animationBegin={200}
                  animationDuration={800}
                >
                  {orderStatus?.map((_: any, i: number) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
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
            <div className="grid grid-cols-2 gap-2 mt-2 px-2">
              {orderStatus?.slice(0, 4).map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= TOP PRODUCTS ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Selling Products</CardTitle>
            <p className="text-sm text-muted-foreground">
              Best performing products in selected range
            </p>
          </div>
          <Badge variant="outline">Top 10</Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {topProducts?.map((product: any, index: number) => (
            <div key={product.id} className="space-y-2">
              {/* Title row */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-muted-foreground font-medium">
                    #{index + 1}
                  </span>
                  <span className="font-medium">{product.name}</span>
                </div>
                <span className="font-semibold">{product.sold} sold</span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(product.sold / topProducts[0].sold) * 100}%`,
                    background:
                      index === 0
                        ? "#22c55e"
                        : index === 1
                        ? "#3b82f6"
                        : index === 2
                        ? "#f59e0b"
                        : "#94a3b8",
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ================= RECENT ORDERS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentOrders?.map((order: any) => (
            <div
              key={order.id}
              className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-center md:justify-between hover:bg-muted/50"
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.recipientName} • {order.district}, {order.province}
                </p>
                <p className="text-xs text-muted-foreground">
                  {dayjs(order.createdAt).fromNow()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="secondary">{order.status}</Badge>
                <p className="font-semibold text-primary">
                  {order.totalAmount.toLocaleString()}₫
                </p>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

