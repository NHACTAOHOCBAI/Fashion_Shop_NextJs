"use client";

import { use, useState, useMemo } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetProductById, useProducts } from "@/hooks/queries/useProduct";
import convertAttributeCategories from "@/lib/convertAttributeCategories";
import { formatMoney } from "@/lib/formatMoney";
import { useAddToCart } from "@/hooks/queries/useCart";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { StarRating } from "@/components/rating/Rating";
import convertAlias from "@/lib/convertAlias";
import ProductCard from "@/app/(client)/_components/ProductCard";
import { ICONS } from "@/constants/icon.enum";

export default function ProductDetail({
    params,
}: {
    params: Promise<{ product: string }>;
}) {
    const { data: products } = useProducts({})
    // ===== Data =====
    const { product } = use(params);
    const { data: productDetail } = useGetProductById(Number(product));
    const { mutate: addItemToCart } = useAddToCart()
    // ===== State =====
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

    // ===== Derived data =====
    const options = useMemo(() => {
        if (!productDetail) return [];
        return convertAttributeCategories(
            productDetail.variants.flatMap((v) =>
                v.variantAttributeValues.map((vav) => vav.attributeCategory)
            )
        );
    }, [productDetail]);

    const images = useMemo(() => getAllImageUrls(productDetail), [productDetail]);

    const selectedVariant = useMemo(() => {
        if (!productDetail) return undefined;
        if (Object.keys(selectedAttributes).length !== options.length) return undefined;
        return productDetail.variants.find((variant) =>
            variant.variantAttributeValues.every((vav) => {
                const name = vav.attributeCategory.attribute.name;
                const value = vav.attributeCategory.value;
                return selectedAttributes[name] === value;
            })
        );
    }, [productDetail, selectedAttributes, options]);

    if (!productDetail) return <p>Loading...</p>;

    // ===== Handlers =====
    function handleSelect(attributeName: string, value: string) {
        setSelectedAttributes((prev) => {
            const current = prev[attributeName];
            // cho phép bỏ chọn (click lại value cũ)
            if (current === value) {
                const { [attributeName]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [attributeName]: value };
        });
    }

    function getAvailableVariants(ignoreAttr?: string) {
        return productDetail?.variants.filter((variant) =>
            variant.variantAttributeValues.every((vav) => {
                const name = vav.attributeCategory.attribute.name;
                if (name === ignoreAttr) return true;
                const selected = selectedAttributes[name];
                return !selected || vav.attributeCategory.value === selected;
            })
        );
    }

    function getEnabledValues(attributeName: string) {
        const filtered = getAvailableVariants(attributeName);
        return new Set(
            filtered?.flatMap((v) =>
                v.variantAttributeValues
                    .filter((vav) => vav.attributeCategory.attribute.name === attributeName)
                    .map((vav) => vav.attributeCategory.value)
            )
        );
    }

    const handleAddItemToCart = () => {
        if (!selectedVariant)
            return;
        addItemToCart({
            quantity: 1,
            variantId: selectedVariant.id
        }, {
            onSuccess: () => {
                console.log("thanh congf")
                toast.success(`Add ${productDetail.name}`);
            },
            onError: (err) => {
                toast.error(`Ohh!!! ${err.message}`);
            },
        })
    }
    // ===== Render =====
    return (
        <>
            <div className="flex gap-[80px]">
                {/* === Left: Image Gallery === */}
                <div className="w-[500px]">
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        showNav={false}
                        showBullets={false}
                        thumbnailPosition="bottom"
                    />
                </div>

                {/* === Right: Product Info === */}
                <div className="flex-1 relative">
                    <div className="absolute top-0 right-0 p-2 rounded-full cursor-pointer">
                        {ICONS.HEART}
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-text-secondary font-medium text-xl">
                            {productDetail.brand.name}
                        </p>
                        <p className="font-bold text-4xl">{productDetail.name}</p>
                        <p>
                            These sport shoes are designed for comfort, performance, and style. With lightweight cushioning and breathable materials, they keep your feet cool and supported during any activity. Perfect for running, training, or everyday wear.
                        </p>
                        <div className="flex gap-[10px]">
                            <p>Sold: 100</p>
                            <div className="w-[2px] bg-accent-foreground"></div>
                            <p>Stock: 200</p>
                        </div>
                        <p className="font-medium text-2xl">
                            {formatMoney(Number(productDetail.price))}
                        </p>

                        {/* === Attribute Groups === */}
                        {options.map((field) => {
                            const enabledValues = getEnabledValues(field.attributeName);
                            return (
                                <div key={field.attributeName}>
                                    <p className="mb-[10px] font-bold">{field.attributeName}</p>
                                    <ToggleGroup type="single">
                                        <div className="flex gap-[10px] flex-wrap">
                                            {field.values.map((value) => {
                                                const isDisabled = !enabledValues.has(value.value);
                                                const isActive =
                                                    selectedAttributes[field.attributeName] === value.value;
                                                return (
                                                    <ToggleGroupItem
                                                        key={value.id}
                                                        value={value.value}
                                                        disabled={isDisabled}
                                                        data-state={isActive ? "on" : "off"}
                                                        onClick={() =>
                                                            handleSelect(field.attributeName, value.value)
                                                        }
                                                        className="w-[60px] h-[36px] border rounded-md text-center
                                                        data-[state=on]:bg-black data-[state=on]:text-white
                                                        disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        <p>{value.value}</p>
                                                    </ToggleGroupItem>
                                                );
                                            })}
                                        </div>
                                    </ToggleGroup>
                                </div>
                            );
                        })}

                        {/* === Add to Cart === */}
                        <Button
                            className="text-[20px] h-[40px] bg-app-primary mt-4"
                            disabled={!selectedVariant}
                            onClick={handleAddItemToCart}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
            <ProductReviews />
            <div>
                <h3 className="text-3xl font-bold leading-none mt-[10px]">RELATED PRODUCTS</h3>
                <div className="grid grid-cols-4  gap-y-[10px] mt-[40px]">
                    {products?.data.map((product) =>
                        <ProductCard key={product.id} item={product} />
                    )}
                </div>
            </div>
        </>
    );
}

// ===== Helpers =====
function getAllImageUrls(product: Product | undefined) {
    if (!product) return [];
    return [
        ...product.images.map((img) => ({
            original: img.imageUrl,
            thumbnail: img.imageUrl,
        })),
        ...product.variants
            .filter((v) => v.imageUrl)
            .map((v) => ({
                original: v.imageUrl,
                thumbnail: v.imageUrl,
            })),
    ];
}
function ProductReviews() {
    const reviews = [
        {
            name: "Peggy G.",
            rating: 5,
            text: "Excellent Product",
            time: "1 week ago",
        },
        {
            name: "Mona Lisa",
            rating: 5,
            text: "Perfect fit. Superb Quality!",
            time: "2 weeks ago",
        },
        {
            name: "Mona Lisa",
            rating: 4,
            text: "Great Quality. Packaging could be better.",
            time: "2 weeks ago",
        },
    ];

    return (
        <div className="w-full bg-white rounded-lg p-4">
            <Tabs defaultValue="reviews" className="w-full">
                {/* --- Tabs header --- */}
                <TabsList>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="questions">Questions</TabsTrigger>
                </TabsList>

                {/* --- Reviews tab --- */}
                <TabsContent value="reviews" className="mt-6">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="text-3xl font-bold leading-none">4.8</h2>
                            <div className="flex items-center gap-1 mt-1">
                                <StarRating rating={4.8} />
                                <span className="text-sm text-gray-500 ml-1">Based on 138 reviews</span>
                            </div>
                        </div>
                    </div>



                    <div className="divide-y divide-gray-200 mt-4">
                        {reviews.map((r, i) => (
                            <div key={i} className="flex justify-between py-4">
                                <div className="flex gap-3">
                                    <Avatar className="bg-gray-200 flex items-center justify-center">
                                        <AvatarFallback>{convertAlias(r.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{r.name}</h4>
                                        <div className="flex items-center mt-0.5">
                                            <StarRating rating={4.8} />
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1">{r.text}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500 whitespace-nowrap">{r.time}</span>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* --- Questions tab --- */}
                <TabsContent value="questions" className="mt-6 text-gray-500">
                    No questions yet. Be the first to ask!
                </TabsContent>
            </Tabs>
        </div>
    );
}