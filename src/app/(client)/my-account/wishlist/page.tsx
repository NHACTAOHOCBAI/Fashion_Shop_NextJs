'use client'

import ProductCard from "@/app/(client)/_components/ProductCard"
import Content from "@/app/(client)/my-account/_components/Content"
import { useProducts } from "@/hooks/queries/useProduct"

const WishlistPage = () => {
    const { data: products } = useProducts({})

    return (
        <Content title="My Wishlist">
            <div>
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
        </Content>
    )
}

export default WishlistPage
