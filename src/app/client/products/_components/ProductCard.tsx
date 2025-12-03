import finalMoney from "@/lib/finalMoney";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
const data = {
  id: 1,
  image:
    "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
  name: "Nike shoes",
  rating: 3.8,
  price: 299.99,
  createdAt: "2025-12-02T12:52:36.000Z",
};
const NEWTIME = 24 * 60 * 60 * 1000;
const isNewProduct = (createdAt: string): boolean => {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();
  const timeDifference = currentTime - createdTime;
  return timeDifference < NEWTIME;
};
const ProductCard = ({
  product = data,
}: {
  product?: {
    id: number;
    image: string;
    name: string;
    rating: number;
    price: number;
    createdAt: string;
  };
}) => {
  const showNewTag = isNewProduct(product.createdAt);
  return (
    <div className="relative">
      <div className="w-[300px] h-[400px] border-[#F6F7F8] border-[1px] rounded-[10px] bg-white">
        <Image
          height={300}
          width={300}
          alt={product.name}
          src={product.image}
          className="w-[300px] h-[300px] bg-[#F6F7F8] object-contain"
        />
        <div className="px-[17px] py-[11px]">
          <p className="font-medium">{product.name}</p>
          <div className="flex gap-[5px]">
            <p>{product.rating}</p>
            <FaStar className="text-yellow-300 mt-[3px]" />
          </div>
          <p className="font-medium text-right">{finalMoney(product.price)}</p>
        </div>
      </div>
      {showNewTag && (
        <div className="bg-[#FF4858] rounded-br-[5px] rounded-tr-[5px] p-[10px] absolute top-[20px] text-white">
          NEW
        </div>
      )}
    </div>
  );
};
export default ProductCard;
