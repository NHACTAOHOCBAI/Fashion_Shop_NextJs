/* eslint-disable @typescript-eslint/no-explicit-any */
import createProductSchemaFn from "@/app/admin/products/create-product/create-product-schema";
import { useGetAttributeCategoryByCategory } from "@/hooks/queries/useAttribute";
import { useBrandSelections } from "@/hooks/queries/useBrand";
import { useCategorySelections } from "@/hooks/queries/useCategory";
import { useUpdateProduct } from "@/hooks/queries/useProduct";
import { useInitializeImage } from "@/hooks/useInitializeImage";
import convertAttributeCategories from "@/lib/convertAttributeCategories";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const useLocalUpdateProduct = () => {
  const [updatedItem, setUpdatedItem] = useState<Product>();
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const { data: categoryData } = useCategorySelections();
  const { data: brandData } = useBrandSelections();
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [images, setImages] = useState<string[]>([]);
  const { fileArray, isImageLoading } = useInitializeImage(images);
  const { data: attributeCategoryData } = useGetAttributeCategoryByCategory(
    selectedCategory || 0
  );
  const attributes = convertAttributeCategories(attributeCategoryData || []);

  const categorySelections = categoryData?.map((c) => ({
    value: c.id,
    label: c.name,
  }));
  const brandSelections = brandData?.map((b) => ({
    value: b.id,
    label: b.name,
  }));

  const CreateProductSchema = createProductSchemaFn(attributes);

  type CreateProductFormType = z.infer<typeof CreateProductSchema>;

  const form = useForm<CreateProductFormType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      brandId: 0,
      categoryId: 0,
      description: "",
      images: [],
      name: "",
      price: undefined,
      variants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const [step, setStep] = useState<"info" | "variants">("info");

  function onSubmit(values: CreateProductFormType) {
    const variants = values.variants.map((variant) => {
      return {
        quantity: variant.quantity,
        attributes: variant.attributes.map((attributes) => {
          return {
            attributeCategoryId: attributes.valueId,
          };
        }),
      };
    });
    const variantImages = values.variants.map((variant) => {
      return variant.image[0];
    });
    const data = {
      ...values,
      variants,
      variantImages,
    };
    updateProduct(
      {
        id: updatedItem?.id || 0,
        data: data,
      },
      {
        onSuccess: () => {
          toast.success("Product created", {
            description: formatDateTimeWithAt(new Date()),
          });
          form.reset();
          setStep("info");
        },
        onError: (err) => {
          toast.error(`Ohh!!! ${err.message}`, {
            description: formatDateTimeWithAt(new Date()),
          });
        },
      }
    );
  }
  const resetForm = useCallback(async () => {
    if (updatedItem) {
      // Dùng Promise.all để fetch tất cả ảnh variant thành File objects
      const convertedVariants = await Promise.all(
        updatedItem.variants.map(async (v) => {
          // Nếu variant có imageUrl thì fetch blob để tạo File
          const response = await fetch(v.imageUrl);
          if (!response.ok) throw new Error(`Failed to fetch ${v.imageUrl}`);
          const blob = await response.blob();
          const file = new File([blob], `image`, {
            type: blob.type || "image/jpeg",
          });
          (file as any).preview = v.imageUrl;
          return {
            quantity: v.quantity,
            image: [file],
            attributes: v.variantAttributeValues.map((a) => ({
              attributeCategoryId: a.attributeCategory.id,
              valueId: a.attributeCategory.id, // tạm thời cùng id
            })),
          };
        })
      );

      form.reset({
        images: fileArray,
        brandId: updatedItem.brand.id,
        categoryId: updatedItem.category.id,
        description: updatedItem.description,
        name: updatedItem.name,
        price: Number(updatedItem.price),
        variants: convertedVariants,
      });
    }
  }, [form, updatedItem, fileArray]);
  useEffect(() => {
    const data = localStorage.getItem("updatedProduct");
    const updatedItem: Product = JSON.parse(data || "");
    setUpdatedItem(updatedItem);
    setSelectedCategory(updatedItem.category.id);
    setImages(updatedItem.images.map((value) => value.imageUrl));
  }, []);
  useEffect(() => {
    resetForm();
  }, [resetForm]);
  return {
    isImageLoading,
    form,
    onSubmit,
    step,
    setSelectedCategory,
    categorySelections,
    brandSelections,
    setStep,
    fields,
    remove,
    attributes,
    append,
    isPending,
  };
};
export default useLocalUpdateProduct;
