'use client'

import ProductCard from "@/app/(client)/_components/ProductCard"
import { useProducts } from "@/hooks/queries/useProduct"

const WishlistPage = () => {
    const { data: products } = useProducts({})

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            {(!products || products.data.length === 0) && (
                <div className="text-gray-500 text-center py-10">
                    <p>Your wishlist is empty 💔</p>
                </div>
            )}

            <div className="grid grid-cols-3  gap-y-[10px] px-[10px]">
                {products?.data.map((product) =>
                    <ProductCard key={product.id} item={product} />
                )}
            </div>
        </div>
    )
}

export default WishlistPage
