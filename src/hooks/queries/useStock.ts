import { createStock, getStocks, getStockById } from "@/services/stock.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useStocks = (params: QueryParams) =>
  useQuery({
    queryKey: ["stocks", params],
    queryFn: () => getStocks(params),
  });

const useGetStockById = (id: number) =>
  useQuery({
    queryKey: ["stock", id],
    queryFn: () => getStockById(id),
    enabled: !!id,
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

export { useStocks, useGetStockById, useCreateStock };
