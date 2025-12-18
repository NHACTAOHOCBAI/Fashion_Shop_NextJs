import { createStock, getStocks } from "@/services/stock.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useStocks = (params: QueryParams) =>
  useQuery({
    queryKey: ["stocks", params],
    queryFn: () => getStocks(params),
  });
const useCreateStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
    },
  });
};
export { useStocks, useCreateStock };
