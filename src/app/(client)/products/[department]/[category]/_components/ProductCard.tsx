import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icon.enum"
import { useToggleWishlistItem } from "@/hooks/queries/useWishlist"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { formatMoney } from "@/lib/formatMoney"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

const ProductCard = ({ item }: { item: Product }) => {
    const { mutate: toggleWishlistItem } = useToggleWishlistItem()
    const handleToggleWishlistItem = () => {
        toggleWishlistItem({ productId: item.id }, {
            onSuccess: () => {
                toast.success("You have added this item to your wishlists", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
        })
    }
    return (
        <Link href={`/products/product-detail/${item.id}`} className="group  hover:drop-shadow-xl duration-300  w-[240px] h-[320px] relative rounded-[10px] overflow-hidden flex flex-col cursor-pointer">
            {/* Icon yêu thích */}
            <div
                onClick={handleToggleWishlistItem}
                className="absolute right-4 top-4 z-50
        opacity-0 group-hover:opacity-100
        -translate-y-2 group-hover:translate-y-0
        transition-all duration-300
        active:scale-90 hover:scale-110 cursor-pointer"
            >
                {ICONS.UN_HEART}
            </div>



            {/* Ảnh sản phẩm */}
            <div className="relative w-full h-[200px] overflow-hidden">
                <Image
                    className="w-full h-full object-cover bg-amber-100 transition-transform duration-300 hover:scale-125"
                    alt={`${item.name} img`}
                    width={200}
                    height={200}
                    src={"https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"}
                />
            </div>


            {/* Thông tin sản phẩm */}
            <div className="py-[10px] px-[14px] bg-white flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-[#6B6565] text-[13px]">{item.brand.name}</p>
                    <p className="line-clamp-1 break-words text-[16px]">
                        {item.name}
                    </p>
                    <p className="font-medium">{formatMoney(item.price)}</p>
                </div>
                <Button
                    className="text-[13px] h-[30px] bg-app-primary
             opacity-0 group-hover:opacity-100
             translate-y-2 group-hover:translate-y-0
             transition-all duration-300"
                >
                    Add to Cart
                </Button>

            </div>

        </Link>

    )
}
export default ProductCard