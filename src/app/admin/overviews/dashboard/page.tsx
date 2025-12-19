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

dayjs.extend(relativeTime);

/* ================= RANGE OPTIONS ================= */
const RANGES = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function DashboardPage() {
  const [range, setRange] = useState("7d");

  const { data: overview } = useDashboardOverview(range);
  const { data: revenue } = useDashboardRevenue(range);
  const { data: orderStatus } = useDashboardOrderStatus(range);
  const { data: topProducts } = useDashboardTopProducts(range);
  const { data: recentOrders } = useRecentOrders();

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of sales, orders and customers
          </p>
        </div>

        <div className="flex gap-2">
          {RANGES.map((r) => (
            <Button
              key={r.value}
              size="sm"
              variant={range === r.value ? "default" : "outline"}
              onClick={() => setRange(r.value)}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>

      {/* ================= KPI ================= */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <KpiCard
          title="Revenue"
          value={overview?.revenue}
          icon={<DollarSign />}
          color="from-blue-500 to-indigo-500"
        />
        <KpiCard
          title="Orders"
          value={overview?.totalOrders}
          icon={<ShoppingCart />}
          color="from-emerald-500 to-green-500"
        />
        <KpiCard
          title="Products Sold"
          value={overview?.productsSold}
          icon={<Package />}
          color="from-orange-500 to-amber-500"
        />
        <KpiCard
          title="New Customers"
          value={overview?.newCustomers}
          icon={<Users />}
          color="from-purple-500 to-fuchsia-500"
        />
        <KpiCard
          title="Low Stock"
          value={overview?.lowStockVariants}
          icon={<AlertTriangle />}
          color="from-red-500 to-rose-500"
          danger
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatus}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={100}
                  innerRadius={60}
                >
                  {orderStatus?.map((_: any, i: number) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
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

/* ================= SUB COMPONENT ================= */
function KpiCard({
  title,
  value,
  icon,
  color,
  danger,
}: {
  title: string;
  value?: number;
  icon: React.ReactNode;
  color: string;
  danger?: boolean;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`}
      />
      <CardContent className="relative flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className={`text-2xl font-bold ${danger ? "text-red-500" : ""}`}>
            {value ?? "--"}
          </p>
        </div>
        <div className="rounded-xl bg-background p-3 shadow">{icon}</div>
      </CardContent>
    </Card>
  );
}
