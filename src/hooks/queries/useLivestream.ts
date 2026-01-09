import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as livestreamService from "@/services/livestream.service";
import {
  CreateLivestreamDto,
  UpdateLivestreamDto,
  QueryLivestreamDto,
} from "@/interfaces/livestream";

// ============ Query Keys ============
export const livestreamKeys = {
  all: ["livestreams"] as const,
  lists: () => [...livestreamKeys.all, "list"] as const,
  list: (query?: QueryLivestreamDto) =>
    [...livestreamKeys.lists(), query] as const,
  active: () => [...livestreamKeys.all, "active"] as const,
  my: (query?: QueryLivestreamDto) => [...livestreamKeys.all, "my", query] as const,
  details: () => [...livestreamKeys.all, "detail"] as const,
  detail: (id: number) => [...livestreamKeys.details(), id] as const,
  messages: (id: number) => [...livestreamKeys.all, "messages", id] as const,
  pinnedProducts: (id: number) =>
    [...livestreamKeys.all, "pinned-products", id] as const,
  viewerCount: (id: number) =>
    [...livestreamKeys.all, "viewer-count", id] as const,
  analytics: (id: number) => [...livestreamKeys.all, "analytics", id] as const,
};

// ============ Livestream Queries ============

/**
 * Get all livestreams with filters and pagination
 * @param query - Query parameters for filtering and pagination
 */
export const useGetAllLivestreams = (query?: QueryLivestreamDto) => {
  return useQuery({
    queryKey: livestreamKeys.list(query),
    queryFn: () => livestreamService.getAllLivestreams(query),
  });
};

/**
 * Get currently active/live livestreams
 * Auto-refreshes every 5 seconds
 */
export const useGetActiveLivestreams = () => {
  return useQuery({
    queryKey: livestreamKeys.active(),
    queryFn: livestreamService.getActiveLivestreams,
    refetchInterval: 5000, // Auto-refresh every 5 seconds
  });
};

/**
 * Get my livestreams (authenticated user)
 * @param query - Query parameters for filtering and pagination
 */
export const useGetMyLivestreams = (query?: QueryLivestreamDto) => {
  return useQuery({
    queryKey: livestreamKeys.my(query),
    queryFn: () => livestreamService.getMyLivestreams(query),
  });
};

/**
 * Get a specific livestream by ID
 * @param id - Livestream ID
 * @param enabled - Whether to enable the query (default: true)
 */
export const useGetLivestream = (id: number, enabled = true) => {
  return useQuery({
    queryKey: livestreamKeys.detail(id),
    queryFn: () => livestreamService.getLivestream(id),
    enabled: enabled && id > 0,
  });
};

/**
 * Get chat messages for a livestream
 * @param id - Livestream ID
 * @param limit - Number of messages to fetch
 * @param enabled - Whether to enable the query (default: true)
 */
export const useGetLivestreamMessages = (
  id: number,
  limit?: number,
  enabled = true
) => {
  return useQuery({
    queryKey: livestreamKeys.messages(id),
    queryFn: () => livestreamService.getLivestreamMessages(id, limit),
    enabled: enabled && id > 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity, 
  });
};

/**
 * Get currently pinned products in a livestream
 * @param id - Livestream ID
 * @param enabled - Whether to enable the query (default: true)
 */
export const useGetPinnedProducts = (id: number, enabled = true) => {
  return useQuery({
    queryKey: livestreamKeys.pinnedProducts(id),
    queryFn: () => livestreamService.getPinnedProducts(id),
    enabled: enabled && id > 0,
    refetchInterval: 3000, // Auto-refresh every 3 seconds
  });
};

/**
 * Get current viewer count for a livestream
 * @param id - Livestream ID
 * @param enabled - Whether to enable the query (default: true)
 */
export const useGetViewerCount = (id: number, enabled = true) => {
  return useQuery({
    queryKey: livestreamKeys.viewerCount(id),
    queryFn: () => livestreamService.getViewerCount(id),
    enabled: enabled && id > 0,
    refetchInterval: 5000, // Auto-refresh every 5 seconds
  });
};

/**
 * Get analytics for a livestream
 * Only livestream owner can view analytics
 * @param id - Livestream ID
 * @param enabled - Whether to enable the query (default: true)
 */
