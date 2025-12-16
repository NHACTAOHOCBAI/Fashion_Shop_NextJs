import finalMoney from "@/lib/finalMoney";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
const NEWTIME = 24 * 60 * 60 * 1000;
const isNewProduct = (createdAt: string): boolean => {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();
  const timeDifference = currentTime - createdTime;
  return timeDifference < NEWTIME;
};
const ProductCard = ({ product }: { product: Product }) => {
  const showNewTag = isNewProduct(product.createdAt);

  return (
    <Link
      href={`/client/products/product-detail/${product.id}`}
      className="group relative block"
    >
      <div
        className="
          w-[300px] h-[400px]
          border border-[#F6F7F8]
          rounded-[10px]
          bg-white
          overflow-hidden
          transition-all duration-300 ease-out
          hover:-translate-y-1
          hover:shadow-lg
        "
      >
        {/* Image */}
        <div className="w-[300px] h-[300px] bg-[#F6F7F8] overflow-hidden">
          <Image
            height={300}
            width={300}
            alt={product.name}
            src={product.images[0]?.imageUrl || ""}
            className="
              w-full h-full object-contain
              transition-transform duration-300
              group-hover:scale-105
            "
          />
        </div>

        {/* Info */}
        <div className="px-[17px] py-[11px]">
          <p
            className="
              font-medium line-clamp-2
              transition-colors duration-200
              group-hover:text-primary
            "
          >
            {product.name}
          </p>

          <div className="flex gap-[5px] items-center">
            <p>{product.averageRating}</p>
            <FaStar className="text-yellow-400" />
          </div>

          <p className="font-medium text-right">{finalMoney(+product.price)}</p>
        </div>
      </div>

      {/* NEW tag */}
      {showNewTag && (
        <div
          className="
            bg-[#FF4858]
            rounded-br-[5px] rounded-tr-[5px]
            p-[10px]
            absolute top-[20px] left-0
            text-white text-sm font-medium
            transition-transform duration-300
            group-hover:translate-x-1
          "
        >
          NEW
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
