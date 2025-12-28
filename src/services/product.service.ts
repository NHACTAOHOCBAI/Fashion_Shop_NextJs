import axiosInstance from "@/config/axios";
const getRelatedProducts = async (idProduct: number) => {
  const response = await axiosInstance.get(`/products/related/${idProduct}`);
  return response.data as Product[];
};
const getProducts = async (params: ProductQueryParams) => {
  const query = {
    ...params,
    ...(params.attributeCategoryIds?.length
      ? { attributeCategoryIds: params.attributeCategoryIds.join(",") }
      : {}),
    ...(params.brandIds?.length ? { brandIds: params.brandIds.join(",") } : {}),
  };

  const response = (await axiosInstance.get("/products", {
    params: query,
  })) as GetAllResponse<Product>;
  return response.data;
};
export interface StockVariant {
  variantId: number;
  productId: number;
  productName: string;
  imageUrl?: string;
  remaining: number;

  // Dùng cho UI
  attributesText: string; // "Red / L"
  attributesDetail: string[]; // ["Color: Red", "Size: L"]
}

export const mapProductsToStockVariants = (
  products: Product[]
): StockVariant[] => {
  return products.flatMap((product) =>
    product.variants.map((variant) => {
      const attributesDetail = variant.variantAttributeValues.map(
        (v) =>
          `${v.attributeCategory.attribute.name}: ${v.attributeCategory.value}`
      );

      return {
        variantId: variant.id,
        productId: product.id,
        productName: product.name,
        imageUrl: variant.imageUrl,
        remaining: variant.remaining,
        attributesDetail,
        attributesText: attributesDetail
          .map((a) => a.split(": ")[1]) // lấy value
          .join(" / "),
      };
    })
  );
};

const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  brandId: number;
  images: File[];
  variantImages?: File[];
  variants?: {
    quantity: number;
    attributes: { attributeCategoryId: number }[];
  }[];
}) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", data.price.toString());
  formData.append("categoryId", data.categoryId.toString());
  formData.append("brandId", data.brandId.toString());
  if (data.description) formData.append("description", data.description);
  data.images.forEach((file) => {
    formData.append("images", file);
  });
  data.variantImages?.forEach((file) => {
    formData.append("variantImages", file);
  });
  const variants = data.variants?.map((variant) => {
    return {
      quantity: 0,
      attributes: variant.attributes,
    };
  });
  if (data.variants) formData.append("variants", JSON.stringify(variants));
  const response = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
const updateProduct = async ({
  id,
  data,
}: {
  id: number;
  data: {
    name: string;
    description?: string;
    price: number;
    categoryId: number;
    brandId: number;
    images: File[];
    variantImages?: File[];
    variants?: {
      attributes: { attributeCategoryId: number }[];
    }[];
  };
}) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", data.price.toString());
  formData.append("categoryId", data.categoryId.toString());
  formData.append("brandId", data.brandId.toString());
  if (data.description) formData.append("description", data.description);
  data.images.forEach((file) => {
    formData.append("productImages", file);
  });
  data.variantImages?.forEach((file) => {
    formData.append("variantImages", file);
  });
  if (data.variants) formData.append("variants", JSON.stringify(data.variants));
  const response = await axiosInstance.patch(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
const deleteProduct = async ({ id }: { id: number }) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response;
};
const deleteProducts = async (ids: { ids: number[] }) => {
  const response = await axiosInstance.post("/products/remove-multiple", ids);
  return response;
};
const getProductById = async (id: number) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data as Product;
};
const searchImage = async (image: File | null) => {
  const formData = new FormData();
  if (image) formData.append("image", image);
  const response = await axiosInstance.post(
    "/products/search/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data as Product[];
};
export interface VoiceSearchResponse<T = any> {
  text: string;
  data: T[];
}

export const searchByVoice = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = (await axiosInstance.post(
    "/products/search/voice",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )) as { data: VoiceSearchResponse };

  return response.data;
};
export {
  getProducts,
  createProduct,
  deleteProduct,
  deleteProducts,
  updateProduct,
  getProductById,
  getRelatedProducts,
  searchImage,
};
