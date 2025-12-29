import axiosInstance from "@/config/axios";

export interface HomeStatistics {
  totalProducts: number;
  totalCustomers: number;
  rating: {
    averageRating: number;
    totalRating: number;
  };
  satisfactionRate: number;
}
/* ======================================================
  API 2: FEATURED REVIEWS
  BE API:
    GET /reviews/featured
  Response:
    {
      data: Review[]
    }
====================================================== */

export const getFeaturedReviews = async () => {
  const response = await axiosInstance.get("/reviews/top-rated");
  return response.data;
};
export const getHomeStatistics = async () => {
  const response = await axiosInstance.get("/admin/dashboard/statistics");
  return response.data as HomeStatistics;
};
