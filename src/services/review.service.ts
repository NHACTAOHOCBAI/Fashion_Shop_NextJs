import axiosInstance from "@/config/axios";

const reviews: Review[] = [
  {
    id: 101,
    rating: 5,
    comment:
      "Sản phẩm tuyệt vời! Áo vừa vặn và chất liệu vải rất thoải mái, không hề bị nhăn sau khi giặt.",
    user: {
      id: 1,
      avatar: "https://example.com/avatars/user1.png",
      fullName: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      password: "hashed_password_1",
      role: "CLIENT", // Giả định role là "CLIENT"
      isActive: true,
      createdAt: "2024-01-15T10:00:00.000Z",
      updatedAt: "2024-10-01T14:30:00.000Z",
    },
    image:
      "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760278541/men-shoes_tbn1bl.png", // Chuỗi chứa nhiều URL ảnh ngăn cách bằng dấu phẩy
    helpfulCount: 15,
    createdAt: new Date("2025-11-20T09:00:00.000Z"),
  },
  {
    id: 102,
    rating: 4,
    comment:
      "Áo sơ mi form Slim Fit rất đẹp, nhưng màu trắng hơi mỏng so với mong đợi. Giao hàng nhanh.",
    user: {
      id: 2,
      fullName: "Trần Thị Bình",
      email: "binh.tran@example.com",
      password: "hashed_password_2",
      role: "CLIENT",
      isActive: true,
      createdAt: "2023-05-20T11:22:00.000Z",
      updatedAt: "2024-11-01T08:10:00.000Z",
    },
    image:
      "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760278541/men-shoes_tbn1bl.png",
    helpfulCount: 5,
    createdAt: new Date("2025-11-25T15:30:00.000Z"),
  },
  {
    id: 103,
    rating: 2,
    comment:
      "Tôi đặt size M nhưng lại nhận được size L. Cần kiểm tra kỹ đơn hàng trước khi gửi cho khách.",
    user: {
      id: 3,
      fullName: "Lê Minh Cường",
      email: "cuong.le@example.com",
      password: "hashed_password_3",
      role: "CLIENT",
      isActive: false, // User đã bị vô hiệu hóa
      createdAt: "2024-03-10T06:45:00.000Z",
      updatedAt: "2024-09-01T20:00:00.000Z",
    },
    image: "", // Không có ảnh
    helpfulCount: 0,
    createdAt: new Date("2025-12-01T18:00:00.000Z"),
  },
];
const getReviewsByProductId = async (productId: number) => {
  // const response = await axiosInstance.get(`/reviews/product/${productId}`);
  // return response;
  return {
    pagination: {
      total: 10,
      page: 1,
      limit: 9,
    },
    data: reviews,
  };
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
