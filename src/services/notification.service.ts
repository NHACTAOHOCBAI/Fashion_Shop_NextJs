import axiosInstance from "@/config/axios";

const getMyNotifications = async (params: NotificationParams) => {
  console.log(params);
  const response = (await axiosInstance.get("/notifications/me", {
    params,
  })) as GetAllResponse<Notification>;
  return response.data;
};

const markAsRead = async () => {
  const response = await axiosInstance.patch("/notifications/read-all");
  return response.data;
};

const markOneAsRead = async ({ id }: { id: number }) => {
  const response = await axiosInstance.patch(`/notifications/${id}/read`);
  return response.data;
};

export { getMyNotifications, markAsRead, markOneAsRead };
