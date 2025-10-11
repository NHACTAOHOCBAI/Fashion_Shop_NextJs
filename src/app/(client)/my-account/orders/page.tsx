'use client'

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react"
import { useMyOrders } from "@/hooks/queries/useOrder"
import Image from "next/image"
import dayjs from "dayjs"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useRouter } from "next/navigation"
import Content from "@/app/(client)/my-account/_components/Content"

export default function OrdersPage() {
    const [page, setPage] = useState<number>(1)
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const router = useRouter()
    // ✅ Gọi API với params phân trang + trạng thái
    const { data: myOrders } = useMyOrders({
        page,
        limit: 5,
        // status: statusFilter !== "all" ? statusFilter : undefined
    })

    // ✅ Icon cho từng trạng thái
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="h-4 w-4 text-yellow-500" />
            case "shipping":
                return <Truck className="h-4 w-4 text-blue-500" />
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case "canceled":
                return <XCircle className="h-4 w-4 text-red-500" />
            default:
                return <Package className="h-4 w-4 text-gray-500" />
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "pending":
                return "Pending Payment"
            case "shipping":
                return "Shipping"
            case "completed":
                return "Completed"
            case "canceled":
                return "Canceled"
            default:
                return "Unknown"
        }
    }

    const filteredOrders = myOrders?.data || []

    const totalPages = myOrders?.pagination
        ? Math.ceil(myOrders.pagination.total / myOrders.pagination.limit)
        : 1

    // ✅ Hàm xác định nút phù hợp theo trạng thái
    const renderActionButtons = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <>
                        <Button variant="outline" size="sm">Cancel Order</Button>
                    </>
                )
            case "shipping":
                return (
                    <>
                        <Button variant="outline" size="sm">Track Order</Button>
                        <Button variant="outline" size="sm">Contact Support</Button>
                    </>
                )
            case "completed":
                return (
                    <>
                        <Button variant="default" size="sm">Buy Again</Button>
                        <Button variant="outline" size="sm">Review</Button>
                    </>
                )
            case "canceled":
                return (
                    <Button variant="default" size="sm">Buy Again</Button>
                )
            default:
                return null
        }
    }

    return (
        <Content title="My Orders">
            <div className="space-y-2">

                {/* Tabs */}
                <Tabs defaultValue="all" className="w-full" onValueChange={(v) => {
                    setStatusFilter(v)
                    setPage(1)
                }}>
                    <TabsList className="flex justify-start bg-gray-50 p-1 rounded-xl overflow-x-auto">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="canceled">Canceled</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Orders list */}
                <div className="space-y-5">
                    {filteredOrders.length === 0 && (
                        <p className="text-gray-500 text-center mt-6">
                            No orders found.
                        </p>
                    )}

                    {filteredOrders.map((order) => (
                        <Card
                            key={order.id}
                            className="overflow-hidden border rounded-2xl shadow-sm hover:shadow-md transition"
                        >
                            {/* Header */}
                            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-4 bg-gray-50 border-b">
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Order #{order.id}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Ordered on {dayjs(order.createdAt).format("DD MMM YYYY, HH:mm")}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                    {getStatusIcon(order.status)}
                                    <span>{getStatusLabel(order.status)}</span>
                                </div>
                            </CardHeader>

                            {/* Items */}
                            <CardContent className="p-4 space-y-3">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 border-b pb-3 last:border-none">
                                        <Image
                                            width={80}
                                            height={80}
                                            src={item.variant.imageUrl}
                                            alt={item.variant?.product?.name || "Product"}
                                            className="w-20 h-20 rounded-lg object-cover border"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                                                {item.variant?.product?.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-700">
                                            {item.price.toLocaleString()}₫
                                        </div>
                                    </div>
                                ))}


                                {/* Recipient info */}
                                <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-800">Recipient:</span>{" "}
                                        {order.recipientName} ({order.recipientPhone})
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-800">Address:</span>{" "}
                                        {order.detailAddress}, {order.commune}, {order.district}, {order.province}
                                    </p>
                                    {order.note && (
                                        <p className="sm:col-span-2 text-gray-500 italic">
                                            “{order.note}”
                                        </p>
                                    )}
                                </div>
                            </CardContent>

                            {/* Footer */}
                            <CardFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 bg-gray-50 border-t">
                                <div className="text-sm text-gray-700">
                                    Total:{" "}
                                    <span className="font-bold text-lg text-red-500">
                                        {order.totalAmount.toLocaleString()}₫
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    {renderActionButtons(order.status)}
                                    <Button variant="outline" size="sm" onClick={(e) => {
                                        e.stopPropagation()
                                        router.push(`/my-account/orders/${order.id}`)
                                    }}>View Details</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination className="justify-center pt-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === i + 1}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </Content>
    )
}
