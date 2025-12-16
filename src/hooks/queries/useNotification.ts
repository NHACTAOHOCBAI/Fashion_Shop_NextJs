import {
  getMyNotifications,
  markAsRead,
  markOneAsRead,
} from "@/services/notification.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetNotification = (params: NotificationParams) =>
  useQuery({
    queryKey: ["my-notification"],
    queryFn: () => getMyNotifications(params),
  });
const useMarkOneAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markOneAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-notification"] });
    },
  });
};
const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-notification"] });
    },
  });
};
export { useGetNotification, useMarkAsRead, useMarkOneAsRead };
