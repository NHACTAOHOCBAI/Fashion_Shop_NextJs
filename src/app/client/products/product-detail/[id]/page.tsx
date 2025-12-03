/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyBreadcrumb from "@/app/client/_components/MyBreadcumb";
import AddToCartButton from "@/app/client/products/_components/AddToCartButton";
import DisplayImages from "@/app/client/products/_components/DisplayImage";
import DisplayStars from "@/app/client/products/_components/DisplayStars";
import QuantitySelector from "@/app/client/products/_components/MyCount";
import { CustomPagination } from "@/app/client/products/_components/MyPagination";
import ProductCard from "@/app/client/products/_components/ProductCard";
import TabbedContent from "@/app/client/products/_components/TabContent";
import { useAddToCart } from "@/hooks/queries/useCart";
import {
  useGetProductById,
  useRelatedProducts,
} from "@/hooks/queries/useProduct";
import { useGetReviewsByProduct } from "@/hooks/queries/useReview";
import finalMoney from "@/lib/finalMoney";
import { shorthandFormatDateTime } from "@/lib/formatDate";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "sonner";

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

// ... (ReviewItem và productTabs không thay đổi)
const ReviewItem = ({ review }: { review: Review }) => {
  return (
    <div className="rounded-[16px] border-[#D0D5DD] py-[18px] px-[24px] border-[1px]">
      <div className="flex justify-between">
        <div className="flex gap-[12px] items-center">
          <div className="rounded-full w-[41px] h-[41px] bg-gray-400" />
          <div>
            <p className="text-[16px] font-semibold">{review.user.fullName}</p>
            <p className="text-[14px]">
              {shorthandFormatDateTime(review.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-[5px]">
          <p>{review.rating}</p>
          <FaStar className="text-yellow-300 mt-[3px]" />
        </div>
      </div>
      <div className="mt-[13px]">
        {review.image && (
          <Image
            height={100}
            width={100}
            alt={`Shoe view`}
            src={review.image}
            className="w-[100px] h-[100px] object-contain rounded-[8px] bg-[#F6F7F8] " // Đảm bảo ảnh nhỏ vừa khung
          />
        )}
        <p className=" text-[16px] mt-[5px]">{review.comment}</p>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { mutate: addToCart, isPending } = useAddToCart();
  const pathname = usePathname();
  const productId = pathname.split("/").pop();
  const { data: product } = useGetProductById(Number(productId));

  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  const images = useMemo(() => getAllImageUrls(product as any), [product]);

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
  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <div className="bg-[#F6F7F8]">
        <div className="w-[1240px] mx-auto py-[16px]">
          <MyBreadcrumb
            data={["test", product?.category.name || "", product?.name || ""]}
          />
        </div>
      </div>
      <div className="w-[1240px] mx-auto py-[50px] flex flex-col gap-[60px]">
        <div className="flex gap-[90px]">
          <DisplayImages images={images} />
          <div className="flex-1">
            <p className="text-[36px] font-medium">{product?.name}</p>
            <div className="flex gap-[40px] items-center mt-[20px]">
              <DisplayStars value={+product.averageRating || 0} />
              <p className="text-[14px] font-thin">29 reviews</p>
            </div>
            <div className="bg-[#FAFAFB] h-[2px] my-[18px]" />
            <div className="flex flex-col gap-[21px]">
              <p>{`Brand: ${product?.brand.name}`}</p>
              <p>{`Category: ${product?.category.name}`}</p>
              <p>{`Availbility: ${
                selectedVariant?.remaining ?? availbility // Hiển thị tồn kho của variant hoặc tồn kho chung
              }`}</p>
            </div>
            <div className="bg-[#FAFAFB] h-[2px] my-[18px]" />
            <div className="flex flex-col gap-[20px]">
              {/* === Attribute Groups === */}
              {options.map((field) => {
                return (
                  <OptionGroup
                    key={field.attributeName}
                    field={field}
                    product={product as any}
                    selectedAttributes={selectedAttributes}
                    handleSelect={handleSelect}
                  />
                );
              })}
              {/* =================================================== */}
            </div>
            <div className="bg-[#FAFAFB] h-[2px] mt-[18px]" />
            <p className="text-[36px] font-bold text-[#40BFFF]">
              {finalMoney(+product.price)}
            </p>
            <div className="flex justify-between mt-[18px]">
              {/* ✨ TRUYỀN maxQuantity VÀO ĐÂY */}
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                maxQuantity={maxQuantity} // Tồn kho tối đa của biến thể được chọn
              />
              {/* Nút AddToCart bị disabled nếu chưa chọn biến thể hoặc số lượng bằng 0 */}
              <AddToCartButton
                isLoading={isPending}
                disabled={!selectedVariant || quantity === 0}
                onClick={handleAddToCart} // Gắn hàm xử lý đã định nghĩa
              />
            </div>
          </div>
        </div>

        <TabbedContent tabs={productTabs} defaultTabTitle="Description" />
        <RelatedProducts idProduct={product.id} />
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
      <p className="font-medium">{field.attributeName}</p>
      <div className="flex gap-[10px] flex-wrap mt-[10px]">
        {field.values.map((value) => {
          const isDisabled = !enabledValues.has(value.value);
          const isActive =
            selectedAttributes[field.attributeName] === value.value;
          return (
            <div
              key={value.id}
              onClick={() =>
                !isDisabled && handleSelect(field.attributeName, value.value)
              }
              className={`px-[22px] rounded-full py-[4px] border-[1px] cursor-pointer 
                  ${
                    isActive
                      ? "border-[#40BFFF] text-[#40BFFF] font-medium"
                      : "border-[#F6F7F8] font-thin hover:border-[#D0D5DD]"
                  }
                  ${isDisabled ? "opacity-30 cursor-not-allowed" : ""}
                `}
            >
              {value.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const ReviewPage = ({ idProduct }: { idProduct: number }) => {
  const { data: reviews } = useGetReviewsByProduct(idProduct);
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    const totalPages = reviews?.pagination?.total ?? 1;
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div>
      {reviews?.data.map((review) => (
        <div key={review.id} className="mb-4">
          <ReviewItem key={review.id} review={review} />
        </div>
      ))}
      <div className="flex flex-col items-center gap-4 p-8">
        <CustomPagination
          currentPage={page}
          totalPages={Math.max(
            1,
            Math.ceil(
              (reviews?.pagination?.total ?? 0) /
                (reviews?.pagination?.limit ?? 1)
            )
          )}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
const RelatedProducts = ({ idProduct }: { idProduct: number }) => {
  const { data: relatedProducts } = useRelatedProducts(idProduct);
  return (
    <div>
      <p className="text-[36px] font-medium text-center">Related Products</p>
      <div className="flex justify-between mt-[20px]">
        {relatedProducts?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};
export default ProductDetail;
