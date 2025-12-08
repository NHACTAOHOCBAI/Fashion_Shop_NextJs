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
};
