"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetOrderById } from "@/hooks/queries/useOrder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Loader2,
  User,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Tag,
  Calendar,
  Package,
} from "lucide-react";
import { formatMoney } from "@/lib/formatMoney";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    shipped:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    delivered:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    returned: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };
  return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.id);
  const { data: order, isLoading, isError, error } = useGetOrderById(orderId);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="text-lg text-muted-foreground">Loading order...</div>
      </div>
    );

  if (isError || !order)
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive font-medium">Error loading order</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Order not found"}
            </p>
          </CardContent>
        </Card>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/orders/view-orders")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Button>
      </div>
    );

  const subtotal = order.items.reduce(
    (sum: number, item: any) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/orders/view-orders">Orders</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Order #{order.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h6 className="text-3xl font-bold">Order #{order.id}</h6>
            <Badge className={getStatusColor(order.status)}>
              {order.status.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDateTimeWithAt(new Date(order.createdAt))}</span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{order.recipientName}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{order.recipientPhone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">{order.detailAddress}</p>
            <p className="text-sm text-muted-foreground">
              {order.commune}, {order.district}
            </p>
            <p className="text-sm text-muted-foreground">{order.province}</p>
          </CardContent>
        </Card>

        {/* Payment & Shipping */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment & Shipping
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium uppercase">
                {order.paymentMethod || "COD"}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Shipping Method</p>
              <p className="font-medium uppercase">{order.shippingMethod}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Order Items ({order.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.variant?.imageUrl || "/placeholder.png"}
                        alt="Product"
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {item.variant?.product?.name || "Unknown"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.variant?.variantAttributeValues?.map(
                            (v: any, idx: number) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {v.attributeCategory?.value}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatMoney(Number(item.price))}
                    </TableCell>
                    <TableCell className="text-right">
                      ×{item.quantity}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatMoney(Number(item.price) * item.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping Fee</span>
              <span>{formatMoney(Number(order.shippingFee || 0))}</span>
            </div>
            {order.discountAmount ||
              (0 > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>
                    Discount {order.couponCode && `(${order.couponCode})`}
                  </span>
                  <span>-{formatMoney(Number(order.discountAmount || 0))}</span>
                </div>
              ))}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">
                {formatMoney(Number(order.totalAmount))}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {order.note && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Order Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{order.note}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
