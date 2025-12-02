import ProductCard from "@/app/client/products/_components/ProductCard";

const MyWishlist = () => {
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};
export default MyWishlist;
