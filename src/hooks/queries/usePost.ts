"use client";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  getComments,
  getPostsByProduct,
  updateComment,
  deleteComment,
  sharePost,
  getAuthorProfile,
  getAuthorPosts,
  deletePostByAdmin,
  deletePostsByAdmin,
} from "@/services/post.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get posts feed
export const usePosts = (params: PostQueryParams) =>
  useQuery({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
  });

// Get single post
export const usePost = (id: number) =>
  useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

// Create post
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Update post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostDto }) =>
      updatePost(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
    },
  });
};

// Delete post
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
export const useDeleteByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePostByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
export const useDeleteManyByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePostsByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
// Toggle like
export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleLike,
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};

// Add comment
export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateCommentDto }) =>
      addComment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Get comments
export const useComments = (
  postId: number,
  page: number = 1,
  limit: number = 20
) =>
  useQuery({
    queryKey: ["comments", postId, page, limit],
    queryFn: () => getComments(postId, page, limit),
    enabled: !!postId,
  });

// Get posts by product
export const usePostsByProduct = (
  productId: number,
  page: number = 1,
  limit: number = 20
) =>
  useQuery({
    queryKey: ["posts-by-product", productId, page, limit],
    queryFn: () => getPostsByProduct(productId, page, limit),
    enabled: !!productId,
  });

// Update comment
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      commentId,
      data,
    }: {
      postId: number;
      commentId: number;
      data: UpdateCommentDto;
    }) => updateComment(postId, commentId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
    },
  });
};

// Delete comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: number;
      commentId: number;
    }) => deleteComment(postId, commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Share post
export const useSharePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sharePost,
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};

// Get author profile
export const useAuthorProfile = (userId: number) =>
  useQuery({
    queryKey: ["author-profile", userId],
    queryFn: () => getAuthorProfile(userId),
    enabled: !!userId,
  });

// Get author's posts
export const useAuthorPosts = (
  userId: number,
  page: number = 1,
  limit: number = 20
) =>
  useQuery({
    queryKey: ["author-posts", userId, page, limit],
    queryFn: () => getAuthorPosts(userId, page, limit),
    enabled: !!userId,
  });
