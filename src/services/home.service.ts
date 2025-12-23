export interface HomeStatistics {
  totalProducts: number;
  totalCustomers: number;
  rating: {
    averageRating: number;
    totalRating: number;
  };
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
  return new Promise<Review[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          rating: 5,
          comment: "AI image search is amazing! Found exactly what I wanted.",
          createdAt: new Date(),
          user: {
            id: 1,
            fullName: "Sarah Anderson",
          },
        },
        {
          id: 2,
          rating: 5,
          comment: "Chatbot helped me choose the right size. Very convenient!",
          createdAt: new Date(),
          user: {
            id: 2,
            fullName: "Michael Johnson",
          } as any,
        },
      ]);
    }, 500);
  });

  // ✅ KHI BE XONG
  // const response = await axiosInstance.get("/reviews/featured");
  // return response.data.data;
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
      });
    }, 400);
  });

  // ✅ KHI BE LÀM XONG
  // const response = await axiosInstance.get("/statistics/home");
  // return response.data;
};
