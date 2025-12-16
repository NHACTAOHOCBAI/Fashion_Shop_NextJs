import axiosInstance from "@/config/axios";

const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data as { user: User };
};``
const register = async (data: {
  email: string;
  password: string;
  fullName: string;
}) => {
  console.log(data);
};
const refreshToken = async () => {
  const response = await axiosInstance.post("/auth/refresh");
  return response.data as {
    access_token: string;
    refresh_token: string;
  };
};
const logout = async () => {
  console.log("log out");
};
const getMyProfile = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data as User;
};
const updateMyProfile = async (data: { fullName: string; image?: File }) => {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  if (data.image) formData.append("image", data.image);
  const response = await axiosInstance.patch(`/brands/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
export { login, getMyProfile, updateMyProfile, logout, register };