export const useGetLivestreamAnalytics = (id: number, enabled = true) => {
  return useQuery({
    queryKey: livestreamKeys.analytics(id),
    queryFn: () => livestreamService.getLivestreamAnalytics(id),
    enabled: enabled && id > 0,
  });
};

// ============ Livestream Mutations ============

/**
 * Create a new livestream
 * Automatically invalidates my livestreams query after success
 */
export const useCreateLivestream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateLivestreamDto | FormData) =>
      livestreamService.createLivestream(dto),
    onSuccess: () => {
      // Invalidate my livestreams
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.my(),
      });

      // Invalidate all livestreams
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.lists(),
      });
    },
  });
};

/**
 * Update a livestream
 * Automatically invalidates relevant queries after success
 */
export const useUpdateLivestream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateLivestreamDto | FormData }) =>
      livestreamService.updateLivestream(id, dto),
    onSuccess: (data) => {
      // Invalidate detail query
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.detail(data.id),
      });

      // Invalidate my livestreams
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.my(),
      });

      // Invalidate all livestreams
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.lists(),
      });
    },
  });
};

/**
 * Delete/Cancel a livestream
 * Automatically invalidates relevant queries after success
 */
export const useDeleteLivestream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => livestreamService.deleteLivestream(id),
    onSuccess: () => {
      // Invalidate my livestreams
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.my(),
      });

      // Invalidate all livestreams
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.lists(),
      });
    },
  });
};

/**
 * End a livestream manually
 * Automatically invalidates relevant queries after success
 */
export const useEndLivestream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => livestreamService.endLivestream(id),
    onSuccess: (data) => {
      // Invalidate detail query
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.detail(data.id),
      });

      // Invalidate my livestreams
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.my(),
      });

      // Invalidate active livestreams
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.active(),
      });
    },
  });
};

// ============ Message Mutations ============

/**
 * Delete a chat message
 * Automatically invalidates messages query after success
 */
export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      messageId,
      livestreamId,
    }: {
      messageId: number;
      livestreamId: number;
    }) => livestreamService.deleteMessage(messageId),
    onSuccess: (_, variables) => {
      // Invalidate messages for this livestream
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.messages(variables.livestreamId),
      });
    },
  });
};

/**
 * Pin a chat message
 * Automatically invalidates messages query after success
 */
export const usePinMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      messageId,
      livestreamId,
    }: {
      messageId: number;
      livestreamId: number;
    }) => livestreamService.pinMessage(messageId),
    onSuccess: (_, variables) => {
      // Invalidate messages for this livestream
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.messages(variables.livestreamId),
      });
    },
  });
};

// ============ Product Mutations ============

/**
 * Pin a product in livestream
 * Automatically invalidates pinned products query after success
 */
export const usePinProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      livestreamId,
      productId,
    }: {
      livestreamId: number;
      productId: number;
    }) => livestreamService.pinProduct(livestreamId, productId),
    onSuccess: (data, variables) => {
      // Invalidate pinned products
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.pinnedProducts(variables.livestreamId),
      });
    },
  });
};

/**
 * Unpin a product from livestream
 * Automatically invalidates pinned products query after success
 */
export const useUnpinProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      livestreamId,
      productId,
    }: {
      livestreamId: number;
      productId: number;
    }) => livestreamService.unpinProduct(livestreamId, productId),
    onSuccess: (data, variables) => {
      // Invalidate pinned products
      queryClient.invalidateQueries({
        queryKey: livestreamKeys.pinnedProducts(variables.livestreamId),
      });
    },
  });
};

/**
 * Track product click in livestream
 */
export const useTrackProductClick = () => {
  return useMutation({
    mutationFn: ({
      livestreamId,
      productId,
    }: {
      livestreamId: number;
      productId: number;
    }) => livestreamService.trackProductClick(livestreamId, productId),
  });
};

/**
 * Track product add to cart from livestream
 */
export const useTrackProductAddToCart = () => {
  return useMutation({
    mutationFn: ({
      livestreamId,
      productId,
    }: {
      livestreamId: number;
      productId: number;
    }) => livestreamService.trackProductAddToCart(livestreamId, productId),
  });
};
