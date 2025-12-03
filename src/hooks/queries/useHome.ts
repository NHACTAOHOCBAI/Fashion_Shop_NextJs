import { getHeaderData } from "@/services/home.service";
import { useQuery } from "@tanstack/react-query";
const useGetHeaderData = () =>
  useQuery({
    queryKey: ["get header data"],
    queryFn: () => getHeaderData(),
  });
export { useGetHeaderData };
