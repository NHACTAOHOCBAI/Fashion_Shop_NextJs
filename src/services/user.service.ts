import axiosInstance from "@/config/axios";
import { Role } from "@/constants/role.enum";

const getUsers = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/users", {
    params,
  })) as GetAllResponse<User>;
  return response.data;
};
const deleteUser = async ({ id }: { id: number }) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response;
};
const deleteUsers = async (ids: { ids: number[] }) => {
  const response = await axiosInstance.post("/users/remove-mutiple", ids);
  console.log(response);
  return response;
};
const createUser = async (data: {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  image?: File;
}) => {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("role", data.role);
  if (data.image) formData.append("avatar", data.image);
  const response = await axiosInstance.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
const updateUser = async ({
  id,
  data,
}: {
  id: number;
  data: { fullName: string; email: string; role: Role; image?: File };
}) => {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("role", data.role);
  if (data.image) formData.append("avatar", data.image);
  const response = await axiosInstance.patch(`/users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
export { getUsers, deleteUser, createUser, updateUser, deleteUsers };
