'use client'

import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icon.enum"
import { useMyAddress } from "@/hooks/queries/useAddress"
import { Star } from "lucide-react"

const Addressess = () => {
    // const { data: myAddress } = useMyAddress()
    const myAddress: Address[] = [
        {
            id: 1,
            detailAddress: "123 Nguyễn Văn Cừ, Phường 2",
            recipientName: "Nguyễn Đăng Phúc",
            recipientPhone: "0905123456",
            province: "Đà Nẵng",
            district: "Quận Hải Châu",
            commune: "Phường Bình Hiên",
            type: "home",
            isDefault: true,
            userId: 1,
        },
        {
            id: 2,
            detailAddress: "45 Lê Lợi, Tầng 5, Tòa nhà ABC",
            recipientName: "Trần Thị Minh Anh",
            recipientPhone: "0987654321",
            province: "Hà Nội",
            district: "Quận Hoàn Kiếm",
            commune: "Phường Hàng Bài",
            type: "office",
            isDefault: false,
            userId: 2,
        },
        {
            id: 3,
            detailAddress: "67 Nguyễn Văn Linh, Căn hộ 12A",
            recipientName: "Lê Quốc Huy",
            recipientPhone: "0912345678",
            province: "Đà Nẵng",
            district: "Quận Thanh Khê",
            commune: "Phường Thạc Gián",
            type: "home",
            isDefault: false,
            userId: 3,
        },
        {
            id: 4,
            detailAddress: "22 Trần Phú, Tòa nhà Sun Tower",
            recipientName: "Phạm Thu Trang",
            recipientPhone: "0977888999",
            province: "TP. Hồ Chí Minh",
            district: "Quận 1",
            commune: "Phường Bến Nghé",
            type: "office",
            isDefault: true,
            userId: 4,
        },
        {
            id: 5,
            detailAddress: "12 Nguyễn Huệ, Nhà số 5",
            recipientName: "Đỗ Văn Nam",
            recipientPhone: "0909777666",
            province: "Huế",
            district: "TP. Huế",
            commune: "Phường Phú Hội",
            type: "home",
            isDefault: false,
            userId: 5,
        },
    ];

    return (
        <div className="space-y-5">
            <Button className="ml-[20px]">New address</Button>
            {myAddress?.map((address: Address) => (
                <div
                    key={address.id}
                    className="flex justify-between items-start border rounded-2xl p-5 shadow-sm bg-white hover:shadow-lg transition-all duration-200"
                >
                    {/* Nội dung địa chỉ */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            {address.type === "home" ? (
                                <span className="text-blue-500">{ICONS.HOME}</span>
                            ) : (
                                <span className="text-green-500">{ICONS.OFFICE}</span>
                            )}
                            <p className="font-semibold text-gray-800">{address.recipientName}</p>
                            {address.isDefault && (
                                <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700 font-medium">
                                    <Star size={14} className="mr-1 text-yellow-500" />
                                    Default
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-700">{address.recipientPhone}</p>
                        <p className="text-sm text-gray-500">{address.detailAddress}</p>
                        <p className="text-sm text-gray-500">
                            {address.commune}, {address.district}, {address.province}
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                        <button
                            className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition"
                            title="Edit"
                        >
                            {ICONS.EDIT}
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-red-50 text-red-600 transition"
                            title="Delete"
                        >
                            {ICONS.DELETE}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Addressess
