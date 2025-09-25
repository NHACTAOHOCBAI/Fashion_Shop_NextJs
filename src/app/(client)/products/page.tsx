'use client'
import Image from "next/image"

const Products = () => {
    return (
        <div className="bg-blue-100 ">
            <h2>Clothes</h2>
            <div className="flex">
                <div className="bg-green-100 w-[200px] h-[1000px]">

                </div>
                <div className="flex gap-[10px]">
                    <ProductCard />
                </div>
            </div>
        </div>
    )
}
const ProductCard = () => {
    return (
        <div>
            <Image
                className="w-[150px] h-[150px]"
                alt="shoes" width={100} height={100} src={"a"} />
            <p>Adidas</p>
            <p>VS Pace Mens Trainers</p>
            <p>$120.00</p>
        </div>
    )
}
export default Products