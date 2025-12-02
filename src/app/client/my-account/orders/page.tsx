import MyTag from "@/app/client/_components/MyTag";
import TabbedContent from "@/app/client/products/_components/TabContent";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Nike Airmax 270 react",
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    attributes: ["Red", "XL"],
    quantity: 2,
    unitPrice: 499.0,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21",
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    attributes: ["Blue", "L"],
    quantity: 1,
    unitPrice: 350.0,
  },
];
const Orders = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[24px]">Orders</p>
          <p className="text-[18px] font-light mt-[11px]">
            Manage your orders more efficiently
          </p>
        </div>
      </div>
      <div className="mt-[60px]">
        <TabbedContent tabs={productTabs} defaultTabTitle="Đánh giá" />
      </div>
    </div>
  );
};
const OrderItem = () => {
  return (
    <div className="relative rounded-[10px] border-[#F6F7F8] border bg-white px-[15px]">
      {initialCartItems.map((item) => {
        return <ProductItem item={item} key={item.id} />;
      })}
      <div className="w-full  mt-[23px] ">
        <p className="text-[24px] text-right">Total: $499</p>
        <div className="flex gap-[24px] justify-end mt-[22px] mb-[20px]">
          <Button variant={"outline"} className="font-light">
            Review
          </Button>
          <Button variant={"outline"} className="font-light">
            Rebuy
          </Button>
          <Button variant={"outline"} className="font-light">
            Inbox
          </Button>
        </div>
      </div>
      <p className="text-[#34C759] text-light absolute top-2 right-4">
        Delivered
      </p>
    </div>
  );
};
interface CartItem {
  id: number;
  name: string;
  image: string;
  attributes: string[];
  quantity: number;
  unitPrice: number;
}
interface ProductItemProps {
  item: CartItem; // Sử dụng interface đã định nghĩa
}
const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { name, image, attributes, quantity, unitPrice } = item;

  return (
    <div className="flex py-[20px] px-[30px] items-center border-b-[1px] border-[#F6F7F8] justify-between">
      <div className="flex gap-[17px] ">
        <Image
          height={94}
          width={138}
          alt={name}
          src={image}
          className="bg-[#F6F7F8] rounded-[8px] w-[138px] h-[94px] object-contain"
        />
        <div>
          <p>{name}</p>
          <div className="flex gap-[17px] mt-[10px]">
            {attributes.map((attr) => (
              <MyTag key={attr} value={attr} />
            ))}
            <p className="text text-gray-200">|</p>
            <MyTag
              value={<div className="font-medium">{`x ${quantity}`}</div>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orders;
const productTabs = [
  {
    title: "All",
    content: (
      <div>
        <OrderItem />
      </div>
    ),
  },
  {
    title: "Pending",
    content: (
      <p className="text-[#9098B1]">
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites. air max are always very comfortable fit,
        clean and just perfect in every way. just the box was too small and
        scrunched the sneakers up a little bit, not sure if the box was always
        this small but the 90s are and will always be one of my favorites.
      </p>
    ),
  },
  {
    title: "Confirmed",
    content: (
      <p className="text-[#9098B1]">
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites. air max are always very comfortable fit,
        clean and just perfect in every way. just the box was too small and
        scrunched the sneakers up a little bit, not sure if the box was always
        this small but the 90s are and will always be one of my favorites.
      </p>
    ),
  },
  {
    title: "Processing",
    content: (
      <p className="text-[#9098B1]">
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites. air max are always very comfortable fit,
        clean and just perfect in every way. just the box was too small and
        scrunched the sneakers up a little bit, not sure if the box was always
        this small but the 90s are and will always be one of my favorites.
      </p>
    ),
  },
  {
    title: "Shipped",
    content: (
      <p className="text-[#9098B1]">
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites. air max are always very comfortable fit,
        clean and just perfect in every way. just the box was too small and
        scrunched the sneakers up a little bit, not sure if the box was always
        this small but the 90s are and will always be one of my favorites.
      </p>
    ),
  },
  {
    title: "Delivered",
    content: (
      <p className="text-[#9098B1]">
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites. air max are always very comfortable fit,
        clean and just perfect in every way. just the box was too small and
        scrunched the sneakers up a little bit, not sure if the box was always
        this small but the 90s are and will always be one of my favorites.
      </p>
    ),
  },
  {
    title: "Canceled",
    content: (
      <p className="text-[#9098B1]">
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites. air max are always very comfortable fit,
        clean and just perfect in every way. just the box was too small and
        scrunched the sneakers up a little bit, not sure if the box was always
        this small but the 90s are and will always be one of my favorites.
      </p>
    ),
  },
];
