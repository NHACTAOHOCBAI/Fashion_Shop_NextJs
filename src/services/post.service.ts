import axiosInstance from "@/config/axios";

// Get posts feed with pagination
export const getPosts = async (params: PostQueryParams) => {
  const response = (await axiosInstance.get("/posts", {
    params,
  })) as GetAllResponse<Post>;
  return response.data;
};

// Get single post by ID
export const getPostById = async (id: number) => {
  const response = (await axiosInstance.get(`/posts/${id}`)).data as Post;
  return response;
};

// Create a new post
export const createPost = async (data: {
  content: string;
  productIds?: number[];
  images?: File[];
}) => {
  const formData = new FormData();

  formData.append("content", data.content);

  if (data.productIds && data.productIds.length > 0) {
    data.productIds.forEach((id) => {
      formData.append("productIds", id.toString());
    });
  }

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append("images", file);
    });
  }

  const response = (await axiosInstance.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })) as Post;
  return response;
};

// Update a post
export const updatePost = async (id: number, data: UpdatePostDto) => {
  const response = (await axiosInstance.put(`/posts/${id}`, data)) as {
    message: string;
    post: Post;
  };
  return response;
};

// Delete a post
export const deletePost = async (id: number) => {
  const response = (await axiosInstance.delete(`/posts/${id}`)) as {
    message: string;
  };
  return response;
};

// Toggle like on a post
export const toggleLike = async (id: number) => {
  const response = (await axiosInstance.post(`/posts/${id}/like`)) as {
    message: string;
    action: "liked" | "unliked";
    totalLikes: number;
  };
  return response;
};

// Add comment to a post
export const addComment = async (id: number, data: CreateCommentDto) => {
  const response = (await axiosInstance.post(
    `/posts/${id}/comments`,
    data
  )) as PostComment;
  return response;
};

// Get comments for a post
export const getComments = async (
  id: number,
  page: number = 1,
  limit: number = 20
) => {
  const response = (await axiosInstance.get(`/posts/${id}/comments`, {
    params: { page, limit },
  })) as GetAllResponse<PostComment>;
  return response.data;
};

// Get posts by product
export const getPostsByProduct = async (
  productId: number,
  page: number = 1,
  limit: number = 20
) => {
  const response = (await axiosInstance.get(`/posts/products/${productId}`, {
    params: { page, limit },
  })) as GetAllResponse<Post>;
  return response.data;
};

// Update comment
export const updateComment = async (
  postId: number,
  commentId: number,
  data: UpdateCommentDto
) => {
  const response = (await axiosInstance.put(
    `/posts/${postId}/comments/${commentId}`,
    data
  )) as { message: string; comment: PostComment };
  return response;
};

// Delete comment
export const deleteComment = async (postId: number, commentId: number) => {
  const response = (await axiosInstance.delete(
    `/posts/${postId}/comments/${commentId}`
  )) as { message: string };
  return response;
};

// Share a post
export const sharePost = async (id: number) => {
  const response = (await axiosInstance.post(`/posts/${id}/share`)) as {
    message: string;
    totalShares: number;
  };
  return response;
};

// Get author profile with statistics
export const getAuthorProfile = async (userId: number) => {
  const response = await axiosInstance.get(`/posts/author/${userId}`);
  console.log("🔍 Author Profile Raw Response:", response);
  console.log("🔍 Response Type:", typeof response);
  console.log("🔍 Response Keys:", Object.keys(response || {}));

  // Check if response is wrapped in a 'data' property
  const data = (response as any)?.data || response;
  console.log("🔍 Extracted Data:", data);

  return data as {
    id: number;
    fullName: string;
    avatar: string;
    bio: string;
    email: string;
    createdAt: string;
    stats: {
      totalPosts: number;
      totalLikes: number;
    };
  };
};

// Get author's posts with pagination
export const getAuthorPosts = async (
  userId: number,
  page: number = 1,
  limit: number = 20
) => {
  const response = (await axiosInstance.get(`/posts/author/${userId}/posts`, {
    params: { page, limit },
  })) as GetAllResponse<Post>;
  return response.data;
};
// Admin delete single post
export const deletePostByAdmin = async (id: number) => {
  const response = await axiosInstance.delete(`/posts/admin/${id}`);
  return response.data as {
    message: string;
    deletedId: number;
  };
};

// Admin delete multiple posts
export const deletePostsByAdmin = async (ids: number[]) => {
  const response = await axiosInstance.post(`/posts/admin/remove-multiple`, {
    ids,
  });
  return response.data as {
    message: string;
    deletedIds: number[];
  };
};
