import { createReview, getReviewsByProductId } from "@/services/review.service";
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
export { useGetReviewsByProduct, useCreateReview };
