import axiosInstance from "@/config/axios";

const getStocks = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/stock/logs", {
    params,
  })) as GetAllResponse<Stock>;
  return response.data;
};
const createStock = async (data: {
  note?: string;
  items: {
    variantId: number;
    quantity: number;
  }[];
}) => {
  const response = await axiosInstance.post("/stock/in", data);
  return response.data;
};
export { getStocks, createStock };
