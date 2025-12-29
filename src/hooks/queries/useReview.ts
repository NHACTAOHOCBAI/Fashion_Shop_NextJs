import {
  createReview,
  getReviewsByProductId,
  deleteReview,
} from "@/services/review.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetReviewsByProduct = (idProduct: number) =>
  useQuery({
    queryKey: ["reviews", idProduct],
    queryFn: () => getReviewsByProductId(idProduct),
  });

const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", "my-orders"] });
    },
  });
};

const useDeleteReview = (productId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      if (productId) {
        queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      }
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export { useGetReviewsByProduct, useCreateReview, useDeleteReview };
