import axiosInstance from "@/config/axios";

const getDepartments = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/departments", {
    params,
  })) as GetAllResponse<Department>;
  return response.data;
};
const getDepartmentBySlug = async (slug: string) => {
  const response = await axiosInstance.get(`/departments/slug/${slug}`);
  return response.data as Department;
};
const getDepartmentSelection = async () => {
  const response = (await axiosInstance.get(
    "/departments"
  )) as GetAllResponse<Department>;
  return response.data.data;
};
const deleteDepartment = async ({ id }: { id: number }) => {
  const response = await axiosInstance.delete(`/departments/${id}`);
  return response;
};
const deleteDepartments = async (ids: { ids: number[] }) => {
  const response = await axiosInstance.post(
    "/departments/remove-multiple",
    ids
  );
  return response;
};
const createDepartment = async (data: {
  name: string;
  image: File;
  description?: string;
}) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  formData.append("image", data.image);
  const response = await axiosInstance.post("/departments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const updateDepartment = async ({
  id,
  data,
}: {
  id: number;
  data: { name: string; image: File; description?: string };
}) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  formData.append("image", data.image);
  const response = await axiosInstance.patch(`/departments/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
export {
  createDepartment,
  deleteDepartment,
  deleteDepartments,
  getDepartments,
  updateDepartment,
  getDepartmentSelection,
  getDepartmentBySlug,
};
