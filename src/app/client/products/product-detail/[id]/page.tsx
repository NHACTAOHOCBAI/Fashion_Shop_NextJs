/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyBreadcrumb from "@/app/client/_components/MyBreadcumb";
import AddToCartButton from "@/app/client/products/_components/AddToCartButton";
import DisplayImages from "@/app/client/products/_components/DisplayImage";
import DisplayStars from "@/app/client/products/_components/DisplayStars";
import QuantitySelector from "@/app/client/products/_components/MyCount";
import ProductCard from "@/app/client/products/_components/ProductCard";
import TabbedContent from "@/app/client/products/_components/TabContent";
import { useAddToCart } from "@/hooks/queries/useCart";
import {
  useGetProductById,
  useRelatedProducts,
} from "@/hooks/queries/useProduct";
import { useGetReviewsByProduct } from "@/hooks/queries/useReview";
import {
  useToggleWishlistItem,
  useWishlists,
} from "@/hooks/queries/useWishlist";
import finalMoney from "@/lib/finalMoney";
import { shorthandFormatDateTime } from "@/lib/formatDate";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, fadeIn } from "@/lib/animations";
import { Heart, Package, ShoppingCart, Star, TruckIcon, Shield, RotateCcw, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface OptionGroupData {
  attributeName: string;
  values: { id: number; value: string }[];
}

// Hàm chuyển đổi category attributes thành cấu trúc options cho UI
function convertAttributeCategories(
  categories: any[] // Thay thế AttributeCategory[] bằng any để tránh lỗi type
): OptionGroupData[] {
  const map = new Map<string, { id: number; value: string }[]>();
  categories.forEach((cat) => {
    const attributeName = cat.attribute.name;
    if (!map.has(attributeName)) {
      map.set(attributeName, []);
    }
    const currentValues = map.get(attributeName)!;
    if (!currentValues.some((v) => v.value === cat.value)) {
      currentValues.push({ id: cat.id, value: cat.value });
    }
  });

  return Array.from(map.entries()).map(([attributeName, values]) => ({
    attributeName,
    values,
  }));
}

// Hàm lấy tất cả ảnh (từ product và variant)
function getAllImageUrls(product: any): string[] {
  if (!product) return [];
  return [
    ...product.images.map((img: any) => img.imageUrl),
    ...product.variants
      .filter((v: any) => v.imageUrl)
      .map((v: any) => v.imageUrl),
  ];
}
// ====================================================================

const ReviewItem = ({
  review,
  index = 0,
}: {
  review: {
    id: number;
    rating: number;
    comment: string;
    user: {
      id: number;
      name: string;
    };
    images: string[];
    helpfulCount: number;
    createdAt: Date;
  };
  index?: number;
}) => {
  return (
    <motion.div
      className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="rounded-full w-12 h-12 bg-gradient-to-br from-[var(--cyan-400)] to-[var(--cyan-600)] flex items-center justify-center text-white font-bold text-lg shadow-md">
            {review.user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
              {review.user.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {shorthandFormatDateTime(review.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 px-3 py-1.5 rounded-full">
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {review.rating}
          </span>
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        </div>
      </div>
      <div className="mt-4">
        {review.images && review.images[0] && (
          <Image
            height={120}
            width={120}
            alt="Review image"
            src={review.images[0]}
            className="w-32 h-32 object-cover rounded-xl bg-gray-100 dark:bg-gray-700 shadow-md mb-3"
          />
        )}
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {review.comment}
        </p>
      </div>
    </motion.div>
  );
};

const ProductDetail = () => {
  const { data: myWishlists } = useWishlists();
  const { mutate: addToCart, isPending } = useAddToCart();
  const pathname = usePathname();
  const productId = pathname.split("/").pop();
  const { data: product } = useGetProductById(Number(productId));
  const { mutate: toggleWishList } = useToggleWishlistItem();
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  const images = useMemo(() => getAllImageUrls(product as any), [product]);
  const isWishlisted = useMemo(() => {
    if (!myWishlists || !product) return false;

    return myWishlists.some((w) => w.product.id === product.id);
  }, [myWishlists, product]);

  const options = useMemo(() => {
    if (!product) return [];
    return convertAttributeCategories(
      product.variants.flatMap((v: any) =>
        v.variantAttributeValues.map((vav: any) => vav.attributeCategory)
      ) as any
    );
  }, [product]);

  // Xác định biến thể đã chọn
  const selectedVariant = useMemo(() => {
    if (!product) return undefined;
    // Kiểm tra xem đã chọn đủ tất cả các thuộc tính chưa
    if (Object.keys(selectedAttributes).length !== options.length)
      return undefined;

    return product.variants.find((variant: any) =>
      variant.variantAttributeValues.every((vav: any) => {
        const name = vav.attributeCategory.attribute.name;
        const value = vav.attributeCategory.value;
        return selectedAttributes[name] === value;
      })
    );
  }, [product, selectedAttributes, options]);

  // ✨ LOGIC GIỚI HẠN SỐ LƯỢNG TỒN KHO TỐI ĐA
  const maxQuantity = useMemo(() => {
    // Nếu biến thể được chọn, lấy số lượng tồn kho (remaining)
    if (selectedVariant) {
      // Đảm bảo tồn kho không nhỏ hơn 1 nếu biến thể có hàng
      return selectedVariant.remaining > 0 ? selectedVariant.remaining : 1;
    }
    // Nếu chưa chọn đủ biến thể:
    // - Cho phép chọn tối đa 1 (hoặc MIN_VALUE) để người dùng có thể tăng/giảm,
    //   nhưng nút AddToCart bị disabled.
    // - Hoặc, để ngăn việc tăng số lượng trước khi chọn, đặt là 1.
    return 1;
  }, [selectedVariant]);

  // ✨ LOGIC ĐIỀU CHỈNH quantity khi thay đổi biến thể/maxQuantity
  useMemo(() => {
    // 1. Nếu số lượng hiện tại vượt quá tồn kho tối đa, đặt lại về tồn kho tối đa.
    if (quantity > maxQuantity) {
      setQuantity(maxQuantity > 0 ? maxQuantity : 1);
    }
    // 2. Nếu maxQuantity > 0 (có hàng) nhưng quantity đang là 0 (hoặc nhỏ hơn MIN_VALUE), đặt lại về 1.
    else if (maxQuantity > 0 && quantity < 1) {
      setQuantity(1);
    }
  }, [maxQuantity, quantity, setQuantity]);

  // Hàm xử lý khi chọn thuộc tính
  const handleSelect = useCallback((attributeName: string, value: string) => {
    setSelectedAttributes((prev) => {
      const current = prev[attributeName];
      if (current === value) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [attributeName]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [attributeName]: value };
    });
  }, []);

  // Tính toán số lượng tồn kho chung
  const availbility =
    product?.variants
      .map((variant: any) => variant.remaining)
      .reduce((a: number, b: number) => a + b, 0) || 0;
  const handleAddToCart = useCallback(() => {
    // 1. Lấy ID biến thể
    const variantId = selectedVariant!.id;
    // 2. Lấy số lượng
    const selectedQuantity = quantity;
    addToCart(
      {
        quantity: selectedQuantity,
        variantId: variantId,
      },
      {
        onSuccess: () => {
          toast.success(`${product?.name} has been added to cart`);
        },
        onError: (error) => {
          toast.error(`Ohh!!! ${error.message}`);
        },
      }
    );
  }, [selectedVariant, quantity, addToCart, product?.name]);
  const productTabs = [
    {
      title: "Description",
      content: <p className="text-[#9098B1]">{product?.description}</p>,
    },
    {
      title: "Reviews",
      content: <ReviewPage idProduct={product?.id || 0} />,
      count: 0, // Thêm count để hiển thị (0)
    },
  ];
  const handleToggleWishlist = () => {
    if (!product) return;
    toggleWishList({
      productId: product.id,
    });
  };

  if (!product) return <div>Loading...</div>;

  // Stock urgency helper
  const getStockStatus = () => {
    const stock = selectedVariant?.remaining ?? availbility;
    if (stock === 0) return { text: "Out of Stock", color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-900/20", icon: AlertTriangle };
    if (stock <= 5) return { text: `Only ${stock} left!`, color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-900/20", icon: AlertTriangle };
    if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600", bgColor: "bg-yellow-50 dark:bg-yellow-900/20", icon: Package };
    return { text: `${stock} in stock`, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-900/20", icon: Package };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="w-[1240px] mx-auto py-4">
          <MyBreadcrumb
            data={["Products", product?.category.name || "", product?.name || ""]}
          />
        </div>
      </div>

      <div className="w-[1240px] mx-auto py-12">
        {/* PRODUCT DETAILS */}
        <motion.div
          className="flex gap-12 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image Gallery */}
          <motion.div
            className="relative flex-1"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <DisplayImages images={images} />

            {/* Wishlist Button */}
            <motion.button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl flex items-center justify-center z-10"
              onClick={handleToggleWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                size={22}
                className={cn(
                  "transition-all",
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-400"
                )}
              />
            </motion.button>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {product?.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-6 mb-6">
              <DisplayStars value={+product.averageRating || 0} />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

            {/* Brand & Category */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
                  Brand:
                </span>
                <span className="text-base font-semibold text-[var(--cyan-600)] dark:text-[var(--cyan-400)]">
                  {product?.brand.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
                  Category:
                </span>
                <span className="text-base text-gray-700 dark:text-gray-300">
                  {product?.category.name}
                </span>
              </div>

              {/* Stock Status with urgency indicator */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
                  Stock:
                </span>
                <div className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-sm",
                  stockStatus.bgColor,
                  stockStatus.color
                )}>
                  <stockStatus.icon className="w-4 h-4" />
                  {stockStatus.text}
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

            {/* Variant Selection */}
            <div className="flex flex-col gap-6 mb-6">
              {options.map((field) => (
                <OptionGroup
                  key={field.attributeName}
                  field={field}
                  product={product as any}
                  selectedAttributes={selectedAttributes}
                  handleSelect={handleSelect}
                />
              ))}
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

            {/* Price */}
            <motion.div
              className="mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-5xl font-bold text-gradient-primary">
                {finalMoney(+product.price)}
              </p>
            </motion.div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-8">
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                maxQuantity={maxQuantity}
              />
              <div className="flex-1">
                <AddToCartButton
                  isLoading={isPending}
                  disabled={!selectedVariant || quantity === 0}
                  onClick={handleAddToCart}
                />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <TruckIcon className="w-6 h-6 text-[var(--cyan-500)] mb-2" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <Shield className="w-6 h-6 text-[var(--cyan-500)] mb-2" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <RotateCcw className="w-6 h-6 text-[var(--cyan-500)] mb-2" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Easy Returns
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TabbedContent tabs={productTabs} defaultTabTitle="Description" />
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          {/* <RelatedProducts idProduct={product.id} /> */}
        </motion.div>
      </div>
    </div>
  );
};

const OptionGroup = ({
  field,
  product,
  selectedAttributes,
  handleSelect,
}: {
  field: OptionGroupData;
  product: any;
  selectedAttributes: Record<string, string>;
  handleSelect: (attributeName: string, value: string) => void;
}) => {
  // Logic lấy các biến thể còn khả năng chọn dựa trên các lựa chọn hiện tại
  const getAvailableVariants = useCallback(
    (ignoreAttr?: string) => {
      return product.variants.filter((variant: any) =>
        variant.variantAttributeValues.every((vav: any) => {
          const name = vav.attributeCategory.attribute.name;
          if (name === ignoreAttr) return true;
          const selected = selectedAttributes[name];
          // Kiểm tra nếu chưa chọn hoặc giá trị của variant khớp với giá trị đã chọn
          return !selected || vav.attributeCategory.value === selected;
        })
      );
    },
    [product.variants, selectedAttributes]
  );

  // Logic lấy các giá trị được phép chọn (đã được lọc)
  const getEnabledValues = useCallback(() => {
    const filtered = getAvailableVariants(field.attributeName);
    return new Set(
      filtered?.flatMap((v: any) =>
        v.variantAttributeValues
          .filter(
            (vav: any) =>
              vav.attributeCategory.attribute.name === field.attributeName
          )
          .map((vav: any) => vav.attributeCategory.value)
      )
    );
  }, [getAvailableVariants, field.attributeName]);

  const enabledValues = useMemo(() => getEnabledValues(), [getEnabledValues]);

  return (
    <div>
      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wide">
        Select {field.attributeName}
      </h4>
      <div className="flex gap-3 flex-wrap">
        {field.values.map((value) => {
          const isDisabled = !enabledValues.has(value.value);
          const isActive =
            selectedAttributes[field.attributeName] === value.value;
          return (
            <motion.button
              key={value.id}
              onClick={() =>
                !isDisabled && handleSelect(field.attributeName, value.value)
              }
              disabled={isDisabled}
              className={cn(
                "px-6 py-2.5 rounded-xl border-2 font-medium transition-all text-sm",
                isActive
                  ? "border-[var(--cyan-500)] bg-gradient-to-r from-[var(--cyan-50)] to-[var(--cyan-100)] dark:from-[var(--cyan-900)] dark:to-[var(--cyan-800)] text-[var(--cyan-700)] dark:text-[var(--cyan-300)] shadow-md"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-[var(--cyan-300)] hover:shadow-sm",
                isDisabled && "opacity-40 cursor-not-allowed hover:border-gray-200"
              )}
              whileHover={!isDisabled ? { scale: 1.05 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
            >
              {value.value}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
const ReviewPage = ({ idProduct }: { idProduct: number }) => {
  const { data: reviews } = useGetReviewsByProduct(idProduct);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
          <Star className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No reviews yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Be the first to review this product!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <ReviewItem key={review.id} review={review} index={index} />
      ))}
    </div>
  );
};

// const RelatedProducts = ({ idProduct }: { idProduct: number }) => {
//   const { data: relatedProducts } = useRelatedProducts(idProduct);

//   if (!relatedProducts || relatedProducts.length === 0) {
//     return null;
//   }

//   return (
//     <div>
//       <motion.h2
//         className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Related Products
//       </motion.h2>
//       <motion.div
//         className="grid grid-cols-4 gap-6"
//         variants={staggerContainer}
//         initial="hidden"
//         animate="show"
//       >
//         {relatedProducts.slice(0, 4).map((item: any) => (
//           <motion.div key={item.id} variants={staggerItem}>
//             <ProductCard product={item} />
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };
export default ProductDetail;
