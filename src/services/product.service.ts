import axiosInstance from "@/config/axios";
const products = [
  {
    id: 1,
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    name: "Nike shoes",
    rating: 3.8,
    price: 299.99,
    createdAt: "2025-12-02T12:52:36.000Z",
  },
  {
    id: 2,
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    name: "Nike shoes",
    rating: 3.8,
    price: 299.99,
    createdAt: "2025-11-05T00:39:01.746Z",
  },
  {
    id: 3,
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    name: "Nike shoes",
    rating: 3.8,
    price: 299.99,
    createdAt: "2025-12-02T12:52:36.000Z",
  },
  {
    id: 4,
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    name: "Nike shoes",
    rating: 3.8,
    price: 299.99,
    createdAt: "2025-11-05T00:39:01.746Z",
  },
  {
    id: 5,
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    name: "Nike shoes",
    rating: 3.8,
    price: 299.99,
    createdAt: "2025-12-02T12:52:36.000Z",
  },
  {
    id: 6,
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    name: "Nike shoes",
    rating: 3.8,
    price: 299.99,
    createdAt: "2025-11-05T00:39:01.746Z",
  },
  {
    id: 7,
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    name: "Nike shoes",
    rating: 3.8,
    price: 299.99,
    createdAt: "2025-12-02T12:52:36.000Z",
  },
  {
    id: 8,
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    name: "Nike shoes",
    rating: 3.8,
    price: 299.99,
    createdAt: "2025-11-05T00:39:01.746Z",
  },
  {
    id: 9,
    image:
      "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
    name: "Nike shoes",
    rating: 3.8,
    price: 299.99,
    createdAt: "2025-12-02T12:52:36.000Z",
  },
];
// Hàm tiện ích để tạo một độ trễ
const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getProducts2 = async (params: ProductQueryParams) => {
  console.log("hook", params);

  // Thêm độ trễ 1000 mili giây (1 giây)
  await delay(1000);

  return {
    pagination: {
      total: 10,
      page: 1,
      limit: 9,
    },
    data: products,
  };
};
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
  getProducts2,
};
