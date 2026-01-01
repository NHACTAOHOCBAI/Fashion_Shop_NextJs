type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY';

interface Post {
  id: number;
  content: string;
  user: User;
  totalLikes: number; // Backward compatibility - same as totalReactions
  totalReactions: number;
  totalComments: number;
  totalShares: number;
  reactionCounts: {
    LIKE: number;
    LOVE: number;
    HAHA: number;
    WOW: number;
    SAD: number;
    ANGRY: number;
  };
  createdAt: string;
  updatedAt: string;
  images: PostImage[];
  postProducts: PostProduct[];
  likes?: PostLike[]; // Deprecated - for backward compatibility
  reactions?: PostReaction[];
  comments?: PostComment[];
  bookmarks?: PostBookmark[];
  shares?: PostShare[];
  isLikedByCurrentUser?: boolean; // Deprecated - use userReaction instead
  userReaction?: ReactionType | null; // Current user's reaction
  isBookmarkedByCurrentUser?: boolean;
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

interface PostReaction {
  id: number;
  user: User;
  type: ReactionType;
  createdAt: string;
  updatedAt: string;
}

interface PostBookmark {
  id: number;
  user: User;
  createdAt: string;
}

interface PostShare {
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
  // Threaded comments (unlimited depth - Reddit/Facebook style)
  parentComment?: PostComment | null;
  replies?: PostComment[];
  replyCount: number;
  depth: number; // 0 = root comment, 1+ = nested replies (auto-calculated)
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

interface UpdateCommentDto {
  content: string;
}

interface CreateReactionDto {
  type: ReactionType;
}

interface CreateReplyDto {
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
