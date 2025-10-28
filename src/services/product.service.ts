import axiosInstance from "@/config/axios";

const getProducts = async (params: ProductQueryParams) => {
  const query = {
    ...params,
    ...(params.attributeCategoryIds?.length
      ? { attributeCategoryIds: params.attributeCategoryIds.join(",") }
      : {}),
  };

  const response = (await axiosInstance.get("/products", {
    params: query,
  })) as GetAllResponse<Product>;
  return response.data;
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
  if (data.variants) formData.append("variants", JSON.stringify(data.variants));
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
      quantity: number;
      attributes: { attributeCategoryId: number }[];
    }[];
  };
}) => {
  console.log(data);
  return data;
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
export {
  getProducts,
  createProduct,
  deleteProduct,
  deleteProducts,
  updateProduct,
  getProductById,
};
