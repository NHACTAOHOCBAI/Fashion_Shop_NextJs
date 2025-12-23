interface Post {
  id: number;
  content: string;
  user: User;
  totalLikes: number;
  totalComments: number;
  createdAt: string;
  updatedAt: string;
  images: PostImage[];
  postProducts: PostProduct[];
  likes?: PostLike[];
  comments?: PostComment[];
  isLikedByCurrentUser?: boolean;
}

interface PostImage {
  id: number;
  imageUrl: string;
  publicId: string;
  createdAt: string;
}

interface PostProduct {
  id: number;
  product: Product;
  createdAt: string;
}

interface PostLike {
  id: number;
  user: User;
  createdAt: string;
}

interface PostComment {
  id: number;
  user: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface CreatePostDto {
  content: string;
  productIds?: number[];
}

interface UpdatePostDto {
  content?: string;
  productIds?: number[];
}

interface CreateCommentDto {
  content: string;
}

interface PostQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortType?: 'newest' | 'popular';
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
