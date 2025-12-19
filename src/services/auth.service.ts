import axiosInstance from "@/config/axios";
const loginWithGoogle = async () => {
  const response = await axiosInstance.get("/auth/google");
  return response;
};

const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post("/auth/forgot-password", {
    email,
  });
  return response;
};

const resetPassword = async (data: {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const response = await axiosInstance.post("/auth/reset-password", data);
  return response;
};

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
  return response.data;
};
const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const response = await axiosInstance.post(`/auth/change-password`, data);
  return response.data;
};
export {
  login,
  getMyProfile,
  updateMyProfile,
  logout,
  register,
  changePassword,
  forgotPassword,
  resetPassword,
  loginWithGoogle,
};
