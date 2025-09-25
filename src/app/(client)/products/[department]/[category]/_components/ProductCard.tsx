import { ICONS } from "@/constants/icon.enum"
import { formatMoney } from "@/lib/formatMoney"
import Image from "next/image"

const ProductCard = ({ item }: { item: Product }) => {
    return (
        <div className="border-2 bg-blue-200 w-[280px] h-[320px] relative rounded-[10px] overflow-hidden flex flex-col cursor-pointer">
            {/* Icon yêu thích */}
            <div className="absolute right-4 top-4 z-50">
                {ICONS.UN_HEART}
            </div>

            {/* Ảnh sản phẩm */}
            <div className="relative w-full h-[200px] overflow-hidden">
                <Image
                    className="w-full h-full object-cover bg-amber-100 transition-transform duration-300 hover:scale-125"
                    alt={`${item.name} img`}
                    width={100}
                    height={100}
                    src={item.images[0].imageUrl}
                />
            </div>


            {/* Thông tin sản phẩm */}
            <div className="py-[10px] px-[14px] bg-white flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-[#6B6565] text-[13px]">{item.brand.name}</p>
                    <p className="line-clamp-2 break-words text-[15px]">
                        {item.name}
                    </p>
                </div>
                <p className="font-bold">{formatMoney(item.price)}</p>
            </div>

        </div>

    )
}
export default ProductCard