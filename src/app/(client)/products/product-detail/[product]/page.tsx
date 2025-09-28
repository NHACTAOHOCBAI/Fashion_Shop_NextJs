"use client";

import { use, useState, useMemo } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetProductById } from "@/hooks/queries/useProduct";
import convertAttributeCategories from "@/lib/convertAttributeCategories";
import { formatMoney } from "@/lib/formatMoney";
import { useAddToCart } from "@/hooks/queries/useCart";
import { toast } from "sonner";
import { formatDateTimeWithAt } from "@/lib/formatDate";

export default function ProductDetail({
    params,
}: {
    params: Promise<{ product: string }>;
}) {
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
                toast.success(`Add ${productDetail.name}`, {
                    description: formatDateTimeWithAt(new Date()),
                });
            },
            onError: (err) => {
                toast.error(`Ohh!!! ${err.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                });
            },
        })
    }
    // ===== Render =====
    return (
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
            <div className="flex-1">
                <div className="flex flex-col gap-4">
                    <p className="text-text-secondary font-medium text-xl">
                        {productDetail.brand.name}
                    </p>
                    <p className="font-bold text-4xl">{productDetail.name}</p>

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
