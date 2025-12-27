import axiosInstance from "@/config/axios";

const getStocks = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/stock/logs", {
    params,
  })) as GetAllResponse<Stock>;
  return response.data;
};

const getStockById = async (id: number): Promise<Stock> => {
  const response = await axiosInstance.get(`/stock/logs`, {
    params: {
      page: 1,
      limit: 100,
    },
  });

  const stocks = response.data.data as Stock[];
  const stock = stocks.find((s) => s.id === id);

  if (!stock) {
    throw new Error(`Stock with ID ${id} not found`);
  }

  return stock;
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

export { getStocks, getStockById, createStock };
