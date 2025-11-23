import axiosInstance from "@/config/axios";

const getReviewsByProductId = async (productId: number) => {
  const response = await axiosInstance.get(`/reviews/product/${productId}`);
  return response;
};
const createReview = async (data: {
  productId: number;
  rating: number;
  comment: string;
}) => {
  const response = await axiosInstance.post("/reviews", data);
  return response;
};
export { createReview, getReviewsByProductId };
