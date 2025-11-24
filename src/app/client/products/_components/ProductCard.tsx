import Image from "next/image";
import { FaStar } from "react-icons/fa";

const ProductCard = () => {
  return (
    <div className="relative">
      <div className="w-[300px] h-[400px] border-[#F6F7F8] border-[1px] rounded-[10px] bg-white">
        <Image
          height={300}
          width={300}
          alt="test"
          src={
            "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png"
          }
          className="w-[300px] h-[300px] bg-[#F6F7F8] object-contain"
        />
        <div className="px-[17px] py-[11px]">
          <p className="font-medium">Nike Air Max 270 React</p>
          <div className="flex gap-[5px]">
            <p>3.8</p>
            <FaStar className="text-yellow-300 mt-[3px]" />
          </div>
          <p className="font-medium text-right">$299.99</p>
        </div>
      </div>
      <div className="bg-[#FF4858] rounded-br-[5px] rounded-tr-[5px] p-[10px] absolute top-[20px] text-white">
        NEW
      </div>
    </div>
  );
};
export default ProductCard;
