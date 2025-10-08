'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Truck, CreditCard, Wallet } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import { formatMoney } from "@/lib/formatMoney"
import { useMyAddress } from "@/hooks/queries/useAddress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { usePlaceOrder } from "@/hooks/queries/useOrder"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { formatDateTimeWithAt } from "@/lib/formatDate"

export default function CheckoutPage() {
    const router = useRouter()
    const [items, setItems] = useState<{ variant: Variant; quantity: number }[]>([])
    const { data: myAddress } = useMyAddress()
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

    const subtotal = items.reduce((sum, item) => sum + item.variant.product.price * item.quantity, 0)
    const shippingFee = 5
    const total = subtotal + shippingFee

    useEffect(() => {
        const data = localStorage.getItem("selectedItems")
        if (data) setItems(JSON.parse(data))
    }, [])

    // Khi load xong danh sách địa chỉ, mặc định chọn địa chỉ đầu tiên
    useEffect(() => {
        if (myAddress && myAddress.length > 0 && !selectedAddress) {
            setSelectedAddress(myAddress[0])
        }
    }, [myAddress, selectedAddress])
    const { mutate: placeOrder } = usePlaceOrder();
    const handlePlaceOrder = () => {
        if (items && selectedAddress)
            placeOrder({
                addressId: selectedAddress?.id || 0,
                items: items.map((item) => {
                    return {
                        variantId: item.variant.id,
                        quantity: item.quantity
                    }
                }),

            }, {
                onSuccess: () => {
                    router.push('/success')
                },
                onError: (error: Error) => {
                    toast.error(`Ohh!!! ${error.message}`, {
                        description: formatDateTimeWithAt(new Date()),
                    })
                },
            })
    }
    return (
        <div className="max-w-5xl mx-auto space-y-8 text-gray-800">
            {/* Shipping Address */}
            <Card className="rounded-2xl border border-gray-100 shadow-sm p-0">
                <CardHeader className="flex items-center justify-between p-5 bg-[#FFF9E8]">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <MapPin className="h-5 w-5 text-[#FFD470]" />
                        Shipping Address
                    </CardTitle>

                    {/* Mở modal chọn địa chỉ */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-[#FFD470] text-[#FFD470] hover:bg-[#FFD470] hover:text-white transition-colors"
                            >
                                Change
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-md rounded-2xl">
                            <DialogHeader>
                                <DialogTitle>Select another address</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 mt-3">
                                {myAddress?.map((addr) => (
                                    <div
                                        key={addr.id}
                                        onClick={() => setSelectedAddress(addr)}
                                        className={`p-3 border rounded-xl cursor-pointer hover:border-[#FFD470] transition ${selectedAddress?.id === addr.id ? "border-[#FFD470] bg-[#FFF9E8]" : "border-gray-200"
                                            }`}
                                    >
                                        <p className="font-medium">{addr.recipientName} | {addr.recipientPhone}</p>
                                        <p className="text-sm text-gray-600">{addr.detailAddress}, {addr.district}, {addr.province}</p>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent className="p-5 space-y-1">
                    {selectedAddress ? (
                        <>
                            <p className="font-medium">
                                {selectedAddress.recipientName} | {selectedAddress.recipientPhone}
                            </p>
                            <p className="text-sm text-gray-600">
                                {selectedAddress.detailAddress}, {selectedAddress.district}, {selectedAddress.province}
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-500 italic">No address selected</p>
                    )}
                </CardContent>
            </Card>

            {/* Product List */}
            <Card className="rounded-2xl border border-gray-100 shadow-sm p-0">
                <CardHeader className="p-5 bg-[#FFF9E8] rounded-t-2xl">
                    <CardTitle className="text-lg font-semibold">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    {items.map((item) => (
                        <div
                            key={item.variant.id}
                            className="flex items-center gap-[10px] p-5 transition-all hover:bg-gray-50 rounded-xl"
                        >
                            <Image
                                width={80}
                                height={80}
                                src={item.variant.imageUrl}
                                alt={item.variant.product.name}
                                className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                            />
                            <div className="flex-1 space-y-1">
                                <p className="font-medium">{item.variant.product.name}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-base font-semibold text-gray-700">
                                {formatMoney(item.variant.product.price * item.quantity)}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="rounded-2xl border border-gray-100 shadow-sm p-0">
                <CardHeader className="p-5 bg-[#FFF9E8] rounded-t-2xl">
                    <CardTitle className="text-lg font-semibold">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                    <RadioGroup defaultValue="cod" className="space-y-3">
                        <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-[#FFF9E8] transition">
                            <RadioGroupItem value="cod" id="cod" />
                            <Truck className="h-5 w-5" />
                            <span>Cash on Delivery (COD)</span>
                        </label>
                        <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-[#FFF9E8] transition">
                            <RadioGroupItem value="wallet" id="wallet" />
                            <Wallet className="h-5 w-5" />
                            <span>E-Wallet</span>
                        </label>
                        <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-[#FFF9E8] transition">
                            <RadioGroupItem value="card" id="card" />
                            <CreditCard className="h-5 w-5" />
                            <span>Credit / Debit Card</span>
                        </label>
                    </RadioGroup>
                </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="rounded-2xl border border-gray-100 shadow-md">
                <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>{formatMoney(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping Fee</span>
                        <span>{formatMoney(shippingFee)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span className="text-red-500">{formatMoney(total)}</span>
                    </div>
                    <Button
                        className="text-[18px] h-[40px] bg-[#FFD470] hover:bg-[#eac45e] text-white w-full transition-all duration-300"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
