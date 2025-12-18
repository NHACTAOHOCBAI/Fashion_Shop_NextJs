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
dayjs.extend(relativeTime);

/* ================= RANGE OPTIONS ================= */
const RANGES = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

export default function DashboardPage() {
  const [range, setRange] = useState("7d");

  const { data: overview, isLoading: loadingOverview } =
    useDashboardOverview(range);
  const { data: revenue } = useDashboardRevenue(range);
  const { data: orderStatus } = useDashboardOrderStatus(range);
  const { data: topProducts } = useDashboardTopProducts(range);
  const { data: recentOrders } = useRecentOrders();

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

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
        <KpiCard title="Revenue" value={overview?.revenue} />
        <KpiCard title="Orders" value={overview?.totalOrders} />
        <KpiCard title="Products Sold" value={overview?.productsSold} />
        <KpiCard title="New Customers" value={overview?.newCustomers} />
        <KpiCard title="Low Stock" value={overview?.lowStockVariants} danger />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="total" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatus}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={100}
                >
                  {orderStatus?.map((_: any, i: any) => (
                    <Cell key={i} />
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
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="sold" />
            </BarChart>
          </ResponsiveContainer>
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
              className="flex items-center justify-between rounded-lg border p-3"
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
                <Badge variant="outline">{order.status}</Badge>
                <p className="font-semibold">
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
  danger,
}: {
  title: string;
  value?: number;
  danger?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className={`text-2xl font-bold ${danger ? "text-red-500" : ""}`}>
          {value ?? "--"}
        </p>
      </CardContent>
    </Card>
  );
}
