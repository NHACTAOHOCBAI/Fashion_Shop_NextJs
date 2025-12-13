import Image from "next/image";
import MyTag from "@/app/client/_components/MyTag";

interface Props {
  item: OrderItem;
}

export const ProductItem = ({ item }: Props) => {
  const { product, imageUrl, variantAttributeValues } = item.variant;

  return (
    <div className="flex py-[20px] px-[30px] border-b border-[#F6F7F8] justify-between">
      <div className="flex gap-[17px]">
        <Image
          src={imageUrl}
          alt={product.name}
          width={138}
          height={94}
          className="bg-[#F6F7F8] rounded-[8px] object-contain"
        />
        <div>
          <p>{product.name}</p>
          <div className="flex gap-[17px] mt-[10px]">
            {variantAttributeValues.map((a) => (
              <MyTag key={a.id} value={a.attributeCategory.value} />
            ))}
            <MyTag value={`x ${item.quantity}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
