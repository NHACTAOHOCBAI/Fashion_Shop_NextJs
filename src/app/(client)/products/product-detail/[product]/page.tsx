"use client";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ICONS } from "@/constants/icon.enum";
import { useAddToCart } from "@/hooks/queries/useCart";
import { useGetProductById, useProducts } from "@/hooks/queries/useProduct";
import convertAttributeCategories from "@/lib/convertAttributeCategories";
import { formatMoney } from "@/lib/formatMoney";
import { use } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
    { original: "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1758528483/aykczmqebhswngvlk0pb.jpg", thumbnail: "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1758528483/aykczmqebhswngvlk0pb.jpg" },
    { original: "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1758528483/aykczmqebhswngvlk0pb.jpg", thumbnail: "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1758528483/aykczmqebhswngvlk0pb.jpg" },
    { original: "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1758528483/aykczmqebhswngvlk0pb.jpg", thumbnail: "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1758528483/aykczmqebhswngvlk0pb.jpg" },
    { original: "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1758528483/aykczmqebhswngvlk0pb.jpg", thumbnail: "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1758528483/aykczmqebhswngvlk0pb.jpg" }
]
export default function ProductDetail({
    params,
}: {
    params: Promise<{ product: string }>
}) {
    const { product } = use(params)
    const { data: productDetail } = useGetProductById(Number(product))
    const attributeCategories = productDetail?.variants.flatMap(
        v => v.variantAttributeValues.map(vav => vav.attributeCategory)
    );
    const options = convertAttributeCategories(attributeCategories || [])
    const { mutate: addToCart } = useAddToCart()
    const handleAddItemToCart = () => {

    }
    return (
        <>
            <div className="flex gap-[80px]">
                <div className="max-w-[500px]">
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        showNav={false}
                        showBullets={false}
                        thumbnailPosition="bottom"
                    />
                </div>
                <div className="flex-[10] ">
                    <div className="gap-[15px] flex flex-col">
                        <p className="text-text-secondary font-medium text-xl">{productDetail?.brand.name}</p>
                        <p className="font-bold text-4xl ">{productDetail?.name}</p>
                        <p>Introducing the Nike Alpha All-Purpose Gen Z, the latest evolution in athletic footwear designed to meet the dynamic needs of the modern generation. </p>
                        <div className="flex gap-[10px] items-center">
                            <p className="font-medium"><span className=" text-2xl">4K+</span> <span className="text-text-secondary text-[12px]">sold</span></p>
                            <div className="w-[1px] bg-text-secondary h-[20px]"></div>
                            <div className="font-medium flex items-end  gap-[5px]">
                                <div className="flex items-center text-2xl gap-[4px]" >{ICONS.STAR} <p> 4.8</p></div>
                                <span className="text-text-secondary text-[12px]">(156 reviews)</span>
                            </div>
                        </div>
                        <p className="font-medium text-2xl">{formatMoney(90)}</p>
                        {
                            options.map((field) =>
                                <div key={field.attributeName}>
                                    <p className="mb-[10px] font-bold">{field.attributeName}</p>
                                    <ToggleGroup type="single" >
                                        <div className="flex gap-[10px]">
                                            {field.values.map((value) => (
                                                <ToggleGroupItem
                                                    key={value.id}
                                                    value={value.value}
                                                    className="w-[60px] h-[36px] border rounded-md text-center
                     data-[state=on]:bg-black data-[state=on]:text-white"
                                                >
                                                    <p>{value.value}</p>
                                                </ToggleGroupItem>
                                            ))}
                                        </div>
                                    </ToggleGroup>
                                </div>
                            )
                        }
                        <Button
                            className="text-[20px] h-[40px] bg-app-primary"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <p>You might also like</p>

            </div>
        </>
    );
}
