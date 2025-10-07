'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Truck, CreditCard, Wallet } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const cartItems = [
    {
        id: 1,
        name: "Áo sơ mi caro form rộng",
        image: "https://down-vn.img.susercontent.com/file/sg-11134201-22100-91gm3j6vshiv4d",
        price: 220000,
        quantity: 1,
    },
    {
        id: 2,
        name: "Quần jean nam slim fit",
        image: "https://down-vn.img.susercontent.com/file/sg-11134201-22100-d22v31k19xiv4f",
        price: 390000,
        quantity: 2,
    },
]

export default function CheckoutPage() {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shippingFee = 30000
    const total = subtotal + shippingFee

    return (
        <div className="space-y-6 max-w-5xl mx-auto py-6">
            {/* Địa chỉ nhận hàng */}
            <Card className="rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-t-2xl">
                    <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        Địa chỉ nhận hàng
                    </CardTitle>
                    <Button variant="outline" size="sm">Thay đổi</Button>
                </CardHeader>
                <CardContent className="p-4">
                    <p className="font-medium">Nguyễn Văn A | 0909123456</p>
                    <p className="text-sm text-gray-600">123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</p>
                </CardContent>
            </Card>

            {/* Sản phẩm */}
            <Card className="rounded-2xl shadow-sm">
                <CardHeader className="p-4 bg-gray-50 rounded-t-2xl">
                    <CardTitle className="text-gray-800 text-lg">Sản phẩm</CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border" />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-semibold text-gray-700">
                                {(item.price * item.quantity).toLocaleString()}₫
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Phương thức thanh toán */}
            <Card className="rounded-2xl shadow-sm">
                <CardHeader className="p-4 bg-gray-50 rounded-t-2xl">
                    <CardTitle className="text-gray-800 text-lg">Phương thức thanh toán</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <RadioGroup defaultValue="cod" className="space-y-3">
                        <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="cod" id="cod" />
                            <Truck className="h-4 w-4 text-gray-600" />
                            <span>Thanh toán khi nhận hàng (COD)</span>
                        </label>
                        <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="wallet" id="wallet" />
                            <Wallet className="h-4 w-4 text-gray-600" />
                            <span>Ví điện tử</span>
                        </label>
                        <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="card" id="card" />
                            <CreditCard className="h-4 w-4 text-gray-600" />
                            <span>Thẻ tín dụng/ghi nợ</span>
                        </label>
                    </RadioGroup>
                </CardContent>
            </Card>

            {/* Tổng kết */}
            <Card className="rounded-2xl shadow-md">
                <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Tạm tính</span>
                        <span>{subtotal.toLocaleString()}₫</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Phí vận chuyển</span>
                        <span>{shippingFee.toLocaleString()}₫</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold text-gray-800">
                        <span>Tổng cộng</span>
                        <span className="text-red-500">{total.toLocaleString()}₫</span>
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-lg mt-4">
                        Đặt hàng
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
