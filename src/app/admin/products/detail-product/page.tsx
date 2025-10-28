"use client";
import "react-image-gallery/styles/css/image-gallery.css";
import { formatMoney } from "@/lib/formatMoney";
import { useEffect, useMemo, useState } from "react";
import ImageGallery from "react-image-gallery";
import Image from "next/image";
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
export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product>();
  const images = useMemo(() => getAllImageUrls(product), [product]);
  useEffect(() => {
    const data = localStorage.getItem("detailProduct");
    if (!data) return;
    try {
      const parsed: Product = JSON.parse(data);
      setProduct(parsed);
    } catch (error) {
      console.error("Lỗi parse product từ localStorage", error);
    }
  }, []);
  if (!product) return <div>loading</div>;
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
        <div className="flex-1 ">
          <div className="flex flex-col gap-4">
            <p className="text-text-secondary font-medium text-xl">
              {product.brand.name}
            </p>
            <p className="font-bold text-4xl">{product.name}</p>
            <p>
              These sport shoes are designed for comfort, performance, and
              style. With lightweight cushioning and breathable materials, they
              keep your feet cool and supported during any activity. Perfect for
              running, training, or everyday wear.
            </p>
            <div className="flex gap-[10px]">
              <p>Sold: 100</p>
              <div className="w-[2px] bg-accent-foreground"></div>
              <p>Stock: 200</p>
            </div>
            <p className="font-medium text-2xl">
              {formatMoney(Number(product.price))}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px]">
        {product.variants.map((variant) => (
          <VariantCard key={variant.id} item={variant} />
        ))}
      </div>
    </>
  );
}
const VariantCard = ({ item }: { item: Variant }) => {
  return (
    <div className="drop-shadow-sm p-[10px] bg-white w-fit">
      <Image
        alt="variant"
        src={item.imageUrl}
        width={200}
        height={200}
        className="object-cover"
      />
      {item.variantAttributeValues.map((v, index) => (
        <div
          key={index}
        >{`${v.attributeCategory.attribute.name} : ${v.attributeCategory.value}`}</div>
      ))}
    </div>
  );
};
