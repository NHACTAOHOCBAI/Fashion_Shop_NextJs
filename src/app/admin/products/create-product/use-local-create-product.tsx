import createProductSchemaFn from "@/app/admin/products/create-product/create-product-schema";
import { useGetAttributeCategoryByCategory } from "@/hooks/queries/useAttribute";
import { useBrandSelections } from "@/hooks/queries/useBrand";
import { useCategorySelections } from "@/hooks/queries/useCategory";
import { useCreateProduct } from "@/hooks/queries/useProduct";
import convertAttributeCategories from "@/lib/convertAttributeCategories";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const useLocalCreateProduct = () => {
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { data: categoryData } = useCategorySelections();
  const { data: brandData } = useBrandSelections();
  const [selectedCategory, setSelectedCategory] = useState<number>();

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
    console.log(values);
    const variants = values.variants.map((variant) => {
      return {
        quantity: 0,
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
    createProduct(data, {
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
    });
  }
  return {
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
export default useLocalCreateProduct;
