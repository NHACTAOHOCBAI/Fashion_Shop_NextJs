'use client'

import { ArrowLeft, CheckCircle, Clock, MapPin, Package, Truck, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useMyOrderById } from "@/hooks/queries/useOrder"


export default function OrderDetailPage() {
    const { id } = useParams()
    const { data: order } = useMyOrderById(Number(id))
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="h-5 w-5 text-yellow-500" />
            case "shipping":
                return <Truck className="h-5 w-5 text-blue-500" />
            case "completed":
                return <CheckCircle className="h-5 w-5 text-green-500" />
            case "canceled":
                return <XCircle className="h-5 w-5 text-red-500" />
            default:
                return <Package className="h-5 w-5 text-gray-500" />
        }
    }
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
    const fullAddress = `${order?.detailAddress}, ${order?.commune}, ${order?.district}, ${order?.province}`

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => history.back()}
                        className="rounded-full"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-semibold">Order #{order?.id}</h1>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                    {getStatusIcon(order?.status || "")}
                    <span className="capitalize">{order?.status}</span>
                </div>
            </div>

            {/* Order info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Order Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <p><b>Order Date:</b> </p>
                    <p><b>Last Updated:</b></p>
                    {order?.note && <p><b>Note:</b> {order?.note}</p>}
                </CardContent>
            </Card>

            {/* Recipient info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Recipient Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <p><b>Name:</b> {order?.recipientName}</p>
                    <p><b>Phone:</b> {order?.recipientPhone}</p>
                    <p className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                        <span>{fullAddress}</span>
                    </p>
                </CardContent>
            </Card>

            {/* Items */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Ordered Items</CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                    {order?.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={item.variant.imageUrl}
                                    alt={item.variant.product.name}
                                    width={80}
                                    height={80}
                                    className="h-16 w-16 rounded-md object-cover border"
                                />
                                <div>
                                    <p className="font-medium">{item.variant.product.name}</p>
                                    {item.variant.variantAttributeValues.length > 0 && (
                                        <p className="text-xs text-gray-500">
                                            {item.variant.variantAttributeValues
                                                .map((v) => `${v.attributeCategory.attribute.name}: ${v.attributeCategory.value}`)
                                                .join(", ")}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-semibold">{item.price.toLocaleString()}₫</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{order?.totalAmount.toLocaleString()}₫</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-base font-semibold">
                        <span>Total</span>
                        <span className="text-red-500">{order?.totalAmount.toLocaleString()}₫</span>
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-2">
                {renderActionButtons(order?.status || "")}
            </div>
        </div>
    )
}
