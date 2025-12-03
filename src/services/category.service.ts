import axiosInstance from "@/config/axios";

const getCategories = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/categories", {
    params,
  })) as GetAllResponse<Category>;
  return response.data;
};
const getCategoryBySlug = async (slug: string) => {
  const response = await axiosInstance.get(`/categories/slugs/${slug}`);
  return response.data as Category;
};
const categoryFilters = {
  id: 1,
  name: " Shoes",
  description:
    " Stylish and comfortable men’s shoes for every occasion. From casual sneakers to formal dress shoes, find the perfect pair to match your everyday style.",
  image:
    "https://png.pngtree.com/png-clipart/20241231/original/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_18457027.png",
  brands: [
    {
      id: 1,
      name: "Gucci",
    },
    {
      id: 2,
      name: "Louis Vuitton",
    },
    {
      id: 3,
      name: "Adidas",
    },
    {
      id: 4,
      name: "Nike",
    },
    {
      id: 5,
      name: "Labubu",
    },
  ],
  attributes: [
    {
      id: 101,
      attribute: {
        id: 1,
        name: "Color",
        createdAt: "2025-11-20T08:00:00.000Z",
      },
      value: "Red",
    },
    {
      id: 102,
      attribute: {
        id: 1,
        name: "Color",
        createdAt: "2025-11-20T08:00:00.000Z",
      },
      value: "Blue",
    },

    {
      id: 201,
      attribute: {
        id: 2,
        name: "Size",
        createdAt: "2025-11-25T10:30:00.000Z",
      },
      value: "S",
    },
    {
      id: 202,
      attribute: {
        id: 2,
        name: "Size",
        createdAt: "2025-11-25T10:30:00.000Z",
      },
      value: "M",
    },
    {
      id: 301,
      attribute: {
        id: 3,
        name: "Material",
        createdAt: "2025-11-28T15:45:00.000Z",
      },
      value: "Cotton",
    },
    {
      id: 401,
      attribute: {
        id: 4,
        name: "Pattern",
        createdAt: "2025-10-01T12:00:00.000Z",
        updatedAt: "2025-11-01T00:00:00.000Z",
      },
      value: "Striped",
    },
  ],
};
const getCategoryFilters = async (id: number) => {
  return categoryFilters;
};
const getCategoryById = async (id: number) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data as Category;
};
const getCategorySelection = async () => {
  const response = (await axiosInstance.get(
    "/categories"
  )) as GetAllResponse<Category>;
  return response.data.data;
};
const deleteCategory = async ({ id }: { id: number }) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response;
};
const deleteCategories = async (ids: { ids: number[] }) => {
  const response = await axiosInstance.post("/categories/remove-multiple", ids);
  return response;
};
const createCategory = async (data: {
  name: string;
  image: File;
  departmentId: number;
  description?: string;
  attributes: { attributeId: number; value: string }[];
}) => {
  console.log(data);
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("departmentId", data.departmentId.toString());
  formData.append("image", data.image);
  formData.append("attributes", JSON.stringify(data.attributes));
  if (data.description) formData.append("description", data.description);
  const response = await axiosInstance.post("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const updateCategory = async ({
  id,
  data,
}: {
  id: number;
  data: {
    name: string;
    image: File;
    departmentId: number;
    description?: string;
    attributes: { attributeId: number; value: string }[];
  };
}) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("departmentId", data.departmentId.toString());
  formData.append("image", data.image);
  formData.append("attributes", JSON.stringify(data.attributes));
  if (data.description) formData.append("description", data.description);
  const response = await axiosInstance.patch(`/categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
export {
  createCategory,
  deleteCategories,
  deleteCategory,
  getCategories,
  updateCategory,
  getCategorySelection,
  getCategoryBySlug,
  getCategoryById,
  getCategoryFilters,
};
