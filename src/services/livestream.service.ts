import axiosInstance from "@/config/axios";
import {
  Livestream,
  LivestreamMessage,
  LivestreamPinnedProduct,
  LivestreamAnalytics,
  CreateLivestreamDto,
  UpdateLivestreamDto,
  QueryLivestreamDto,
  PaginatedLivestreamsResponse,
} from "@/interfaces/livestream";

// ============ Livestream Management ============

/**
 * Create a new livestream
 * Authenticated users only
 * @param dto - Livestream creation data (DTO or FormData)
 */
export const createLivestream = async (dto: CreateLivestreamDto | FormData) => {
  const config = dto instanceof FormData ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : {};
  
  const response = (await axiosInstance.post("/livestreams", dto, config)) as {
    data: Livestream;
  };
  return response.data;
};

/**
 * Get all livestreams with filters and pagination
 * @param query - Query parameters for filtering and pagination
 */
export const getAllLivestreams = async (query?: QueryLivestreamDto) => {
  const response = (await axiosInstance.get("/livestreams", {
    params: query,
  })) as { data: PaginatedLivestreamsResponse };
  return response.data;
};

/**
 * Get currently active/live livestreams
 */
export const getActiveLivestreams = async () => {
  const response = (await axiosInstance.get("/livestreams/active")) as {
    data: Livestream[];
  };
  return response.data;
};

/**
 * Get my livestreams (authenticated user)
 * @param query - Query parameters for filtering and pagination
 */
export const getMyLivestreams = async (query?: QueryLivestreamDto) => {
  const response = (await axiosInstance.get("/livestreams/my", {
    params: query,
  })) as { data: PaginatedLivestreamsResponse };
  return response.data;
};

/**
 * Get a specific livestream by ID
 * @param id - Livestream ID
 */
export const getLivestream = async (id: number) => {
  const response = (await axiosInstance.get(`/livestreams/${id}`)) as {
    data: Livestream;
  };
  return response.data;
};

/**
 * Update a livestream
 * Only livestream owner can update
 * @param id - Livestream ID
 * @param dto - Update data (DTO or FormData)
 */
export const updateLivestream = async (
  id: number,
  dto: UpdateLivestreamDto | FormData
) => {
  const config = dto instanceof FormData ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : {};
  
  const response = (await axiosInstance.put(`/livestreams/${id}`, dto, config)) as {
    data: Livestream;
  };
  return response.data;
};

/**
 * Delete/Cancel a livestream
 * Only livestream owner can delete
 * @param id - Livestream ID
 */
export const deleteLivestream = async (id: number) => {
  const response = (await axiosInstance.delete(`/livestreams/${id}`)) as {
    data: { message: string };
  };
  return response.data;
};

/**
 * End a livestream manually
 * Only livestream owner can end
 * @param id - Livestream ID
 */
export const endLivestream = async (id: number) => {
  const response = (await axiosInstance.post(`/livestreams/${id}/end`)) as {
    data: Livestream;
  };
  return response.data;
};

// ============ Chat Messages ============

/**
 * Get chat messages for a livestream
 * @param id - Livestream ID
 * @param limit - Number of messages to fetch (default: 50)
 */
export const getLivestreamMessages = async (id: number, limit?: number) => {
  const response = (await axiosInstance.get(`/livestreams/${id}/messages`, {
    params: { limit },
  })) as { data: LivestreamMessage[] };
  return response.data;
};

/**
 * Delete a chat message
 * Only message owner or livestream owner can delete
 * @param messageId - Message ID
 */
export const deleteMessage = async (messageId: number) => {
  const response = (await axiosInstance.delete(
    `/livestreams/messages/${messageId}`
  )) as { data: LivestreamMessage };
  return response.data;
};

/**
 * Pin a chat message
 * Only livestream owner can pin
 * @param messageId - Message ID
 */
export const pinMessage = async (messageId: number) => {
  const response = (await axiosInstance.post(
    `/livestreams/messages/${messageId}/pin`
  )) as { data: LivestreamMessage };
  return response.data;
};

// ============ Product Management ============

/**
 * Pin a product in livestream
 * Only livestream owner can pin
 * @param livestreamId - Livestream ID
 * @param productId - Product ID
 */
export const pinProduct = async (livestreamId: number, productId: number) => {
  const response = (await axiosInstance.post(
    `/livestreams/${livestreamId}/products/${productId}/pin`
  )) as { data: LivestreamPinnedProduct };
  return response.data;
};

/**
 * Unpin a product from livestream
 * Only livestream owner can unpin
 * @param livestreamId - Livestream ID
 * @param productId - Product ID
 */
export const unpinProduct = async (
  livestreamId: number,
  productId: number
) => {
  const response = (await axiosInstance.post(
    `/livestreams/${livestreamId}/products/${productId}/unpin`
  )) as { data: LivestreamPinnedProduct };
  return response.data;
};

/**
 * Get currently pinned products in a livestream
 * @param livestreamId - Livestream ID
 */
export const getPinnedProducts = async (livestreamId: number) => {
  const response = (await axiosInstance.get(
    `/livestreams/${livestreamId}/products/pinned`
  )) as { data: LivestreamPinnedProduct[] };
  return response.data;
};

/**
 * Track product click in livestream
 * @param livestreamId - Livestream ID
 * @param productId - Product ID
 */
export const trackProductClick = async (
  livestreamId: number,
  productId: number
) => {
  const response = (await axiosInstance.post(
    `/livestreams/${livestreamId}/products/${productId}/click`
  )) as { data: { success: boolean } };
  return response.data;
};

/**
 * Track product add to cart from livestream
 * @param livestreamId - Livestream ID
 * @param productId - Product ID
 */
export const trackProductAddToCart = async (
  livestreamId: number,
  productId: number
) => {
  const response = (await axiosInstance.post(
    `/livestreams/${livestreamId}/products/${productId}/add-to-cart`
  )) as { data: { success: boolean } };
  return response.data;
};

// ============ Viewer Management ============

/**
 * Get current viewer count for a livestream
 * @param livestreamId - Livestream ID
 */
export const getViewerCount = async (livestreamId: number) => {
  const response = (await axiosInstance.get(
    `/livestreams/${livestreamId}/viewers/count`
  )) as { data: { count: number } };
  return response.data;
};

// ============ Analytics ============

/**
 * Get analytics for a livestream
 * Only livestream owner can view analytics
 * @param livestreamId - Livestream ID
 */
export const getLivestreamAnalytics = async (livestreamId: number) => {
  const response = (await axiosInstance.get(
    `/livestreams/${livestreamId}/analytics`
  )) as { data: LivestreamAnalytics };
  return response.data;
};
