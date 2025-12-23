import { getFeaturedReviews, getHomeStatistics } from "@/services/home.service";
import { getProducts } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
export const useNewArrivals = () =>
  useQuery({
    queryKey: ["new-arrivals"],
    queryFn: () =>
      getProducts({
        page: 1,
        limit: 8,
        sortBy: "createdAt",
        sortOrder: "DESC",
      }),
  });

export const useFeaturedReviews = () =>
  useQuery({
    queryKey: ["featured-reviews"],
    queryFn: getFeaturedReviews,
  });
export const useHomeStatistics = () =>
  useQuery({
    queryKey: ["home-statistics"],
    queryFn: getHomeStatistics,
  });
