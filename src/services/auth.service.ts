import axiosInstance from "@/config/axios";

const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data as { user: User };
};
``;
const register = async (data: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const response = await axiosInstance.post("/users/register", {
    ...data,
    role: "user",
  });
  return response.data;
};
// const refreshToken = async () => {
//   const response = await axiosInstance.post("/auth/refresh");
//   return response.data as {
//     access_token: string;
//     refresh_token: string;
//   };
// };
const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response;
};
const getMyProfile = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data as User;
};
const updateMyProfile = async (data: { fullName: string; image?: File }) => {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  if (data.image) formData.append("avatar", data.image);
  const response = await axiosInstance.patch(`/users/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};
export { login, getMyProfile, updateMyProfile, logout, register };
