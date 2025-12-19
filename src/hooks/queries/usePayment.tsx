import { capturePaypal } from "@/services/payment.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePaypal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: capturePaypal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};
export { usePaypal };
