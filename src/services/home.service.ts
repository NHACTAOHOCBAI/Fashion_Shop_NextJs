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
  // 🔴 MOCK DATA
  return new Promise<HomeStatistics>((resolve) => {
    setTimeout(() => {
      resolve({
        totalProducts: 10234,
        totalCustomers: 5341,
        rating: {
          averageRating: 4.8,
          totalRating: 5202,
        },
        satisfactionRate: 99,
      });
    }, 400);
  });

  // ✅ KHI BE LÀM XONG
  // const response = await axiosInstance.get("/statistics/home");
  // return response.data;
};
