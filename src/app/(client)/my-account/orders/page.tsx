'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, XCircle } from "lucide-react"

const orders = [
    {
        id: "ORD-001",
        status: "Đang giao",
        statusIcon: <Truck className="h-4 w-4 text-blue-500" />,
        items: [
            {
                id: 1,
                name: "Áo thun cotton basic",
                image: "https://down-vn.img.susercontent.com/file/sg-11134201-22100-91gm3j6vshiv4d",
                price: 159000,
                quantity: 2,
            },
        ],
        total: 318000,
    },
    {
        id: "ORD-002",
        status: "Hoàn thành",
        statusIcon: <CheckCircle className="h-4 w-4 text-green-500" />,
        items: [
            {
                id: 2,
                name: "Giày sneaker trắng",
                image: "https://down-vn.img.susercontent.com/file/sg-11134201-22100-d22v31k19xiv4f",
                price: 499000,
                quantity: 1,
            },
        ],
        total: 499000,
    },
]

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            {/* Tabs filter */}
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex justify-start bg-gray-50 p-1 rounded-xl">
                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                    <TabsTrigger value="pending">Chờ thanh toán</TabsTrigger>
                    <TabsTrigger value="shipping">Đang giao</TabsTrigger>
                    <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
                    <TabsTrigger value="canceled">Đã hủy</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Orders */}
            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden border rounded-2xl shadow-sm hover:shadow-md transition">
                        <CardHeader className="flex flex-row justify-between items-center p-4 bg-gray-50">
                            <div className="text-sm font-medium text-gray-600">Mã đơn: {order.id}</div>
                            <div className="flex items-center gap-1 text-sm font-semibold">
                                {order.statusIcon}
                                <span>{order.status}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg object-cover border"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                                        <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700">
                                        {item.price.toLocaleString()}₫
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <Separator />
                        <CardFooter className="flex justify-between items-center p-4">
                            <div className="text-sm text-gray-600">
                                Tổng: <span className="font-semibold text-lg text-red-500">{order.total.toLocaleString()}₫</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">Liên hệ</Button>
                                <Button variant="default" size="sm">Mua lại</Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
