import finalMoney from "@/lib/finalMoney";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const NEW_TIME = 24 * 60 * 60 * 1000;

const isNewProduct = (createdAt: string): boolean => {
  if (!createdAt) return false;
  return Date.now() - new Date(createdAt).getTime() < NEW_TIME;
};

const FALLBACK_IMAGE = "/images/product-placeholder.png";

const ProductCard = ({ product }: { product: Product }) => {
  const showNewTag = isNewProduct(product.createdAt);

  const imageUrl = product.images?.[0]?.imageUrl || FALLBACK_IMAGE;

  const rating = Number(product.averageRating) || 0;

  return (
    <Link
      href={`/client/products/product-detail/${product.id}`}
      className="group block"
    >
      <div
        className="
          relative
          h-full
          rounded-xl
          border border-gray-100
          bg-white
          overflow-hidden
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        {/* IMAGE */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="
              object-contain
              transition-transform duration-300
              group-hover:scale-105
            "
          />

          {/* NEW TAG */}
          {showNewTag && (
            <span
              className="
                absolute top-3 left-3
                rounded-md bg-red-500
                px-2 py-1
                text-xs font-semibold text-white
                shadow
              "
            >
              NEW
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-2">
          {/* NAME */}
          <h3
            className="
              min-h-[44px]
              text-sm font-medium
              line-clamp-2
              transition-colors
              group-hover:text-primary
            "
            title={product.name}
          >
            {product.name}
          </h3>

          {/* RATING */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <FaStar className="text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-gray-400">({product.reviewCount || 0})</span>
          </div>

          {/* PRICE */}
          <div className="mt-auto flex justify-end">
            <p className="text-lg font-semibold text-primary">
              {finalMoney(Number(product.price))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
