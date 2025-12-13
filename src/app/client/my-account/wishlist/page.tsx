"use client";
import Loading from "@/app/client/_components/Loading";
import ProductCard from "@/app/client/products/_components/ProductCard";
import { useWishlists } from "@/hooks/queries/useWishlist";

const MyWishlist = () => {
  const { data: myWishlist, isLoading } = useWishlists();
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[24px]">My Wishlist </p>
          <p className="text-[18px] font-light mt-[11px]">
            Manage your wishlist and enhance user experience
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-y-3 gap-x-5 mt-[60px]">
        {myWishlist?.product.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
export default MyWishlist;
