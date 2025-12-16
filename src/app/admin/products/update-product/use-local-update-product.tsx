import updateProductSchemaFn from "./update-product-schema";
import {
  useGetProductById,
  useUpdateProduct,
} from "@/hooks/queries/useProduct";
import { useGetAttributeCategoryByCategory } from "@/hooks/queries/useAttribute";
import convertAttributeCategories from "@/lib/convertAttributeCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useCategorySelections } from "@/hooks/queries/useCategory";
import { useBrandSelections } from "@/hooks/queries/useBrand";
const initializeImage = async (images: string[]): Promise<File[]> => {
  const files = await Promise.all(
    images.map(async (image) => {
      const response = await fetch(image);
      const blob = await response.blob();

      const file = new File([blob], "image", { type: blob.type });
      (file as any).preview = image; // 👈 để ImageUpload dùng

      return file;
    })
  );

  return files;
};

const useLocalUpdateProduct = (productId: number) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { data: categoryData } = useCategorySelections();
  const { data: brandData } = useBrandSelections();
  const categorySelections = categoryData?.map((c) => ({
    value: c.id,
    label: c.name,
  }));
  const brandSelections = brandData?.map((b) => ({
    value: b.id,
    label: b.name,
  }));
  const { data: product } = useGetProductById(productId);
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const [selectedCategory, setSelectedCategory] = useState<number>();

  const { data: attributeCategoryData } = useGetAttributeCategoryByCategory(
    selectedCategory || 0
  );

  const attributes = convertAttributeCategories(attributeCategoryData || []);

  const UpdateSchema = updateProductSchemaFn(attributes);
  type FormType = z.infer<typeof UpdateSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: 0,
      brandId: 0,
      images: [],
      variants: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });
  const initial = async () => {
    if (!product) return;
    setIsImageLoading(true);
    setSelectedCategory(product.category.id);

    // ✅ Product images
    const images = await initializeImage(product.images.map((i) => i.imageUrl));

    // ✅ Variants (PHẢI dùng Promise.all)
    const variants = await Promise.all(
      product.variants.map(async (v) => ({
        quantity: v.quantity,

        image: v.imageUrl ? await initializeImage([v.imageUrl]) : [],

        attributes: v.variantAttributeValues.map((a) => ({
          attributeCategoryId: a.attributeCategory.id,
          valueId: a.attributeCategory.id, // ⚠️ sửa đúng valueId
        })),
      }))
    );
    console.log(images);
    console.log(variants);
    // ✅ Reset sau khi TẤT CẢ xong
    form.reset({
      name: product.name,
      description: product.description,
      price: Number(product.price),
      categoryId: product.category.id,
      brandId: product.brand.id,
      images,
      variants,
    });
    setIsImageLoading(false);
  };

  /* ===== Prefill ===== */
  useEffect(() => {
    initial();
  }, [product]);

  /* ===== Submit ===== */
  const onSubmit = (values: FormType) => {
    const variants = values.variants.map((v) => ({
      quantity: v.quantity,
      attributes: v.attributes.map((a) => ({
        attributeCategoryId: a.valueId, // ⚠️ backend chỉ cần valueId
      })),
    }));

    const variantImages = values.variants.map(
      (v) => v.image[0] // 1 ảnh / variant
    );

    updateProduct(
      {
        id: productId,
        data: {
          name: values.name,
          description: values.description,
          price: values.price,
          categoryId: values.categoryId,
          brandId: values.brandId,
          images: values.images,
          variantImages,
          variants,
        },
      },
      {
        onSuccess: () => toast.success("Product updated successfully"),
        onError: (e) => toast.error(`Ohh!!! ${e.message}`),
      }
    );
  };

  return {
    isImageLoading,
    form,
    onSubmit,
    fields,
    append,
    remove,
    attributes,
    setSelectedCategory,
    isPending,
    categorySelections,
    brandSelections,
  };
};

export default useLocalUpdateProduct;
