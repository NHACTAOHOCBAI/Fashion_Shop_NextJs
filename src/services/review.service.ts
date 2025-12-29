import axiosInstance from "@/config/axios";

const getReviewsByProductId = async (productId: number) => {
  const response = await axiosInstance.get(`/reviews/product/${productId}`);

  // Transform data to ensure rating is a number (backend returns string)
  const reviews = response.data.map((review: any) => ({
    ...review,
    rating: parseFloat(review.rating),
  }));

  return reviews as {
    id: number;
    rating: number;
    comment: string;
    user: {
      id: number;
      name: string;
    };
    images: string[];
    helpfulCount: number;
    createdAt: Date;
  }[];
};
const createReview = async (data: {
  orderId: number;
  variantId: number;
  rating: number;
  comment: string | undefined;
  files: File[];
}) => {
  const formData = new FormData();
  formData.append("orderId", String(data.orderId));
  formData.append("variantId", String(data.variantId));
  formData.append("rating", String(data.rating));
  if (data.comment) formData.append("comment", String(data.comment));
  data.files.forEach((file) => {
    formData.append("images", file);
  });
  const response = await axiosInstance.post("/reviews", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
export { createReview, getReviewsByProductId };
